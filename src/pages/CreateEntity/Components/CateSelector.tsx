import { Box } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { SVGProps } from 'react'
import styled from 'styled-components'
import cx from 'classnames'

const Wrapper = styled.div`
  background: ${(props): string => props.theme.ixoLightGrey2};
  border: 4px solid ${(props): string => props.theme.ixoLightGrey2};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 12px;
  width: 90px;
  height: 90px;
  transition: all 0.2s;
  cursor: pointer;
  position: relative;
  margin-bottom: 56px;

  & > svg {
    width: 50px;
    path {
      transition: all 0.2s;
      fill: ${(props): string => props.theme.ixoWhite};
    }
  }

  &:hover,
  &.active {
    border-color: ${(props): string => props.theme.ixoNewBlue};
    background: ${(props): string => props.theme.ixoNewBlue};
  }

  & > .label {
    position: absolute;
    top: 120%;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
  }
`

interface Props {
  icon: SVGProps<SVGElement>
  label: string
  active?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const CateSelector: React.FC<Props> = ({ icon, label, active, onClick, onMouseEnter, onMouseLeave }): JSX.Element => {
  return (
    <Wrapper onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={cx({ active })}>
      {icon}
      <Box className='text-center label'>
        <Typography variant='secondary'>{label}</Typography>
      </Box>
    </Wrapper>
  )
}

export default CateSelector