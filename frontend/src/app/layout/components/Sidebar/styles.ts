import { Layout, Menu } from 'antd'
import styled from 'styled-components'

export const NavSider = styled(Layout.Sider)`
  background: linear-gradient(180deg, #002a64 0%, #007c8c 100%) !important;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 10%),
    0 2px 4px -2px rgb(0 0 0 / 10%);

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    padding: 24px 0;
  }

  @media (max-width: 800px) {
    width: 100% !important;
    min-width: 100% !important;
    max-width: 100% !important;
  }
`

export const Logo = styled.div`
  padding: 0 24px 32px;

  @media (max-width: 800px) {
    padding: 0 20px 18px;
  }
`

export const Title = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
`

export const Subtitle = styled.p`
  margin: 4px 0 0;
  color: rgb(255 255 255 / 80%);
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
`

export const MenuList = styled(Menu)`
  &.ant-menu {
    flex: 1;
    width: 100%;
    background: transparent;
    border-inline-end: 0;
    color: rgb(255 255 255 / 70%);
    padding: 0;
  }

  .ant-menu-item {
    width: 100%;
    height: 45px;
    margin: 0;
    padding: 0 24px 0 28px !important;
    color: rgb(255 255 255 / 70%);
    background: transparent;
    border-left: 4px solid transparent;
    border-radius: 0;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
  }

  .ant-menu-item:hover {
    color: #ffffff !important;
    background: rgb(255 255 255 / 8%) !important;
  }

  .ant-menu-item .ant-menu-item-icon {
    color: currentcolor;
    font-size: 20px;
    margin-inline-end: 0;
  }

  .ant-menu-title-content {
    margin-inline-start: 0 !important;
  }

  .ant-menu-item-selected {
    color: #ffffff !important;
    background: transparent !important;
    border-left-color: #ffffff;
    font-weight: 500;
  }

  .ant-menu-item-selected::after {
    display: none;
  }

  @media (max-width: 800px) {
    &.ant-menu {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding: 0 16px;
    }

    .ant-menu-item {
      flex: 0 0 auto;
      width: auto;
      border-left: 0;
      border-bottom: 3px solid transparent;
      padding: 0 12px !important;
    }

    .ant-menu-item-selected {
      border-bottom-color: #ffffff;
    }
  }
`
