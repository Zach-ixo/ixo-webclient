import React from 'react'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { useAccount } from 'hooks/account'
import { WalletType } from 'redux/account/account.types'
import { useIxoKeysafe } from 'lib/keysafe/keysafe'
import { useKeplr } from 'lib/keplr/keplr'
import KeplrIcon from 'assets/images/icon-keplr.svg'
import KeysafeIcon from 'assets/images/icon-keysafe.svg'
import { Container, WalletBox } from './styles'
import { Typography } from 'components/App/App.styles'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const ChooseWalletModal: React.FC<Props> = ({ open, setOpen }): JSX.Element => {
  const { chooseWallet } = useAccount()
  const keplr = useKeplr()
  const keysafe = useIxoKeysafe()

  const isKeplrInstalled: boolean = keplr.getKeplr()
  const isKeysafeInstalled: boolean = keysafe.getKeysafe()

  const handleChooseWallet = async (type: WalletType): Promise<void> => {
    switch (type) {
      case WalletType.Keplr:
        if (await keplr.connect()) {
          chooseWallet(WalletType.Keplr)
          setOpen(false)
        }
        break
      case WalletType.Keysafe:
        if (await keysafe.connect()) {
          chooseWallet(WalletType.Keysafe)
          setOpen(false)
        }
        break
      default:
        break
    }
  }

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Choose Wallet',
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
      zIndex={999}
    >
      <Container>
        {isKeplrInstalled && (
          <WalletBox onClick={(): Promise<void> => handleChooseWallet(WalletType.Keplr)}>
            <img src={KeplrIcon} alt='keplr' />
            <span>{WalletType.Keplr}</span>
          </WalletBox>
        )}
        {isKeysafeInstalled && (
          <WalletBox onClick={(): Promise<void> => handleChooseWallet(WalletType.Keysafe)}>
            <img src={KeysafeIcon} alt='keysafe' />
            <span>{WalletType.Keysafe}</span>
          </WalletBox>
        )}
        {!isKeplrInstalled && !isKeysafeInstalled && <Typography color='white'>{`No wallet's installed`}</Typography>}
      </Container>
    </ModalWrapper>
  )
}

export default ChooseWalletModal
