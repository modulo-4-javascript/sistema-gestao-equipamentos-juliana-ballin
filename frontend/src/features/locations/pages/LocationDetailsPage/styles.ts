import { Button, Card } from 'antd'
import styled from 'styled-components'

export const Container = styled.section`
  width: 100%;
  max-width: 1440px;
`

export const DetailHeader = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding: 24px;
  background: #ffffff;
  border: 1px solid #dde6ee;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgb(17 24 39 / 5%);

  @media (max-width: 860px) {
    flex-direction: column;
  }
`

export const HeaderContent = styled.div`
  display: grid;
  justify-items: start;
  gap: 8px;
`

export const BackButton = styled(Button)`
  &.ant-btn {
    padding-inline: 0;
    color: #002a64;
    font-weight: 700;
  }
`

export const HeaderKicker = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #007c8c;
  font-size: 13px;
  font-weight: 700;
  line-height: 18px;
`

export const HeaderTitle = styled.h1`
  margin: 0;
  color: #111827;
  font-size: clamp(24px, 3vw, 36px);
  line-height: 1.15;
`

export const HeaderCode = styled.span`
  color: #6b7280;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 13px;
  line-height: 18px;
`

export const ActionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;

  @media (max-width: 860px) {
    justify-content: flex-start;
  }
`

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(320px, 0.85fr);
  align-items: start;
  gap: 24px;

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }
`

export const MainColumn = styled.div`
  display: grid;
  gap: 24px;
`

export const SideColumn = styled.aside`
  display: grid;
  gap: 24px;
`

export const SectionCard = styled(Card)`
  &.ant-card {
    border-color: #dde6ee;
    box-shadow: 0 1px 2px rgb(17 24 39 / 5%);
  }

  .ant-card-body {
    display: grid;
    gap: 16px;
  }
`

export const SectionTitle = styled.h2`
  margin: 0;
  color: #111827;
  font-size: 18px;
  line-height: 24px;
`

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px 20px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`

export const FieldItem = styled.div`
  display: grid;
  gap: 4px;
`

export const FieldLabel = styled.span`
  color: #6b7280;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  text-transform: uppercase;
`

export const FieldValue = styled.span`
  color: #111827;
  font-size: 14px;
  line-height: 22px;
`

export const HistoryDescription = styled.p`
  margin: 0;
  color: #374151;
  font-size: 14px;
  line-height: 22px;
`

export const HistoryMeta = styled.span`
  display: inline-block;
  margin-top: 4px;
  color: #6b7280;
  font-size: 12px;
  line-height: 18px;
`

export const LoadingBox = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 24px;
  color: #6b7280;
  background: #ffffff;
  border: 1px dashed #b7c6d8;
  border-radius: 8px;
  font-size: 14px;
  line-height: 22px;
`
