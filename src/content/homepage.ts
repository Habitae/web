// Homepage copy shared by the current homepage and the redesign under test.
import { withFrench } from '../../shared/i18n.mjs';
import type { Language } from '../context/I18nContext';

type PricingPlan = {
  code: 'xs' | 's' | 'm' | 'l' | 'xl';
  name: string;
  description: string;
  price: string;
  interval: string;
  annualPrice: string;
  annualInterval: string;
  annualSaving?: string;
  features: string[];
  action: string;
  featured?: boolean;
};

export const pricingPlans: Record<Language, PricingPlan[]> = withFrench({
  pt: [
    { code: 's', name: 'Habitae S', description: 'A experiência Habitae completa para um condomínio autogerido.', price: '19,99 €', interval: '/ mês', annualPrice: '227,90 €', annualInterval: '/ ano', annualSaving: 'Poupa 11,98 € por ano', features: ['Gestão completa de um condomínio', 'Emails enviados pelo Habitae', 'Convites e equipa de gestão'], action: 'Entrar na lista de espera', featured: true },
    { code: 'm', name: 'Habitae M', description: 'Para administrações profissionais em crescimento.', price: '69,99 €', interval: '/ mês', annualPrice: '797,90 €', annualInterval: '/ ano', annualSaving: 'Poupa 41,98 € por ano', features: ['Gestão de múltiplos condomínios', 'Ferramentas para equipas', 'Apoio ao crescimento'], action: 'Entrar na lista de espera' },
    { code: 'l', name: 'Habitae L', description: 'Para operações de condomínio de maior escala.', price: '169,99 €', interval: '/ mês', annualPrice: '1 937,90 €', annualInterval: '/ ano', annualSaving: 'Poupa 101,98 € por ano', features: ['Tudo no Habitae M', 'Operação de maior escala', 'Acompanhamento prioritário'], action: 'Entrar na lista de espera' },
  ],
  en: [
    { code: 's', name: 'Habitae S', description: 'The complete Habitae experience for a self-managed condominium.', price: '€19.99', interval: '/ month', annualPrice: '€227.90', annualInterval: '/ year', annualSaving: 'Save €11.98 per year', features: ['Complete management for one condominium', 'Emails sent through Habitae', 'Team invitations and management'], action: 'Join the waitlist', featured: true },
    { code: 'm', name: 'Habitae M', description: 'For growing professional administrators.', price: '€69.99', interval: '/ month', annualPrice: '€797.90', annualInterval: '/ year', annualSaving: 'Save €41.98 per year', features: ['Multiple condominium management', 'Tools for teams', 'Support for growth'], action: 'Join the waitlist' },
    { code: 'l', name: 'Habitae L', description: 'For condominium operations at greater scale.', price: '€169.99', interval: '/ month', annualPrice: '€1,937.90', annualInterval: '/ year', annualSaving: 'Save €101.98 per year', features: ['Everything in Habitae M', 'Greater-scale operations', 'Priority support'], action: 'Join the waitlist' },
  ],
});

type FaqItem = {
  question: string;
  answer: string;
  link?: { label: string; path: string };
};

