import { FlexBox } from 'components/App/App.styles'
import React, { useMemo, useState } from 'react'
import { MembersView } from './MembersView'
import { Toolbar } from './Toolbar'
import useCurrentDao from 'hooks/currentDao'
import { Groups } from '../Components'
import { Typography } from 'components/Typography'
import { Member } from 'types/dao'

const Membership: React.FC = (): JSX.Element | null => {
  const { selectedGroups, selectDaoGroup } = useCurrentDao()
  const selectedGroupAddresses: string[] = Object.keys(selectedGroups)
  const numOfSelectedGroups = selectedGroupAddresses.length
  const members: Member[] = useMemo(
    () => Object.values(selectedGroups).reduce((acc: Member[], cur) => acc.concat(cur.votingModule.members), []),
    [selectedGroups],
  )

  const [selectedMembers, setSelectedMembers] = useState<{ [key: string]: boolean }>({})
  const [filter, setFilter] = useState<{
    status: 'approved' | 'pending' | 'rejected' | undefined
    view: 'panel' | 'list'
    keyword: string
  }>({ status: undefined, view: 'panel', keyword: '' })

  const [sort, setSort] = useState<{ [key: string]: 'asc' | 'desc' | undefined }>({
    name: 'asc',
    votingPower: undefined,
    staking: undefined,
    votes: undefined,
    proposals: undefined,
  })

  console.log({ members })

  const filteredMembers = useMemo(() => {
    const [sortBy, order] = Object.entries(sort).find(([, value]) => value) ?? ['name', 'asc']
    return members
      .filter(
        (member) =>
          (!filter.keyword || member.addr === filter.keyword) && (!filter.status || member.status === filter.status),
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
          default:
            if (order === 'desc') return String(b?.name || b.addr).localeCompare(String(a?.name || a.addr))
            return String(a?.name || a.addr).localeCompare(String(b?.name || b.addr))
          case 'votingPower':
            if (order === 'desc') return b.weight - a.weight
            return a.weight - b.weight
          case 'staking':
            if (order === 'desc') return (b?.staking as number) - (a?.staking as number)
            return (a?.staking as number) - (b?.staking as number)
          case 'votes':
            if (order === 'desc') return (b.votes as number) - (a.votes as number)
            return (a.votes as number) - (b.votes as number)
          case 'proposals':
            if (order === 'desc') return (b.proposals as number) - (a.proposals as number)
            return (a.proposals as number) - (b.proposals as number)
        }
      })
  }, [filter, sort, members])

  return (
    <FlexBox direction='column' gap={6} width='100%' color='white'>
      <Groups selectedGroups={selectedGroups} selectDaoGroup={(address: string) => selectDaoGroup(address)} />

      {numOfSelectedGroups >= 1 && (
        <FlexBox direction='column' gap={7.5} width='100%'>
          <FlexBox gap={6} alignItems='center'>
            <Typography variant='secondary' color='white' size='5xl' transform='capitalize'>
              {numOfSelectedGroups === 1 && `${Object.values(selectedGroups)[0]?.type} group`}
              {numOfSelectedGroups > 1 && `${numOfSelectedGroups} selected groups`}
            </Typography>
            <Toolbar
              status={filter.status}
              view={filter.view}
              keyword={filter.keyword}
              numOfMembers={members.length}
              onStatusChange={(status) => setFilter((pre) => ({ ...pre, status }))}
              onViewChange={(view) => setFilter((pre) => ({ ...pre, view }))}
              onKeywordChange={(keyword) => setFilter((pre) => ({ ...pre, keyword }))}
            />
          </FlexBox>
          <MembersView
            view={filter.view}
            members={filteredMembers}
            sort={sort}
            setSort={setSort}
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
          />
        </FlexBox>
      )}
    </FlexBox>
  )
}
export default Membership
