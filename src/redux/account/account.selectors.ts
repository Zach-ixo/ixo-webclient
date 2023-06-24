import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'
import { AccountState, UserInfo } from './account.types'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { KeyTypes } from 'lib/protocol'
import { SigningStargateClient } from '@ixo/impactxclient-sdk'
import { SigningCosmWasmClient, CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { NATIVE_MICRODENOM } from 'constants/chains'
import { WalletType } from '@gssuper/cosmodal'
import BigNumber from 'bignumber.js'
import { Cw20Token, NativeToken } from 'types/tokens'

export const selectAccountState = (state: RootState): AccountState => state.account

/**
 * @deprecated
 */
export const selectUserInfo = createSelector(selectAccountState, (account: AccountState): UserInfo => {
  return account.userInfo
})

/**
 * @deprecated
 */
export const selectUserIsLoggedIn = createSelector(selectUserInfo, (userInfo: UserInfo): boolean => {
  return userInfo ? userInfo.loggedInKeysafe : false
})

/**
 * @deprecated use selectAccountDid() instead
 */
export const selectUserDid = createSelector(selectUserInfo, (userInfo: UserInfo): string => {
  return userInfo ? userInfo.didDoc.did : ''
})

/**
 * @deprecated
 */
export const selectUserAccountNumber = createSelector(selectAccountState, (account: AccountState): string => {
  return account ? account.accountNumber : null!
})

/**
 * @deprecated
 */
export const selectUserSequence = createSelector(selectAccountState, (account: AccountState): string => {
  return account ? account.sequence : null!
})

export const selectAccountAddress = createSelector(selectAccountState, (account: AccountState): string => {
  return account ? account.address : null!
})

export const selectAccountBalances = createSelector(selectAccountState, (account: AccountState): Coin[] => {
  return account.balances ?? []
})

export const selectAccountNativeTokens = createSelector(selectAccountState, (account: AccountState): NativeToken[] => {
  return Object.values(account.nativeTokens)
})

export const selectAccountCw20Tokens = createSelector(selectAccountState, (account: AccountState): Cw20Token[] => {
  return Object.values(account.cw20Tokens)
})

export const selectAccountSelectedWallet = createSelector(
  selectAccountState,
  (account: AccountState): WalletType | undefined => {
    return account.selectedWallet
  },
)

export const selectAccountName = createSelector(selectAccountState, (account: AccountState): string => account?.name)

export const selectAccountRegistered = createSelector(
  selectAccountState,
  (account: AccountState): boolean | undefined => account?.registered,
)

export const selectAccountFunded = createSelector(selectAccountBalances, (balances: Coin[]): boolean =>
  balances.some(
    ({ denom, amount }) => denom === NATIVE_MICRODENOM && new BigNumber(amount).isGreaterThan(new BigNumber(0)),
  ),
)

export const selectAccountPubKey = createSelector(
  selectAccountState,
  (account: AccountState): string => account?.pubKey,
)

export const selectAccountSigningClient = createSelector(
  selectAccountState,
  (account: AccountState): SigningStargateClient => account?.signingClient,
)

export const selectAccountCosmWasmClient = createSelector(
  selectAccountState,
  (account: AccountState): SigningCosmWasmClient => account?.cosmWasmClient,
)

export const selectAccountCWClient = createSelector(
  selectAccountState,
  (account: AccountState): CosmWasmClient => account?.cwClient,
)

export const selectAccountKeyType = createSelector(
  selectAccountState,
  // (account: AccountState): KeyTypes => (account?.selectedWallet === WalletType.Keplr ? 'secp' : 'ed'),
  (): KeyTypes => 'secp',
)

export const selectAccountDid = createSelector(selectAccountState, (account: AccountState): string => account?.did)
