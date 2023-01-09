import { Box } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { ReactComponent as LockIcon } from 'assets/images/icon-lock.svg'
import { ReactComponent as BinIcon } from 'assets/images/icon-bin.svg'

const Wrapper = styled.div`
  position: relative;

  & .action {
    position: absolute;
    top: 6px;
    right: 6px;
    padding: 5px;
    transform: translate(50%, -50%);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #bcbfc0;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;

    svg > path {
      fill: ${(props): string => props.theme.ixoWhite};
    }

    &:hover {
      background: ${(props): string => props.theme.ixoNewBlue};
    }
  }
`

const Body = styled.div<{ size: number; status: 'full' | 'init' | 'req' }>`
  border-radius: 8px;
  width: ${(props): number => props.size}px;
  height: ${(props): number => props.size}px;

  background-color: ${({ status = 'init', theme }): string => {
    switch (status) {
      case 'full':
        return theme.ixoColor1
      case 'req':
        return theme.ixoMediumGrey
      case 'init':
      default:
        return theme.ixoLightGrey2
    }
  }};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
  transition: all 0.2s;
  cursor: pointer;

  & > svg {
    width: 42px;
    height: 42px;

    path {
      fill: ${(props): string => props.theme.ixoWhite};
    }
  }

  & > span {
    text-overflow: ellipsis;
    max-width: 80%;
    overflow: hidden;
  }

  &:hover {
    background: ${(props): string => props.theme.ixoNewBlue};
  }
`

interface Props {
  icon?: JSX.Element
  required?: boolean
  inherited?: boolean
  set?: boolean
  label?: string
  size?: number
  handleClick: () => void
  handleRemove?: () => void
}

const PropertyBox: React.FC<Props> = ({
  icon = undefined,
  required = false,
  inherited = false,
  set,
  label,
  size = 110,
  handleClick,
  handleRemove,
}): JSX.Element => {
  const status: 'full' | 'init' | 'req' = useMemo(() => {
    if (inherited) {
      return 'full'
    }
    if (set) {
      return 'full'
    }
    if (required) {
      return 'req'
    }
    return 'init'
  }, [inherited, required, set])

  return (
    <Wrapper>
      {!inherited && !required && handleRemove && (
        <Box className='action' onClick={handleRemove}>
          <BinIcon />
        </Box>
      )}
      {inherited && (
        <Box className='action'>
          <LockIcon />
        </Box>
      )}
      <Body size={size} status={status} onClick={handleClick}>
        {icon && icon}
        {label && (
          <Typography size='md' weight='bold' color='white'>
            {label}
          </Typography>
        )}
      </Body>
    </Wrapper>
  )
}

export default PropertyBox
