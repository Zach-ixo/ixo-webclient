import { EntitiesHero } from './Components/EntitiesHero/EntitiesHero'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Container, EntitiesBody, EntitiesContainer, NoEntitiesContainer } from './EntitiesExplorer.container.styles'
import {
  changeEntitiesType,
  filterEntitiesQuery,
  filterSector,
  getEntitiesFromGraphqlAction,
  updateEntityPropertyAction,
} from 'redux/entitiesExplorer/entitiesExplorer.actions'
import EntitiesFilter from './Components/EntitiesFilter/EntitiesFilter'
import { EntityType, EntityTypeStrategyMap, TEntityDDOTagModel, TEntityModel } from 'types/entities'
import { Schema as FilterSchema } from './Components/EntitiesFilter/schema/types'
import * as entitiesSelectors from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useEffect } from 'react'
import AssetCollections from './Components/Assets/Collections'
import { useQuery } from 'hooks/window'
import { InfiniteScroll } from 'components/InfiniteScroll'
import { useMediaQuery } from 'react-responsive'
import { deviceWidth } from 'constants/device'
import { EntityOverviewSkeletonCard, createEntityCard, withEntityData } from 'components'
import { Entity, useEntitiesQuery } from 'generated/graphql'
import { selectAccountAddress, selectAccountCWClient } from 'redux/account/account.selectors'
import { Flex, ScrollArea } from '@mantine/core'
import styled from 'styled-components'
import { getGQLEntitiesQueryTypeFilter } from 'services/entities'
import { populateEntitiesForEntityExplorer } from 'services/entities/populateEntitySettings'

const StyledScrollArea = styled(ScrollArea)`
  & > div > div {
    height: 100%;
  }
`

export interface Props {
  match: any
  type: EntityType
  entities: TEntityModel[]
  entitiesCount: number
  entityTypeMap: EntityTypeStrategyMap
  filteredEntitiesCount: number
  filterCategories: TEntityDDOTagModel[]
  filterUserEntities: boolean
  filterFeaturedEntities: boolean
  filterPopularEntities: boolean
  filterItemOffset: number
  isLoadingEntities: boolean
  filterSchema: FilterSchema
  filterSector: string
  filterQuery: string
  filterCategoryTypeName: string
  handleChangeEntitiesQuery: (query: string) => void
  handleChangeEntitiesType: (type: string) => void
  handleChangeSector: (sector: string) => void
}
const mapStateToProps = (state: RootState) => {
  return {
    entities: entitiesSelectors.selectedFilteredEntities(state),
    entityTypeMap: entitiesSelectors.selectEntityConfig(state),
    entitiesCount: entitiesSelectors.selectAllEntitiesCount(state),
    type: entitiesSelectors.selectSelectedEntitiesType(state),
    filteredEntitiesCount: entitiesSelectors.selectFilteredEntitiesCount(state),
    filterCategories: entitiesSelectors.selectFilterCategories(state),
    filterSector: entitiesSelectors.selectFilterSector(state),
    filterUserEntities: entitiesSelectors.selectFilterUserEntities(state),
    filterFeaturedEntities: entitiesSelectors.selectFilterFeaturedEntities(state),
    filterPopularEntities: entitiesSelectors.selectFilterPopularEntities(state),
    filterItemOffset: entitiesSelectors.selectFilterItemOffset(state),
    filterSchema: entitiesSelectors.selectFilterSchema(state),
    filterQuery: entitiesSelectors.selectFilterQuery(state),
    filterCategoryTypeName: entitiesSelectors.selectFilterCategoryTypeName(state),
    accountAddress: selectAccountAddress(state),
    cwClient: selectAccountCWClient(state),
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  handleChangeEntitiesQuery: (query: string): void => dispatch(filterEntitiesQuery(query)),
  handleChangeEntitiesType: (type: EntityType): void => dispatch(changeEntitiesType(type)),
  handleChangeSector: (sector: string): void => dispatch(filterSector(sector)),
  updateEntities: (entities: any): void => dispatch(getEntitiesFromGraphqlAction(entities)),
  updateEntityProperties: (id: string, key: string, data: any, merge: boolean) =>
    dispatch(updateEntityPropertyAction(id, key, data, merge)),
})

type EntitiesExplorerProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const EntitiesExplorer = ({
  accountAddress,
  updateEntityProperties,
  updateEntities,
  handleChangeSector,
  entityTypeMap,
  filterQuery,
  filterSchema,
  filterSector,
  filteredEntitiesCount,
  handleChangeEntitiesQuery,
  handleChangeEntitiesType,
  cwClient,
  type: typeFromProps,
  entities,
}: EntitiesExplorerProps) => {
  const isMobile = useMediaQuery({ maxWidth: deviceWidth.tablet })
  const isTablet = useMediaQuery({ minWidth: deviceWidth.tablet, maxWidth: deviceWidth.desktop })
  const { getQuery } = useQuery()
  const type: string | undefined = getQuery('type')
  const sector: string | undefined = getQuery('sector')

  const tabletColumns = isTablet ? 2 : 3
  const columns = isMobile ? 1 : tabletColumns

  const { data, loading, refetch } = useEntitiesQuery({
    fetchPolicy: 'network-only',
    variables: {
      filter: {
        not: { type: { startsWith: 'asset' } },
        type: {
          ...(type && getGQLEntitiesQueryTypeFilter(type))
        },

      },
    },
    onCompleted: async ({ entities }) => {
      const nodes = entities?.nodes ?? []
      if (nodes.length > 0) {
        const updatedNodes = await populateEntitiesForEntityExplorer(nodes as Entity[])
        updateEntities(updatedNodes)
      }
    },
  })

  const hasMore = Boolean(data?.entities?.pageInfo.hasNextPage)

  const renderEntities = (): JSX.Element => {
    if (type === EntityType.Asset) {
      return (
        <EntitiesContainer className='container-fluid'>
          <div className='container'>
            <EntitiesFilter filterSchema={filterSchema} />
            <EntitiesBody>
              <AssetCollections />
            </EntitiesBody>
          </div>
        </EntitiesContainer>
      )
    }

    return (
      <EntitiesContainer className='container-fluid'>
        <div className='container'>
          <EntitiesFilter filterSchema={filterSchema} />
          <EntitiesBody>
          {filteredEntitiesCount === 0 && data?.entities?.nodes.length !== 0 && (
              <Flex direction={'row'} w='100%' gap={32}>
                <InfiniteScroll dataLength={6} hasMore={false} next={() => refetch()} columns={3}>
                  <EntityOverviewSkeletonCard />
                  <EntityOverviewSkeletonCard />
                  <EntityOverviewSkeletonCard />
                  <EntityOverviewSkeletonCard />
                  <EntityOverviewSkeletonCard />
                  <EntityOverviewSkeletonCard />
                </InfiniteScroll>
              </Flex>
            )}
            {data?.entities?.nodes.length === 0 && !loading && (
              <NoEntitiesContainer>
                <p>There are no results that match your search criteria</p>
              </NoEntitiesContainer>
            )}
            {filteredEntitiesCount > 0 && (
              <Flex direction={'column'} w='100%' gap={32}>
                <InfiniteScroll
                  dataLength={entities.length} //This is important field to render the next data
                  //  TODO refetch next data
                  next={() => refetch()}
                  hasMore={hasMore}
                  columns={columns}
                >
                  {entities
                    .map((entity: TEntityModel) => {
                      const EntityCard = createEntityCard(type as EntityType)
                      const WrappedEntityCard = withEntityData(EntityCard)
                      return <WrappedEntityCard key={entity.id} loading={loading} entity={entity} />
                    })
                    .filter(Boolean)}
                </InfiniteScroll>
              </Flex>
            )}
          </EntitiesBody>
        </div>
      </EntitiesContainer>
    )
  }

  useEffect(() => {
    if (type) {
      handleChangeEntitiesType(type as any)
    }
  }, [type, handleChangeEntitiesType])

  useEffect(() => {
    handleChangeSector(sector ?? '')
  }, [sector, handleChangeSector])

  return (
    <StyledScrollArea w='100%' h={'calc(100vh - 74px)'}>
      <Container>
        <div className='d-flex w-100 h-100'>
          <div className='d-flex flex-column flex-grow-1 w-100 h-100'>
            <EntitiesHero
              type={typeFromProps as EntityType}
              filterSector={filterSector}
              showSearch={true}
              filterQuery={filterQuery}
              handleChangeQuery={handleChangeEntitiesQuery}
            />
            {renderEntities()}
          </div>
        </div>
      </Container>
    </StyledScrollArea>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesExplorer as any)
