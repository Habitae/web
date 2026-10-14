// Feature copy shared by the homepage examples and the redesign's feature cards.
import { withFrench } from '../../shared/i18n.mjs';

export const productCopy = withFrench({
  pt: {
    label: 'Funcionalidades', example: 'Exemplo ilustrativo',
    finance: { title: 'Saiba o que entrou e o que falta pagar.', description: 'Registe receitas e despesas, acompanhe quotas por fração e consulte os saldos do condomínio.', details: ['Orçamentos e fundo de reserva', 'Pagamentos e recibos ligados a cada fração'], link: 'Como gerir quotas', slug: 'criar-plano-quotas' },
    people: { title: 'Cada fração com os contactos certos.', description: 'Consulte proprietários, arrendatários e permilagens sem procurar em vários ficheiros.', details: ['Contactos e histórico por fração', 'Dados do edifício e da administração'], link: 'Como organizar o condomínio', slug: 'criar-primeiro-condominio' },
    operations: { title: 'Prepare a reunião. Acompanhe a intervenção.', description: 'Reúna convocatórias, procurações e atas. Registe tarefas de manutenção com prazos, fornecedores e custos.', details: [], link: 'Como preparar uma reunião', slug: 'preparar-reuniao' },
    fees: 'Quotas de julho', received: 'Recebido', outstanding: 'Por pagar', unit: 'Fração', amount: 'Quota', status: 'Estado', paid: 'Paga', pending: 'Por pagar',
    directory: 'Frações e contactos', owner: 'Proprietário', share: 'Permilagem', units: ['1.º Esq.', '1.º Dir.', '2.º Esq.'],
    agenda: 'Agenda do condomínio', meeting: 'Assembleia geral', date: '22 julho · 18:30', notice: 'Convocatória', agendaDoc: 'Ordem de trabalhos', maintenance: 'Revisão do elevador', maintenanceDate: '24 julho', scheduled: 'Agendada',
  },
  en: {
    label: 'Features', example: 'Illustrative example',
    finance: { title: 'See what came in and what is still owed.', description: 'Record income and expenses, track fees by unit and check your condominium balances.', details: ['Budgets and reserve funds', 'Payments and receipts linked to each unit'], link: 'How to manage fees', slug: 'create-fee-schedule' },
    people: { title: 'The right contacts for every unit.', description: 'Find owners, tenants and ownership shares without searching through separate files.', details: ['Contacts and history for each unit', 'Building and administration details'], link: 'How to organise your condominium', slug: 'create-first-condominium' },
    operations: { title: 'Prepare the meeting. Track the repair.', description: 'Keep notices, proxies and minutes together. Record maintenance tasks with deadlines, suppliers and costs.', details: [], link: 'How to prepare a meeting', slug: 'prepare-meeting' },
    fees: 'July fees', received: 'Received', outstanding: 'Outstanding', unit: 'Unit', amount: 'Fee', status: 'Status', paid: 'Paid', pending: 'Unpaid',
    directory: 'Units and contacts', owner: 'Owner', share: 'Share', units: ['1st left', '1st right', '2nd left'],
    agenda: 'Condominium agenda', meeting: 'General meeting', date: '22 July · 18:30', notice: 'Meeting notice', agendaDoc: 'Meeting agenda', maintenance: 'Lift inspection', maintenanceDate: '24 July', scheduled: 'Scheduled',
  },
} as const);
