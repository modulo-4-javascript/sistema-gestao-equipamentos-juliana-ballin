import type { ThemeConfig } from 'antd'

export const appTheme: ThemeConfig = {
  token: {
    colorPrimary: '#002A64',
    colorInfo: '#007C8C',
    colorSuccess: '#25B8A7',
    colorText: '#111827',
    colorTextSecondary: '#6B7280',
    colorBgLayout: '#F9F9FF',
    colorBgContainer: '#FFFFFF',
    colorBorder: '#DDE6EE',
    borderRadius: 8,
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    Button: {
      controlHeight: 40,
      borderRadius: 8,
    },
    Card: {
      borderRadiusLG: 8,
    },
    Table: {
      headerBg: '#FFFFFF',
      headerColor: '#6B7280',
      rowHoverBg: '#F4F7FA',
    },
  },
}
