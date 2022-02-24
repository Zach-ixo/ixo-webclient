import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'common/utils/currency.utils'
import { Currency } from '../../types/models'
import { CurrencyType } from './types'

export function tokenBalance(balances: Currency[], symbol: string): Currency {
  let balance: Currency = { amount: 0, denom: symbol }
  balances.forEach((element: Currency) => {
    if (element.denom === symbol) {
      balance = Object.assign({}, element)
    }
  })
  return balance
}

export function remainingBalance(
  balances: Currency[],
  sending: Currency,
): Currency {
  const balance = tokenBalance(balances, sending.denom!)

  balance.amount =
    parseInt(balance.amount! as any) - parseInt(sending.amount! as any)
  return balance
}

export function newBalance(
  balances: Currency[],
  receiving: Currency,
): Currency {
  const balance = tokenBalance(balances, receiving.denom!)

  balance.amount =
    parseInt(balance.amount! as any) + parseInt(receiving.amount! as any)
  return balance
}

export function currencyStr(currency: Currency, pretty = true): string {
  const newCurr = Object.assign({}, currency)

  if (!Object.prototype.hasOwnProperty.call(currency, 'amount')) {
    newCurr.amount = 0
  }

  if (pretty) {
    return `${newCurr.amount!.toString()} ${newCurr.denom!.toUpperCase()}`
  } else {
    return `${newCurr.amount!.toString()}${newCurr.denom!}`
  }
}

export function apiCurrencyToCurrency(currency: any): Currency {
  return {
    amount: currency.amount ? parseInt(currency.amount, 10) : 0,
    denom: currency.denom,
  }
}

export const Currencies: CurrencyType[] = [
  {
    denom: 'ixo',
    minimalDenom: 'uixo',
    decimals: 6,
    imageUrl: require('assets/tokens/ixo.png'),
  },
  {
    denom: 'usdc',
    minimalDenom: 'usdc',
    decimals: 1,
    imageUrl: require('assets/tokens/usdc.png'),
  },
  {
    denom: 'xusd',
    minimalDenom: 'xusd',
    decimals: 6,
    imageUrl: require('assets/tokens/usdc.png'),
  },
]

export function minimalDenomToDenom(
  minimalDenom: string,
  amount: number | string,
): number {
  const decimals = Currencies.find(
    (currency) => currency.minimalDenom === minimalDenom,
  )?.decimals
  return new BigNumber(amount)
    .dividedBy(new BigNumber(10).pow(decimals))
    .toNumber()
}

export function denomToMinimalDenom(denom: string, amount: number): string {
  const decimals =
    Currencies.find((currency) => currency.denom === denom)?.decimals ?? 1
  return new BigNumber(amount).times(new BigNumber(10).pow(decimals)).toString()
}

export function formatCurrency(currency: any): Currency {
  if (
    currency === undefined ||
    currency.denom === undefined ||
    currency.amount === undefined
  ) {
    return {
      amount: 0,
      denom: '',
    }
  }

  const isExist = Currencies.find(
    (item) => item.minimalDenom === currency.denom,
  )

  if (isExist) {
    return {
      amount: currency.amount
        ? getBalanceNumber(new BigNumber(currency.amount), isExist.decimals)
        : 0,
      denom: isExist.minimalDenom,
    }
  }
  return {
    amount: currency.amount,
    denom: currency.denom,
  }
}

export function currencyToApiCurrency(currency: any): any {
  return {
    amount: currency.amount.toString(),
    denom: currency.denom,
  }
}

export const checkValidAddress = (address: string): boolean => {
  if (address === undefined) return false
  if (address.length === 0) return false
  if (!address.startsWith('ixo')) return false
  if (address.length === 42) return true
  return false
}