export const faqItems: Record<Language, FaqItem[]> = withFrench({
  pt: [
    { question: 'O que é o Habitae?', answer: 'É uma aplicação de gestão de condomínios que reúne finanças, quotas, frações, pessoas, documentos e manutenção.' },
    { question: 'Quanto custa?', answer: `O Habitae S custa ${pricingPlans.pt[0].price} por mês ou ${pricingPlans.pt[0].annualPrice} por ano, isentos de IVA. Inclui 15 dias gratuitos na modalidade mensal ou 30 dias na anual.`, link: { label: 'Ver planos', path: '/#planos' } },
    { question: 'Como começo a usar?', answer: 'Crie o condomínio com os dados do edifício e da administração. Depois, adicione frações e pessoas, configure o orçamento e convide a equipa.', link: { label: 'Guia dos primeiros passos', path: '/ajuda/criar-primeiro-condominio' } },
    { question: 'Posso gerir vários condomínios?', answer: 'Sim. Os planos Habitae M e L permitem gerir vários condomínios com a sua equipa. Para um único condomínio autogerido, escolha o Habitae S.' },
    { question: 'Onde encontro ajuda?', answer: 'O centro de ajuda tem guias para configurar o condomínio, registar pagamentos, preparar reuniões e gerir a equipa.', link: { label: 'Abrir centro de ajuda', path: '/ajuda' } },
  ],
  en: [
    { question: 'What is Habitae?', answer: 'A condominium management application that brings together finances, fees, units, people, documents and maintenance.' },
    { question: 'How much does it cost?', answer: `Habitae S costs ${pricingPlans.en[0].price} per month or ${pricingPlans.en[0].annualPrice} per year, VAT exempt. Monthly billing includes a 15-day free trial; annual billing includes 30 days.`, link: { label: 'View plans', path: '/#planos' } },
    { question: 'How do I get started?', answer: 'Create your condominium with the building and administration details. Then add units and people, set up the budget and invite your team.', link: { label: 'Getting started guide', path: '/help/create-first-condominium' } },
    { question: 'Can I manage multiple condominiums?', answer: 'Yes. Habitae M and L let you manage multiple condominiums with your team. For a single self-managed condominium, choose Habitae S.' },
    { question: 'Where can I find help?', answer: 'The help centre has guides for setting up your condominium, recording payments, preparing meetings and managing your team.', link: { label: 'Open help centre', path: '/help' } },
  ],
});

export const pageCopy = withFrench({
  pt: {
    faqTitle: 'Perguntas frequentes',
    meta: { title: 'Habitae | Software de gestão de condomínios em Portugal', description: 'O Habitae reúne finanças, quotas, documentos, pessoas e tarefas numa plataforma clara para a gestão de condomínios.', socialDescription: 'Finanças, quotas, documentos, pessoas e tarefas do condomínio, num só lugar.', locale: 'pt_PT' },
    skip: 'Saltar para o conteúdo',
    hero: { eyebrow: 'Gestão de condomínios', line1: 'O condomínio', line2: 'inteiro.', accent: 'Num só lugar.', lead: 'Gira quotas, contas, pessoas e manutenção do condomínio numa só aplicação.', primary: 'Entrar na lista de espera', secondary: 'Conhecer a plataforma' },
    pricing: { kicker: 'Planos', title: 'Comece com o seu condomínio.', intro: 'Habitae S para um condomínio autogerido. Habitae M e L para administrações profissionais.', monthly: 'Mensal', annual: 'Anual', monthlyTrial: '15 dias gratuitos nos planos mensais.', annualTrial: '30 dias gratuitos nos planos anuais.', vat: 'Preços finais, isentos de IVA.' },
    trust: { title: 'A sua equipa, com os acessos certos.', intro: 'A aplicação é alojada e mantida pelo Habitae.', permissions: 'Permissões por função', permissionsCopy: 'Defina quem pode consultar e gerir o condomínio.', activity: 'Histórico de alterações', activityCopy: 'Veja o que mudou e quem fez cada alteração.' },
  },
  en: {
    faqTitle: 'Frequently asked questions',
    meta: { title: 'Habitae | Condominium management software in Portugal', description: 'Habitae brings finances, fees, documents, people and tasks together in one clear condominium management platform.', socialDescription: 'Your condominium finances, fees, documents, people and tasks in one place.', locale: 'en_GB' },
    skip: 'Skip to content',
    hero: { eyebrow: 'Condominium management', line1: 'Your whole', line2: 'condominium.', accent: 'In one place.', lead: 'Manage condominium fees, accounts, people and maintenance in one application.', primary: 'Join the waitlist', secondary: 'Explore the platform' },
    pricing: { kicker: 'Plans', title: 'Start with your condominium.', intro: 'Habitae S for a self-managed condominium. Habitae M and L for professional administrators.', monthly: 'Monthly', annual: 'Yearly', monthlyTrial: '15 free days on monthly plans.', annualTrial: '30 free days on yearly plans.', vat: 'Final prices, VAT exempt.' },
    trust: { title: 'Your team, with the right access.', intro: 'Habitae hosts and maintains the application.', permissions: 'Permissions by role', permissionsCopy: 'Decide who can view and manage the condominium.', activity: 'Change history', activityCopy: 'See what changed and who made each change.' },
  },
} as const);
