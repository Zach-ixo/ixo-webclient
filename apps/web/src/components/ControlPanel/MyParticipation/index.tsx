import { FlexBox, SvgBox } from 'components/App/App.styles'
import { useTheme } from 'styled-components'
import { Typography } from 'components/Typography'
import { ReactComponent as ProfileIcon } from 'assets/images/icon-profile.svg'
import { ReactComponent as StarIcon } from 'assets/images/icon-star.svg'
import { ReactComponent as UserAstronautIcon } from 'assets/images/icon-user-astronaut-solid.svg'
import { ReactComponent as UserNinjaIcon } from 'assets/images/icon-user-ninja-solid.svg'
import { ReactComponent as UserCheckIcon } from 'assets/images/icon-user-check-solid.svg'
import { Card } from '../Card'
import { useCurrentEntityDAOGroup } from 'hooks/currentEntity'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

const DAOGroupItem: React.FC<{ address: string }> = ({ address }) => {
  const theme: any = useTheme()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { daoGroups = {} } = useAppSelector(getEntityById(entityId))

  const { daoGroup, myVotingPower } = useCurrentEntityDAOGroup(address, daoGroups)

  return (
    <FlexBox key={daoGroup.id} width='100%' $alignItems='center' $justifyContent='space-between'>
      <FlexBox $gap={2}>
        <Typography size='md'>{daoGroup.config.name}</Typography>
        <Typography size='md' color='blue'>
          {Intl.NumberFormat(undefined, { style: 'percent' }).format(myVotingPower)}
        </Typography>
      </FlexBox>

      <FlexBox $gap={2}>
        <SvgBox
          width='40px'
          height='40px'
          background='#F7F8F9'
          $borderRadius='8px'
          $svgWidth={5}
          $svgHeight={5}
          color={theme.ixoNewBlue}
          $justifyContent='center'
          $alignItems='center'
        >
          <StarIcon />
        </SvgBox>
        <SvgBox
          width='40px'
          height='40px'
          background='#F7F8F9'
          $borderRadius='8px'
          $svgWidth={5}
          $svgHeight={5}
          color={theme.ixoNewBlue}
          $justifyContent='center'
          $alignItems='center'
        >
          <ProfileIcon />
        </SvgBox>
      </FlexBox>
    </FlexBox>
  )
}

const MyParticipationCard = () => {
  const theme: any = useTheme()
  const { entityId = "" } = useParams<{entityId: string}>()
  const { profile, daoGroups } = useAppSelector(getEntityById(entityId))
  const daoGroupsArr = Object.values(daoGroups ?? {})

  return (
    <Card
      icon={<UserCheckIcon />}
      title='My Participation'
      columns={1}
      items={
        <>
          <FlexBox width='100%' $alignItems='center' $justifyContent='space-between'>
            <Typography size='md'>{profile?.name}</Typography>

            <FlexBox $gap={2}>
              <SvgBox
                width='40px'
                height='40px'
                background='#F7F8F9'
                $borderRadius='8px'
                $svgWidth={5}
                $svgHeight={5}
                color={theme.ixoNewBlue}
                $justifyContent='center'
                $alignItems='center'
              >
                <ProfileIcon />
              </SvgBox>
              <SvgBox
                width='40px'
                height='40px'
                background='#F7F8F9'
                $borderRadius='8px'
                $svgWidth={5}
                $svgHeight={5}
                color={theme.ixoNewBlue}
                $justifyContent='center'
                $alignItems='center'
              >
                <UserAstronautIcon />
              </SvgBox>
              <SvgBox
                width='40px'
                height='40px'
                background='#F7F8F9'
                $borderRadius='8px'
                $svgWidth={5}
                $svgHeight={5}
                color={theme.ixoNewBlue}
                $justifyContent='center'
                $alignItems='center'
              >
                <UserNinjaIcon />
              </SvgBox>
            </FlexBox>
          </FlexBox>

          <FlexBox width='100%' height='1px' background={'#EAEAEA'} />

          {daoGroupsArr.map((daoGroup) => (
            <DAOGroupItem key={daoGroup.coreAddress} address={daoGroup.coreAddress} />
          ))}
        </>
      }
    />
  )
}

export default MyParticipationCard
