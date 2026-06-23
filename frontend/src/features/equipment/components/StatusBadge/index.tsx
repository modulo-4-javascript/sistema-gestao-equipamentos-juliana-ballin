import type { EquipmentStatus } from '../../types/equipment'
import { StatusTag } from './styles'

interface StatusBadgeProps {
  status: EquipmentStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <StatusTag $status={status}>{status}</StatusTag>
}
