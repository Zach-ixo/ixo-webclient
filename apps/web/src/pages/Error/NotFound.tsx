import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { ButtonTypes, Button } from 'components/Form/Buttons'
import { Banner, BannerLeft, BannerRight, ButtonContainer } from './ErrorPages.styles'
import { requireCheckDefault } from 'utils/images'

const NotFound: React.FC = () => {
  const history = useHistory()

  return (
    <Banner className='row'>
      <div className='col-lg-4'>
        <BannerLeft>
          <img src={requireCheckDefault(require('assets/images/404/walrus-image.png'))} alt='Not Found' />
        </BannerLeft>
      </div>
      <div className='col-lg-8 col-md-12'>
        <BannerRight>
          <div className='container'>
            <h2>Oops, something went wrong.</h2>
            <p>The link you followed may either be broken or no longer exists. </p>
            <ButtonContainer>
              <Button type={ButtonTypes.dark} onClick={(): void => history.goBack()}>
                Back to previous page
              </Button>
            </ButtonContainer>
          </div>
        </BannerRight>
      </div>
    </Banner>
  )
}

export default NotFound
