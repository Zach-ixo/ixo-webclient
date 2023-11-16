import React, { useEffect } from 'react'
import { Redirect, Route, RouteComponentProps, useRouteMatch } from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'

const CreateProject: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { updateEntityType, updateTitle, updateSubtitle, updateBreadCrumbs } = useCreateEntityState()
  const isSelectProcessRoute = useRouteMatch('/create/entity/project/process')
  const isProfileRoute = useRouteMatch('/create/entity/project/profile')
  const isSetupPropertiesRoute = useRouteMatch('/create/entity/project/property')
  const isReviewRoute = useRouteMatch('/create/entity/project/review')
  const { steps } = getStrategyByEntityType('project')

  useEffect(() => {
    updateEntityType('project')
    updateTitle('Project creation')
    updateBreadCrumbs([{ text: 'PROJECT' }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSelectProcessRoute?.isExact) {
      updateSubtitle('New or Clone')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelectProcessRoute?.isExact])
  useEffect(() => {
    if (isProfileRoute?.isExact) {
      updateSubtitle('Profile')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProfileRoute?.isExact])
  useEffect(() => {
    if (isSetupPropertiesRoute?.isExact) {
      updateSubtitle('Setup additional information')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupPropertiesRoute?.isExact])
  useEffect(() => {
    if (isReviewRoute?.isExact) {
      updateSubtitle('Data Collection Form')
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

export default CreateProject
