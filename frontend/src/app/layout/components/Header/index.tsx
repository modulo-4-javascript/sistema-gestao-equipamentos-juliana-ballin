import { HeaderContainer, PageBreadcrumb } from './styles'

interface HeaderProps {
  currentPage: string
}

export function Header({ currentPage }: HeaderProps) {
  return (
    <HeaderContainer>
      <PageBreadcrumb
        items={[
          {
            title: currentPage,
          },
        ]}
      />
    </HeaderContainer>
  )
}
