import React from 'react'
import { Avatar, Card } from 'pages/CurrentEntity/Components'
import Table, { renderTableHeader } from 'components/Table/Table'
import { Typography } from 'components/Typography'
import { Flex } from '@mantine/core'
import BigNumber from 'bignumber.js'
import CurrencyFormat from 'react-currency-format'
import styled from 'styled-components'
import { useAccount } from 'hooks/account'

const TableWrapper = styled.div`
  color: white;
  width: 100%;

  table {
    width: 100%;
    border-spacing: 0 8px;
    border-collapse: separate;

    th,
    td {
      height: inherit;
    }

    tbody > tr {
      border-radius: 8px;
      outline-style: solid;
      outline-width: 1px;
      outline-color: transparent;
      transition: all 0.2s;

      & > td:first-child {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }
      & > td:last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }

      &:hover {
        outline-color: ${(props) => props.theme.ixoNewBlue};
      }
    }
  }
`

const columns = [
  {
    Header: renderTableHeader('Token'),
    accessor: 'symbol',
    renderCell: (cell: any) => {
      const coinDenom = cell.value
      const network = cell.row.original?.network || 'IXO'
      const coinImageUrl = cell.row.original?.imageUrl

      return (
        <Flex align='center' gap={8} p={16}>
          <Avatar size={38} url={coinImageUrl} />
          <Flex direction='column'>
            <Typography size='lg' transform='uppercase'>
              {coinDenom}
            </Typography>
            <Typography size='md'>{network}</Typography>
          </Flex>
        </Flex>
      )
    },
  },
  {
    Header: renderTableHeader('Amount', 'flex-end'),
    accessor: 'balance',
    renderCell: (cell: any) => {
      const balance = cell.value
      const lastPriceUsd = cell.row.original?.lastPriceUsd ?? 0
      const balanceUsd = new BigNumber(balance).multipliedBy(new BigNumber(lastPriceUsd)).toFormat(2)

      return (
        <Flex direction='column' align='end' p={16}>
          <Typography size='lg'>
            <CurrencyFormat
              displayType={'text'}
              value={new BigNumber(balance).toString()}
              thousandSeparator
              decimalScale={2}
            />
          </Typography>
          <Typography size='md' color='dark-blue'>
            <CurrencyFormat prefix='$' displayType={'text'} value={balanceUsd} thousandSeparator decimalScale={2} />
          </Typography>
        </Flex>
      )
    },
  },
]

const NativeTokensCard: React.FC = () => {
  const { nativeTokens, cw20Tokens } = useAccount()
  const tokens = [...nativeTokens, ...cw20Tokens.filter((v) => Number(v.balance) > 0)]

  const handleRowClick = (state: any) => () => {
    console.log('handleRowClick', { state })
  }

  return (
    <Card label='Coins'>
      <TableWrapper>
        <Table
          columns={columns}
          data={tokens}
          getRowProps={(state) => ({
            style: { height: 70, cursor: 'pointer' },
            onClick: handleRowClick(state),
          })}
          getCellProps={() => ({ style: { background: '#023044' } })}
        />
        {tokens.length === 0 && (
          <Flex w='100%' h='80px' align='center' justify='center' bg='#053549' style={{ borderRadius: 8 }}>
            <Typography variant='primary' size='lg' color='dark-blue'>
              This account holds no Coins
            </Typography>
          </Flex>
        )}
      </TableWrapper>
    </Card>
  )
}

export default NativeTokensCard