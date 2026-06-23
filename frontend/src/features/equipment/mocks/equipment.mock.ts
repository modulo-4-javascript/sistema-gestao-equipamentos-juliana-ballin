import type {
  Equipment,
  EquipmentStatus,
  EquipmentSummary,
  EquipmentType,
} from '../types/equipment'

export const equipmentMock: Equipment[] = [
  {
    id: 'EQP-001',
    name: 'Notebook Dell',
    type: 'Informática',
    model: 'Latitude 5420',
    status: 'Disponível',
    location: 'Lab 01',
    lastUpdate: '24 Out 2023',
    serialNumber: 'DL-5420-2026',
  },
  {
    id: 'EQP-042',
    name: 'Monitor LG',
    type: 'Informática',
    model: 'UltraWide 29"',
    status: 'Disponível',
    location: 'Lab 02',
    lastUpdate: '22 Out 2023',
    serialNumber: 'LG-29-042',
  },
  {
    id: 'EQP-087',
    name: 'Projetor Epson',
    type: 'Imagem',
    model: 'PowerLite E20',
    status: 'Em manutenção',
    location: 'Auditório',
    lastUpdate: '20 Out 2023',
    serialNumber: 'EP-E20-087',
  },
  {
    id: 'EQP-113',
    name: 'Microscópio Leica',
    type: 'Laboratório',
    model: 'DM500',
    status: 'Disponível',
    location: 'Lab Bio',
    lastUpdate: '18 Out 2023',
    serialNumber: 'LC-DM500-113',
  },
  {
    id: 'EQP-119',
    name: 'Roteador TP-Link',
    type: 'Rede',
    model: 'Archer AX55',
    status: 'Inativo',
    location: 'Sala Técnica',
    lastUpdate: '16 Out 2023',
    serialNumber: 'TPL-AX55-119',
  },
  {
    id: 'EQP-128',
    name: 'Impressora HP',
    type: 'Impressão',
    model: 'LaserJet Pro',
    status: 'Em manutenção',
    location: 'Secretaria',
    lastUpdate: '12 Out 2023',
    serialNumber: 'HP-LJ-128',
  },
]

export const equipmentSummaryMock: EquipmentSummary[] = [
  {
    id: 'total',
    title: 'Total',
    value: 128,
    icon: 'total',
    lineColor: 'linear-gradient(90deg, #002A64, #007C8C)',
    iconBackground: '#E1E8FD',
  },
  {
    id: 'available',
    title: 'Disponíveis',
    value: 86,
    icon: 'available',
    lineColor: '#25B8A7',
    iconBackground: '#E6FFFB',
  },
  {
    id: 'maintenance',
    title: 'Em manutenção',
    value: 24,
    icon: 'maintenance',
    lineColor: '#007C8C',
    iconBackground: '#E6F4FF',
  },
  {
    id: 'inactive',
    title: 'Inativos',
    value: 18,
    icon: 'inactive',
    lineColor: '#6B7280',
    iconBackground: '#F3F4F6',
  },
]

export const statusOptions: EquipmentStatus[] = ['Disponível', 'Em manutenção', 'Inativo']

export const typeOptions: EquipmentType[] = [
  'Informática',
  'Imagem',
  'Laboratório',
  'Rede',
  'Impressão',
]
