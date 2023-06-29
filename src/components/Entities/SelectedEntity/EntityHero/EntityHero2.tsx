import * as React from 'react'
import moment from 'moment'
import { getCountryName } from 'utils/formatters'
import { MatchType } from '../../../../types/models'
import HeaderTabs from 'components/HeaderTabs/HeaderTabs2'
import {
  HeroInner,
  Flag,
  HeroContainer,
  HeroInfoItemsWrapper,
  HeroInfoItem,
  Title,
  Description,
} from './EntityHero.styles'
import CalendarSort from 'assets/icons/CalendarSort'
import availableFlags from 'data/availableFlags.json'
import { requireCheckDefault } from 'utils/images'
import { useEntityConfig } from 'hooks/configs'
import { useMemo } from 'react'
import { HeaderTab } from 'components/Dashboard/types'
import { useParams } from 'react-router-dom'
import { useAccount } from 'hooks/account'
import useCurrentDao from 'hooks/currentDao'
import useCurrentEntity from 'hooks/currentEntity'

interface Props {
  onlyTitle: boolean
  assistantPanelToggle?: () => void
  enableAssistantButton?: boolean
  light?: boolean
  assistantFixed?: boolean

  startDate: string
  name?: string
  description?: string
  location?: string
  creatorName: string
  creatorLogo: string
}

const EntityHero: React.FunctionComponent<Props> = ({
  onlyTitle,
  enableAssistantButton = true,
  light = false,
  assistantFixed = false,
  assistantPanelToggle,

  startDate,
  name,
  description,
  location,
  creatorLogo,
  creatorName,
}) => {
  const { entityId } = useParams<{ entityId: string }>()
  const { title, themeColor } = useEntityConfig()
  const { entityType } = useCurrentEntity()
  const { address } = useAccount()
  const { daoGroups } = useCurrentDao()

  const isMemberOfDAO = Object.values(daoGroups ?? {}).some((daoGroup) =>
    daoGroup.votingModule.members.some((member) => member.addr === address),
  )
  const headerTabs = useMemo(() => {
    const buttons: HeaderTab[] = []

    /**
     * @description overview page
     */
    buttons.push({
      iconClass: `icon-${entityType!.toLowerCase()}`,
      path: `/entity/${entityId}/overview`,
      title: title,
      tooltip: `${title} Overview`,
    })

    /**
     * @description dashboard page
     */
    buttons.push({
      iconClass: `icon-dashboard`,
      path: `/entity/${entityId}/dashboard`,
      title: 'DASHBOARD',
      tooltip: `${title} Management`,
    })

    /**
     * @description treasury page
     */
    buttons.push({
      iconClass: `icon-funding`,
      path: `/entity/${entityId}/treasury`,
      title: 'TREASURY',
      tooltip: `${title} Treasury`,
      linkClass: isMemberOfDAO ? '' : 'restricted',
    })

    return buttons
  }, [title, entityId, entityType, isMemberOfDAO])

  const getFlagURL = (projectLocation: string): string => {
    if (location && availableFlags.availableFlags.includes(location)) {
      return `url(${requireCheckDefault(
        require(`../../../../assets/images/country-flags/${projectLocation.toLowerCase()}.svg`),
      )})`
    } else if (location === 'AA') {
      return `url(${requireCheckDefault(require('assets/images/country-flags/global.svg'))})`
    }

    return ''
  }

  return (
    <>
      <HeroContainer onlyTitle={onlyTitle} light={light ? 1 : 0}>
        <HeroInner className='detailed'>
          <div className='row'>
            <div className='col-sm-12'>
              {name && <Title light={light ? 1 : 0}>{name}</Title>}
              {!onlyTitle && (
                <>
                  {description && <Description>{description}</Description>}
                  <HeroInfoItemsWrapper>
                    {startDate && (
                      <HeroInfoItem>
                        <CalendarSort fill='#A5ADB0' />
                        <span>{moment(startDate).format('DD MMM ‘YY')}</span>
                      </HeroInfoItem>
                    )}
                    <HeroInfoItem>
                      {creatorLogo && (
                        <img alt='' src={creatorLogo} width='20px' height='20px' style={{ borderRadius: 100 }} />
                      )}
                      {creatorName && <span>{creatorName}</span>}
                    </HeroInfoItem>
                    {location && (
                      <HeroInfoItem>
                        {getFlagURL(location) !== '' && (
                          <Flag
                            style={{
                              background: getFlagURL(location),
                            }}
                          />
                        )}
                        <span>{getCountryName(location)}</span>
                      </HeroInfoItem>
                    )}
                  </HeroInfoItemsWrapper>
                </>
              )}
            </div>
          </div>
        </HeroInner>
        <HeaderTabs
          matchType={MatchType.strict}
          assistantPanelToggle={assistantPanelToggle}
          enableAssistantButton={enableAssistantButton}
          activeTabColor={themeColor}
          assistantFixed={assistantFixed}
          buttons={headerTabs}
        />
      </HeroContainer>
    </>
  )
}

export default EntityHero
