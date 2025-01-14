import { useAccount } from 'hooks/account'
import { useEffect } from 'react'
import { Route, useNavigate, Navigate, Routes } from 'react-router-dom'
import MyPortfolioPage from './MyPortfolioPage'
import Dashboard from 'components/Dashboard/Dashboard'
import { Path } from 'components/Dashboard/types'
import { requireCheckDefault } from 'utils/images'
import MyGroupsPage from './MyGroupsPage'

const MyAccountPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { address } = useAccount()
  const title = 'My Portfolio'

  const routes: Path[] = [
    {
      url: `/myaccount/portfolio`,
      icon: requireCheckDefault(require('assets/images/icon-entity-account.svg')),
      sdg: 'My Portfolio',
      tooltip: 'My Portfolio',
    },
    {
      url: `/myaccount/groups`,
      icon: requireCheckDefault(require('assets/img/sidebar/agents.svg')),
      sdg: 'My Groups',
      tooltip: 'My Groups',
    },
  ]

  useEffect(() => {
    if (!address) {
      navigate('/explore?type=dao')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  return (
    <Dashboard theme={'dark'} title={title} subRoutes={routes} baseRoutes={[]} tabs={[]} noTabs noBreadcrumbs>
      <Routes>
        <Route index element={<Navigate to={`portfolio`} />} />
        <Route path='portfolio' Component={MyPortfolioPage} />
        <Route path='groups' Component={MyGroupsPage} />
      </Routes>
    </Dashboard>
  )
}

export default MyAccountPage
