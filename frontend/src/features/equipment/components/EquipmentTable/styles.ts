import { Button, Card } from 'antd'
import styled from 'styled-components'

export const TableCard = styled(Card)`
  &.ant-card {
    border-color: #dde6ee;
    box-shadow: 0 1px 2px rgb(17 24 39 / 5%);
  }

  .ant-table-thead > tr > th {
    font-weight: 700;
  }
`

export const EquipmentCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const EquipmentIcon = styled.span`
  display: inline-flex;
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  align-items: center;
  justify-content: center;
  color: #002a64;
  background: #e6f4ff;
  border-radius: 8px;
`

export const EquipmentName = styled.strong`
  display: block;
  color: #111827;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`

export const EquipmentCode = styled.small`
  display: block;
  color: #6b7280;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 12px;
  line-height: 18px;
`

export const ActionButton = styled(Button)`
  &.ant-btn {
    color: #6b7280;
  }
`
