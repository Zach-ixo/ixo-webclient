import React, { useEffect } from 'react'
import { Redirect, Route, RouteComponentProps, useRouteMatch } from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'

const CreateDAO: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { updateEntityType, updateTitle, updateSubtitle, updateBreadCrumbs } = useCreateEntityState()
  const isSelectProcessRoute = useRouteMatch('/create/entity/dao/process')
  const isSetupMetadataRoute = useRouteMatch('/create/entity/dao/profile')
  const isSetupGroupsRoute = useRouteMatch('/create/entity/dao/group')
  const isSetupPropertiesRoute = useRouteMatch('/create/entity/dao/property')
  const isReviewRoute = useRouteMatch('/create/entity/dao/review')
  const { steps } = getStrategyByEntityType('dao')

  useEffect(() => {
    updateEntityType('dao')
    updateTitle('DAO creation')
    updateBreadCrumbs([{ text: 'DAO' }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSelectProcessRoute?.isExact) {
      updateSubtitle('New or Clone')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelectProcessRoute?.isExact])
  useEffect(() => {
    if (isSetupMetadataRoute?.isExact) {
      updateSubtitle('Profile')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupMetadataRoute?.isExact])
  useEffect(() => {
    if (isSetupGroupsRoute?.isExact) {
      updateSubtitle('Add Groups')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupGroupsRoute?.isExact])
  useEffect(() => {
    if (isSetupPropertiesRoute?.isExact) {
      updateSubtitle('Configure the DAO Settings')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupPropertiesRoute?.isExact])
  useEffect(() => {
    if (isReviewRoute?.isExact) {
      updateSubtitle('Review and Sign to Commit')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReviewRoute?.isExact])

  return (
    <>
      {Object.values(steps).map((step) => (
        <Route key={step.url} exact path={step.url} component={step.component} />
      ))}
      <Route exact path={`${match.path}`}>
        {steps[1]?.url && <Redirect to={steps[1].url} />}
      </Route>
    </>
  )
}

export default CreateDAO
