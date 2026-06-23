import { AppLayout } from '../../../../app/layout/AppLayout'
import { Container, Description, Title } from './styles'

export function LocationsPage() {
  return (
    <AppLayout currentPage="Localizações">
      <Container>
        <Title>Localizações</Title>
        <Description>
          Esta página simples existe para demonstrar rotas e reaproveitamento do layout.
        </Description>
      </Container>
    </AppLayout>
  )
}
