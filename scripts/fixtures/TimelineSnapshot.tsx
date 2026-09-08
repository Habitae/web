// Source for the static marketing screenshots; not imported by the website.
// Sample data only. Development-only controls intentionally omitted.
import { AlertTriangle, ArrowDownLeft, ArrowLeftRight, ArrowUpRight, CalendarDays, CheckCircle2, CreditCard, KeyRound, Landmark, LogOut, Megaphone, Menu, Moon, ReceiptText, Settings, Wallet, Wrench } from 'lucide-react';
import './TimelineSnapshot.css';
import { createRoot } from 'react-dom/client';

export function mountSnapshot(root: HTMLElement, language: 'pt' | 'en' | 'fr') {
  createRoot(root).render(<TimelineSnapshot language={language} />);
}

const copy = {
  fr: {
    condo: 'Copropriété', name: 'Copropriété Aurora', area: 'Section actuelle', timeline: 'Chronologie', admin: 'Administratrice',
    title: 'Activité de la copropriété', intro: 'Mouvements, charges et engagements récents dans un seul fil.', period: 'Toute la période',
    available: 'Disponible', after: 'Après les fonds protégés', bank: 'Solde bancaire', statement: 'Relevé de base : 1 juillet 2026', protected: 'Protégé', protectedNote: 'Fonds de réserve + cagnottes',
    movements: 'Mouvements financiers', income: 'Reçu', incomeNote: 'recettes et charges', expenses: 'Dépenses', expensesNote: 'dépenses enregistrées', result: 'Résultat', resultNote: 'reçu − dépenses',
    recent: 'Récents', today: 'Aujourd’hui', yesterday: 'Hier', paid: 'Charge payée', overdue: 'Charge en retard', expense: 'Dépense enregistrée', receipt: 'Recette enregistrée',
    units: ['Lot 3e droite', 'Lot 1er gauche', 'Lot 2e droite'], lift: 'Inspection de l’ascenseur', cleaning: 'Nettoyage de l’immeuble', rental: 'Location d’un espace commun', refund: 'Remboursement d’assurance',
    next: 'À venir', date: '22 juillet 2026', meeting: 'Assemblée générale', location: 'Salle de la copropriété', fees: 'Charges à suivre', outstanding: 'À régulariser',
    statuses: ['payées', 'en attente', 'en retard', 'à venir'], maintenance: 'Entretien', tasks: 'tâches en attente', high: '1 à priorité élevée', notices: 'Avis actifs', noticeCount: 'avis au tableau', open: 'Ouvrir les avis', funds: 'Fonds protégés', reserve: 'Fonds de réserve', safes: 'Cagnottes',
  },
  pt: {
    condo: 'Condomínio', name: 'Condomínio Aurora', area: 'Área atual', timeline: 'Linha cronológica', admin: 'Administrador',
    title: 'Atividade do condomínio', intro: 'Movimentos, quotas e compromissos recentes num único feed.', period: 'Todo o período',
    available: 'Disponível', after: 'Após valores protegidos', bank: 'Saldo no banco', statement: 'Extrato base: 1 julho 2026', protected: 'Protegido', protectedNote: 'Fundo de reserva + cofres',
    movements: 'Movimentos financeiros', income: 'Recebido', incomeNote: 'receitas e quotas', expenses: 'Despesas', expensesNote: 'despesas registadas', result: 'Resultado', resultNote: 'recebido − despesas',
    recent: 'Recentes', today: 'Hoje', yesterday: 'Ontem', paid: 'Quota paga', overdue: 'Quota em atraso', expense: 'Despesa registada', receipt: 'Receita registada',
    units: ['Fração 3.º D', 'Fração 1.º E', 'Fração 2.º D'], lift: 'Revisão do elevador', cleaning: 'Limpeza do edifício', rental: 'Aluguer de espaço comum', refund: 'Reembolso do seguro',
    next: 'A seguir', date: '22 julho 2026', meeting: 'Assembleia geral', location: 'Sala do condomínio', fees: 'Quotas a acompanhar', outstanding: 'Por regularizar',
    statuses: ['pagas', 'pendentes', 'em atraso', 'futuras'], maintenance: 'Manutenção', tasks: 'tarefas pendentes', high: '1 com prioridade alta', notices: 'Avisos ativos', noticeCount: 'avisos no quadro', open: 'Abrir avisos', funds: 'Valores protegidos', reserve: 'Fundo de reserva', safes: 'Cofres',
  },
  en: {
    condo: 'Condominium', name: 'Aurora Condominium', area: 'Current area', timeline: 'Timeline', admin: 'Administrator',
    title: 'Condominium activity', intro: 'Recent transactions, fees and commitments in one feed.', period: 'All periods',
    available: 'Available', after: 'After protected funds', bank: 'Bank balance', statement: 'Base statement: 1 July 2026', protected: 'Protected', protectedNote: 'Reserve fund + safes',
    movements: 'Financial movements', income: 'Received', incomeNote: 'income and fees', expenses: 'Expenses', expensesNote: 'recorded expenses', result: 'Result', resultNote: 'received − expenses',
    recent: 'Recent', today: 'Today', yesterday: 'Yesterday', paid: 'Fee paid', overdue: 'Overdue fee', expense: 'Expense recorded', receipt: 'Income recorded',
    units: ['Unit 3D', 'Unit 1E', 'Unit 2D'], lift: 'Lift inspection', cleaning: 'Building cleaning', rental: 'Common area rental', refund: 'Insurance reimbursement',
    next: 'Up next', date: '22 July 2026', meeting: 'General meeting', location: 'Condominium room', fees: 'Fees to follow up', outstanding: 'Outstanding',
    statuses: ['paid', 'pending', 'overdue', 'future'], maintenance: 'Maintenance', tasks: 'pending tasks', high: '1 with high priority', notices: 'Active notices', noticeCount: 'notices on the board', open: 'Open notices', funds: 'Protected funds', reserve: 'Reserve fund', safes: 'Safes',
  },
};

