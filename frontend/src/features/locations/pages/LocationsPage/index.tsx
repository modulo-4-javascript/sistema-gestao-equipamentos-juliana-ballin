import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined'
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import MoreHorizOutlined from '@mui/icons-material/MoreHorizOutlined'
import PinDropOutlined from '@mui/icons-material/PinDropOutlined'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'
import { Alert, App as AntDesignApp, Dropdown } from 'antd'
import type { TableProps } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../../../../app/layout/AppLayout'
import { DataTable } from '../../../../shared/components/DataTable'
import {
  ActionButton,
  ResourceCell,
  ResourceCode,
  ResourceIcon,
  ResourceName,
} from '../../../../shared/components/DataTable/styles'
import { PageHeader } from '../../../../shared/components/PageHeader'
import { ResourceFilters } from '../../../../shared/components/ResourceFilters'
import {
  SummaryCards,
  type SummaryCardItem,
} from '../../../../shared/components/SummaryCards'
import { getRequestErrorMessage } from '../../../../shared/http/getRequestErrorMessage'
import {
  LocationFormModal,
  type LocationFormMode,
  type LocationFormValues,
} from '../../components/LocationFormModal'
import { LocationRemoveModal } from '../../components/LocationRemoveModal'
import {
  LocationStatusModal,
  type LocationStatusFormValues,
} from '../../components/LocationStatusModal'
import { useCreateLocation } from '../../hooks/useCreateLocation'
import { useDeleteLocation } from '../../hooks/useDeleteLocation'
import { useLocationList } from '../../hooks/useLocationList'
import { useLocationSummary } from '../../hooks/useLocationSummary'
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
  type LocationStatus,
  type LocationSummaryResponse,
  type LocationType,
} from '../../types/location'
import { Container, LocationStatusTag } from './styles'

const defaultPageSize = 10

const emptySummary: LocationSummaryResponse = {
  total: 0,
  active: 0,
  inactive: 0,
  equipmentCount: 0,
}

function buildLocationSummaryCards(
  summary: LocationSummaryResponse,
): SummaryCardItem[] {
  return [
    {
      id: 'total',
      title: 'Locais',
      value: summary.total,
      icon: 'location',
      lineColor: 'linear-gradient(90deg, #002A64, #007C8C)',
      iconBackground: '#E1E8FD',
    },
    {
      id: 'active',
      title: 'Ativos',
      value: summary.active,
      icon: 'active',
      lineColor: '#25B8A7',
      iconBackground: '#E6FFFB',
    },
    {
      id: 'equipmentCount',
      title: 'Equipamentos',
      value: summary.equipmentCount,
      icon: 'equipment',
      lineColor: '#007C8C',
      iconBackground: '#E6F4FF',
    },
    {
      id: 'inactive',
      title: 'Inativos',
      value: summary.inactive,
      icon: 'inactive',
      lineColor: '#6B7280',
      iconBackground: '#F3F4F6',
    },
  ]
}

function formatRoomLabel(room?: string) {
  if (!room) {
    return undefined
  }

  return room.toLowerCase().startsWith('sala') ? room : `Sala ${room}`
}

function formatLocationAddress(location: LocationDetails) {
  const addressParts = [
    location.building,
    formatRoomLabel(location.room) ?? location.floor,
  ].filter(Boolean)

  return addressParts.length > 0 ? addressParts.join(' - ') : 'Não informado'
}

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

interface LocationTableActions {
  onChangeStatusLocation: (location: LocationDetails) => void
  onEditLocation: (location: LocationDetails) => void
  onRemoveLocation: (location: LocationDetails) => void
  onViewLocation: (location: LocationDetails) => void
}

