import React, { useState, useEffect, useMemo } from 'react'
// import BalanceCard from 'pages/Bond/Accounts/Components/ProjectAccount'
// import AssetWrapper from 'pages/Bond/Accounts/Components/ProjectAccountWrapper'
// import AccountTransactionTable from 'components/Bonds/BondAccountTable/BondAccountTable'
import { useAppDispatch } from 'redux/hooks'
import { changePortfolioAsset } from 'redux/selectedEntityExchange/entityExchange.actions'
// import { displayTokenAmount } from 'utils/currency'
// import BigNumber from 'bignumber.js'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { SendModal } from 'components/Modals'

const Portfolio: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()
  //   const { transactions, usdRate } = useAppSelector((state) => state.account)
  const [selected, setSelected] = useState(0)
  const [sendModalOpen, setSendModalOpen] = useState<boolean>(false)
  const [balances] = useState<Coin[]>([])
  const selectedDenom = useMemo(() => {
    if (balances.length > 0 && selected < balances.length) {
      return balances[selected].denom
    }
    return undefined
  }, [balances, selected])

  //   const handleAddAccount = (): void => {
  //     // dispatch(
  //     //   toggleAssistant({
  //     //     fixed: true,
  //     //     intent: `/add_account`,
  //     //   }),
  //     // )
  //   }
  //   const handleDownloadCSV = (): void => {
  //     console.log('handleDownloadCSV')
  //   }
  //   const handleNewTransaction = (): void => {
  //     setSendModalOpen(true)
  //   }

  // useEffect(() => {
  //   if (selectedAddress) {
  //     getBalances(selectedAddress).then(({ balances }) => {
  //       setBalances(
  //         balances.map((balance: any) => ({
  //           denom: findDenomByMinimalDenom(balance.denom),
  //           amount: minimalAmountToAmount(balance.denom, balance.amount),
  //         })),
  //       )
  //     })
  //     dispatch(getTransactions(selectedAddress) as any)
  //   }
  //   // eslint-disable-next-line
  // }, [selectedAddress])

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
      {/* {balances.length > 0 && (
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
                  address={'selectedAddress'}
                />
              ))}
          </AssetWrapper>
          {transactions.length > 0 && (
            <AccountTransactionTable
              handleDownloadCSV={handleDownloadCSV}
              handleNewTransaction={handleNewTransaction}
              token={selectedDenom !== 'uixo' ? selectedDenom : 'ixo'}
              tableData={transactions.filter((tx: any) => tx.asset === selectedDenom).reverse()}
            />
          )}
        </>
      )} */}

      <SendModal open={sendModalOpen} setOpen={setSendModalOpen} />
    </>
  )
}
export default Portfolio
