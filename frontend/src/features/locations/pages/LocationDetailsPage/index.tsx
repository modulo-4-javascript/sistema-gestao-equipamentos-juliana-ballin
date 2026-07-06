import ArrowBackOutlined from '@mui/icons-material/ArrowBackOutlined'
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined'
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import PinDropOutlined from '@mui/icons-material/PinDropOutlined'
import PrecisionManufacturingOutlined from '@mui/icons-material/PrecisionManufacturingOutlined'
import { Alert, App as AntDesignApp, Button, Empty, List, Spin } from 'antd'
import type { TableProps } from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppLayout } from '../../../../app/layout/AppLayout'
import { DataTable } from '../../../../shared/components/DataTable'
import {
  ResourceCell,
  ResourceCode,
  ResourceIcon,
  ResourceName,
} from '../../../../shared/components/DataTable/styles'
import {
  SummaryCards,
  type SummaryCardItem,
} from '../../../../shared/components/SummaryCards'
import { getRequestErrorMessage } from '../../../../shared/http/getRequestErrorMessage'
import { StatusBadge } from '../../../equipment/components/StatusBadge'
import {
  formatEquipmentDate,
  getEquipmentTypeLabel,
  type EquipmentStatus,
} from '../../../equipment/types/equipment'
import {
  LocationFormModal,
  type LocationFormValues,
} from '../../components/LocationFormModal'
import { LocationRemoveModal } from '../../components/LocationRemoveModal'
import {
  LocationStatusModal,
  type LocationStatusFormValues,
} from '../../components/LocationStatusModal'
import { useDeleteLocation } from '../../hooks/useDeleteLocation'
import { useLocationDetails } from '../../hooks/useLocationDetails'
import { useLocationEquipment } from '../../hooks/useLocationEquipment'
import { useLocationHistory } from '../../hooks/useLocationHistory'
import { useUpdateLocation } from '../../hooks/useUpdateLocation'
import { useUpdateLocationStatus } from '../../hooks/useUpdateLocationStatus'
import {
  formatLocationDate,
  getLocationStatusLabel,
  getLocationTypeLabel,
  locationStatusOptions,
  locationTypeOptions,
  type CreateLocationPayload,
  type LocationDetails,
  type LocationEquipment,
} from '../../types/location'
import { LocationStatusTag } from '../LocationsPage/styles'
import {
  ActionGroup,
  BackButton,
  ContentGrid,
  DetailHeader,
  FieldGrid,
  FieldItem,
  FieldLabel,
  FieldValue,
  HeaderCode,
  HeaderContent,
  HeaderKicker,
  HeaderTitle,
  HistoryDescription,
  HistoryMeta,
  LoadingBox,
  MainColumn,
  SectionCard,
  SectionTitle,
  SideColumn,
  Container,
} from './styles'

const defaultEquipmentPageSize = 5

function buildLocationPayload(
  values: LocationFormValues,
): CreateLocationPayload {
  return {
    code: values.code.trim(),
    name: values.name.trim(),
    type: values.type ?? 'OTHER',
    building: values.building?.trim() || undefined,
    floor: values.floor?.trim() || undefined,
    room: values.room?.trim() || undefined,
    description: values.description?.trim() || null,
    status: values.status ?? 'ACTIVE',
  }
}

function formatRoomLabel(room?: string) {
  if (!room) {
    return 'Não informado'
  }

  return room.toLowerCase().startsWith('sala') ? room : `Sala ${room}`
}

function buildLocationSummaryCards(location: LocationDetails): SummaryCardItem[] {
  return [
    {
      id: 'total',
      title: 'Equipamentos',
      value: location.equipmentSummary.total,
      icon: 'equipment',
      lineColor: 'linear-gradient(90deg, #002A64, #007C8C)',
      iconBackground: '#E1E8FD',
    },
    {
      id: 'available',
      title: 'Disponíveis',
      value: location.equipmentSummary.available,
      icon: 'available',
      lineColor: '#25B8A7',
      iconBackground: '#E6FFFB',
    },
    {
      id: 'maintenance',
      title: 'Em manutenção',
      value: location.equipmentSummary.inMaintenance,
      icon: 'maintenance',
      lineColor: '#007C8C',
      iconBackground: '#E6F4FF',
    },
    {
      id: 'inactive',
      title: 'Inativos',
      value: location.equipmentSummary.inactive,
      icon: 'inactive',
      lineColor: '#6B7280',
      iconBackground: '#F3F4F6',
    },
  ]
}

function getLinkedEquipmentColumns(): TableProps<LocationEquipment>['columns'] {
  return [
    {
      title: 'Equipamento',
      dataIndex: 'name',
      key: 'name',
      render: (_, equipment) => (
        <ResourceCell>
          <ResourceIcon>
            <PrecisionManufacturingOutlined fontSize="small" />
          </ResourceIcon>
          <span>
            <ResourceName>{equipment.name}</ResourceName>
            <ResourceCode>{equipment.code}</ResourceCode>
          </span>
        </ResourceCell>
      ),
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      render: (type: LocationEquipment['type']) => getEquipmentTypeLabel(type),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: EquipmentStatus) => <StatusBadge status={status} />,
    },
    {
      title: 'Atualizado',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (updatedAt: LocationEquipment['updatedAt']) =>
        formatEquipmentDate(updatedAt),
    },
  ]
}

