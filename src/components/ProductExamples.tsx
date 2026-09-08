import { withFrench, locales } from '../../shared/i18n.mjs';
import { ArrowRight, CalendarCheck2, FileText, Home, ReceiptText, Wrench } from 'lucide-react';
import type { Language } from '../context/I18nContext';
import { sitePath, helpRoot } from '../site';
import './ProductExamples.css';

const copy = withFrench({
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

export default function ProductExamples({ language }: { language: Language }) {
  const c = copy[language];
  const currency = new Intl.NumberFormat(locales[language], { style: 'currency', currency: 'EUR' });
  const examples = [
    {
      id: 'financas', ...c.finance,
      preview: <>
        <div className="mk-example-panel-title"><ReceiptText size={18} aria-hidden="true" /><strong>{c.fees}</strong></div>
        <dl className="mk-example-balances">
          <div><dt>{c.received}</dt><dd>{currency.format(173)}</dd></div>
          <div><dt>{c.outstanding}</dt><dd>{currency.format(86.5)}</dd></div>
        </dl>
        <table className="mk-example-table">
          <caption className="mk-visually-hidden">{c.fees}</caption>
          <thead><tr><th scope="col">{c.unit}</th><th scope="col">{c.amount}</th><th scope="col">{c.status}</th></tr></thead>
          <tbody>{c.units.map((unit, index) => <tr key={unit}><th scope="row">{unit}</th><td>{currency.format(86.5)}</td><td><span className={`mk-example-status${index === 2 ? ' mk-example-status--pending' : ''}`}>{index === 2 ? c.pending : c.paid}</span></td></tr>)}</tbody>
        </table>
      </>,
    },
    {
      id: 'pessoas', ...c.people,
      preview: <>
        <div className="mk-example-panel-title"><Home size={18} aria-hidden="true" /><strong>{c.directory}</strong></div>
        <table className="mk-example-table mk-example-table--people">
          <caption className="mk-visually-hidden">{c.directory}</caption>
          <thead><tr><th scope="col">{c.unit}</th><th scope="col">{c.owner}</th><th scope="col">{c.share}</th></tr></thead>
          <tbody>{['Ana Martins', 'João Costa', 'Inês Silva'].map((name, index) => <tr key={name}><th scope="row">{c.units[index]}</th><td>{name}</td><td>{index === 2 ? '90' : '85'} ‰</td></tr>)}</tbody>
        </table>
      </>,
    },
    {
      id: 'assembleias', ...c.operations,
      preview: <>
        <div className="mk-example-panel-title"><CalendarCheck2 size={18} aria-hidden="true" /><strong>{c.agenda}</strong></div>
        <div className="mk-example-meeting">
          <span>{c.date}</span><h3>{c.meeting}</h3>
          <ul className="mk-example-documents"><li><FileText size={15} aria-hidden="true" />{c.notice}</li><li><FileText size={15} aria-hidden="true" />{c.agendaDoc}</li></ul>
        </div>
        <div className="mk-example-task"><Wrench size={18} aria-hidden="true" /><div><strong>{c.maintenance}</strong><span>{c.maintenanceDate}</span></div><span className="mk-example-status">{c.scheduled}</span></div>
      </>,
    },
  ];

  return (
    <div id="funcionalidades" className="mk-product-examples" aria-label={c.label}>
      <div className="mk-container">
        {examples.map(({ id, title, description, details, link, slug, preview }) => (
          <section key={id} id={id} className="mk-product-example" aria-labelledby={`${id}-title`}>
            <div className="mk-example-copy">
              <h2 id={`${id}-title`}>{title}</h2>
              <p>{description}</p>
              {details.length > 0 && <ul>{details.map(detail => <li key={detail}>{detail}</li>)}</ul>}
              <a className="mk-example-link" href={sitePath(`${helpRoot(language)}/${slug}`, language)}>{link}<ArrowRight size={16} aria-hidden="true" /></a>
            </div>
            <figure className="mk-example-figure">
              <div className="mk-example-panel">{preview}</div>
              <figcaption>{c.example}</figcaption>
            </figure>
          </section>
        ))}
      </div>
    </div>
  );
}
