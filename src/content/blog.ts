import { withFrench, translateText } from '../../shared/i18n.mjs';
import type { SiteLanguage } from '../site';
import { managerPosts } from './blogManagers';

export type BlogSection = { id: string; aliases?: string[]; heading: string; paragraphs: string[]; items?: string[]; links?: { label: string; href: string }[] };
export type BlogPost = { id: string; slug: string; title: string; description: string; published: string; updated: string; legalReviewed?: string; category: string; sections: BlogSection[]; guide: { label: string; href: string } };
export type BlogTranslation = Omit<BlogPost, 'id' | 'published' | 'updated' | 'legalReviewed'>;
const civilCode = 'https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/1966-34509075-49924375';
const reserveLaw = 'https://files.diariodarepublica.pt/1s/2022/01/00600/0000600015.pdf#page=8';
const posts: Array<{ id: string; legalReviewed?: string; pt: BlogTranslation; en: BlogTranslation; fr: BlogTranslation }> = [
  ...managerPosts,
  withFrench({
    id: 'fees',
    legalReviewed: '2026-09-06',
    pt: {
      slug: 'como-calcular-quotas-condominio', title: 'Como calcular as quotas do condomínio: exemplo com permilagem',
      description: 'De 6 000 € de despesas anuais à quota de uma fração com 75‰: a conta da permilagem, a reserva e os cêntimos do arredondamento.', category: 'Quotas e pagamentos',
      sections: [
        { id: 'ponto-de-partida', heading: "Comece pelo orçamento aprovado", paragraphs: [
          "Para calcular a quota, reúna o orçamento aprovado, a lista de frações e o critério de repartição de cada despesa. O dinheiro que está no banco pode incluir adiantamentos ou verbas para obras; esse saldo, por si só, não diz quanto cobrar.",
          "Despesas correntes, reserva e quotas extraordinárias ficam separadas no cálculo. Assim, quando um proprietário perguntar pelo valor do aviso, consegue mostrar as parcelas que lhe deram origem.",
        ] },
        { id: 'permilagem', heading: "75‰ são 7,5%, não 75%", paragraphs: [
          "A permilagem exprime o valor relativo da fração em mil partes. Numa despesa repartida pelo prédio inteiro, 75‰ corresponde a 75 ÷ 1000. Se a folha de cálculo tratar esse número como 75%, a quota sai dez vezes maior. A lista completa das frações deve somar 1000‰.",
          "A repartição proporcional ao valor das frações é a regra geral do artigo 1424.º do Código Civil, mas há exceções. Antes de aplicar a fórmula, confirme o título constitutivo, o regulamento e as deliberações relevantes. Uma regra usada para determinada despesa pode não servir para as restantes.",
        ], links: [{ label: 'Código Civil, artigo 1424.º — repartição de encargos', href: civilCode }] },
        { id: 'exemplo', heading: "A conta, do valor anual à prestação mensal", paragraphs: [
          "Neste exemplo fictício, há 6 000 € de despesas correntes anuais, todas repartidas pela mesma permilagem. A uma fração de 75‰ cabem 6 000 € × 75 ÷ 1000 = 450 €. Em 12 prestações iguais, são 37,50 € por mês.",
          "Uma contribuição aprovada de 10% para a reserva acrescenta 45 € por ano, ou 3,75 € por mês. A prestação total fica em 41,25 €. Obras extraordinárias, dívidas antigas e despesas com outro critério de repartição não entram nesta conta.",
          "Os 10% são o mínimo previsto no artigo 4.º do Decreto-Lei n.º 268/94: cada condómino contribui com pelo menos essa percentagem da sua quota-parte nas restantes despesas. O prédio pode precisar de reservar mais para as obras previstas.",
        ], links: [{ label: 'Decreto-Lei n.º 268/94, artigo 4.º — fundo comum de reserva', href: reserveLaw }] },
        { id: 'conferencia', heading: "Os quatro cêntimos que faltam no fim do ano", paragraphs: [
          "Dividir 100 € por 12 dá 8,333… €. Se todos os meses forem cobrados 8,33 €, no fim do ano entram 99,96 €. Os quatro cêntimos em falta vêm do arredondamento.",
          "Se o plano aprovado permitir o acerto, 11 prestações de 8,33 € e uma de 8,37 € fecham os 100 €. O ajuste fica visível no mapa, para não parecer um aumento sem explicação. Depois de conferir cada fração, falta comparar a soma do prédio com o total aprovado.",
        ], items: [
          "A soma das prestações coincide com o valor anual da fração.",
          "A reserva está separada das despesas correntes.",
          "Os grupos com critérios diferentes foram conferidos à parte.",
          "O aviso identifica a fração, o período, o vencimento e as parcelas.",
        ] },
      ],
      guide: { label: 'Ver como organizar um plano de quotas no Habitae', href: '/ajuda/criar-plano-quotas/' },
    },
    en: {
      slug: 'calculate-condominium-fees-portugal', title: 'How to calculate condominium fees in Portugal: a worked example',
      description: 'From €6,000 of annual expenses to the fee for a unit with a 75‰ share: allocation, reserve contributions and rounding to cents.', category: 'Fees and payments',
      sections: [
        { id: 'starting-point', heading: "Start with the approved budget", paragraphs: [
          "To calculate fees, gather the approved budget, the unit list and the allocation rule for each expense. Money in the bank may include advance payments or funds for works; the balance alone does not tell you what to charge.",
          "Keep ordinary expenses, the reserve and extraordinary fees separate in the calculation. When an owner asks about the notice, you can then show the amounts behind it.",
        ] },
        { id: 'ownership-shares', heading: "75‰ means 7.5%, not 75%", paragraphs: [
          "Permilagem expresses the unit’s relative value in thousandths. For an expense shared across the whole building, 75‰ means 75 ÷ 1000. If the spreadsheet treats it as 75%, the charge becomes ten times too large. The complete unit list should total 1000‰.",
          "Allocation in proportion to unit values is the general rule in Civil Code Article 1424, with exceptions. Check the constitutive title, rules and relevant resolutions before applying the formula. A rule used for one expense may not apply to the others.",
        ], links: [{ label: 'Portuguese Civil Code, Article 1424 — allocation of expenses', href: civilCode }] },
        { id: 'example', heading: "From the annual amount to a monthly payment", paragraphs: [
          "This fictional example has €6,000 of annual ordinary expenses, all allocated by the same ownership shares. A unit with 75‰ contributes €6,000 × 75 ÷ 1000 = €450. In 12 equal instalments, that is €37.50 a month.",
          "An approved 10% reserve contribution adds €45 a year, or €3.75 a month. The total instalment is €41.25. This calculation excludes extraordinary works, old debts and expenses using another allocation rule.",
          "The 10% is the minimum in Article 4 of Decree-Law 268/94: each owner contributes at least that percentage of their share of the remaining expenses. The building may need to set aside more for planned works.",
        ], links: [{ label: 'Decree-Law 268/94, Article 4 — common reserve fund', href: reserveLaw }] },
        { id: 'checks', heading: "The four cents missing at year-end", paragraphs: [
          "Dividing €100 by 12 gives €8.333…. Charging €8.33 each month brings in €99.96 over the year. The missing four cents come from rounding.",
          "Where the approved plan allows an adjustment, 11 instalments of €8.33 and one of €8.37 total €100. Show the adjustment in the schedule so that it does not look like an unexplained increase. After checking each unit, compare the building total with the approved amount.",
        ], items: [
          "Instalments add up to the unit’s annual contribution.",
          "The reserve is separate from ordinary expenses.",
          "Expense groups using different rules have been checked separately.",
          "The notice identifies the unit, period, due date and components.",
        ] },
      ],
      guide: { label: 'See how fee schedules work in Habitae', href: '/help/create-fee-schedule/' },
    },
  }),
  withFrench({
    id: 'budget',
    legalReviewed: '2026-09-06',
    pt: {
      slug: 'orcamento-anual-condominio', title: 'Orçamento anual do condomínio: o que incluir e como organizar',
      description: 'O orçamento pode fechar no papel e faltar dinheiro em janeiro. Como contar os contratos, separar verbas e prever os meses de maior despesa.', category: 'Planeamento financeiro',
      sections: [
        { id: 'historico', heading: "O valor do ano passado pode ficar curto", paragraphs: [
          "Um contrato de limpeza de 150 € por mês, iniciado em julho, custa 900 € nesse ano. No seguinte custa 1 800 €, se o preço se mantiver. Copiar os 900 € para o novo orçamento deixa seis meses por financiar.",
          "Reveja os serviços que começaram ou terminaram, as alterações de preço e as reparações que não se repetem. Use a fatura ou o contrato para justificar cada rubrica. Se ainda não tem um preço confirmado, assinale o valor como estimativa.",
        ] },
        { id: 'rubricas', heading: "Exemplo de orçamento corrente: 6 000 €", paragraphs: [
          "Os valores seguintes são fictícios e mostram como juntar custos mensais e anuais. Nas propostas do prédio, confirme se os preços incluem impostos e todos os serviços pedidos; de outra forma, o total pode ficar incompleto.",
        ], items: [
          "Limpeza: 150 € × 12 meses = 1 800 €.",
          "Eletricidade: estimativa de 50 € × 12 meses = 600 €.",
          "Manutenção do elevador: 100 € × 12 meses = 1 200 €.",
          "Seguro: 900 € por ano.",
          "Administração: 1 200 € por ano.",
          "Encargos bancários: 300 € por ano.",
          "Total corrente: 6 000 €. A reserva e as obras extraordinárias ficam em linhas próprias.",
        ] },
        { id: 'separar', heading: "Dinheiro por receber ainda não está disponível", paragraphs: [
          "Uma obra pode depender da recuperação de quotas em atraso. Nesse caso, o orçamento precisa de mostrar quanto falta receber e o que acontece ao pagamento do fornecedor se esse dinheiro não entrar a tempo.",
          "A reserva também fica identificada, tal como o financiamento das obras extraordinárias. A sua utilização está sujeita ao artigo 4.º do Decreto-Lei n.º 268/94. Estar tudo na mesma conta bancária não torna as verbas livremente intercambiáveis.",
        ], links: [{ label: 'Regras do fundo comum de reserva — artigo 4.º', href: reserveLaw }] },
        { id: 'calendario', heading: "O seguro vence em janeiro; as quotas entram ao longo do ano", paragraphs: [
          "Um seguro anual de 900 € representa 75 € por mês no cálculo da quota. Mas se vence em janeiro, são necessários os 900 € nessa data. Entrando apenas os 75 € desse mês e não havendo saldo anterior disponível para a despesa, faltam 825 €.",
          "Distribua os recebimentos e pagamentos pelos meses em que estão previstos. Esse calendário mostra onde falta dinheiro, mesmo que o total anual feche. Antes de assumir o compromisso, é preciso decidir como cobrir a diferença.",
        ] },
        { id: 'acompanhar', heading: "Explique a diferença ao lado do valor", paragraphs: [
          "Se a eletricidade estava prevista em 50 € e a fatura chegou por 65 €, há 15 € para explicar. Pode ter mudado a tarifa, o consumo ou o número de dias faturados. Essa causa diz mais sobre o mês seguinte do que a percentagem do aumento.",
        ], items: [
          "A versão aprovada continua guardada, mesmo que a previsão seja revista.",
          "Cada despesa tem o documento que suporta o valor.",
          "A nota do desvio indica a causa e qualquer decisão ainda necessária.",
        ] },
      ],
      guide: { label: 'Ver o guia de criação de orçamento no Habitae', href: '/ajuda/criar-orcamento/' },
    },
    en: {
      slug: 'annual-condominium-budget', title: 'Annual condominium budget: what to include and how to organise it',
      description: 'The annual budget can balance on paper while cash runs short in January. Account for full contracts, reserved funds and payment dates.', category: 'Financial planning',
      sections: [
        { id: 'history', heading: "Last year’s figure may leave a gap", paragraphs: [
          "A €150 monthly cleaning contract starting in July costs €900 that year. The next year costs €1,800 if the price stays the same. Copying €900 into the new budget leaves six months unfunded.",
          "Start the review with those differences: services added or ended, updated prices and repairs that will not recur. An invoice or contract explains each figure; where the price is not yet confirmed, mark it as an estimate.",
        ] },
        { id: 'categories', heading: "A €6,000 ordinary-expense budget", paragraphs: [
          "The following fictional figures show how monthly and annual costs fit together. For the building’s actual quotations, check that prices include taxes and all requested services; otherwise the total may be incomplete.",
        ], items: [
          "Cleaning: €150 × 12 months = €1,800.",
          "Electricity: estimated at €50 × 12 months = €600.",
          "Lift maintenance: €100 × 12 months = €1,200.",
          "Insurance: €900 per year.",
          "Administration: €1,200 per year.",
          "Bank charges: €300 per year.",
          "Ordinary expenditure: €6,000. Show the reserve and extraordinary works separately.",
        ] },
        { id: 'separation', heading: "Money still owed is not available yet", paragraphs: [
          "Building work may depend on recovering overdue fees. The budget then needs to show how much remains to be collected and what happens to the supplier’s payment if it arrives late.",
          "Identify the reserve and funding for extraordinary works separately. Use of the reserve is subject to Article 4 of Decree-Law 268/94. Keeping funds in the same bank account does not make them freely interchangeable.",
        ], links: [{ label: 'Common reserve fund rules — Article 4', href: reserveLaw }] },
        { id: 'calendar', heading: "Insurance is due in January; fees arrive throughout the year", paragraphs: [
          "Annual insurance of €900 works out at €75 a month when calculating fees. But if it is due in January, the full €900 is needed then. With only that month’s €75 collected and no available opening balance for the expense, the gap is €825.",
          "Enter receipts and payments in the months when they are expected. This calendar shows cash shortages even when the annual totals balance. Decide how to fund the gap before making the commitment.",
        ] },
        { id: 'monitoring', heading: "Explain the difference beside the figure", paragraphs: [
          "If electricity was budgeted at €50 and the bill arrives at €65, there is €15 to explain. The tariff, consumption or number of billed days may have changed. That cause tells you more about next month than the percentage increase alone.",
        ], items: [
          "Keep the approved version even if the forecast is revised.",
          "Retain the document supporting each expense.",
          "Record the cause of the difference and any decision still needed.",
        ] },
      ],
      guide: { label: 'Read the Habitae budget creation guide', href: '/help/create-budget/' },
    },
  }),
  withFrench({
    id: 'spreadsheets',
    pt: {
      slug: 'gestao-condominio-excel-ou-software', title: 'Gestão de condomínio em Excel ou software: como decidir',
      description: 'Um pagamento parcial, uma correção e uma exportação: três situações para perceber se uma ferramenta resolve o trabalho que hoje faz em Excel.', category: 'Organização',
      sections: [
        { id: 'quando-excel', heading: "O que é que a folha deixou de resolver?", paragraphs: [
          "Se consegue explicar o saldo de uma fração e encontrar os pagamentos que o compõem, a folha de cálculo está a cumprir essa tarefa. Para decidir se vale a pena mudar, identifique o trabalho que a nova ferramenta precisa de resolver.",
          "Se tem duas versões do mapa, fórmulas alteradas sem explicação ou faturas que só uma pessoa sabe encontrar, leve esses problemas à demonstração. Peça ao fornecedor que mostre como os resolve.",
        ] },
        { id: 'sinais', heading: "Compare o trabalho de um mês", paragraphs: [
          "Preparar avisos de dívida inclui abrir o extrato, identificar pagamentos, procurar documentos e corrigir erros. É o tempo desse percurso completo que interessa comparar. Uma introdução de dados rápida pode deixar o resto do trabalho por fazer.",
        ], items: [
          "Pagamentos que ficaram por identificar.",
          "Valores escritos mais de uma vez.",
          "Correções necessárias antes de enviar os avisos.",
          "Passos que ainda dependem de ajuda do fornecedor.",
        ] },
        { id: 'teste', heading: "Experimente um pagamento incompleto e uma correção", paragraphs: [
          "Para testar sem usar dados de moradores, crie três frações fictícias (A, B e C) com uma quota de 40 € cada. Depois de registar 25 € pagos pela B, o total por receber deve cair de 120 € para 95 €. A ficha da B deve mostrar os 15 € em falta.",
          "Uma despesa fictícia de 60 € com o documento errado permite testar a correção. Depois de a corrigir, consegue perceber o que mudou? A exportação também merece ser aberta fora da aplicação, para confirmar que os dados são utilizáveis.",
          "Por fim, uma conta com permissão apenas de consulta não deve conseguir alterar os valores. Repetir estes passos em cada produto mostra como se comporta com pagamentos parciais, erros e acessos diferentes.",
        ] },
        { id: 'custo', heading: "A subscrição é só uma parte do custo", paragraphs: [
          "Há dados para importar, pessoas para aprenderem a usar o sistema e tarefas que podem continuar fora dele. Se o mapa mensal ainda tiver de ser refeito em Excel, esse tempo entra na comparação, juntamente com o preço com impostos e os limites do plano.",
          "Vale a pena ver a exportação e ler as condições de cancelamento antes de contratar. Funcionalidades previstas para uma versão futura ainda não contam como uma solução disponível.",
        ] },
        { id: 'transicao', heading: "Durante a mudança, de onde saem as cobranças?", paragraphs: [
          "Pode manter a folha antiga e o novo sistema enquanto confere os saldos. Escolha um deles como registo principal para emitir os avisos e evitar que o mesmo proprietário receba duas cobranças.",
          "Registe a data de passagem e os valores transportados. Guarde a folha anterior com os comprovativos para poder voltar à origem se surgir uma diferença depois da importação.",
        ] },
      ],
      guide: { label: 'Conhecer os primeiros passos no Habitae', href: '/ajuda/criar-primeiro-condominio/' },
    },
    en: {
      slug: 'condominium-management-excel-or-software', title: 'Condominium management: Excel or software?',
      description: 'A partial payment, a correction and an export: three ways to check whether a tool handles the work you currently do in Excel.', category: 'Organisation',
      sections: [
        { id: 'when-excel', heading: "What has the spreadsheet stopped solving?", paragraphs: [
          "If you can explain a unit’s balance and find the payments behind it, the spreadsheet is doing that job. To decide whether switching is worthwhile, identify the work the new tool needs to handle.",
          "If you have two competing schedules, unexplained formula changes or invoices only one person can find, bring those problems to the demonstration. Ask the supplier to show how the tool handles them.",
        ] },
        { id: 'signals', heading: "Compare a month’s work", paragraphs: [
          "Preparing arrears notices includes opening the statement, identifying payments, finding documents and correcting errors. Compare the time for that complete process. Fast data entry can still leave the rest of the work undone.",
        ], items: [
          "Payments left unidentified.",
          "Amounts entered more than once.",
          "Corrections needed before notices could be sent.",
          "Steps still requiring the supplier’s help.",
        ] },
        { id: 'test', heading: "Try a partial payment and a correction", paragraphs: [
          "To test without residents’ data, create three fictional units (A, B and C) each owing €40. After recording €25 paid by B, total receivables should fall from €120 to €95. B’s record should show €15 still due.",
          "A fictional €60 expense with the wrong document lets you test a correction. Once corrected, can you see what changed? Open the export outside the application too, to confirm the data is usable.",
          "Finally, a read-only account should not be able to change amounts. Repeating these steps in each product shows how it handles partial payments, mistakes and different access levels.",
        ] },
        { id: 'cost', heading: "The subscription is only part of the cost", paragraphs: [
          "There is data to import, people to train and work that may remain outside the system. If the monthly schedule still needs rebuilding in Excel, count that time alongside the tax-inclusive price and plan limits.",
          "See the export and read the cancellation terms before subscribing. Features planned for a later release do not yet count as an available solution.",
        ] },
        { id: 'handover', heading: "Which system sends notices during the change?", paragraphs: [
          "You can keep the old spreadsheet and new system while you check balances. Choose one as the master record for issuing notices to avoid sending an owner two demands.",
          "Record the cutover date and figures transferred. Keeping the old workbook with its supporting documents lets you trace a difference found after import.",
        ] },
      ],
      guide: { label: 'Explore the first steps in Habitae', href: '/help/create-first-condominium/' },
    },
  }),
];
// Fixed publication dates keep the archive stable across rebuilds and translations.
const publicationDates: Record<string, string> = {
  arrears: '2026-09-03',
  repairs: '2026-08-26',
  handover: '2026-08-18',
  fees: '2026-08-07',
  budget: '2026-07-23',
  spreadsheets: '2026-07-14',
};
export const blogPosts: Record<SiteLanguage, BlogPost[]> = withFrench({
  pt: posts.map(post => ({ id: post.id, published: publicationDates[post.id] ?? '2026-09-06', updated: '2026-09-06', legalReviewed: post.legalReviewed, ...post.pt })),
  en: posts.map(post => ({ id: post.id, published: publicationDates[post.id] ?? '2026-09-06', updated: '2026-09-06', legalReviewed: post.legalReviewed, ...post.en })),
});
blogPosts.fr = blogPosts.fr.map((post, index) => ({ ...post, category: translateText(blogPosts.pt[index].category, 'fr') }));
export const blogIndex = withFrench({
  pt: { title: 'Blog de gestão de condomínios', description: 'Guias para o dia a dia de quem administra condomínios em Portugal: cobranças, avarias, contas e documentos, com exemplos e referências à legislação.' },
  en: { title: 'Condominium management blog', description: 'Everyday guides for condominium managers in Portugal: collections, repairs, accounts and documents, with practical examples and references to Portuguese law.' },
});
export function blogPath(language: SiteLanguage, post?: BlogPost) {
  return `${language === 'pt' ? '' : `/${language}`}/blog/${post ? `${post.slug}/` : ''}`;
}
export function translatedBlogPost(language: SiteLanguage, slug: string) {
  const id = [...blogPosts.pt, ...blogPosts.en, ...blogPosts.fr].find(post => post.slug === slug)?.id;
  return blogPosts[language].find(post => post.id === id);
}
