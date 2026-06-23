import { Tag } from 'antd'
import styled from 'styled-components'
import type { EquipmentStatus } from '../../types/equipment'

interface StatusTagProps {
  $status: EquipmentStatus
}

function getTextColor(status: EquipmentStatus) {
  if (status === 'Disponível') {
    return '#007c8c'
  }

  if (status === 'Em manutenção') {
    return '#002a64'
  }

  return '#6b7280'
}

function getBackgroundColor(status: EquipmentStatus) {
  if (status === 'Disponível') {
    return '#e6fffb'
  }

  if (status === 'Em manutenção') {
    return '#e6f4ff'
  }

  return '#f3f4f6'
}

function getBorderColor(status: EquipmentStatus) {
  if (status === 'Disponível') {
    return '#b5f5ec'
  }

  if (status === 'Em manutenção') {
    return '#bae0ff'
  }

  return '#dde6ee'
}

export const StatusTag = styled(Tag)<StatusTagProps>`
  &.ant-tag {
    margin: 0;
    color: ${({ $status }) => getTextColor($status)};
    background: ${({ $status }) => getBackgroundColor($status)};
    border-color: ${({ $status }) => getBorderColor($status)};
    border-radius: 999px;
    font-weight: 600;
  }
`
