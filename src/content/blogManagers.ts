import { withFrench } from '../../shared/i18n.mjs';
import type { BlogTranslation } from './blog';

const administration = 'https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/1966-34509075-49925475';
const appointment = 'https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/1966-34509075-65921910';
const urgentRepairs = 'https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/1966-34509075-49924375';
const incorporatedAnnexCase = 'https://diariodarepublica.pt/dr/detalhe/acordao/3263-2025-929497275';
const collectionExpensesCase = 'https://www.dgsi.pt/jtrc.nsf/c3fb530030ea1c61802568d9005cd5bb/6b8bf60fa5850841802589d7003f423e';
const condominiumLaw = 'https://diariodarepublica.pt/dr/detalhe/lei/8-2022-177350573';

export const managerPosts: Array<{ id: string; legalReviewed: string; pt: BlogTranslation; en: BlogTranslation; fr: BlogTranslation }> = [
  withFrench({
    id: 'arrears', legalReviewed: '2026-09-06',
    pt: {
      slug: 'quotas-condominio-em-atraso', title: 'Quotas de condomínio em atraso: o que confirmar antes de cobrar',
      description: 'Como conferir uma dívida antes do aviso de pagamento e o que a ata precisa de conter para a cobrança judicial.', category: 'Cobranças',
      sections: [
        { id: 'conferir-saldo', aliases: ['lembrete'], heading: "Conferir o pagamento e enviar o aviso", paragraphs: [
          "Há duas transferências de 40 € no banco, mas só uma aparece na ficha da fração. Antes de enviar a cobrança, confira a segunda: a quota pendente pode já estar paga.",
          "Outra fração pode ter transferido o mesmo valor. Procure a origem e a data do movimento e compare com o comprovativo. Se houve mudança de proprietário, confirme também quem responde pela dívida.",
          "Depois da conferência, envie o detalhe ao proprietário para que possa verificar os seus registos. Este exemplo usa uma quota fictícia de 40 €:",
          "«Bom dia. Ainda não identificámos o pagamento da quota de agosto da fração C, no valor de 40 €. Conferimos os movimentos disponíveis até 5 de setembro. Se já pagou, pode enviar-nos o comprovativo? Se o valor não corresponder ao que tem nos seus registos, diga-nos para conferirmos.»",
          "Acrescente o vencimento e os dados de pagamento e envie o aviso individualmente. Guarde a resposta junto dele. Antes de voltar a contactar o proprietário, veja se entretanto chegou um comprovativo ou se ficou algum valor contestado por esclarecer.",
        ] },
        { id: 'prazo-legal', heading: "Prazo para avançar judicialmente", paragraphs: [
          "O administrador tem o dever de instaurar a ação de cobrança previsto no artigo 6.º, n.º 4, do Decreto-Lei n.º 268/94. O n.º 5 fixa 90 dias a contar do primeiro incumprimento, quando a dívida é igual ou superior ao indexante dos apoios sociais (IAS) do respetivo ano civil, salvo deliberação em contrário da assembleia.",
          "A ação pode avançar antes de terminar esse prazo. Também é possível cobrar dívidas inferiores ao IAS. Ao avaliar a cobrança judicial, consulte a data do primeiro incumprimento, o IAS desse ano e as decisões da assembleia, mesmo que ainda esteja a enviar lembretes.",
        ], links: [{ label: 'Decreto-Lei n.º 268/94, artigo 6.º, n.os 4 e 5 — cobrança judicial e prazo', href: condominiumLaw }] },
        { id: 'ata', aliases: ['rotina'], heading: "Ata e documentos para a cobrança", paragraphs: [
          "O artigo 6.º, n.os 1 e 2, do Decreto-Lei n.º 268/94 exige que a ata que aprovou as contribuições mencione o montante anual de cada condómino e os vencimentos, para servir de título executivo contra o proprietário em falta. Leia também os anexos nela incorporados: a Relação do Porto, em 10/07/2025, reconheceu força executiva a uma ata que remetia os valores para um desses documentos. Entregue a ata e os anexos a quem preparar a execução, para verificar se documentam a obrigação e os vencimentos.",
          "O artigo 1436.º, n.º 1, alínea f), do Código Civil inclui a cobrança das contribuições aprovadas nas funções do administrador. Havendo juros ou sanções, confira a origem de cada valor: o artigo 6.º, n.º 3, abrange no título os juros de mora à taxa legal e as sanções aprovadas em assembleia ou previstas no regulamento.",
          "As despesas de cobrança e os honorários precisam de análise própria antes de entrarem na execução. Em 13/06/2023, a Relação de Coimbra excluiu despesas de contencioso do título executivo constituído pelas atas, apesar da aprovação em assembleia. A decisão respeita à execução com base nas atas; a eventual recuperação dessas despesas por outra via exige uma apreciação separada.",
          "Para permitir a conferência do saldo, reúna:",
        ], items: [
          "A ata, com as contribuições aprovadas e os vencimentos.",
          "Uma linha por obrigação: valor, pagamentos recebidos, datas e saldo.",
          "O cálculo e a base dos juros ou sanções reclamados.",
          "Os avisos enviados, as respostas e os comprovativos.",
          "A data do primeiro incumprimento e as decisões sobre a cobrança.",
        ], links: [{ label: 'Decreto-Lei n.º 268/94, artigo 6.º — republicação no anexo da Lei n.º 8/2022', href: condominiumLaw }, { label: 'Código Civil, artigo 1436.º — funções do administrador', href: administration }, { label: 'Relação do Porto, 10/07/2025, proc. 3263/23.0T8VLG-A.P1 — ata e anexo incorporado', href: incorporatedAnnexCase }, { label: 'Relação de Coimbra, 13/06/2023, proc. 1459/22.0T8CVL.C1 — despesas de contencioso', href: collectionExpensesCase }] },
      ], guide: { label: 'Organizar quotas e pagamentos no Habitae', href: '/ajuda/criar-plano-quotas/' },
    },
    en: {
      slug: 'overdue-condominium-fees-portugal', title: 'Overdue condominium fees in Portugal: what to check before collecting',
      description: 'How to check an outstanding balance before sending a demand, and what the minutes need to contain for court recovery.', category: 'Collections',
      sections: [
        { id: 'check-balance', aliases: ['reminder'], heading: "Check the payment and send the notice", paragraphs: [
          "The bank shows two €40 transfers, but only one appears in the unit’s record. Check the second before sending a demand: the outstanding fee may already be paid.",
          "Another unit may have transferred the same amount. Look up the source and date of the transaction and compare it with the payment confirmation. If the property has changed hands, also establish who is responsible for the debt.",
          "Once you have checked, send the owner a breakdown so they can compare it with their records. This example uses a fictional €40 fee:",
          "“Hello. We have not yet identified payment of unit C’s €40 August fee. We checked the transactions available up to 5 September. If you have already paid, could you send the confirmation? If the amount differs from your records, please let us know so that we can check it.”",
          "Add the due date and payment details, and send the notice individually. Keep the reply with it. Before contacting the owner again, check whether payment confirmation has arrived or a disputed amount still needs resolving.",
        ] },
        { id: 'legal-deadline', heading: "Deadline for court proceedings", paragraphs: [
          "Article 6(4) of Decree-Law 268/94 places a duty on the administrator to bring court proceedings to recover the covered amounts. Paragraph 5 sets a deadline of 90 days from the first default where the debt is at least the social support index (IAS) for the relevant calendar year, unless the assembly resolves otherwise.",
          "Proceedings can start before that deadline. Debts below the IAS threshold can also be collected. When assessing court recovery, check the first default date, that year’s IAS and the assembly’s decisions, even if you are still sending reminders.",
        ], links: [{ label: 'Decree-Law 268/94, Article 6(4)–(5) — proceedings and deadline (Portuguese)', href: condominiumLaw }] },
        { id: 'minutes', aliases: ['routine'], heading: "Minutes and collection records", paragraphs: [
          "Article 6(1) and (2) of Decree-Law 268/94 requires the minutes approving contributions to state each owner’s annual amount and the due dates to serve as an enforceable instrument against the defaulting owner. Read any annexes incorporated into them too: on 10 July 2025, the Porto Court of Appeal recognised the enforceability of minutes referring to amounts in such an annex. Give the minutes and annexes to the person preparing enforcement so they can check that these documents establish the obligation and due dates.",
          "Civil Code Article 1436(1)(f) includes collecting approved contributions among the administrator’s duties. For any interest or penalties, check the basis of each amount: Article 6(3) covers statutory late-payment interest and penalties approved by the assembly or included in the condominium rules.",
          "Collection expenses and lawyers’ fees need a separate assessment before inclusion in enforcement proceedings. On 13 June 2023, the Coimbra Court of Appeal excluded litigation expenses from the enforceable instrument constituted by the minutes, despite assembly approval. That decision concerns enforcement based on the minutes; possible recovery of those expenses through another route requires separate consideration.",
          "To allow the balance to be checked, gather:",
        ], items: [
          "The minutes showing approved contributions and due dates.",
          "A line per obligation: amount, payments, dates and balance.",
          "Calculations and the basis for any interest or penalties claimed.",
          "Notices, replies and payment confirmations.",
          "The first default date and decisions concerning collection.",
        ], links: [{ label: 'Decree-Law 268/94, Article 6 — republished in the annex to Law 8/2022 (Portuguese)', href: condominiumLaw }, { label: 'Civil Code, Article 1436 — administrator’s duties (Portuguese)', href: administration }, { label: 'Porto Court of Appeal, 10 July 2025, case 3263/23.0T8VLG-A.P1 — minutes and incorporated annex (Portuguese)', href: incorporatedAnnexCase }, { label: 'Coimbra Court of Appeal, 13 June 2023, case 1459/22.0T8CVL.C1 — litigation expenses (Portuguese)', href: collectionExpensesCase }] },
      ], guide: { label: 'Organise fees and payments in Habitae', href: '/help/create-fee-schedule/' },
    },
  }),
  withFrench({
    id: 'repairs', legalReviewed: '2026-09-06',
    pt: {
      slug: 'avarias-condominio-pedidos-reparacoes', title: 'Avarias no condomínio: como organizar pedidos e reparações',
      description: 'Do aviso de uma infiltração à confirmação da reparação: quando agir com urgência, comparar propostas e acompanhar o resultado.', category: 'Manutenção',
      sections: [
        { id: 'registar', heading: "Primeiro, localizar a avaria", paragraphs: [
          "«Há água na garagem» pode referir-se à entrada, a uma tubagem ou a uma parede. Antes de pedir uma deslocação, descubra onde está a água, quando apareceu e se continua a entrar. Uma fotografia do local e outra do ponto afetado ajudam o técnico a perceber o aviso.",
          "O pedido pode ficar registado assim: «Parede junto ao lugar 12; manchas observadas depois da chuva de 5 de setembro.» É um exemplo de descrição, não um diagnóstico. Juntar os avisos sobre o mesmo local evita abrir vários pedidos para uma só avaria. O contrato de manutenção e o seguro também podem ser relevantes; a responsabilidade pela despesa depende, entre outros elementos, de a parte afetada ser comum ou pertencer à fração.",
        ] },
        { id: 'urgencia', heading: "Quando a reparação não pode esperar pela assembleia", paragraphs: [
          "Se há perigo para pessoas ou risco de danos que podem surgir ou agravar-se a qualquer momento, a resposta não deve ficar à espera de uma reunião ordinária. O artigo 1427.º do Código Civil enquadra as reparações indispensáveis e urgentes nas partes comuns. Quando o administrador falta ou está impedido, qualquer condómino pode promovê-las nas condições desse artigo.",
          "Ao administrador cabe intervir nas situações urgentes que o exijam e convocar de imediato uma assembleia extraordinária para ratificar a atuação, nos termos do artigo 1436.º, n.º 1, alínea r). Perante perigo, o contacto com os serviços de emergência ou técnicos adequados vem antes do preenchimento do pedido.",
        ], links: [{ label: 'Código Civil, artigo 1427.º — reparações indispensáveis e urgentes', href: urgentRepairs }, { label: 'Código Civil, artigo 1436.º, n.º 1, alínea r) — atuação do administrador', href: administration }] },
        { id: 'orcamentos', heading: "São sempre precisos três orçamentos?", paragraphs: [
          "Não para todas as reparações. O artigo 1436.º, n.º 2, exige pelo menos três orçamentos de proveniências diferentes quando a assembleia vai deliberar sobre obras de conservação extraordinária ou inovações. A regra admite que o regulamento ou a assembleia disponham de outra forma.",
          "Para comparar propostas, os fornecedores precisam de estar a orçamentar o mesmo trabalho. Uma pode incluir materiais, remoção de resíduos e impostos; outra pode deixá-los de fora. Essa diferença tem de ficar esclarecida antes da escolha. A autorização da despesa continua a depender dos poderes de quem decide e da deliberação exigida para a obra em causa.",
        ], links: [{ label: 'Código Civil, artigo 1436.º, n.º 2 — orçamentos para obras', href: administration }] },
        { id: 'acompanhar', heading: "A fatura paga não encerra a avaria", paragraphs: [
          "Numa infiltração, pergunte ao técnico se corrigiu a origem identificada ou fez uma reparação provisória. Registe a resposta junto do trabalho efetuado. Se ainda falta observar o resultado, marque uma nova verificação e indique quem fica responsável por ela.",
          "Uma diferença entre a proposta e a fatura também precisa de explicação. Havendo trabalhos adicionais, procure a autorização correspondente. Quando voltar a chegar um aviso do mesmo local, o diagnóstico anterior e o que foi feito já estarão juntos.",
        ], items: [
          "No pedido: local, data, sinais observados e contacto.",
          "Na intervenção: diagnóstico, proposta, autorização e trabalho efetuado.",
          "No fecho: resultado confirmado ou verificação ainda pendente.",
        ] },
      ], guide: { label: 'Preparar a organização do condomínio no Habitae', href: '/ajuda/criar-primeiro-condominio/' },
    },
    en: {
      slug: 'condominium-repair-requests-portugal', title: 'Condominium repairs: organise requests, quotations and follow-up',
      description: 'From a report of water ingress to a completed repair: when urgent action is needed, how to compare quotations and what remains to be checked.', category: 'Maintenance',
      sections: [
        { id: 'record', heading: "Locate the fault first", paragraphs: [
          "“There is water in the garage” could mean the entrance, a pipe or a wall. Before booking a visit, establish where it is, when it appeared and whether water is still coming in. A photograph of the area and one of the affected spot help the technician understand the report.",
          "An entry might read: “Wall beside bay 12; marks seen after rain on 5 September.” That is an example of a description, not a diagnosis. Keeping reports about the same spot together avoids opening several requests for one fault. Maintenance contracts and insurance may also matter. Responsibility for the expense depends, among other things, on whether the affected part is common property or belongs to a unit.",
        ] },
        { id: 'urgency', heading: "When repairs cannot wait for a meeting", paragraphs: [
          "Where people are in danger or damage could occur or worsen at any moment, the response should not wait for an ordinary meeting. Civil Code Article 1427 covers indispensable and urgent repairs to common parts. If the administrator is absent or unable to act, any owner may initiate those repairs under the conditions in that article.",
          "Article 1436(1)(r) requires the administrator to act in urgent situations that call for intervention and immediately convene an extraordinary assembly to ratify the action. Where there is danger, contacting appropriate emergency services or technicians comes before completing the request form.",
        ], links: [{ label: 'Civil Code, Article 1427 — indispensable and urgent repairs (Portuguese)', href: urgentRepairs }, { label: 'Civil Code, Article 1436(1)(r) — administrator’s intervention (Portuguese)', href: administration }] },
        { id: 'quotations', heading: "Are three quotations always required?", paragraphs: [
          "Not for every repair. Article 1436(2) requires at least three quotations from different sources when the assembly is to decide on extraordinary conservation works or innovations. It allows the condominium rules or assembly to provide otherwise.",
          "For a useful comparison, suppliers need to quote for the same work. One price may include materials, waste removal and taxes while another excludes them. Resolve that difference before choosing. Approval of the expense still depends on the decision-maker’s authority and the resolution required for the particular work.",
        ], links: [{ label: 'Civil Code, Article 1436(2) — quotations for building works (Portuguese)', href: administration }] },
        { id: 'completion', heading: "A paid invoice does not close the fault", paragraphs: [
          "For water ingress, find out whether the technician addressed the identified cause or made a temporary repair. Keep that explanation with the work record. If the outcome still needs observing, schedule another check and name the person responsible.",
          "A difference between the quotation and invoice needs explaining too. For additional work, locate the corresponding authorisation. If another report arrives from the same spot, the previous diagnosis and repair history will be together.",
        ], items: [
          "Report: location, date, observations and contact.",
          "Intervention: diagnosis, quotation, authorisation and work completed.",
          "Closure: confirmed result or a check still outstanding.",
        ] },
      ], guide: { label: 'Prepare your condominium records in Habitae', href: '/help/create-first-condominium/' },
    },
  }),
  withFrench({
    id: 'handover', legalReviewed: '2026-09-06',
    pt: {
      slug: 'mudanca-administrador-condominio-checklist', title: 'Mudança de administrador do condomínio: checklist de passagem',
      description: 'As pastas chegaram, mas falta um extrato e o acesso ao email não funciona. O que conferir na passagem para a nova administração.', category: 'Administração',
      sections: [
        { id: 'mandato', heading: "Antes das pastas, a decisão de nomeação", paragraphs: [
          "Confirme na ata ou decisão de nomeação quem assume funções e em que condições. Uma lista de documentos entregues serve para conferir a passagem; não substitui essa nomeação.",
          "Pelo artigo 1435.º do Código Civil, a assembleia elege e exonera o administrador. Se não o eleger, pode haver nomeação judicial. O cargo pode ser exercido por um condómino ou por terceiro e dura, salvo disposição em contrário, um ano renovável. O administrador mantém-se em funções até à eleição ou nomeação do sucessor.",
        ], links: [{ label: 'Código Civil, artigo 1435.º — administrador', href: appointment }] },
        { id: 'documentos', heading: "Quem guarda o arquivo e presta contas?", paragraphs: [
          "São funções do administrador, previstas nas alíneas l) e n) do artigo 1436.º, n.º 1, do Código Civil. Para o administrador provisório, o artigo 1435.º-A, n.º 3, determina expressamente a entrega dos documentos à sua guarda ao sucessor quando cessa funções. Esse artigo não fixa um número de dias para a entrega.",
          "A lista abaixo ajuda a conferir o arquivo. É uma sugestão de trabalho, a adaptar aos documentos do prédio, e não um formulário obrigatório por lei.",
        ], links: [{ label: 'Código Civil, artigos 1435.º-A e 1436.º — documentos e prestação de contas', href: administration }] },
        { id: 'inventario', heading: "Escreva o que falta, não apenas o que recebeu", paragraphs: [
          "«Extratos de janeiro a agosto; falta maio» dá à nova administração uma pendência concreta. «Pasta do banco recebida» pode esconder a mesma falha. O inventário deve dizer até onde vai cada conjunto de documentos e onde estão as lacunas.",
          "O saldo bancário é uma fotografia de uma data. A conferência tem de usar essa mesma data: se o mapa mostrar 2 000 € e o extrato 1 850 €, há 150 € por explicar antes de transportar o valor. A reserva, as quotas por receber, os adiantamentos e as dívidas a fornecedores também ficam identificados, cada um por si.",
        ], items: [
          "Título constitutivo, regulamento, atas e decisões pendentes.",
          "Orçamentos, contas, extratos e comprovativos dos movimentos.",
          "Frações, contactos necessários à administração e mapa de quotas.",
          "Contratos, seguros, documentação técnica e processos em curso.",
        ] },
        { id: 'acessos', heading: "A nova administração consegue entrar nas contas?", paragraphs: [
          "Uma palavra-passe entregue pode já não funcionar. Testar o acesso ao email e à plataforma evita descobrir o problema quando for preciso enviar um aviso. No banco, a alteração de representantes segue o procedimento da instituição.",
          "As contas nominativas permitem retirar o acesso de quem sai sem partilhar credenciais pessoais. A mudança de permissões deve acompanhar a mudança efetiva de poderes e garantir o acesso de quem entra. No inventário entram ainda as chaves e os comandos; no arquivo ficam os dados recebidos e as correções feitas depois da conferência.",
        ] },
        { id: 'pendencias', heading: "Deixe escrito o próximo passo", paragraphs: [
          "«Tratar do seguro» obriga o sucessor a começar do zero. Com a apólice, a ação em falta, o prazo e o último contacto, já sabe por onde pegar. O mesmo vale para uma cobrança, uma avaria ou um processo em curso.",
          "A relação de entrega deve distinguir o que foi recebido, o que já foi conferido e o que continua por explicar. Pedir confirmação às duas partes ajuda a identificar divergências. Se faltar um documento essencial, o pedido escrito fica entre as pendências até haver resposta.",
        ], items: [
          "Assunto e documento de referência.",
          "Próxima ação e pessoa responsável.",
          "Prazo e origem dessa data.",
          "Último contacto e resposta recebida.",
        ] },
      ], guide: { label: 'Estruturar um primeiro condomínio no Habitae', href: '/ajuda/criar-primeiro-condominio/' },
    },
    en: {
      slug: 'condominium-administrator-handover-checklist', title: 'Changing condominium administrator: a practical handover checklist',
      description: 'The folders arrived, but a statement is missing and email access does not work. What to check when administration changes hands.', category: 'Administration',
      sections: [
        { id: 'appointment', heading: "Start with the appointment decision", paragraphs: [
          "Check the appointment minutes or decision to establish who takes office and on what terms. A list of delivered records helps check the transfer; it does not replace the appointment.",
          "Under Civil Code Article 1435, the assembly elects and removes the administrator. If it does not elect one, judicial appointment is possible. An owner or a third party may hold office, normally for a renewable one-year term unless otherwise provided. The administrator remains in office until a successor is elected or appointed.",
        ], links: [{ label: 'Civil Code, Article 1435 — administrator (Portuguese)', href: appointment }] },
        { id: 'documents', heading: "Who keeps the records and reports the accounts?", paragraphs: [
          "These are the administrator’s duties under Civil Code Article 1436(1)(l) and (n). For a provisional administrator, Article 1435-A(3) expressly requires the documents in their custody to be delivered to the successor when their functions end. That article does not set a number of days for delivery.",
          "The list below helps check the archive. It is a suggested working checklist to adapt to the building’s records, not a form required by law.",
        ], links: [{ label: 'Civil Code, Articles 1435-A and 1436 — documents and accounts (Portuguese)', href: administration }] },
        { id: 'inventory', heading: "Record what is missing as well as what arrived", paragraphs: [
          "“Statements January to August; May missing” gives the incoming administrator a specific task. “Bank folder received” can hide the same gap. The inventory should show the date range of each set of records and where it is incomplete.",
          "A bank balance is a snapshot of one date. Reconciliation needs to use that same date: if the schedule shows €2,000 and the statement €1,850, €150 needs explaining before the balance is carried forward. Identify the reserve, unpaid fees, advance payments and supplier debts separately too.",
        ], items: [
          "Constitutive title, rules, minutes and outstanding decisions.",
          "Budgets, accounts, bank statements and transaction evidence.",
          "Units, contacts needed for administration and fee schedule.",
          "Contracts, insurance, technical records and ongoing proceedings.",
        ] },
        { id: 'access', heading: "Can the incoming administrator access the accounts?", paragraphs: [
          "A supplied password may no longer work. Testing email and platform access avoids finding out when a notice needs sending. Changes to bank representatives follow the bank’s own procedure.",
          "Named accounts let you remove a departing person’s access without sharing private credentials. Permission changes should follow the effective change of authority while maintaining incoming access. Include keys and controls in the inventory, and keep the received records alongside any corrections made after checking them.",
        ] },
        { id: 'pending', heading: "Write down the next step", paragraphs: [
          "“Deal with insurance” leaves the successor starting from scratch. The policy, outstanding action, deadline and last contact give them somewhere to start. The same applies to a collection, repair or ongoing proceeding.",
          "Distinguish what was received, what has been checked and what remains unexplained. Seeking confirmation from both parties helps identify disagreements. Keep written requests for essential missing documents among the pending actions until there is a response.",
        ], items: [
          "Subject and supporting document.",
          "Next action and responsible person.",
          "Deadline and the source of that date.",
          "Last contact and response received.",
        ] },
      ], guide: { label: 'Set up a first condominium in Habitae', href: '/help/create-first-condominium/' },
    },
  }),
];
