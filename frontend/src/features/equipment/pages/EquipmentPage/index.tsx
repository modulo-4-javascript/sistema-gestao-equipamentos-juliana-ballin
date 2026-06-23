// import { message } from 'antd'
// import { useState } from 'react'
import { AppLayout } from '../../../../app/layout/AppLayout'
// import { EquipmentFilters } from '../../components/EquipmentFilters'
// import { EquipmentTable } from '../../components/EquipmentTable'
// import { PageHeader } from '../../components/PageHeader'
// import { SummaryCards } from '../../components/SummaryCards'
// import {
//   equipmentMock,
//   equipmentSummaryMock,
//   statusOptions,
//   typeOptions,
// } from '../../mocks/equipment.mock'
// import type { EquipmentStatus, EquipmentType } from '../../types/equipment'
import { Container } from './styles'

export function EquipmentPage() {
  // const [contextHolder] = message.useMessage()

  // Estados dos filtros. Cada campo da área de filtros controla um estado aqui.
  // const [searchText, setSearchText] = useState('')
  // const [selectedStatus, setSelectedStatus] = useState<EquipmentStatus>()
  // const [selectedType, setSelectedType] = useState<EquipmentType>()

  // function handleCreateEquipment() {
  //   // Nesta aula, o botão existe para montarmos o visual do cabeçalho.
  //   messageApi.info('Nesta aula vamos focar na construção visual da tela.')
  // }

  // function handleClearFilters() {
  //   // Limpa todos os filtros e volta a tabela para o estado inicial.
  //   setSearchText('')
  //   setSelectedStatus(undefined)
  //   setSelectedType(undefined)
  // }

  // AULA 05 - parte prática:
  // Primeiro deixamos a lista sem filtro para a tela aparecer.
  // const visibleEquipment = equipmentMock

  return (
    <AppLayout currentPage="Equipamentos">
      {/* {contextHolder} */}
      <Container>
        {/* Cabeçalho da feature: título, descrição e botão principal. */}
        {/* <PageHeader onCreateEquipment={handleCreateEquipment} /> */}

        {/* Cards de resumo: usam dados mockados para simular indicadores do sistema. */}
        {/* <SummaryCards summaries={equipmentSummaryMock} /> */}

        {/* Filtros controlados: os valores ficam nesta página e são enviados por props. */}
        {/* <EquipmentFilters
          searchText={searchText}
          selectedStatus={selectedStatus}
          selectedType={selectedType}
          statusOptions={statusOptions}
          typeOptions={typeOptions}
          onSearchChange={setSearchText}
          onStatusChange={setSelectedStatus}
          onTypeChange={setSelectedType}
          onClear={handleClearFilters}
        /> */}

        {/* Tabela principal: recebe a lista que, depois, será filtrada. */}
        {/* <EquipmentTable equipments={visibleEquipment} /> */}
      </Container>
    </AppLayout>
  )
}
