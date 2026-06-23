import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { Button, Input, Select } from 'antd'
import type { EquipmentStatus, EquipmentType } from '../../types/equipment'
import { Field, FieldLabel, FilterCard, FiltersGrid } from './styles'

interface EquipmentFiltersProps {
  searchText: string
  selectedStatus?: EquipmentStatus
  selectedType?: EquipmentType
  statusOptions: EquipmentStatus[]
  typeOptions: EquipmentType[]
  onSearchChange: (value: string) => void
  onStatusChange: (value?: EquipmentStatus) => void
  onTypeChange: (value?: EquipmentType) => void
  onClear: () => void
}

export function EquipmentFilters({
  searchText,
  selectedStatus,
  selectedType,
  statusOptions,
  typeOptions,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onClear,
}: EquipmentFiltersProps) {
  return (
    <FilterCard styles={{ body: { padding: 24 } }}>
      <FiltersGrid>
        <Field>
          <FieldLabel>Busca</FieldLabel>
          <Input
            allowClear
            prefix={<SearchOutlined fontSize="small" />}
            placeholder="Nome, modelo ou ID..."
            value={searchText}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel>Status</FieldLabel>
          <Select
            allowClear
            placeholder="Todos"
            value={selectedStatus}
            onChange={(value?: EquipmentStatus) => onStatusChange(value)}
            options={statusOptions.map((status) => ({
              label: status,
              value: status,
            }))}
            style={{ width: '100%' }}
          />
        </Field>

        <Field>
          <FieldLabel>Tipo</FieldLabel>
          <Select
            allowClear
            placeholder="Selecione um tipo..."
            value={selectedType}
            onChange={(value?: EquipmentType) => onTypeChange(value)}
            options={typeOptions.map((type) => ({
              label: type,
              value: type,
            }))}
            style={{ width: '100%' }}
          />
        </Field>

        <Button onClick={onClear}>Limpar filtros</Button>
      </FiltersGrid>
    </FilterCard>
  )
}
