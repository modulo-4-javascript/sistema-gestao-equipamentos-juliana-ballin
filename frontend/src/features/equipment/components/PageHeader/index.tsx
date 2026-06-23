import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined'
import { BrandButton, Container, Description, Title } from './styles'

interface PageHeaderProps {
  onCreateEquipment: () => void
}

export function PageHeader({ onCreateEquipment }: PageHeaderProps) {
  return (
    <Container>
      <div>
        <Title>Equipamentos</Title>
        <Description>Gerencie os equipamentos cadastrados no laboratório.</Description>
      </div>

      <BrandButton
        type="primary"
        icon={<AddCircleOutlineOutlined fontSize="small" />}
        onClick={onCreateEquipment}
      >
        Novo equipamento
      </BrandButton>
    </Container>
  )
}
