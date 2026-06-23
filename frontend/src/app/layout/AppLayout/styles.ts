import { Layout } from 'antd'
import styled from 'styled-components'

export const PageLayout = styled(Layout)`
  min-height: 100vh;
  background: #f9f9ff;

  @media (max-width: 800px) {
    display: block;
  }
`

export const ContentLayout = styled(Layout)`
  min-width: 0;
  background: #f9f9ff;
`

export const MainContent = styled(Layout.Content)`
  display: flex;
  justify-content: center;
  padding: 32px;
  background: #f9f9ff;

  @media (max-width: 800px) {
    padding: 24px 16px;
  }
`
