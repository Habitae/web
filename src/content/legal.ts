import { organizationDetails } from './organization';
import type { Language } from '../context/I18nContext';

export type LegalDocumentId = 'terms' | 'privacy';
export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
  table?: { headings: string[]; rows: string[][] };
  links?: { label: string; href: string }[];
};
export type LegalDocument = { title: string; description: string; sections: LegalSection[] };

// Complete and review these fields before finalizing the legal documents.
// Keep the draft notice and noindex until the text and operational details are final.
export const legalDraft = true;
export const legalVersion = '0.1';
export const legalDetails = {
  entity: 'João Leandro Lopes Frias',
  taxId: '259605948',
  address: `${organizationDetails.address.streetAddress}, ${organizationDetails.address.postalCode} ${organizationDetails.address.addressLocality}, ${organizationDetails.address.addressCountry}`,
  supportEmail: organizationDetails.email,
  privacyEmail: organizationDetails.email,
  effectiveDate: '2026-09-06',
  hosting: { pt: 'OVH, França', en: 'OVH, France' },
  transfers: {
    pt: 'A aplicação está alojada na OVH, em França. O website e o formulário utilizam Cloudflare, cuja rede processa pedidos internacionalmente; a base de dados D1 da lista de espera está restrita à jurisdição da União Europeia. O GitHub Pages mantém o alojamento de origem de recurso. Os termos publicados do Cloudflare e do GitHub preveem cláusulas contratuais-tipo para as transferências abrangidas. A localização da base de dados não limita, por si só, todos os tratamentos dos fornecedores ao EEE.',
    en: 'The application is hosted by OVH in France. The website and signup form use Cloudflare, whose network processes requests internationally; the waitlist D1 database is restricted to European Union jurisdiction. GitHub Pages retains fallback origin hosting. Cloudflare and GitHub’s published terms provide standard contractual clauses for covered transfers. The database location alone does not restrict all provider processing to the EEA.',
  },
  disputeResolution: 'CNIACC — Centro Nacional de Informação e Arbitragem de Conflitos de Consumo; Rua D. Afonso Henriques, 1, 4700-030 Braga; +351 253 619 107; geral@cniacc.pt; https://www.cniacc.pt',
  // Commercial refund policy approved by the operator on 2026-09-06.
  refundPolicy: {
    pt: 'Nas subscrições pagas, o cancelamento antes da renovação impede a cobrança do período seguinte e mantém o acesso até ao fim do período já pago. Não são concedidos reembolsos comerciais proporcionais por períodos não utilizados. Esta regra não limita a livre resolução, os direitos por falta de conformidade do serviço nem outros reembolsos obrigatórios por lei. Cobranças duplicadas ou indevidas são corrigidas. Os pedidos devem ser enviados para o contacto de apoio, com o email da conta e a referência da cobrança.',
    en: 'For paid subscriptions, cancellation before renewal prevents the next period’s charge and preserves access until the end of the paid period. Discretionary prorated refunds are not offered for unused periods. This rule does not limit statutory withdrawal, remedies for a non-conforming service or other legally required refunds. Duplicate or incorrect charges are corrected. Send requests to the support contact with the account email and charge reference.',
  },
};

