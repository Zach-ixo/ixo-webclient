import React, { useState, useEffect, useMemo } from 'react'
import { getTransactions } from 'redux/account/account.actions'
import Axios from 'axios'
import BalanceCard from 'pages/Bond/Accounts/Components/ProjectAccount'
import AssetWrapper from 'pages/Bond/Accounts/Components/ProjectAccountWrapper'
import AccountTransactionTable from 'components/Bonds/BondAccountTable/BondAccountTable'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/types'
import {
  changePortfolioAsset,
  changeSelectedAccountAddress,
} from '../../../../../redux/selectedEntityExchange/entityExchange.actions'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import WalletSelectModal from 'components/ControlPanel/Actions/WalletSelectModal'
import { apiCurrencyToCurrency, findDenomByMinimalDenom, minimalAmountToAmount } from 'redux/account/account.utils'
import { displayTokenAmount } from 'utils/currency'
import BigNumber from 'bignumber.js'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { SendModal } from 'components/Modals'

const Portfolio: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const { transactions, usdRate } = useSelector((state: RootState) => state.account)
  const [selected, setSelected] = useState(0)
  const [sendModalOpen, setSendModalOpen] = useState<boolean>(false)
  const [walletModalOpen, setWalletModalOpen] = useState<boolean>(true)
  const [balances, setBalances] = useState<Coin[]>([])
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)
  const selectedDenom = useMemo(() => {
    if (balances.length > 0 && selected < balances.length) {
      return balances[selected].denom
    }
    return undefined
  }, [balances, selected])

  const handleWalletSelect = (walletType: string, accountAddress: string): void => {
    setSelectedAddress(accountAddress)
    dispatch(changeSelectedAccountAddress(accountAddress))
    setWalletModalOpen(false)
  }

  const handleAddAccount = (): void => {
    // dispatch(
    //   toggleAssistant({
    //     fixed: true,
    //     intent: `/add_account`,
    //   }),
    // )
  }
  const handleDownloadCSV = (): void => {
    console.log('handleDownloadCSV')
  }
  const handleNewTransaction = (): void => {
    setSendModalOpen(true)
  }

  const getBalances = async (address: string): Promise<any> => {
    return Axios.get(process.env.REACT_APP_GAIA_URL + '/bank/balances/' + address).then((response) => {
      return {
        balances: response.data.result.map((coin: any) => apiCurrencyToCurrency(coin)),
      }
    })
  }

  useEffect(() => {
    if (selectedAddress) {
      getBalances(selectedAddress).then(({ balances }) => {
        setBalances(
          balances.map((balance: any) => ({
            denom: findDenomByMinimalDenom(balance.denom),
            amount: minimalAmountToAmount(balance.denom, balance.amount),
          })),
        )
      })
      dispatch(getTransactions(selectedAddress) as any)
    }
    // eslint-disable-next-line
  }, [selectedAddress])

  useEffect(() => {
    if (balances.length > 0) {
      setSelected(0)
      dispatch(changePortfolioAsset(balances[0].denom!) as any)
    }
    // eslint-disable-next-line
  }, [balances])

  useEffect(() => {
    if (selectedDenom) {
      dispatch(changePortfolioAsset(selectedDenom))
    }
    // eslint-disable-next-line
  }, [selectedDenom])

  return (
    <>
      {selectedAddress && balances.length > 0 && (
        <>
          <AssetWrapper title='Assets' handleAddAccount={handleAddAccount}>
            {balances
              .map((balance) => ({
                ...balance,
                usdRate: balance.denom === 'ixo' ? usdRate : 1,
              }))
              .map((balance, key) => (
                <BalanceCard
                  key={`project-balance-${key}`}
                  count={balances.length}
                  selected={selected === key}
                  onSelect={(): void => setSelected(key)}
                  balance={balance}
                  locked={false}
                  subLabel={`USD ${displayTokenAmount(
                    new BigNumber(balance.amount!).times(new BigNumber(balance.usdRate)),
                  )}`}
                  address={selectedAddress}
                />
              ))}
          </AssetWrapper>
          {transactions.length > 0 && (
            <AccountTransactionTable
              handleDownloadCSV={handleDownloadCSV}
              handleNewTransaction={handleNewTransaction}
              token={selectedDenom !== 'uixo' ? selectedDenom : 'ixo'}
              tableData={transactions.filter((tx) => tx.asset === selectedDenom).reverse()}
            />
          )}
        </>
      )}

      <ModalWrapper
        isModalOpen={walletModalOpen}
        header={{
          title: 'Select Wallet',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setWalletModalOpen(false)}
      >
        <WalletSelectModal handleSelect={handleWalletSelect} availableWallets={['keysafe', 'keplr']} />
      </ModalWrapper>
      <SendModal open={sendModalOpen} setOpen={setSendModalOpen} />
    </>
  )
}
export default Portfolio