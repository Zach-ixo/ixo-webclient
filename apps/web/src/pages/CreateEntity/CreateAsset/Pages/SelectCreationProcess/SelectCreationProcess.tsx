import { Box } from 'components/App/App.styles'
import cx from 'classnames'
import React, { useMemo, useState } from 'react'
import { ReactComponent as EntityIcon } from 'assets/images/icon-entity.svg'
import { ReactComponent as ImpactTokenIcon } from 'assets/images/icon-impact-token.svg'
import { ReactComponent as InterNFTIcon } from 'assets/images/icon-ixo721.svg'
import { ReactComponent as NFTIcon } from 'assets/images/icon-cw721.svg'
import { ReactComponent as FTIcon } from 'assets/images/icon-cw20.svg'
import { ReactComponent as CloneIcon } from 'assets/images/icon-asset-clone.svg'
import { OptionBox, PageWrapper, PageRow, Selections, SearchIcon } from './SelectCreationProcess.styles'
import { ETokenType } from 'types/tokens'
import { Button, ChainSelector, Input } from 'pages/CreateEntity/Components'
import { useCreateEntityState } from 'hooks/createEntity'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'

const SelectCreationProcess: React.FC = (): JSX.Element => {
  const theme: any = useTheme()
  const { gotoStep } = useCreateEntityState()
  const [isClone, setIsClone] = useState(false)
  const [existingDid, setExistingDid] = useState('')
  const [chainId, setChainId] = useState(undefined)

  const canClone = useMemo(() => existingDid.length > 0, [existingDid])

  const handleCreate = (type: ETokenType): void => {
    // store token type in Redux
    console.log('TODO:', type)
    gotoStep(1)
  }

  const handleClone = (): void => {
    console.log('TODO:', existingDid)
    gotoStep(1)
  }

  const SearchInputStyles = {
    fontFamily: theme.secondaryFontFamily,
    fontWeight: 500,
    fontSize: 20,
    lineHeight: 28,
  }

  return (
    <PageWrapper>
      <PageRow>
        <Typography variant='secondary' size='2xl' color='black'>
          An Asset Class defines a collection of tokens that share the same properties.
        </Typography>
      </PageRow>
      <PageRow>
        <Typography variant='secondary' weight='bold' size='2xl' color='black'>
          Start by cloning an existing Asset Class or choose a Token Type (or Template)
        </Typography>
      </PageRow>

      <PageRow style={{ alignItems: 'stretch', gap: 16 }}>
        <OptionBox className={cx({ active: isClone })} onClick={(): void => setIsClone((pre) => !pre)}>
          <CloneIcon />
        </OptionBox>
        {isClone && (
          <Box className='d-flex flex-column justify-content-between'>
            <Typography variant='secondary' size='2xl'>
              Clone
            </Typography>
            <Box className='d-flex align-items-center' style={{ gap: 16 }}>
              <ChainSelector chainId={chainId!} onChange={setChainId as any} />
              <Input
                inputValue={existingDid}
                handleChange={setExistingDid}
                placeholder='Type to Search or enter a DID'
                preIcon={<SearchIcon />}
                width='400px'
                height='48px'
                style={SearchInputStyles}
              />
              <Button onClick={handleClone} disabled={!canClone}>
                Continue
              </Button>
            </Box>
          </Box>
        )}
      </PageRow>

      <Selections>
        <OptionBox className={cx({ active: isClone })} onClick={(): void => setIsClone((pre) => !pre)}>
          <EntityIcon />
          <Box className='text-center label'>
            <Typography variant='secondary' size='2xl'>
              Token
              <br />
              Template
            </Typography>
          </Box>
        </OptionBox>

        <OptionBox filled onClick={(): void => handleCreate(ETokenType.IXO1155)}>
          <ImpactTokenIcon />
          <Box className='text-center label'>
            <Typography variant='secondary' size='2xl'>
              ImpactToken
            </Typography>
            <br />
            <Typography variant='secondary'>(IXO1155)</Typography>
          </Box>
        </OptionBox>

        <OptionBox filled onClick={(): void => handleCreate(ETokenType.IXO721)}>
          <InterNFTIcon />
          <Box className='text-center label'>
            <Typography variant='secondary' size='2xl'>
              InterNFT
            </Typography>
            <br />
            <Typography variant='secondary'>(IXO721)</Typography>
          </Box>
        </OptionBox>

        <OptionBox filled onClick={(): void => handleCreate(ETokenType.CW721)}>
          <NFTIcon />
          <Box className='text-center label'>
            <Typography variant='secondary' size='2xl' noWrap>
              Non-Fungible Token
            </Typography>
            <br />
            <Typography variant='secondary'>(CW721)</Typography>
          </Box>
        </OptionBox>

        <OptionBox filled onClick={(): void => handleCreate(ETokenType.CW20)}>
          <FTIcon />
          <Box className='text-center label'>
            <Typography variant='secondary' size='2xl' noWrap>
              Fungible Token
            </Typography>
            <br />
            <Typography variant='secondary'>(CW20)</Typography>
          </Box>
        </OptionBox>
      </Selections>
    </PageWrapper>
  )
}

export default SelectCreationProcess