const d = legalDetails;
const identity = `${d.entity} · ${d.taxId} · ${d.address}`;
const gdpr = { label: 'Regulamento (UE) 2016/679 — RGPD', href: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj' };
const cloudflareDpa = { label: 'Cloudflare — Data Processing Addendum', href: 'https://www.cloudflare.com/cloudflare-customer-dpa/' };
const cloudflarePrivacy = { label: 'Cloudflare — Privacy Policy', href: 'https://www.cloudflare.com/privacypolicy/' };
const ovhPrivacy = { label: 'OVHcloud — RGPD / GDPR', href: 'https://www.ovhcloud.com/pt/personal-data-protection/gdpr/' };
const githubPrivacy = { label: 'GitHub — Privacy Statement', href: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement' };

export const legalContent: Record<Language, Record<LegalDocumentId, LegalDocument>> = {
  pt: {
    terms: {
      title: 'Termos e Condições',
      description: 'As condições de acesso e utilização do Habitae, as responsabilidades de cada parte e a gestão da subscrição.',
      sections: [
        { id: 'provider', title: 'Quem presta o serviço', paragraphs: [
          `O Habitae é um serviço de gestão de condomínios prestado por ${identity}. Website: habitae.pt. Contacto: ${d.supportEmail}.`,
          'Estes termos regulam o website e, quando disponibilizada e contratada, a aplicação Habitae. O cliente é a pessoa ou organização que contrata o serviço; o utilizador é uma pessoa autorizada a aceder ao respetivo espaço de trabalho.',
        ] },
        { id: 'service', title: 'O que é o Habitae', paragraphs: [
          'O Habitae reúne a gestão de condomínios, frações, pessoas, orçamentos, quotas, receitas e despesas, contas bancárias registadas, reuniões, documentos, manutenção e comunicações.',
          'A aplicação apoia o trabalho da administração. Os registos de pagamentos e contas bancárias não constituem, por si só, uma transferência de fundos nem uma ligação automática ao banco. Atas, cálculos, avisos e documentos devem ser revistos antes de serem utilizados ou enviados.',
          'O website público apresenta o produto e disponibiliza guias. Enquanto a área de acesso indicar “Em breve”, não permite criar uma conta ou contratar uma subscrição. Funcionalidades anunciadas como futuras não integram um serviço já contratado.',
        ] },
        { id: 'account', title: 'Conta, representação e acessos', items: [
          'Quem contrata deve ter capacidade para celebrar o contrato e poderes para representar a organização ou o condomínio.',
          'Forneça dados corretos e mantenha os contactos e a informação de faturação atualizados.',
          'Use contas individuais, proteja as credenciais e atribua apenas os acessos necessários à função de cada pessoa.',
          'Reveja as permissões quando alguém muda de função ou deixa a administração. Comunique suspeitas de acesso indevido ao contacto de apoio.',
        ] },
        { id: 'acceptable-use', title: 'Utilização permitida', paragraphs: ['Utilize o Habitae para fins lícitos e dentro das permissões atribuídas. Não é permitido:'], items: [
          'Aceder a dados de outras organizações ou contornar restrições de acesso.',
          'Introduzir código malicioso, perturbar o serviço ou usar os envios de email para spam.',
          'Carregar ou divulgar dados e documentos sem autorização ou fundamento jurídico.',
          'Usar a identidade de outra pessoa ou apresentar informação enganosa em nome do condomínio.',
        ] },
        { id: 'subscription', title: 'Planos, período gratuito e pagamentos', paragraphs: [
          'As funcionalidades, limites, preços, IVA e periodicidade são apresentados no plano e confirmados antes da contratação. O plano Habitae S destina-se a um condomínio autogerido; os planos profissionais anunciados como “Em breve” ainda não estão disponíveis.',
          'A oferta apresentada no website prevê 15 dias gratuitos na modalidade mensal e 30 dias na anual. O início e fim do período gratuito, a primeira cobrança e as condições de renovação devem constar da confirmação da subscrição. A simples visita ao website não inicia um período de teste nem uma cobrança.',
          'Quando ativado, o Stripe processa o pagamento no seu ambiente. O Habitae conserva os identificadores, dados de faturação e estados necessários para gerir a subscrição, sem guardar o número completo do cartão ou o respetivo código de segurança.',
          'As subscrições com renovação automática renovam-se na periodicidade aceite na contratação, salvo cancelamento prévio. A área de subscrição e faturação permite aceder ao portal de faturação quando disponível. As alterações de preço são comunicadas antes de se aplicarem a uma renovação.',
        ] },
        { id: 'cancellation', title: 'Cancelamento e reembolsos', paragraphs: [
          `O cliente pode gerir o cancelamento no portal de faturação disponibilizado ou contactar ${d.supportEmail}. A data de fim de acesso é a indicada na confirmação do cancelamento. Deixar de usar a aplicação ou apagar dados do navegador não cancela uma subscrição.`,
          d.refundPolicy.pt,
          'Quando o cliente seja consumidor e o contrato esteja abrangido pelo regime dos contratos à distância, dispõe, em regra, de 14 dias a contar da celebração do contrato de serviços para exercer a livre resolução, mediante declaração inequívoca dirigida ao prestador. O período gratuito não substitui esse direito. O início antecipado do serviço e as suas consequências dependem dos requisitos legais e dos pedidos ou consentimentos expressos aplicáveis.',
        ], links: [{ label: 'Decreto-Lei n.º 24/2014 — contratos à distância', href: 'https://diariodarepublica.pt/dr/detalhe/decreto-lei/24-2014-572450' }] },
        { id: 'customer-data', title: 'Dados do condomínio e privacidade', paragraphs: [
          'O cliente mantém os direitos sobre os dados e documentos introduzidos. Autoriza apenas o tratamento necessário para prestar o serviço e executar as suas instruções documentadas.',
          'A organização que define as finalidades da gestão do condomínio é normalmente responsável pelo tratamento dos dados desse espaço de trabalho. O Habitae atua como subcontratante nos termos do acordo de tratamento de dados (DPA), a incorporar no contrato. A Política de Privacidade não substitui esse acordo.',
          'O cliente deve informar as pessoas, dispor de fundamento jurídico para tratar e comunicar os seus dados e verificar destinatários antes de enviar documentos. Evite introduzir dados sensíveis ou documentos de identificação sem necessidade e medidas adequadas.',
        ], links: [{ label: 'Consultar a Política de Privacidade', href: '/privacy' }] },
        { id: 'intellectual-property', title: 'Propriedade intelectual', paragraphs: [
          'A utilização do serviço não transfere a titularidade da marca, dos conteúdos ou da aplicação. O cliente recebe o direito de utilizar as funcionalidades contratadas durante a vigência do serviço.',
          'O código disponibilizado pelo Habitae sob uma licença de código aberto continua sujeito a essa licença. Estes termos não restringem as permissões concedidas pela licença MIT do código do website. O nome, logótipos, textos comerciais e outros elementos de marca não estão abrangidos por essa licença.',
        ] },
        { id: 'availability', title: 'Disponibilidade, suporte e integrações', paragraphs: [
          `Os pedidos de apoio devem ser enviados para ${d.supportEmail}. Podem ocorrer interrupções para manutenção, correção de falhas ou resposta a incidentes. Sempre que possível, as intervenções com impacto relevante são comunicadas antecipadamente.`,
          'O funcionamento de integrações depende também dos respetivos fornecedores. Os pagamentos por Stripe e os envios de email por Resend só se aplicam quando essas funcionalidades estão ativadas. Os destinatários, dados transmitidos e condições aplicáveis são descritos na documentação de privacidade.',
          'Qualquer garantia de nível de serviço ou prazo específico de apoio deve constar da proposta contratada. Não é garantida a ausência absoluta de falhas ou interrupções.',
        ] },
        { id: 'responsibility', title: 'Responsabilidades', paragraphs: [
          'A administração continua responsável pelas decisões, exatidão dos registos, aprovação de despesas, convocatórias, atas e cumprimento das suas obrigações. O Habitae não substitui aconselhamento jurídico, fiscal ou contabilístico.',
          'O prestador responde pelo cumprimento das obrigações que lhe cabem nos termos do contrato e da lei. Nenhuma disposição exclui responsabilidade que não possa ser legalmente excluída nem limita direitos imperativos do cliente, incluindo os relativos à conformidade do serviço e à proteção de dados.',
        ] },
        { id: 'termination', title: 'Suspensão, fim do serviço e exportação', paragraphs: [
          'O acesso pode ser suspenso na medida necessária em caso de abuso, risco de segurança, incumprimento contratual ou falta de pagamento. Sempre que possível, são comunicados o motivo e os passos para resolver a situação.',
          'No fim do contrato, a devolução ou eliminação dos dados segue as instruções documentadas do cliente, o DPA e as obrigações de conservação. O prazo de acesso para exportação deve ser confirmado antes da cessação: [[PRAZO E CANAL DE EXPORTAÇÃO APÓS CESSAÇÃO]].',
          'O registo de um pedido de apagamento não elimina automaticamente movimentos, atas, anexos ou auditorias. É necessário avaliar obrigações legais e eventuais litígios. As cópias de segurança seguem o ciclo de conservação aplicável.',
        ] },
        { id: 'law', title: 'Lei aplicável e resolução de litígios', paragraphs: [
          'Estes termos regem-se pela lei portuguesa, sem prejuízo de normas imperativas aplicáveis, incluindo as de proteção do consumidor. A competência dos tribunais é determinada pelas regras legais aplicáveis.',
          `Quando o litígio esteja abrangido pela sua competência, incluindo territorial, o consumidor pode recorrer ao ${d.disputeResolution}. A indicação deste centro não constitui uma declaração de adesão plena. Informação sobre o Livro de Reclamações, se aplicável: [[LIGAÇÃO / DADOS DO LIVRO DE RECLAMAÇÕES]].`,
        ] },
        { id: 'changes', title: 'Alterações e contacto', paragraphs: [
          'A versão e a data de entrada em vigor identificam o texto aplicável. As alterações materiais são comunicadas aos clientes com antecedência adequada, explicando a data de aplicação e as opções disponíveis. As alterações que exijam aceitação ou consentimento serão apresentadas para esse efeito.',
          `Questões sobre estes termos: ${d.supportEmail}.`,
        ] },
      ],
    },
    privacy: {
      title: 'Política de Privacidade',
      description: 'Que dados são tratados pelo Habitae, para que servem, com quem são partilhados e como exercer os seus direitos.',
      sections: [
        { id: 'controller', title: 'Quem trata os seus dados', paragraphs: [
          `O operador do Habitae é ${identity}. Contacto para questões e pedidos de proteção de dados: ${d.privacyEmail}. Encarregado de proteção de dados, se designado: [[CONTACTO DO EPD OU INDICAR NÃO APLICÁVEL]].`,
          'O operador é responsável pelo tratamento dos dados utilizados para administrar as próprias contas, a relação comercial, a faturação, o apoio e a segurança do serviço. Quando o cliente é uma organização, o tratamento dos contactos dos seus representantes é avaliado separadamente do contrato com a organização.',
          'Para os dados de condóminos, proprietários, inquilinos, fornecedores e representantes introduzidos no espaço de trabalho, a organização cliente determina normalmente as finalidades e atua como responsável pelo tratamento. O Habitae atua como subcontratante, segundo as instruções documentadas e o DPA. A administração deve disponibilizar a sua própria informação de privacidade.',
        ] },
        { id: 'scope', title: 'Website e aplicação', paragraphs: [
          'O website público apresenta o Habitae e os seus guias. Nesta fase, a área de acesso apresenta uma página “Em breve”; o website não recolhe registos de conta, documentos do condomínio ou pagamentos.',
          'As secções relativas a contas, dados do condomínio, faturação e comunicações descrevem o tratamento associado à utilização da aplicação, quando disponibilizada. A mera visita ao website não ativa essas funcionalidades.',
        ] },
        { id: 'data', title: 'Dados e respetivas origens', items: [
          'Conta e contactos: nome, email, telefone, função, organização e informação de faturação, fornecidos pelo próprio ou por um administrador autorizado.',
          'Autenticação e segurança: dados derivados da palavra-passe, sessões, endereço IP, navegador, eventos de segurança e auditoria.',
          'Condomínio: nome, morada, NIF/NIPC, frações, permilagens, relações de propriedade ou ocupação e procurações.',
          'Gestão financeira: quotas, pagamentos, receitas, despesas, saldos, IBAN, faturas, seguros, fornecedores e documentos associados.',
          'Reuniões e comunicações: convocatórias, presenças, atas, assinaturas, anexos, mensagens e histórico de alterações.',
          'Subscrição: plano, periodicidade, estado, contactos de faturação e identificadores de cliente e subscrição do prestador de pagamentos.',
          'Preferências e apoio: idioma, tema e rascunhos locais da aplicação; conteúdo de pedidos de apoio enviados pelo utilizador.',
        ], paragraphs: ['Os dados podem ser fornecidos diretamente, pela administração, por outros utilizadores autorizados ou por integrações ativadas pelo cliente. Não envie dados de saúde, outros dados sensíveis ou cópias de documentos de identificação sem necessidade e fundamento adequados.'] },
        { id: 'purposes', title: 'Finalidades e fundamentos', table: {
          headings: ['Finalidade do operador', 'Fundamento'], rows: [
            ['Gerir uma conta ou subscrição contratada pela própria pessoa', 'Execução do contrato ou diligências pré-contratuais.'],
            ['Gerir contactos de representantes e responder a pedidos de apoio', 'Interesse legítimo em administrar a relação com o cliente e prestar apoio; contrato quando o titular é parte.'],
            ['Faturar e cumprir obrigações fiscais ou responder a autoridades', 'Cumprimento de obrigações legais; contrato para gerir a cobrança.'],
            ['Proteger contas, investigar abuso e manter registos de segurança', 'Interesse legítimo na segurança e continuidade do serviço, ponderado face aos direitos das pessoas.'],
            ['Comunicações promocionais, se introduzidas', 'Consentimento separado quando exigido; a utilização do serviço não implica consentimento para marketing.'],
          ],
        }, paragraphs: [
          'Para os dados do condomínio tratados por conta do cliente, é o responsável pelo tratamento que determina e documenta o fundamento adequado a cada finalidade. O contrato entre o Habitae e o cliente não constitui, por si só, fundamento para todo o tratamento de dados dos condóminos.',
          'Os dados necessários à conta, faturação ou segurança são necessários à prestação dessas funções. A falta de dados obrigatórios pode impedir a criação da conta ou a contratação; os campos opcionais não devem impedir a utilização das restantes funções.',
        ] },
        { id: 'sharing', title: 'Acesso e fornecedores', paragraphs: [
          'Os dados do espaço de trabalho são acessíveis aos utilizadores autorizados segundo a organização, o condomínio e a função atribuída. Os emails e documentos são partilhados com os destinatários selecionados nas ações do cliente. O Habitae não vende dados pessoais nem reutiliza dados do condomínio para publicidade própria.',
          'Os fornecedores recebem apenas os dados necessários à função ativada. A lista contratual de subcontratantes, os seus papéis e as condições de proteção devem acompanhar o DPA. Podem também ser comunicados dados a autoridades ou tribunais quando exista obrigação legal.',
        ], table: { headings: ['Serviço', 'Dados e finalidade'], rows: [
          ['Cloudflare — website e lista de espera', 'Pedidos e dados técnicos de acesso, incluindo IP, para disponibilizar e proteger o website e o formulário; os dados de inscrição são guardados no D1 conforme a secção Lista de espera.'],
          ['GitHub Pages — alojamento de origem de recurso', 'Pedidos de páginas e dados técnicos de acesso, incluindo IP, para disponibilizar e proteger o website.'],
          [d.hosting.pt, 'Alojamento da aplicação, base de dados, documentos, registos técnicos e cópias de segurança.'],
          ['Stripe — quando ativado', 'Contactos de faturação, plano, identificadores e estados da subscrição. Os dados do cartão são tratados no ambiente Stripe.'],
          ['Resend — quando ativado', 'Remetente, destinatários, assunto, mensagem, anexos e estado de entrega dos emails solicitados.'],
        ] }, links: [cloudflareDpa, cloudflarePrivacy, ovhPrivacy, githubPrivacy, { label: 'Stripe — acordo de proteção de dados', href: 'https://stripe.com/legal/dpa' }, { label: 'Resend — acordo de proteção de dados', href: 'https://resend.com/legal/dpa' }] },
        { id: 'transfers', title: 'Localização e transferências internacionais', paragraphs: [
          d.transfers.pt,
          'As entidades contratadas, localizações das cópias de segurança, subprocessadores e garantias específicas das contas da aplicação devem constar do registo contratual antes da ativação de cada integração. A existência de termos públicos de um fornecedor não confirma, por si só, a configuração da conta Habitae.',
          'Quando haja uma transferência para fora do EEE, deve existir um mecanismo válido, como uma decisão de adequação ou cláusulas contratuais-tipo com as avaliações e medidas suplementares necessárias. Pode pedir informação sobre as garantias ao contacto de privacidade.',
        ], links: [cloudflareDpa, cloudflarePrivacy, ovhPrivacy, githubPrivacy] },
        { id: 'retention', title: 'Durante quanto tempo conservamos os dados', table: { headings: ['Categoria', 'Prazo de referência'], rows: [
          ['Segurança e auditoria operacional', '90 dias, salvo necessidade documentada de investigação ou conservação legal.'],
          ['Pedidos de direitos e decisões', '3 anos após encerramento, conservando apenas a prova necessária.'],
          ['Dados ativos do espaço de trabalho', 'Durante o contrato e até 30 dias após exportação ou cessação confirmada, mediante instrução e verificação de obrigações legais.'],
          ['Cópias de segurança', 'Ciclo móvel de 35 dias; cópia isolada de teste substituída no teste trimestral seguinte, salvo obrigação documentada.'],
          ['Atas, anexos e registos fiscais, contabilísticos ou probatórios', 'Prazo definido pelo responsável segundo a finalidade, a lei e eventuais litígios.'],
          ['Faturação própria e pedidos de apoio', '[[PRAZOS LEGAIS DE FATURAÇÃO E PRAZO DE CONSERVAÇÃO DO APOIO]].'],
        ] }, paragraphs: [
          'Prazos de referência da política operacional da aplicação, a confirmar antes da entrada em vigor: [[CONFIRMAÇÃO DOS PRAZOS E PROCESSOS DE CONSERVAÇÃO]]. Não implicam apagamento automático. A conservação necessária a uma obrigação legal ou a um litígio pode prevalecer, limitando o uso dos dados a essa finalidade.',
          'Os registos técnicos dos fornecedores do website seguem as políticas aplicáveis do Cloudflare e do GitHub. As preferências locais seguem os prazos da secção seguinte.',
        ] },
        { id: 'waitlist', title: 'Lista de espera', paragraphs: [
          `O responsável pelos dados da lista de espera é ${d.entity}, com contacto em ${d.address}. Para questões de privacidade ou remoção da inscrição, envie um email para ${d.privacyEmail}.`,
          'A inscrição é opcional e depende do seu consentimento para receber a confirmação da inscrição e um email sobre o lançamento do Habitae. Guardamos o email, idioma, perfil (condómino, morador, administrador ou outro), versão do consentimento e data da inscrição. Não é criada uma conta nem uma subscrição paga. A inscrição é independente das preferências de cookies.',
          'Enviamos uma confirmação da inscrição no idioma escolhido através do Resend e notificamos a administração do Habitae da nova inscrição. O Resend trata o remetente, destinatário, mensagem e informação de entrega. A notificação à administração inclui email, perfil, idioma e data da inscrição. Guardamos também os envios pendentes e o estado do envio no Cloudflare D1, para repetir tentativas após falhas temporárias sem reenviar mensagens concluídas.',
          'Os dados da lista são guardados no Cloudflare D1, numa base de dados com jurisdição da União Europeia. O Cloudflare também processa os pedidos ao formulário através da sua rede. A limitação de pedidos utiliza o endereço IP; esse endereço não é guardado na tabela de inscrições.',
          `As inscrições com mais de 180 dias são eliminadas numa rotina diária. Pode retirar o consentimento e pedir a remoção antes desse prazo através de ${d.privacyEmail}, sem afetar a licitude do tratamento anterior. Pode também exercer os direitos descritos nesta página e apresentar reclamação à CNPD.`,
        ] },
        { id: 'storage', title: 'Cookies e armazenamento no navegador', paragraphs: [
          'O website público guarda o idioma escolhido no navegador apenas depois de aceitar as preferências opcionais. Pode aceitar, rejeitar ou personalizar a escolha no aviso inicial e alterá-la em “Cookies”, no rodapé. Quando configurado, o Google Analytics é carregado através do Google Tag Manager apenas após consentimento separado para análise de audiência. Não são enviadas respostas do formulário nem emails para estas ferramentas. Pode retirar o consentimento em “Cookies”; a página é recarregada para parar as ferramentas. Não usamos publicidade nem gravação de sessões. As fontes e imagens são servidas com o próprio website.',
          'A aplicação utiliza também os elementos funcionais abaixo. Estes não são instalados apenas por visitar o website público.',
        ], table: { headings: ['Elemento e âmbito', 'Finalidade e duração'], rows: [
          ['habitae-cookie-consent — website', 'Recordar a decisão, a versão e a data do consentimento durante 180 dias; armazenamento local necessário para respeitar a escolha.'],
          ['habitae-language — website e aplicação', 'Recordar o idioma. No website, apenas com consentimento; eliminado ao retirar o consentimento ou quando este expira, na visita seguinte. Na aplicação, segue as respetivas preferências.'],
          ['__Host-habitae_session — aplicação em produção', 'Manter a autenticação; cookie de sessão com duração máxima de 7 dias, sujeito a fim de sessão ou expiração.'],
          ['darkMode — aplicação', 'Recordar o tema; armazenamento local até alteração ou limpeza.'],
          ['habitae:meeting-draft:* — aplicação', 'Recuperar rascunhos no mesmo navegador; removidos ao fechar ou eliminar o rascunho, ou ao limpar o armazenamento.'],
          ['habitae:onboarding:* — aplicação', 'Recordar o progresso de orientação; armazenamento local até limpeza ou reposição da orientação.'],
        ] }, items: [
          'Pode apagar cookies e armazenamento local nas definições do navegador. Apagar o idioma repõe a preferência; apagar rascunhos remove a cópia local.',
          'Bloquear ou apagar o cookie de autenticação impede ou termina a sessão na aplicação. Não elimina os dados guardados no serviço nem cancela a subscrição.',
          'Num dispositivo partilhado, termine a sessão e limpe rascunhos e dados locais que possam conter informação do condomínio.',
          'Se forem introduzidas tecnologias opcionais que exijam consentimento, serão apresentadas opções para aceitar, recusar e retirar esse consentimento antes da sua ativação.',
        ] },
        { id: 'rights', title: 'Os seus direitos e como exercê-los', paragraphs: [
          `Para dados tratados pelo operador como responsável, contacte ${d.privacyEmail}. Para dados introduzidos pela administração, contacte a organização que gere o condomínio. Se receber um pedido relativo a esses dados, o Habitae encaminha-o e apoia o responsável nos termos do DPA.`,
          'Nos casos previstos na lei, pode pedir acesso, retificação, apagamento, limitação, oposição e portabilidade. Pode retirar o consentimento sem afetar a licitude do tratamento anterior. O apagamento pode estar limitado por obrigações de conservação ou defesa de direitos.',
          'A resposta é prestada, em regra, no prazo de um mês. Quando a complexidade ou o número de pedidos justificar uma extensão legal, o responsável informa-o dentro desse primeiro mês. Pode ser pedida informação proporcional para confirmar a identidade.',
          'As ferramentas de privacidade da aplicação permitem aos administradores registar pedidos e exportar dados. Um pedido registado não executa automaticamente o apagamento de documentos, movimentos ou atas.',
        ], links: [{ label: 'CNPD — conhecer os seus direitos', href: 'https://www.cnpd.pt/cidadaos/direitos/' }, { label: 'Apresentar uma participação à CNPD', href: 'https://www.cnpd.pt/cidadaos/participacoes/' }] },
        { id: 'security', title: 'Segurança', paragraphs: [
          'A aplicação prevê separação entre organizações, permissões por função e condomínio, contas individuais, sessões protegidas e minimização dos registos de auditoria. A publicação deve usar HTTPS. A operação deve manter cópias de segurança cifradas, acesso restrito e testes de restauro segundo a política acordada.',
          'A configuração e execução destes controlos em produção devem ser confirmadas: [[MEDIDAS DE SEGURANÇA E CONTACTO PARA INCIDENTES]]. Não existe uma garantia de segurança absoluta. Mantenha as credenciais e os dispositivos protegidos e comunique suspeitas de incidente.',
        ] },
        { id: 'automated-decisions', title: 'Decisões automatizadas e menores', paragraphs: [
          'O Habitae não prevê decisões exclusivamente automatizadas com efeitos jurídicos ou impacto equivalente sobre as pessoas. Os cálculos e documentos são ferramentas de apoio sujeitas à revisão da administração.',
          'O serviço destina-se à gestão por pessoas com capacidade e autorização para o efeito. Eventuais dados de menores introduzidos pela administração devem ser estritamente necessários, lícitos e acompanhados das garantias adequadas.',
        ] },
        { id: 'changes', title: 'Alterações e contacto', paragraphs: [
          'Esta política será atualizada quando mudarem as finalidades, fornecedores ou práticas relevantes. A versão e a data serão identificadas e as alterações materiais comunicadas pelos canais adequados. Quando necessário, será pedido consentimento antes de iniciar uma nova finalidade.',
          `Contacto de privacidade: ${d.privacyEmail}.`,
        ], links: [gdpr, { label: 'Consultar os Termos e Condições', href: '/terms' }] },
      ],
    },
  },
  en: {
    terms: {
      title: 'Terms and Conditions',
      description: 'The conditions for using Habitae, each party’s responsibilities and how subscriptions are managed.',
      sections: [
        { id: 'provider', title: 'Service provider', paragraphs: [`Habitae is a condominium management service provided by ${identity}. Website: habitae.pt. Contact: ${d.supportEmail}.`, 'These terms cover the website and, once available and contracted, the Habitae application. The customer is the person or organisation contracting the service; a user is a person authorised to access its workspace.'] },
        { id: 'service', title: 'About Habitae', paragraphs: ['Habitae brings together condominiums, units, people, budgets, fees, income and expenses, recorded bank accounts, meetings, documents, maintenance and communications.', 'The application supports the administration’s work. Recording payments or bank accounts does not itself transfer funds or establish an automatic bank connection. Minutes, calculations, notices and documents must be reviewed before use or delivery.', 'The public website presents the product and provides guides. While the access page says “Coming soon”, it does not offer account creation or subscription purchases. Features described as planned do not form part of an already contracted service.'] },
        { id: 'account', title: 'Accounts, representation and access', items: ['The person contracting must have legal capacity and authority to represent the organisation or condominium.', 'Provide accurate details and keep contact and billing information current.', 'Use individual accounts, protect credentials and give each person only the permissions their role needs.', 'Review access when someone changes roles or leaves the administration. Report suspected unauthorised access to support.'] },
        { id: 'acceptable-use', title: 'Acceptable use', paragraphs: ['Use Habitae lawfully and within your permissions. You must not:'], items: ['Access another organisation’s data or bypass access restrictions.', 'Upload malicious code, disrupt the service or use email functions for spam.', 'Upload or disclose data and documents without authority or a lawful basis.', 'Impersonate another person or provide misleading information on behalf of the condominium.'] },
        { id: 'subscription', title: 'Plans, free trials and payments', paragraphs: ['Features, limits, prices, VAT and billing frequency are described in the plan and confirmed before purchase. Habitae S is for one self-managed condominium; professional plans marked “Coming soon” are not yet available.', 'The website advertises a 15-day free period for monthly billing and 30 days for annual billing. The subscription confirmation must state the trial dates, first charge and renewal conditions. Visiting the website does not start a trial or incur a charge.', 'When enabled, Stripe processes payments in its environment. Habitae retains identifiers, billing details and subscription status needed to manage the subscription, without storing full card numbers or security codes.', 'Automatically renewing subscriptions renew at the frequency accepted at purchase unless cancelled beforehand. Subscription and billing settings provide access to the billing portal when available. Price changes are communicated before they apply to a renewal.'] },
        { id: 'cancellation', title: 'Cancellation and refunds', paragraphs: [`Customers can manage cancellation through the provided billing portal or contact ${d.supportEmail}. Access ends on the date stated in the cancellation confirmation. Stopping use or clearing browser data does not cancel a subscription.`, d.refundPolicy.en, 'Where a customer qualifies as a consumer and the service contract is covered by distance-contract rules, a 14-day withdrawal period generally starts when the service contract is concluded. Exercise it by sending the provider an unambiguous statement. A free trial does not replace this right. Starting the service early and its consequences depend on the applicable legal requirements and express requests or consents.'], links: [{ label: 'Decree-Law 24/2014 — distance contracts (Portuguese)', href: 'https://diariodarepublica.pt/dr/detalhe/decreto-lei/24-2014-572450' }] },
        { id: 'customer-data', title: 'Condominium data and privacy', paragraphs: ['Customers retain rights to the data and documents they provide. They authorise only the processing needed to deliver the service and carry out documented instructions.', 'The organisation deciding the purposes of condominium management is normally the controller of workspace data. Habitae acts as processor under a data processing agreement (DPA), to be incorporated into the contract. The Privacy Policy does not replace that agreement.', 'Customers must inform individuals, establish a lawful basis for processing and sharing their data, and check recipients before sending documents. Avoid sensitive data or identity documents without a need and appropriate safeguards.'], links: [{ label: 'Read the Privacy Policy', href: '/privacy' }] },
        { id: 'intellectual-property', title: 'Intellectual property', paragraphs: ['Using the service does not transfer ownership of the brand, content or application. Customers receive the right to use contracted features for the duration of the service.', 'Code released by Habitae under an open-source licence remains subject to that licence. These terms do not restrict permissions granted by the website code’s MIT licence. The name, logos, marketing copy and other brand assets are not covered by that licence.'] },
        { id: 'availability', title: 'Availability, support and integrations', paragraphs: [`Send support requests to ${d.supportEmail}. Maintenance, fixes and incident response may interrupt the service. Work with a significant impact is communicated in advance where possible.`, 'External integrations also depend on their providers. Stripe payments and Resend email delivery apply only when enabled. Recipients, transmitted data and applicable conditions are described in the privacy documentation.', 'Any service-level guarantee or specific support deadline must be set out in the contracted proposal. Complete freedom from errors or interruptions is not guaranteed.'] },
        { id: 'responsibility', title: 'Responsibilities', paragraphs: ['The administration remains responsible for decisions, accurate records, expense approvals, notices, minutes and its statutory obligations. Habitae does not replace legal, tax or accounting advice.', 'The provider remains responsible for its contractual and legal obligations. Nothing excludes liability that cannot lawfully be excluded or limits mandatory customer rights, including service conformity and data protection rights.'] },
        { id: 'termination', title: 'Suspension, termination and export', paragraphs: ['Access may be suspended as necessary for abuse, security risks, contractual breaches or non-payment. Where possible, the reason and steps to resolve the issue will be communicated.', 'At the end of the contract, return or deletion follows the customer’s documented instructions, the DPA and retention obligations. Confirm the export access period before termination: [[POST-TERMINATION EXPORT PERIOD AND CHANNEL]].', 'Recording an erasure request does not automatically delete transactions, minutes, attachments or audits. Legal obligations and disputes must be assessed. Backups follow the applicable retention cycle.'] },
        { id: 'law', title: 'Applicable law and disputes', paragraphs: ['Portuguese law governs these terms, without prejudice to applicable mandatory rules, including consumer protection. Court jurisdiction is determined by the applicable legal rules.', `For disputes within its jurisdiction, including territorial jurisdiction, consumers can contact ${d.disputeResolution}. Naming this centre does not state full membership. Complaints Book information, if applicable: [[COMPLAINTS BOOK LINK / DETAILS]].`] },
        { id: 'changes', title: 'Changes and contact', paragraphs: ['The version and effective date identify the applicable text. Material changes are communicated to customers with appropriate notice, stating when they apply and the available options. Changes requiring acceptance or consent will be presented for that purpose.', `Questions about these terms: ${d.supportEmail}.`] },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      description: 'The data Habitae processes, why it is needed, who receives it and how to exercise your rights.',
      sections: [
        { id: 'controller', title: 'Who processes your data', paragraphs: [`Habitae is operated by ${identity}. Data protection enquiries and requests: ${d.privacyEmail}. Data protection officer, if appointed: [[DPO CONTACT OR STATE NOT APPLICABLE]].`, 'The operator is controller for data used to administer its own accounts, commercial relationship, billing, support and service security. Where the customer is an organisation, processing its representatives’ contact details is assessed separately from the organisation’s contract.', 'For owners, tenants, suppliers and representatives entered into a workspace, the customer organisation normally decides the purposes and acts as controller. Habitae acts as processor under documented instructions and the DPA. The administration must provide its own privacy information.'] },
        { id: 'scope', title: 'Website and application', paragraphs: ['The public website presents Habitae and its guides. The access area currently shows a “Coming soon” page; the website does not collect account registrations, condominium documents or payments.', 'Sections about accounts, condominium data, billing and communications describe processing associated with using the application once available. Visiting the public website does not activate those features.'] },
        { id: 'data', title: 'Data and its sources', items: ['Account and contacts: name, email, telephone, role, organisation and billing details provided directly or by an authorised administrator.', 'Authentication and security: password-derived credentials, sessions, IP address, browser, security and audit events.', 'Condominium: name, address, tax number, units, ownership shares, ownership or occupancy relationships and proxies.', 'Financial management: fees, payments, income, expenses, balances, IBANs, invoices, insurance, suppliers and related documents.', 'Meetings and communications: notices, attendance, minutes, signatures, attachments, messages and change history.', 'Subscription: plan, billing frequency, status, billing contacts and payment-provider customer and subscription identifiers.', 'Preferences and support: language, theme and local application drafts; information included in user support requests.'], paragraphs: ['Data may come directly from individuals, the administration, other authorised users or customer-enabled integrations. Do not submit health information, other sensitive data or identity document copies without an appropriate need and lawful basis.'] },
        { id: 'purposes', title: 'Purposes and lawful bases', table: { headings: ['Operator’s purpose', 'Lawful basis'], rows: [
          ['Manage an account or subscription contracted by the individual', 'Performance of a contract or steps requested before entering a contract.'],
          ['Manage representative contacts and support requests', 'Legitimate interests in administering customer relationships and providing support; contract where the individual is a party.'],
          ['Invoice, meet tax duties or respond to authorities', 'Legal obligations; contract for collecting payments.'],
          ['Protect accounts, investigate abuse and maintain security records', 'Legitimate interests in security and continuity, balanced against individuals’ rights.'],
          ['Promotional communications, if introduced', 'Separate consent where required; using the service does not imply marketing consent.'],
        ] }, paragraphs: ['For condominium data processed on the customer’s behalf, the controller determines and documents the lawful basis for each purpose. The contract between Habitae and its customer is not itself a lawful basis for all processing of residents’ data.', 'Data needed for accounts, billing or security is required for those functions. Missing required details may prevent account creation or purchase; optional fields should not prevent other functions.'] },
        { id: 'sharing', title: 'Access and service providers', paragraphs: ['Workspace access follows the assigned organisation, condominium and role. Emails and documents are shared with the recipients selected by the customer. Habitae does not sell personal data or reuse condominium data for its own advertising.', 'Providers receive only the data needed for an enabled function. The contractual subprocessor list, roles and safeguards must accompany the DPA. Data may also be disclosed to authorities or courts where legally required.'], table: { headings: ['Service', 'Data and purpose'], rows: [
          ['Cloudflare — website and waitlist', 'Requests and technical access data, including IP addresses, to deliver and protect the website and form; signup data is stored in D1 as described in the Waitlist section.'],
          ['GitHub Pages — fallback origin hosting', 'Page requests and technical access data, including IP addresses, to deliver and protect the website.'],
          [d.hosting.en, 'Hosting the application, database, documents, technical logs and backups.'],
          ['Stripe — when enabled', 'Billing contacts, plan, subscription identifiers and status. Card details are processed in Stripe’s environment.'],
          ['Resend — when enabled', 'Sender, recipients, subject, message, attachments and delivery status for requested emails.'],
        ] }, links: [cloudflareDpa, cloudflarePrivacy, ovhPrivacy, githubPrivacy, { label: 'Stripe — Data Processing Agreement', href: 'https://stripe.com/legal/dpa' }, { label: 'Resend — Data Processing Agreement', href: 'https://resend.com/legal/dpa' }] },
        { id: 'transfers', title: 'Locations and international transfers', paragraphs: [d.transfers.en, 'Contracted entities, backup locations, subprocessors and account-specific safeguards for the application must be recorded before each integration is activated. A provider’s public terms alone do not confirm the Habitae account configuration.', 'Transfers outside the EEA require a valid mechanism, such as an adequacy decision or standard contractual clauses with necessary assessments and additional measures. Contact the privacy address for information about safeguards.'], links: [cloudflareDpa, cloudflarePrivacy, ovhPrivacy, githubPrivacy] },
        { id: 'retention', title: 'How long data is retained', paragraphs: ['These reference periods come from the application’s operational policy and must be confirmed before taking effect: [[CONFIRM RETENTION PERIODS AND PROCEDURES]]. They do not imply automatic deletion. Necessary retention for a legal duty or dispute may take priority, with use limited to that purpose.', 'Website providers’ technical logs follow the applicable Cloudflare and GitHub policies. Local preferences follow the periods in the next section.'], table: { headings: ['Category', 'Reference period'], rows: [
          ['Security and operational audit data', '90 days, unless a documented investigation or legal duty requires retention.'],
          ['Rights requests and decisions', '3 years after closure, retaining only necessary evidence.'],
          ['Active workspace data', 'During the contract and up to 30 days after confirmed export or termination, subject to instructions and review of legal duties.'],
          ['Backups', 'A rolling 35-day cycle; isolated test copy replaced at the next quarterly test, except for a documented obligation.'],
          ['Minutes, attachments and tax, accounting or evidential records', 'A period set by the controller according to purpose, law and any disputes.'],
          ['The operator’s billing and support requests', '[[STATUTORY BILLING PERIODS AND SUPPORT RETENTION PERIOD]].'],
        ] } },
        { id: 'waitlist', title: 'Waitlist', paragraphs: [
          `The controller for waitlist data is ${d.entity}, at ${d.address}. For privacy questions or removal requests, email ${d.privacyEmail}.`,
          'Joining is optional and requires your consent to receive a signup confirmation and an email about the Habitae launch. We store your email, language, role (owner, resident, administrator or other), consent version and signup date. Signup does not create an account or paid subscription and is independent of cookie preferences.',
          'We send a signup confirmation in your chosen language through Resend and notify the Habitae administrator of the new signup. Resend processes the sender, recipient, message and delivery information. The administrator notification includes your email, role, language and signup date. We also store pending email jobs and sending status in Cloudflare D1 so temporary failures can be retried without resending completed messages.',
          'Waitlist data is stored in Cloudflare D1 in a database restricted to the European Union jurisdiction. Cloudflare also processes form requests through its network. Request limiting uses your IP address; that address is not stored in the signup table.',
          `Entries older than 180 days are deleted by a daily task. You can withdraw consent and request earlier removal at ${d.privacyEmail}, without affecting the lawfulness of earlier processing. You can also exercise the rights described on this page and complain to the Portuguese data protection authority, CNPD.`,
        ] },
        { id: 'storage', title: 'Cookies and browser storage', paragraphs: ['The public website stores your chosen language in your browser only after you accept optional preferences. You can accept, reject or customise your choice in the initial notice and change it through “Cookies” in the footer. When configured, Google Analytics is loaded through Google Tag Manager only after separate consent for audience analytics. Form responses and email addresses are not sent to these tools. You can withdraw consent through “Cookies”; the page reloads to stop the tools. We do not use advertising or session recording. Fonts and images are served with the website itself.', 'The application also uses the functional items below. Visiting the public website alone does not install them.'], table: { headings: ['Item and scope', 'Purpose and duration'], rows: [
          ['habitae-cookie-consent — website', 'Remember the decision, consent version and date for 180 days; local storage needed to respect your choice.'],
          ['habitae-language — website and application', 'Remember language. On the website, only with consent; removed when consent is withdrawn or expires, on the next visit. The application follows its own preferences.'],
          ['__Host-habitae_session — production application', 'Maintain authentication; a session cookie lasting up to 7 days, subject to logout or expiry.'],
          ['darkMode — application', 'Remember the theme; local storage until changed or cleared.'],
          ['habitae:meeting-draft:* — application', 'Recover drafts in the same browser; removed when closing or deleting the draft, or clearing storage.'],
          ['habitae:onboarding:* — application', 'Remember onboarding progress; local storage until cleared or onboarding is reset.'],
        ] }, items: ['You can clear cookies and local storage in browser settings. Clearing language resets that preference; clearing drafts removes their local copy.', 'Blocking or deleting the authentication cookie prevents or ends the application session. It does not delete server data or cancel a subscription.', 'On a shared device, sign out and clear drafts and local data that may contain condominium information.', 'If optional technologies requiring consent are introduced, options to accept, refuse and withdraw consent will be provided before activation.'] },
        { id: 'rights', title: 'Your rights and how to exercise them', paragraphs: [`For data controlled by the operator, contact ${d.privacyEmail}. For data entered by the administration, contact the organisation managing the condominium. Habitae forwards requests about that data and assists the controller under the DPA.`, 'Where provided by law, you can request access, rectification, erasure, restriction, objection and portability. You can withdraw consent without affecting the lawfulness of earlier processing. Retention duties or legal claims may limit erasure.', 'A response is normally due within one month. If complexity or the number of requests justifies a lawful extension, the controller will notify you within that first month. Proportionate information may be requested to verify identity.', 'Application privacy tools allow administrators to record requests and export data. Recording a request does not automatically erase documents, transactions or minutes.'], links: [{ label: 'CNPD — your rights (Portuguese)', href: 'https://www.cnpd.pt/cidadaos/direitos/' }, { label: 'Submit a complaint to the CNPD', href: 'https://www.cnpd.pt/cidadaos/participacoes/' }] },
        { id: 'security', title: 'Security', paragraphs: ['The application provides organisation separation, role and condominium permissions, individual accounts, protected sessions and minimised audit records. Deployment must use HTTPS. Operations must maintain encrypted backups, restricted access and restore tests under the agreed policy.', 'Production configuration and operation of these controls must be confirmed: [[SECURITY MEASURES AND INCIDENT CONTACT]]. Absolute security cannot be guaranteed. Protect your credentials and devices and report suspected incidents.'] },
        { id: 'automated-decisions', title: 'Automated decisions and children', paragraphs: ['Habitae does not envisage solely automated decisions producing legal or similarly significant effects on individuals. Calculations and documents support decisions and remain subject to the administration’s review.', 'The service is intended for management by people with the necessary capacity and authority. Any children’s data entered by the administration must be strictly necessary, lawful and subject to appropriate safeguards.'] },
        { id: 'changes', title: 'Changes and contact', paragraphs: ['This policy will be updated when relevant purposes, providers or practices change. The version and date will be identified and material changes communicated through appropriate channels. Where required, consent will be requested before starting a new purpose.', `Privacy contact: ${d.privacyEmail}.`], links: [{ ...gdpr, label: 'Regulation (EU) 2016/679 — GDPR' }, { label: 'Read the Terms and Conditions', href: '/terms' }] },
      ],
    },
  },
};
