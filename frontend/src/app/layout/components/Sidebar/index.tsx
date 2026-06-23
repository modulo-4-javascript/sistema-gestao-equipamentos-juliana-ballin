import PinDropOutlined from '@mui/icons-material/PinDropOutlined'
import PrecisionManufacturingOutlined from '@mui/icons-material/PrecisionManufacturingOutlined'
import { useLocation, useNavigate } from 'react-router-dom'
import { Logo, MenuList, NavSider, Subtitle, Title } from './styles'

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const selectedKey = location.pathname.startsWith('/locations') ? '/locations' : '/equipment'

  return (
    <NavSider width={280}>
      <Logo>
        <Title>DenkenHub</Title>
        <Subtitle>Gestão de recursos</Subtitle>
      </Logo>

      <MenuList
        mode="inline"
        // Destaca o item ativo de acordo com a URL atual.
        selectedKeys={[selectedKey]}
        onClick={({ key }) => navigate(key)}
        items={[
          {
            key: '/equipment',
            icon: <PrecisionManufacturingOutlined fontSize="small" />,
            label: 'Equipamentos',
          },
          {
            key: '/locations',
            icon: <PinDropOutlined fontSize="small" />,
            label: 'Localizações',
          },
        ]}
      />
    </NavSider>
  )
}