function getLocationColumns({
  onChangeStatusLocation,
  onEditLocation,
  onRemoveLocation,
  onViewLocation,
}: LocationTableActions): TableProps<LocationDetails>['columns'] {
  return [
    {
      title: 'Local',
      dataIndex: 'name',
      key: 'name',
      render: (_, location) => (
        <ResourceCell>
          <ResourceIcon>
            <PinDropOutlined fontSize="small" />
          </ResourceIcon>
          <span>
            <ResourceName>{location.name}</ResourceName>
            <ResourceCode>{location.code}</ResourceCode>
          </span>
        </ResourceCell>
      ),
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      render: (type: LocationDetails['type']) => getLocationTypeLabel(type),
    },
    {
      title: 'Endereço',
      dataIndex: 'building',
      key: 'address',
      render: (_, location) => formatLocationAddress(location),
    },
    {
      title: 'Situação',
      dataIndex: 'status',
      key: 'status',
      render: (status: LocationDetails['status']) => (
        <LocationStatusTag $status={status}>
          {getLocationStatusLabel(status)}
        </LocationStatusTag>
      ),
    },
    {
      title: 'Equip.',
      dataIndex: 'equipmentCount',
      key: 'equipmentCount',
      width: 88,
    },
    {
      title: 'Atualizado',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (updatedAt: LocationDetails['updatedAt']) =>
        formatLocationDate(updatedAt),
    },
    {
      title: 'Ações',
      key: 'actions',
      align: 'right',
      width: 88,
      render: (_, location) => (
        <Dropdown
          trigger={['click']}
          menu={{
            onClick: ({ key }) => {
              if (key === 'view') {
                onViewLocation(location)
              }

              if (key === 'edit') {
                onEditLocation(location)
              }

              if (key === 'status') {
                onChangeStatusLocation(location)
              }

              if (key === 'remove') {
                onRemoveLocation(location)
              }
            },
            items: [
              {
                key: 'view',
                icon: <VisibilityOutlined fontSize="small" />,
                label: 'Ver detalhes',
              },
              {
                key: 'edit',
                icon: <EditOutlined fontSize="small" />,
                label: 'Editar',
              },
              {
                key: 'status',
                icon: <AutorenewOutlined fontSize="small" />,
                label: 'Mudar situação',
              },
              {
                key: 'remove',
                icon: <DeleteOutlineOutlined fontSize="small" />,
                label: 'Excluir',
                danger: true,
              },
            ],
          }}
        >
          <ActionButton
            aria-label={`Abrir ações de ${location.name}`}
            icon={<MoreHorizOutlined fontSize="small" />}
            type="text"
          />
        </Dropdown>
      ),
    },
  ]
}

