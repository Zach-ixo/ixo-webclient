import { Card } from 'pages/CurrentEntity/Components'
import { ReactComponent as PiePieceIcon } from 'assets/images/icon-pie-piece.svg'
import { Flex } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { useGetClaimCollectionsByEntityId } from 'graphql/claims'
import { useState } from 'react'
import ClaimCollectionCategory from '../../../components/ClaimCollectionCategory'
import { BarChart, Bar, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Typography } from 'components/Typography'
import moment from 'moment'
import { useTheme } from 'styled-components'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const timestamp = payload[0].payload?.timestamp
    return (
      <Flex direction='column' bg='#012131' px={4} py={3} gap={4} style={{ borderRadius: 4 }}>
        <Typography color='white' size='md' weight='bold'>
          {moment(timestamp).format('ddd, D MMM, YYYY')}
        </Typography>
      </Flex>
    )
  }

  return null
}

const PerformanceTimelineCard: React.FC = () => {
  const theme: any = useTheme()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { data: claimCollections } = useGetClaimCollectionsByEntityId(entityId)
  const [collectionId, setCollectionId] = useState('')

  return (
    <Card label='Project performance timeline' icon={<PiePieceIcon />}>
      <Flex w={'100%'} direction={'column'} gap={16}>
        <Flex w={'100%'} gap={8}>
          {claimCollections.map((claimCollection: any) => (
            <ClaimCollectionCategory
              key={claimCollection.id}
              claimCollection={claimCollection}
              selected={claimCollection.id === collectionId}
              onSelect={() => setCollectionId(claimCollection.id)}
            />
          ))}
        </Flex>

        <ResponsiveContainer width='100%' height={300}>
          <BarChart width={500} height={300} data={[] as any[]}>
            <defs>
              <linearGradient id='color' x1='0.5' y1='0' x2='0.5' y2='1'>
                <stop offset='0%' stopColor='#03d0fb' />
                <stop offset='100%' stopColor='#016480' />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id='background' x1='0.5' y1='0' x2='0.5' y2='1'>
                <stop offset='0%' stopColor='#01293C' />
                <stop offset='66%' stopColor='#033C50' />
              </linearGradient>
            </defs>
            <YAxis
              stroke={theme.ixoNewBlue + 88}
              axisLine={false}
              tickLine={false}
              domain={[0, 200]}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar
              dataKey='votes'
              fill='url(#color)'
              barSize={8}
              radius={[100, 100, 100, 100]}
              background={{ fill: 'url(#background)', radius: 100 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </Flex>
    </Card>
  )
}

export default PerformanceTimelineCard