export function LocationDetailsPage() {
  const { message: messageApi } = AntDesignApp.useApp()
  const navigate = useNavigate()
  const { locationId } = useParams()

  const [equipmentPage, setEquipmentPage] = useState(1)
  const [equipmentPageSize, setEquipmentPageSize] = useState(
    defaultEquipmentPageSize,
  )
  const [locationInForm, setLocationInForm] = useState<LocationDetails>()
  const [locationInStatus, setLocationInStatus] = useState<LocationDetails>()
  const [locationToRemove, setLocationToRemove] = useState<LocationDetails>()

  const locationQuery = useLocationDetails(locationId)
  const equipmentQuery = useLocationEquipment(locationId, {
    page: equipmentPage,
    pageSize: equipmentPageSize,
  })
  const historyQuery = useLocationHistory(locationId, {
    page: 1,
    pageSize: 8,
  })
  const updateLocation = useUpdateLocation()
  const updateLocationStatus = useUpdateLocationStatus()
  const deleteLocation = useDeleteLocation()

  const location = locationQuery.data
  const linkedEquipment = equipmentQuery.data?.data ?? []
  const equipmentPagination = equipmentQuery.data?.meta
  const historyItems = historyQuery.data?.data ?? []
  const summaries = useMemo(
    () => (location ? buildLocationSummaryCards(location) : []),
    [location],
  )
  const linkedEquipmentColumns = useMemo(() => getLinkedEquipmentColumns(), [])

  const isLoading = locationQuery.isLoading
  const loadError =
    (!locationId ? 'ID da localização não encontrado na rota.' : '') ||
    locationQuery.errorMessage
  const isSavingForm = updateLocation.isLoading
  const isSavingStatus = updateLocationStatus.isLoading
  const isRemovingLocation = deleteLocation.isLoading

  async function handleSubmitLocationForm(values: LocationFormValues) {
    if (!locationInForm) {
      return
    }

    try {
      await updateLocation.update({
        locationId: locationInForm.id,
        payload: buildLocationPayload(values),
      })
      await Promise.all([
        locationQuery.reload(),
        equipmentQuery.reload(),
        historyQuery.reload(),
      ])
      messageApi.success('Local atualizado com sucesso.')
      setLocationInForm(undefined)
    } catch (error) {
      messageApi.error(getRequestErrorMessage(error))
    }
  }

  async function handleSubmitStatusModal(values: LocationStatusFormValues) {
    if (!locationInStatus) {
      return
    }

    try {
      await updateLocationStatus.updateStatus({
        locationId: locationInStatus.id,
        payload: {
          status: values.status,
          note: values.note?.trim() || null,
        },
      })
      await Promise.all([locationQuery.reload(), historyQuery.reload()])
      messageApi.success('Situação atualizada com sucesso.')
      setLocationInStatus(undefined)
    } catch (error) {
      messageApi.error(getRequestErrorMessage(error))
    }
  }

  async function handleConfirmRemoveLocation() {
    if (!locationToRemove) {
      return
    }

    try {
      await deleteLocation.remove(locationToRemove.id)
      messageApi.success('Local excluído com sucesso.')
      setLocationToRemove(undefined)
      navigate('/locations')
    } catch (error) {
      messageApi.error(getRequestErrorMessage(error))
    }
  }

  function handleEquipmentPageChange(nextPage: number, nextPageSize: number) {
    setEquipmentPage(nextPage)
    setEquipmentPageSize(nextPageSize)
  }

  if (isLoading) {
    return (
      <AppLayout currentPage="Localizações">
        <Container>
          <LoadingBox>
            <Spin /> Carregando localização...
          </LoadingBox>
        </Container>
      </AppLayout>
    )
  }

  if (loadError || !location) {
    return (
      <AppLayout currentPage="Localizações">
        <Container>
          <Alert
            showIcon
            message="Localização não encontrada"
            description={loadError || 'Não foi possível exibir esta localização.'}
            type="error"
          />
        </Container>
      </AppLayout>
    )
  }

  return (
    <AppLayout currentPage="Localizações">
      <Container>
        <DetailHeader>
          <HeaderContent>
            <BackButton
              icon={<ArrowBackOutlined fontSize="small" />}
              onClick={() => navigate('/locations')}
            >
              Voltar
            </BackButton>

            <HeaderKicker>
              <PinDropOutlined fontSize="small" />
              {getLocationTypeLabel(location.type)}
            </HeaderKicker>

            <HeaderTitle>{location.name}</HeaderTitle>
            <HeaderCode>{location.code}</HeaderCode>

            <LocationStatusTag $status={location.status}>
              {getLocationStatusLabel(location.status)}
            </LocationStatusTag>
          </HeaderContent>

          <ActionGroup>
            <Button
              icon={<EditOutlined fontSize="small" />}
              onClick={() => setLocationInForm(location)}
            >
              Editar
            </Button>
            <Button
              icon={<AutorenewOutlined fontSize="small" />}
              onClick={() => setLocationInStatus(location)}
            >
              Situação
            </Button>
            <Button
              danger
              icon={<DeleteOutlineOutlined fontSize="small" />}
              onClick={() => setLocationToRemove(location)}
            >
              Excluir
            </Button>
          </ActionGroup>
        </DetailHeader>

        <SummaryCards ariaLabel="Resumo de equipamentos no local" summaries={summaries} />

        <ContentGrid>
          <MainColumn>
            <SectionCard>
              <SectionTitle>Informações gerais</SectionTitle>

              <FieldGrid>
                <FieldItem>
                  <FieldLabel>Tipo</FieldLabel>
                  <FieldValue>{getLocationTypeLabel(location.type)}</FieldValue>
                </FieldItem>
                <FieldItem>
                  <FieldLabel>Situação</FieldLabel>
                  <FieldValue>{getLocationStatusLabel(location.status)}</FieldValue>
                </FieldItem>
                <FieldItem>
                  <FieldLabel>Prédio</FieldLabel>
                  <FieldValue>{location.building ?? 'Não informado'}</FieldValue>
                </FieldItem>
                <FieldItem>
                  <FieldLabel>Andar</FieldLabel>
                  <FieldValue>{location.floor ?? 'Não informado'}</FieldValue>
                </FieldItem>
                <FieldItem>
                  <FieldLabel>Sala</FieldLabel>
                  <FieldValue>{formatRoomLabel(location.room)}</FieldValue>
                </FieldItem>
                <FieldItem>
                  <FieldLabel>Equipamentos vinculados</FieldLabel>
                  <FieldValue>{location.equipmentCount}</FieldValue>
                </FieldItem>
                <FieldItem>
                  <FieldLabel>Criado em</FieldLabel>
                  <FieldValue>{formatLocationDate(location.createdAt)}</FieldValue>
                </FieldItem>
                <FieldItem>
                  <FieldLabel>Atualizado em</FieldLabel>
                  <FieldValue>{formatLocationDate(location.updatedAt)}</FieldValue>
                </FieldItem>
              </FieldGrid>
            </SectionCard>

            <SectionCard>
              <SectionTitle>Descrição</SectionTitle>
              <FieldValue>{location.description || 'Sem descrição registrada.'}</FieldValue>
            </SectionCard>

            <SectionCard>
              <SectionTitle>Equipamentos vinculados</SectionTitle>

              {equipmentQuery.errorMessage && (
                <Alert
                  showIcon
                  message="Erro ao carregar equipamentos"
                  description={equipmentQuery.errorMessage}
                  type="error"
                />
              )}

              <DataTable
                columns={linkedEquipmentColumns}
                dataSource={linkedEquipment}
                emptyText="Nenhum equipamento vinculado a esta localização."
                loading={equipmentQuery.isLoading}
                pagination={{
                  current: equipmentPage,
                  pageSize: equipmentPageSize,
                  total: equipmentPagination?.total ?? 0,
                  showSizeChanger: true,
                  pageSizeOptions: [5, 10, 20],
                  showTotal: (total) => `${total} equipamentos vinculados`,
                  onChange: handleEquipmentPageChange,
                }}
                rowKey="id"
              />
            </SectionCard>
          </MainColumn>

          <SideColumn>
            <SectionCard>
              <SectionTitle>Histórico de movimentações</SectionTitle>

              {historyQuery.errorMessage && (
                <Alert
                  showIcon
                  message="Erro ao carregar histórico"
                  description={historyQuery.errorMessage}
                  type="error"
                />
              )}

              <List
                dataSource={historyItems}
                loading={historyQuery.isLoading}
                locale={{
                  emptyText: <Empty description="Nenhuma movimentação registrada." />,
                }}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={
                        <>
                          <HistoryDescription>{item.description}</HistoryDescription>
                          <HistoryMeta>{formatEquipmentDate(item.createdAt)}</HistoryMeta>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </SectionCard>
          </SideColumn>
        </ContentGrid>

        <LocationFormModal
          confirmLoading={isSavingForm}
          location={locationInForm}
          mode="edit"
          open={Boolean(locationInForm)}
          statusOptions={locationStatusOptions}
          typeOptions={locationTypeOptions}
          onCancel={() => setLocationInForm(undefined)}
          onSubmit={handleSubmitLocationForm}
        />

        <LocationStatusModal
          confirmLoading={isSavingStatus}
          location={locationInStatus}
          open={Boolean(locationInStatus)}
          statusOptions={locationStatusOptions}
          onCancel={() => setLocationInStatus(undefined)}
          onSubmit={handleSubmitStatusModal}
        />

        <LocationRemoveModal
          confirmLoading={isRemovingLocation}
          location={locationToRemove}
          open={Boolean(locationToRemove)}
          onCancel={() => setLocationToRemove(undefined)}
          onConfirm={handleConfirmRemoveLocation}
        />
      </Container>
    </AppLayout>
  )
}