export default function TimelineSnapshot({ language = 'pt' }: { language?: 'pt' | 'en' | 'fr' }) {
  const c = copy[language];
  const money = (cents: number) => new Intl.NumberFormat(({ pt: 'pt-PT', en: 'en-GB', fr: 'fr-FR' })[language], { style: 'currency', currency: 'EUR' }).format(cents / 100);
  const bank = 2485040, reserve = 217000, safes = 50000, income = 684200, expenses = 124000;
  const payments = [{ count: 40, amount: 346000 }, { count: 12, amount: 103800 }, { count: 2, amount: 20200 }, { count: 20, amount: 173000 }];
  const metrics = [
    { title: c.income, amount: income, note: c.incomeNote, Icon: ArrowUpRight, negative: false },
    { title: c.expenses, amount: expenses, note: c.expensesNote, Icon: ArrowDownLeft, negative: true },
    { title: c.result, amount: income - expenses, note: c.resultNote, Icon: ReceiptText, negative: false },
  ];
  const days = [
    { title: c.today, entries: [
      { detail: c.paid, name: c.units[0], amount: 8650, time: '10:32', Icon: CheckCircle2, negative: false, prefix: '' },
      { detail: c.expense, name: c.lift, amount: 12400, time: '09:14', Icon: ArrowDownLeft, negative: true, prefix: '−' },
      { detail: c.receipt, name: c.rental, amount: 35000, time: '09:02', Icon: ArrowUpRight, negative: false, prefix: '+' },
      { detail: c.paid, name: c.units[1], amount: 8650, time: '08:45', Icon: CheckCircle2, negative: false, prefix: '' },
    ] },
    { title: c.yesterday, entries: [
      { detail: c.overdue, name: c.units[2], amount: 10100, time: '17:10', Icon: AlertTriangle, negative: true, prefix: '' },
      { detail: c.expense, name: c.cleaning, amount: 8500, time: '15:20', Icon: ArrowDownLeft, negative: true, prefix: '−' },
      { detail: c.paid, name: c.units[0], amount: 8650, time: '11:06', Icon: CheckCircle2, negative: false, prefix: '' },
      { detail: c.receipt, name: c.refund, amount: 24000, time: '10:40', Icon: ArrowUpRight, negative: false, prefix: '+' },
    ] },
  ];
  return <div className="snapshot" lang={language}>
    <div className="snapshot-toolbar">
      <div className="snapshot-context"><Menu size={13} /><img src="/default-condominium-logo-light.png" alt="" /><div><small>{c.condo}</small><strong>{c.name}</strong></div><ArrowLeftRight size={12} /></div>
      <div className="snapshot-area"><small>{c.area}</small><strong>{c.timeline}</strong></div>
      <div className="snapshot-actions"><Moon size={12} /><CreditCard size={12} /><Settings size={12} /><KeyRound size={12} /><span className="snapshot-avatar">MS</span><div><strong>Maria Silva</strong><small>{c.admin}</small></div><LogOut size={12} /></div>
    </div>
    <div className="snapshot-content">
      <div className="snapshot-intro"><div><h2>{c.title}</h2><p>{c.intro}</p></div><span>{c.period}</span></div>
      <div className="snapshot-finances">
        <div className="snapshot-available"><div className="snapshot-heading"><span>{c.available}</span><Wallet size={14} /></div><strong className="snapshot-amount">{money(bank - reserve - safes)}</strong><p>{c.after}</p>
          <div className="snapshot-breakdown"><div><span>{c.bank}</span><strong>{money(bank)}</strong><small>{c.statement}</small></div><span>−</span><div><span>{c.protected}</span><strong>{money(reserve + safes)}</strong><small>{c.protectedNote}</small></div></div>
        </div>
        <div className="snapshot-period"><div className="snapshot-heading"><div><span>{c.movements}</span><h3>{c.period}</h3></div><ReceiptText size={14} /></div><div className="snapshot-metrics">{metrics.map(({ title, amount, note, Icon, negative }) => <div key={title}><div className="snapshot-heading"><span>{title}</span><Icon size={11} /></div><strong className={negative ? 'negative' : 'positive'}>{money(amount)}</strong><small>{note}</small></div>)}</div></div>
      </div>
      <div className="snapshot-layout">
        <div className="snapshot-feed"><h3>{c.recent}</h3>{days.map(day => <div key={day.title}><div className="snapshot-day">{day.title}</div>{day.entries.map(({ detail, name, amount, time, Icon, negative, prefix }) => <div className={`snapshot-event ${negative ? 'negative' : 'positive'}`} key={time}><span className="snapshot-event-icon"><Icon size={14} /></span><div><small>{detail}</small><strong>{name}</strong></div><time>{time}</time><strong>{prefix}{money(amount)}</strong></div>)}</div>)}</div>
        <div className="snapshot-rail">
          <section><div className="snapshot-heading"><span>{c.next}</span><CalendarDays size={13} /></div><div className="snapshot-inset"><span className="positive">{c.date}</span><strong>{c.meeting}</strong><small>{c.location}</small></div></section>
          <section><div className="snapshot-heading"><span>{c.fees}</span><CreditCard size={13} /></div><div className="snapshot-inset"><span>{c.outstanding}</span><strong className="snapshot-outstanding negative">{money(payments[1].amount + payments[2].amount)}</strong></div><div className="snapshot-payments">{payments.map((p, i) => <div key={i}><span className={`snapshot-dot status-${i}`} /><span>{p.count} {c.statuses[i]}</span><strong>{money(p.amount)}</strong></div>)}</div></section>
          <section><div className="snapshot-heading"><span>{c.maintenance}</span><Wrench size={13} /></div><div className="snapshot-count"><strong>3</strong><span>{c.tasks}</span></div><p className="negative snapshot-alert"><AlertTriangle size={11} />{c.high}</p></section>
          <section><div className="snapshot-heading"><span>{c.notices}</span><Megaphone size={13} /></div><div className="snapshot-count"><strong>2</strong><span>{c.noticeCount}</span></div><span className="positive">{c.open}</span></section>
          <section><div className="snapshot-heading"><span>{c.funds}</span><Landmark size={13} /></div><div className="snapshot-funds"><span>{c.reserve}</span><strong>{money(reserve)}</strong><span>{c.safes}</span><strong>{money(safes)}</strong></div></section>
        </div>
      </div>
    </div>
  </div>;
}
