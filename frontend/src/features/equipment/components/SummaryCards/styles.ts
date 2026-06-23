import { Card } from 'antd'
import styled from 'styled-components'

interface SummaryCardProps {
  $lineColor: string
}

interface IconBoxProps {
  $iconBackground: string
}

export const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

export const SummaryCard = styled(Card)<SummaryCardProps>`
  &.ant-card {
    position: relative;
    overflow: hidden;
    min-height: 160px;
    border-color: #dde6ee;
    box-shadow: 0 1px 2px rgb(17 24 39 / 5%);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0 0 auto;
    height: 3px;
    background: ${({ $lineColor }) => $lineColor};
  }
`

export const CardContent = styled.div`
  display: flex;
  min-height: 110px;
  flex-direction: column;
  justify-content: space-between;
`

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

export const Label = styled.span`
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
`

export const IconBox = styled.span<IconBoxProps>`
  display: inline-flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  color: #002a64;
  background: ${({ $iconBackground }) => $iconBackground};
  border-radius: 8px;
`

export const Value = styled.strong`
  color: #111827;
  font-size: 36px;
  font-weight: 700;
  line-height: 54px;
`
