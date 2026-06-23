import { Card } from 'antd'
import styled from 'styled-components'

export const FilterCard = styled(Card)`
  &.ant-card {
    margin-bottom: 32px;
    border-color: #dde6ee;
    box-shadow: 0 1px 2px rgb(17 24 39 / 5%);
  }
`

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, 1.35fr) minmax(180px, 1fr) minmax(180px, 1fr) auto;
  gap: 16px;
  align-items: end;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

export const Field = styled.label`
  display: block;
`

export const FieldLabel = styled.span`
  display: block;
  margin-bottom: 6px;
  color: #111827;
  font-size: 12px;
  font-weight: 700;
`
