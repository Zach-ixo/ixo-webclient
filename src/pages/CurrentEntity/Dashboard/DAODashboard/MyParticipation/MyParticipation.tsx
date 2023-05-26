import clxs from 'classnames'
import { FlexBox, GridContainer, GridItem } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useQuery } from 'hooks/window'
import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { AssetDetailCard, Card } from '../../../Components'
import { Groups, UserStakes, UserVotingPower, UserActivity, UserProposals } from '../Components'
import { ReactComponent as ArrowLeftIcon } from 'assets/images/icon-arrow-left.svg'
import { ReactComponent as StakesIcon } from 'assets/images/icon-stakes.svg'
import { ReactComponent as ProposalsIcon } from 'assets/images/icon-proposals.svg'
import { ReactComponent as PieIcon } from 'assets/images/icon-pie.svg'
import useCurrentDao from 'hooks/currentDao'
import { DaoGroup } from 'redux/currentEntity/dao/currentDao.types'

const MyParticipation: React.FC = () => {
  const history = useHistory()
  const { selectedGroups, selectDaoGroup } = useCurrentDao()
  const selectedGroup: DaoGroup | undefined = useMemo(() => {
    return Object.keys(selectedGroups).length === 1 ? Object.values(selectedGroups)[0] : undefined
  }, [selectedGroups])
  const { getQuery } = useQuery()
  const token: string | undefined = getQuery('token')
  const expand: string | undefined = getQuery('expand')
  const tokenDetail: any = history.location.state

  return (
    <FlexBox direction='column' gap={6} width='100%' color='white'>
      <Groups selectedGroups={selectedGroups} selectDaoGroup={(address: string) => selectDaoGroup(address)} />

      {selectedGroup && (
        <>
          <Typography variant='secondary' size='5xl' weight='normal' color='dark-blue'>
            My participation in the{' '}
            <Typography variant='secondary' size='5xl' weight='normal' color='white'>
              {selectedGroup.config.name}
            </Typography>{' '}
            group
          </Typography>

          {/* expand === 'token' */}
          {selectedGroup.type === 'staking' && (
            <Card
              className={clxs({ 'd-none': expand !== 'token' })}
              icon={<StakesIcon />}
              label='My Stakes'
              actionIcon={<ArrowLeftIcon />}
              onAction={() => history.goBack()}
            >
              <UserStakes show={expand === 'token'} coreAddress={selectedGroup.coreAddress} />
            </Card>
          )}
          {/* expand === 'votingPower' */}
          {selectedGroup.type === 'membership' && (
            <Card
              className={clxs({ 'd-none': expand !== 'votingPower' })}
              icon={<PieIcon />}
              label='My Voting Power'
              actionIcon={<ArrowLeftIcon />}
              onAction={() => history.goBack()}
            >
              <UserVotingPower show={expand === 'votingPower'} coreAddress={selectedGroup.coreAddress} />
            </Card>
          )}
          {/* expand === 'proposal' */}
          <Card
            className={clxs({ 'd-none': expand !== 'proposal' })}
            icon={<ProposalsIcon />}
            label='My Proposals'
            actionIcon={<ArrowLeftIcon />}
            onAction={() => history.goBack()}
          >
            <UserProposals show={expand === 'proposal'} coreAddress={selectedGroup.coreAddress} />
          </Card>
          {/* token && tokenDetail */}
          {selectedGroup.type === 'staking' && <AssetDetailCard show={token && tokenDetail} {...tokenDetail} />}
          {/* !expand && !token */}
          <GridContainer
            className={clxs({ 'd-none': expand || token })}
            gridTemplateAreas={`"a a b b" "c c c c"`}
            gridTemplateColumns={'1fr 1fr 1fr 1fr'}
            gridTemplateRows={'repeat(2, minmax(330px, auto))'}
            gridGap={6}
            width='100%'
          >
            <GridItem gridArea='a'>
              {selectedGroup.type === 'staking' && (
                <Card
                  icon={<StakesIcon />}
                  label='My Stakes'
                  onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=token` })}
                >
                  <UserStakes show={!expand && !token} coreAddress={selectedGroup.coreAddress} />
                </Card>
              )}

              {selectedGroup.type === 'membership' && (
                <Card
                  icon={<PieIcon />}
                  label='My Voting Power'
                  onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=votingPower` })}
                >
                  <UserVotingPower show={!expand && !token} coreAddress={selectedGroup.coreAddress} />
                </Card>
              )}
            </GridItem>
            <GridItem gridArea='b'>
              <Card
                icon={<ProposalsIcon />}
                label='My Proposals'
                onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=proposal` })}
              >
                <UserProposals show={!expand && !token} coreAddress={selectedGroup.coreAddress} full={false} />
              </Card>
            </GridItem>
            <GridItem gridArea='c'>
              <UserActivity />
            </GridItem>
          </GridContainer>
        </>
      )}
    </FlexBox>
  )
}

export default MyParticipation