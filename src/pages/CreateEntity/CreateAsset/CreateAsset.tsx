import React, { useEffect } from 'react'
import { Redirect, Route, RouteComponentProps, useRouteMatch } from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'

const CreateAsset: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { updateEntityType, updateTitle, updateSubtitle, updateBreadCrumbs } = useCreateEntityState()
  const isSelectProcessRoute = useRouteMatch('/create/entity/asset/process')
  const isSetupMetadataRoute = useRouteMatch('/create/entity/asset/profile')
  const isSetupPropertiesRoute = useRouteMatch('/create/entity/asset/property')
  const isReviewRoute = useRouteMatch('/create/entity/asset/review')
  const isCreateTokenRoute = useRouteMatch('/create/entity/asset/create-token')

  const { steps } = getStrategyByEntityType('asset')

  useEffect(() => {
    updateEntityType('asset')
    updateTitle('Asset Class creation')
    updateBreadCrumbs([{ text: 'ASSET' }])
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
    if (isSetupPropertiesRoute?.isExact) {
      updateSubtitle('Asset Class Properties')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupPropertiesRoute?.isExact])
  useEffect(() => {
    if (isReviewRoute?.isExact) {
      updateSubtitle('Asset Collection')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReviewRoute?.isExact])
  useEffect(() => {
    if (isCreateTokenRoute?.isExact) {
      updateSubtitle('Create Asset')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateTokenRoute?.isExact])

  return (
    <>
      {Object.values(steps).map((step) => (
        <Route key={step.url} exact path={step.url} component={step.component} />
      ))}
      <Route exact path={`${match.path}`}>
        {steps[1] && steps[1].url && <Redirect to={steps[1].url} />}
      </Route>
    </>
  )
}

export default CreateAsset
