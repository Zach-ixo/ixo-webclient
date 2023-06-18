import React, { useEffect } from 'react'
import { Redirect, Route, RouteComponentProps, useParams, useRouteMatch } from 'react-router-dom'
import { useCreateEntityState } from 'hooks/createEntity'
import { useCurrentDaoGroup } from 'hooks/currentDao'
import useCurrentEntity, { useCurrentEntityProfile } from 'hooks/currentEntity'
import {
  SetupTargetGroup,
  SetupInfo as SetupProposalInfo,
  SetupPageContent,
  SetupActions,
  SetupProperties as SetupProposalProperties,
  ReviewProposal,
} from './Pages'
import { getEntitiesByType } from 'redux/entitiesExplorer/entitiesExplorer.actions'
import { useAppDispatch } from 'redux/hooks'

const CreateProposal: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()
  const { getEntityByDid } = useCurrentEntity()
  const { daoGroup } = useCurrentDaoGroup(coreAddress)
  const { name: entityName } = useCurrentEntityProfile()
  const { updateBreadCrumbs, updateEntityType, updateTitle, updateSubtitle } = useCreateEntityState()
  const isSetupTargetRoute = useRouteMatch('/create/entity/deed/:entityId/:coreAddress/select')
  const isSetupInfoRoute = useRouteMatch('/create/entity/deed/:entityId/:coreAddress/info')
  const isSetupPageRoute = useRouteMatch('/create/entity/deed/:entityId/:coreAddress/page')
  const isSetupPropertiesRoute = useRouteMatch('/create/entity/deed/:entityId/:coreAddress/property')
  const isSetupActionsRoute = useRouteMatch('/create/entity/deed/:entityId/:coreAddress/action')
  const isReviewRoute = useRouteMatch('/create/entity/deed/:entityId/:coreAddress/review')

  useEffect(() => {
    updateEntityType('deed')
    updateBreadCrumbs([
      { text: entityName || entityId, link: `/entity/${entityId}/dashboard` },
      { text: daoGroup?.config.name || 'Governance', link: `/entity/${entityId}/dashboard/governance` },
    ])
    updateTitle('Create a Proposal')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daoGroup?.config.name, entityName])

  useEffect(() => {
    if (isSetupTargetRoute?.isExact) {
      updateSubtitle('Select the Target Group')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupTargetRoute?.isExact])
  useEffect(() => {
    if (isSetupInfoRoute?.isExact) {
      updateSubtitle('Proposal Info')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupInfoRoute?.isExact])
  useEffect(() => {
    if (isSetupPageRoute?.isExact) {
      updateSubtitle('Configure the proposal page')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupPageRoute?.isExact])
  useEffect(() => {
    if (isSetupPropertiesRoute?.isExact) {
      updateSubtitle('Configure the proposal settings')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupPropertiesRoute?.isExact])
  useEffect(() => {
    if (isSetupActionsRoute?.isExact) {
      updateSubtitle('Add actions')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupActionsRoute?.isExact])
  useEffect(() => {
    if (isReviewRoute?.isExact) {
      updateSubtitle('Review and Submit')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReviewRoute?.isExact])

  useEffect(() => {
    getEntityByDid(entityId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityId])

  useEffect(() => {
    dispatch(getEntitiesByType('dao'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Route exact path={'/create/entity/deed/:entityId/:coreAddress/select'} component={SetupTargetGroup} />
      <Route exact path={'/create/entity/deed/:entityId/:coreAddress/info'} component={SetupProposalInfo} />
      <Route exact path={'/create/entity/deed/:entityId/:coreAddress/page'} component={SetupPageContent} />
      <Route exact path={'/create/entity/deed/:entityId/:coreAddress/property'} component={SetupProposalProperties} />
      <Route exact path={'/create/entity/deed/:entityId/:coreAddress/action'} component={SetupActions} />
      <Route exact path={'/create/entity/deed/:entityId/:coreAddress/review'} component={ReviewProposal} />

      <Route exact path={`/create/entity/deed/:entityId/:coreAddress`}>
        <Redirect to={`/create/entity/deed/${entityId}/${coreAddress}/select`} />
      </Route>
    </>
  )
}

export default CreateProposal
