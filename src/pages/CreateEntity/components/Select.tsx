import React, { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as IconChevDown } from 'assets/images/icon-chev-down.svg'
import { SelectionModal } from 'common/modals'

const Label = styled.label`
  pointer-events: none;
  transition: all 0.2s;

  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 500;
  line-height: 26px;
  font-size: 20px;
  color: ${(props): string => props.theme.ixoMediumGrey};
  white-space: nowrap;
  margin: 0;
`

const StyledValue = styled.div`
  width: 100%;
  height: 100%;
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 500;
  line-height: 26px;
  font-size: 20px;
  color: ${(props): string => props.theme.ixoBlack};
  background: transparent;
`

const SelectWrapper = styled.div<{ width: string; height: string }>`
  border-radius: 8px;
  border: 1px solid ${(props): string => props.theme.ixoNewBlue};
  width: ${(props): string => props.width};
  height: ${(props): string => props.height};
  transition: all 0.2s;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`

interface Props {
  values: string[]
  options: string[]
  selectionType?: 'single' | 'multiple'
  label?: string
  width?: string
  height?: string
  handleChange: (values: string[]) => void
}

const Select: React.FC<Props> = ({
  values = [],
  options,
  selectionType = 'single',
  label = '',
  width = '100%',
  height = 'auto',
  handleChange,
  ...rest
}): JSX.Element => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <SelectWrapper
        width={width}
        height={height}
        onClick={(): void => setOpenModal(true)}
        {...rest}
      >
        {values.length === 0 && <Label>{label}</Label>}
        {values.length === 1 && <StyledValue>{values[0]}</StyledValue>}
        {values.length > 1 && (
          <StyledValue>{values.length} selected</StyledValue>
        )}
        <IconChevDown />
      </SelectWrapper>
      <SelectionModal
        open={openModal}
        options={options}
        selectionType={selectionType}
        onClose={(): void => setOpenModal(false)}
        handleChange={handleChange}
      />
    </>
  )
}

export default Select
