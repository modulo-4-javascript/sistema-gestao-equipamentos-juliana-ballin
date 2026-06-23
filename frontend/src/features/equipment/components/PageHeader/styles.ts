import { Button } from 'antd'
import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 800px) {
    align-items: flex-start;
    flex-direction: column;
  }
`

export const Title = styled.h2`
  margin: 0;
  color: #002a64;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
`

export const Description = styled.p`
  margin: 4px 0 0;
  color: #6b7280;
  font-size: 16px;
  line-height: 24px;
`

export const BrandButton = styled(Button)`
  &.ant-btn {
    border: 0;
    color: #ffffff;
    background: linear-gradient(90deg, #002a64, #007c8c);
    box-shadow: 0 4px 8px rgb(0 42 100 / 12%);
  }

  &.ant-btn:hover,
  &.ant-btn:focus {
    color: #ffffff !important;
    background: linear-gradient(90deg, #003f8f, #007c8c) !important;
  }
`