export function LocationsPage() {
  const { message: messageApi } = AntDesignApp.useApp()
  const navigate = useNavigate()

  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText, setDebouncedSearchText] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<LocationStatus>()
  const [selectedType, setSelectedType] = useState<LocationType>()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  const [formMode, setFormMode] = useState<LocationFormMode>('create')
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [locationInForm, setLocationInForm] = useState<LocationDetails>()
  const [locationInStatus, setLocationInStatus] = useState<LocationDetails>()
  const [locationToRemove, setLocationToRemove] = useState<LocationDetails>()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchText(searchText)
      setCurrentPage(1)
    }, 400)

    return () => clearTimeout(timeoutId)
  }, [searchText])

  const locationListQuery = useLocationList({
    search: debouncedSearchText,
    status: selectedStatus,
    type: selectedType,
    page: currentPage,
    pageSize,
  })
  const locationSummaryQuery = useLocationSummary()
  const createLocation = useCreateLocation()
  const updateLocation = useUpdateLocation()
  const updateLocationStatus = useUpdateLocationStatus()
  const deleteLocation = useDeleteLocation()

  const locations = locationListQuery.data?.data ?? []
  const paginationInfo = locationListQuery.data?.meta
  const summary = locationSummaryQuery.data ?? emptySummary
  const summaryCards = buildLocationSummaryCards(summary)
  const isLoading = locationListQuery.isLoading || locationSummaryQuery.isLoading
  const loadError = locationListQuery.errorMessage || locationSummaryQuery.errorMessage
  const isSavingForm = createLocation.isLoading || updateLocation.isLoading
  const isSavingStatus = updateLocationStatus.isLoading
  const isRemovingLocation = deleteLocation.isLoading

  function handleClearFilters() {
    setSearchText('')
    setDebouncedSearchText('')
    setSelectedStatus(undefined)
    setSelectedType(undefined)
    setCurrentPage(1)
  }

  function handleSearchChange(value: string) {
    setSearchText(value)
  }

  function handleStatusChange(value?: LocationStatus) {
    setSelectedStatus(value)
    setCurrentPage(1)
  }

  function handleTypeChange(value?: LocationType) {
    setSelectedType(value)
    setCurrentPage(1)
  }

  function handlePageChange(nextPage: number, nextPageSize: number) {
    setCurrentPage(nextPage)
    setPageSize(nextPageSize)
  }

  function handleViewLocation(location: LocationDetails) {
    navigate(`/locations/${location.id}`)
  }

  function handleCreateLocation() {
    setFormMode('create')
    setLocationInForm(undefined)
    setIsFormModalOpen(true)
  }

  function handleEditLocation(location: LocationDetails) {
    setFormMode('edit')
    setLocationInForm(location)
    setIsFormModalOpen(true)
  }

  function handleCloseFormModal() {
    setIsFormModalOpen(false)
    setLocationInForm(undefined)
  }

  async function handleSubmitLocationForm(values: LocationFormValues) {
    const payload = buildLocationPayload(values)

    try {
      if (formMode === 'edit' && locationInForm) {
        await updateLocation.update({
          locationId: locationInForm.id,
          payload,
        })
        messageApi.success('Local atualizado com sucesso.')
      } else {
        await createLocation.create(payload)
        messageApi.success('Local cadastrado com sucesso.')
      }

      await Promise.all([locationListQuery.reload(), locationSummaryQuery.reload()])
      handleCloseFormModal()
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
      await Promise.all([locationListQuery.reload(), locationSummaryQuery.reload()])
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

      if (currentPage > 1 && locations.length === 1) {
        setCurrentPage((page) => Math.max(1, page - 1))
        await locationSummaryQuery.reload()
        return
      }

      await Promise.all([locationListQuery.reload(), locationSummaryQuery.reload()])
    } catch (error) {
      messageApi.error(getRequestErrorMessage(error))
    }
  }

  const locationColumns = getLocationColumns({
    onChangeStatusLocation: setLocationInStatus,
    onEditLocation: handleEditLocation,
    onRemoveLocation: setLocationToRemove,
    onViewLocation: handleViewLocation,
  })

  return (
    <AppLayout currentPage="Localizações">
      <Container>
        <PageHeader
          actionLabel="Novo local"
          description="Cadastre salas, laboratórios e áreas onde os equipamentos ficam."
          title="Locais"
          onAction={handleCreateLocation}
        />

        <SummaryCards ariaLabel="Resumo das localizações" summaries={summaryCards} />

        <ResourceFilters
          getStatusLabel={getLocationStatusLabel}
          getTypeLabel={getLocationTypeLabel}
          searchLabel="Buscar"
          searchPlaceholder="Nome, código, prédio ou sala..."
          searchText={searchText}
          selectedStatus={selectedStatus}
          selectedType={selectedType}
          statusLabel="Situação"
          statusOptions={locationStatusOptions}
          typeOptions={locationTypeOptions}
          typePlaceholder="Todos"
          onClear={handleClearFilters}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onTypeChange={handleTypeChange}
        />

        {loadError && (
          <Alert
            showIcon
            message="Erro ao carregar localizações"
            description={loadError}
            type="error"
          />
        )}

        <DataTable
          columns={locationColumns}
          dataSource={locations}
          emptyText="Nenhuma localização encontrada."
          loading={isLoading}
          pagination={{
            current: currentPage,
            pageSize,
            total: paginationInfo?.total ?? 0,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20],
            showTotal: (total) => `${total} localizações no total`,
            onChange: handlePageChange,
          }}
          rowKey="id"
        />

        <LocationFormModal
          confirmLoading={isSavingForm}
          location={locationInForm}
          mode={formMode}
          open={isFormModalOpen}
          statusOptions={locationStatusOptions}
          typeOptions={locationTypeOptions}
          onCancel={handleCloseFormModal}
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
