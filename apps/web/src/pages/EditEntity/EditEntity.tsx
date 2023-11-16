import EditEntityLayout from 'pages/CreateEntity/CreateEntityLayout/CreateEntityLayout'
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { initialState } from 'redux/createEntity/createEntity.reducer'
import { TCreateEntityState } from 'redux/createEntity/createEntity.types'
import EditDAO from './EditDAO/EditDAO'
import { apiEntityToEntity } from 'utils/entities'
import { useGetEntityById } from 'graphql/entities'

export const EditEntityContext = createContext<
  {
    updatePartial: (key: string, value: any, merge?: boolean) => void
  } & TCreateEntityState
>({
  ...initialState,
  updatePartial: () => '',
})

const EditEntity: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const [value, setValue] = useState<TCreateEntityState>(initialState)

  const { data: selectedEntity } = useGetEntityById(entityId)

  const handleUpdate = useCallback((value: any) => {
    setValue((pre) => ({ ...pre, ...value }))
  }, [])

  const handleUpdatePartial = useCallback((key: string, value: any, merge = false) => {
    setValue((pre) => ({ ...pre, [key]: merge ? { ...(pre[key] ?? {}), ...value } : value }))
  }, [])

  const Component = useMemo(() => {
    if (value.entityType === 'dao') {
      return EditDAO
    }
    return undefined
  }, [value.entityType])

  useEffect(() => {
    if (selectedEntity) {
      handleUpdate({ ...selectedEntity, entityType: selectedEntity.type })
      apiEntityToEntity({ entity: selectedEntity }, handleUpdatePartial)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEntity])

  return (
    <EditEntityContext.Provider value={{ ...value, updatePartial: handleUpdatePartial }}>
      <EditEntityLayout title={value.title} subtitle={value.subtitle} breadCrumbs={value.breadCrumbs}>
        {Component && <Component />}
        {!Component && `Work in progress for editing ${value.entityType}`}
      </EditEntityLayout>
    </EditEntityContext.Provider>
  )
}

export default EditEntity
