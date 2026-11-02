import { withTranslations } from '../../shared/i18n.mjs';
import type { Language } from '../context/I18nContext';

import type { Article, Guide } from './helpTypes';
import { accountGuides } from './helpAccount';
import { financeGuides } from './helpFinance';
import { newGuides } from './helpGuides';
import { operationsGuides } from './helpOperations';
export type { Article, CategoryId } from './helpTypes';

// Checked against the application screens in the parent Habitae project.
// Keep IDs stable: they connect translations, the starting path and related guides.
const guides: Guide[] = [
  withTranslations({
    id: 'start', category: 'getting-started', next: ['condominium', 'glossary'],
    pt: {
      slug: 'comecar-aqui', title: 'É a sua primeira vez? Comece aqui.',
      excerpt: 'Do primeiro condomínio à primeira quota, pela ordem certa.',
      sections: [
        { heading: 'O que vai fazer no Habitae', paragraphs: ['O Habitae reúne os dados do edifício, as pessoas, as contas e os documentos do condomínio. Uma organização é a sua área de trabalho; dentro dela pode gerir os condomínios a que tem acesso.', 'Comece por um condomínio. Não precisa de preencher tudo de uma vez. O guia de configuração com o Habi, dentro da aplicação, mostra o próximo passo e guarda o progresso.'] },
        { heading: 'Tenha estes dados à mão', paragraphs: ['Prepare o nome e a morada do condomínio, a lista de frações e respetivas permilagens, os contactos dos proprietários e os valores do orçamento. Se ainda não tiver tudo, comece pelos dados que conhece e complete os restantes antes de gerar quotas.'] },
        { heading: 'Siga esta ordem', steps: ['Crie o condomínio e complete os dados que vão aparecer nos documentos.', 'Adicione as frações: por exemplo, apartamento A, garagem B ou loja C.', 'Registe as pessoas e associe cada uma à sua fração.', 'Registe o ponto de partida financeiro com um primeiro movimento ou uma posição bancária inicial, conforme os registos disponíveis.', 'Crie o orçamento: o período e as despesas previstas, incluindo a reserva.', 'Abra o Plano de Quotas, reveja os valores por fração e só depois gere as quotas.'], note: 'Gerar uma quota cria um valor a cobrar. Só registe um recebimento quando o dinheiro tiver sido recebido.' },
        { heading: 'Como encontrar cada área', paragraphs: ['Os caminhos destes guias seguem o menu da aplicação. “Pessoas e Frações → Frações” significa: abra o grupo Pessoas e Frações e escolha Frações.', 'No telemóvel, abra o menu para ver todas as áreas. Confirme sempre o condomínio selecionado antes de criar um registo.', 'Subscrição e faturação, Configurações e Administração estão no menu da conta: selecione o seu nome, no topo da página.'] },
        { heading: 'Depois da configuração', paragraphs: ['No dia a dia, registe despesas em Movimentos e pagamentos de quotas em Quotas e Recebimentos. Consulte a Linha cronológica para acompanhar a atividade. Prepare reuniões em Assembleias e encontre os PDFs guardados em Documentos.'] },
      ],
    },
    en: {
      slug: 'start-here', title: 'First time here? Start with this guide.',
      excerpt: 'From your first building to your first fee, in the right order.',
      sections: [
        { heading: 'What you will do in Habitae', paragraphs: ['Habitae keeps building details, people, accounts and documents together. An organisation is your workspace; inside it, you manage the condominiums you can access.', 'Start with one condominium. You can fill in its details gradually. The in-app setup guide, with Habi, shows the next step and remembers your progress.'] },
        { heading: 'Have these details ready', paragraphs: ['Gather the building name and address, units and their ownership shares, owner contacts and budget amounts. If some details are missing, start with what you know and complete the rest before generating fees.'] },
        { heading: 'Follow this order', steps: ['Create the condominium and complete the details that will appear on its documents.', 'Add its units: for example, apartment A, garage B or shop C.', 'Add people and link each person to their unit.', 'Record the financial starting point with a first transaction or opening bank position, using your existing records.', 'Create the budget: its period, expected expenses and reserve.', 'Open the Fee schedule, review the amounts for each unit, then generate the fees.'], note: 'Generating a fee creates an amount to collect. Record a payment only once the money has been received.' },
        { heading: 'Find your way around', paragraphs: ['Paths in these guides follow the app menu. “People and units → Units” means: open the People and units group, then choose Units.', 'On a phone, open the menu to see all areas. Check the selected condominium before creating a record.', 'Subscription and billing, Settings and Administration are in the account menu: select your name at the top of the page.'] },
        { heading: 'After setup', paragraphs: ['Record expenses in Transactions and fee payments in Fees and receipts. Use the Timeline to follow activity. Prepare meetings under Assemblies and find saved PDFs under Documents.'] },
      ],
    },
  }),
  withTranslations({
    id: 'condominium', category: 'getting-started', next: ['units', 'people'],
    pt: {
      slug: 'criar-primeiro-condominio', title: 'Criar o primeiro condomínio',
      excerpt: 'Crie o registo do edifício e saiba que dados pode completar depois.',
      sections: [
        { heading: 'Antes de começar', paragraphs: ['Entre em app.habitae.pt/app/. Para criar condomínios, a sua conta precisa da função Proprietário ou Administrador. Se trabalhar com várias organizações, escolha primeiro a organização correta no seletor “Organização”.'] },
        { heading: 'Criar o edifício', steps: ['Na página “Os seus condomínios”, escolha “Novo condomínio”. Se ainda não tiver nenhum, o botão chama-se “Criar primeiro condomínio”.', 'Preencha o Nome, por exemplo “Edifício Jardim”. Este campo é obrigatório.', 'Preencha o NIPC (número de identificação fiscal do condomínio), a Morada e o Código postal, se já os tiver.', 'Selecione “Criar”. O Habitae abre o novo condomínio e o Habi apresenta o guia de configuração.'], note: 'Se aparecer uma mensagem sobre o limite de condomínios do plano, arquive um condomínio que já não gere ou escolha um plano com mais capacidade em Subscrição e faturação.' },
        { heading: 'Completar os dados mais tarde', paragraphs: ['Dentro do condomínio, abra o menu da conta, no topo da página, e escolha “Configurações”. Em “Dados gerais”, confirme o nome, o NIF, a morada e o código postal antes de gerar documentos. No guia do Habi, o passo “Completar os dados do condomínio” leva-o ao mesmo sítio.'] },
        { heading: 'Não aparece o botão para criar?', paragraphs: ['Só as funções Proprietário e Administrador podem criar condomínios. Confirme a organização selecionada. Se continuar sem ver a opção, peça ao proprietário da organização para rever a sua função.'] },
      ],
    },
    en: {
      slug: 'create-first-condominium', title: 'Create your first condominium',
      excerpt: 'Add the building and learn which details you can fill in later.',
      sections: [
        { heading: 'Before you start', paragraphs: ['Sign in at app.habitae.pt/app/. To create condominiums, your account needs the Owner or Administrator role. If you work with several organisations, first choose the correct one in the Organisation selector.'] },
        { heading: 'Add the building', steps: ['On the Your condominiums page, choose “New condominium”. If you have none yet, the button is called “Create first condominium”.', 'Enter the Name, for example “Garden Building”. This field is required.', 'Add the NIPC (the condominium’s tax identification number), Address and Postal code if you have them.', 'Select “Create”. Habitae opens the new condominium and Habi shows the setup guide.'], note: 'If a message says you have reached your plan’s condominium limit, archive a condominium you no longer manage or choose a plan with more capacity in Subscription and billing.' },
        { heading: 'Complete the details later', paragraphs: ['Inside the condominium, open the account menu at the top of the page and choose “Settings”. Under General details, check the name, tax number, address and postal code before generating documents. In Habi’s setup guide, the “Complete the condominium details” step takes you to the same place.'] },
        { heading: 'Cannot see the create button?', paragraphs: ['Only the Owner and Administrator roles can create condominiums. Check the selected organisation. If the option is still missing, ask the organisation owner to review your role.'] },
      ],
    },
  }),
  withTranslations({
    id: 'units', category: 'people', next: ['people', 'glossary'],
    pt: {
      slug: 'adicionar-fracoes', title: 'Adicionar as frações do edifício',
      excerpt: 'Registe apartamentos, garagens ou lojas e a parte de cada um no condomínio.',
      sections: [
        { heading: 'O que é uma fração?', paragraphs: ['É uma unidade do edifício, como um apartamento, uma garagem ou uma loja. A letra identifica-a; a designação ajuda a reconhecê-la, por exemplo “2.º esquerdo”.', 'A permilagem indica a parte da fração no conjunto do edifício, em mil partes. Por exemplo, 50‰ corresponde a 5%. Use os valores dos documentos do edifício.'] },
        { heading: 'Adicionar uma fração', steps: ['Abra Pessoas e Frações → Frações e escolha “Nova Fração”.', 'Preencha a Letra da Fração, a Designação, o Tipo e o Andar, conforme se aplique.', 'Indique a Permilagem correta. Não use o valor inicial do formulário sem o confirmar.', 'Escolha quem paga a quota. Se houver divisão do pagamento, confirme as opções para proprietário e inquilino.', 'Selecione “Criar” e repita para as restantes unidades.'], note: 'Confira a lista e o total de permilagens apresentado. Num edifício completo, confirme que os valores correspondem aos documentos do condomínio.' },
        { heading: 'Corrigir ou eliminar uma fração', paragraphs: ['Use a ação Editar na fração para corrigir a letra, a designação, a permilagem ou os dados de pagamento. Guarde e confirme os dados antes de gerar novas quotas.', 'A ação Eliminar pede confirmação. Para uma mudança de proprietário, altere a relação da pessoa; não elimine a fração e o seu contexto apenas porque o titular mudou.'] },
        { heading: 'A fração ainda não tem proprietário?', paragraphs: ['Pode criar a fração primeiro. A seguir, registe a pessoa na área Pessoas e associe-a à fração. Escolher quem paga a quota não substitui essa associação.'] },
      ],
    },
    en: {
      slug: 'add-units', title: 'Add the building’s units',
      excerpt: 'Record apartments, garages or shops and each unit’s share of the building.',
      sections: [
        { heading: 'What is a unit?', paragraphs: ['A unit is an individual part of the building, such as an apartment, garage or shop. Its letter identifies it; a description such as “2nd floor, left” makes it easier to recognise.', 'Permilagem is the unit’s share of the building, expressed in thousandths. For example, 50‰ means 5%. Use the figures from the building’s documents.'] },
        { heading: 'Add a unit', steps: ['Open People and units → Units and choose “New unit”.', 'Enter the unit letter, description, type and floor as applicable.', 'Enter the correct ownership share. Check the form’s initial value before using it.', 'Choose who pays the fee. If payments are split, check the owner and tenant options.', 'Select “Create” and repeat for the remaining units.'], note: 'Check the unit list and the displayed total ownership shares against the building’s documents.' },
        { heading: 'Correct or delete a unit', paragraphs: ['Use Edit on the unit to correct its letter, description, ownership share or payment details. Save and check the values before generating new fees.', 'Delete asks for confirmation. For a change of owner, update the person’s relationship; do not delete the unit and its context just because the owner changed.'] },
        { heading: 'No owner linked yet?', paragraphs: ['You can create the unit first. Next, add the person under People and link them to the unit. Choosing who pays the fee does not create that link.'] },
      ],
    },
  }),
  withTranslations({
    id: 'people', category: 'people', next: ['people-changes', 'resident-access', 'map'],
    pt: {
      slug: 'associar-pessoas-fracoes', title: 'Associar pessoas às frações',
      excerpt: 'Ligue cada proprietário ou arrendatário ao apartamento, garagem ou loja certos.',
      sections: [
        { heading: 'Antes de começar', paragraphs: ['Crie primeiro as frações. Tenha o nome da pessoa e, quando disponíveis, o NIF, o email e o telefone. O email é útil para enviar recibos e comunicações.'] },
        { heading: 'Criar a pessoa e fazer a associação', steps: ['Abra Pessoas e Frações → Pessoas e selecione “Nova Pessoa”.', 'Preencha o nome e os contactos e selecione “Criar”.', 'Abra Pessoas e Frações → Frações e, no menu de opções da fração pretendida, escolha “Gerir Pessoas”.', 'Em “Atribuir Pessoa à Fração”, escolha a pessoa, o Tipo de Relação (Proprietário, Arrendatário, Usufrutuário ou Procurador) e a Data de Início.', 'Confirme os dados da associação e selecione “Atribuir”.'], note: 'Volte à fração e confirme que aparece a pessoa correta na relação escolhida.' },
        { heading: 'Pessoa registada não é uma conta de acesso', paragraphs: ['Adicionar um proprietário à lista de Pessoas guarda os seus dados no condomínio, mas não lhe dá acesso a nada.', 'Para um residente usar o portal dos residentes, abra o menu de opções da pessoa em Pessoas e Frações → Pessoas e escolha “Convidar residente”. A pessoa precisa de ter um email registado.', 'Os membros da equipa de gestão entram de outra forma: o proprietário da organização convida-os em Administração → Utilizadores.'] },
      ],
    },
    en: {
      slug: 'link-people-to-units', title: 'Link people to their units',
      excerpt: 'Connect each owner or tenant to the correct apartment, garage or shop.',
      sections: [
        { heading: 'Before you start', paragraphs: ['Create the units first. Have the person’s name and, where available, tax number, email and phone number ready. Email is useful for receipts and communications.'] },
        { heading: 'Add the person and link their unit', steps: ['Open People and units → People and select “New person”.', 'Enter their name and contact details, then select “Create”.', 'Open People and units → Units and, in the options menu of the relevant unit, choose “Manage people”.', 'In “Assign person to unit”, choose the person, the relationship type (Owner, Tenant, Usufructuary or Proxy) and the start date.', 'Check the association details and select “Assign”.'], note: 'Return to the unit and check that the correct person appears with the relationship you chose.' },
        { heading: 'A person record is not a login account', paragraphs: ['Adding an owner under People stores their details in the condominium, but gives them no access.', 'For a resident to use the resident portal, open the person’s options menu in People and units → People and choose “Invite resident”. The person needs an email address on record.', 'Management team members join differently: the organisation owner invites them in Administration → Users.'] },
      ],
    },
  }),
  withTranslations({
    id: 'budget', category: 'finance', next: ['budget-details', 'schedule'],
    pt: {
      slug: 'criar-orcamento', title: 'Criar o orçamento do condomínio',
      excerpt: 'Defina o que prevê gastar antes de calcular as quotas.',
      sections: [
        { heading: 'Orçamento, em palavras simples', paragraphs: ['É o plano de despesas para um período. Uma rubrica ou categoria é um grupo de despesas, como Limpeza, Seguro ou Eletricidade. O orçamento serve de base ao cálculo das quotas; não é um registo de dinheiro já gasto.'] },
        { heading: 'Criar e preencher', steps: ['Abra Financeiro → Orçamento e selecione “Novo Orçamento”.', 'Escolha o Ano e confirme a Data Início e a Data Fim do exercício.', 'No campo FCR (%), indique a percentagem do fundo comum de reserva de acordo com o orçamento do condomínio e selecione “Criar”.', 'No orçamento criado, use “Nova Categoria” para adicionar cada rubrica com o Nome, o Valor Planeado e o Tipo.', 'Reveja os totais e, em “Aplicar a”, as frações abrangidas por cada categoria antes de abrir o Plano de Quotas.'], note: 'Confirme o período, as categorias e os valores. Um orçamento criado mas sem despesas ainda não representa o plano financeiro completo.' },
        { heading: 'Um exemplo', paragraphs: ['Se prevê gastar 1 200 € por ano em limpeza, registe 1 200 € nessa categoria do orçamento anual. Quando pagar uma fatura de 100 €, registe essa despesa em Movimentos e associe-a à categoria Limpeza. Assim pode comparar o previsto com o gasto.'] },
      ],
    },
    en: {
      slug: 'create-budget', title: 'Create the condominium budget',
      excerpt: 'Plan expected spending before calculating fees.',
      sections: [
        { heading: 'A budget in plain language', paragraphs: ['A budget is your spending plan for a period. A category groups expenses such as Cleaning, Insurance or Electricity. The budget is used to calculate fees; it does not record money already spent.'] },
        { heading: 'Create and fill in the budget', steps: ['Open Finance → Budget and select “New budget”.', 'Choose the year and check the financial period’s start and end dates.', 'In the Reserve fund (%) field, enter the common reserve fund percentage from the condominium’s budget and select “Create”.', 'In the new budget, use “New category” to add each line with its name, planned amount and type.', 'Review the totals and, under “Apply to”, the units each category covers before opening the Fee schedule.'], note: 'Check the period, categories and amounts. A newly created budget with no expenses is not yet a complete financial plan.' },
        { heading: 'An example', paragraphs: ['If you expect to spend €1,200 a year on cleaning, enter €1,200 in that annual budget category. When you pay a €100 invoice, record the expense in Transactions and link it to Cleaning. You can then compare planned and actual spending.'] },
      ],
    },
  }),
  withTranslations({
    id: 'transaction', category: 'finance', next: ['transaction-review', 'bank-import'],
    pt: {
      slug: 'registar-movimento', title: 'Registar uma receita ou despesa',
      excerpt: 'Anote dinheiro que entrou ou saiu, com data, valor e descrição.',
      sections: [
        { heading: 'Escolher o tipo de registo', paragraphs: ['Uma receita é dinheiro que entra; uma despesa é dinheiro que sai. Por exemplo, o pagamento da limpeza é uma despesa.', 'Se o dinheiro recebido paga uma quota, use Financeiro → Quotas e Recebimentos. Esse fluxo permite associar o pagamento à dívida certa.'] },
        { heading: 'Adicionar o movimento', steps: ['Abra Financeiro → Movimentos e selecione “Novo Movimento”.', 'Escolha Receita ou Despesa no campo Tipo.', 'Indique um valor positivo e a data do movimento. O Tipo indica se o dinheiro entrou ou saiu.', 'Preencha uma descrição clara, por exemplo “Limpeza das escadas — setembro”. Selecione a Categoria do Orçamento e o Fornecedor quando se aplicarem.', 'Selecione “Adicionar” e confirme que o registo aparece na lista com o tipo, a data e o valor corretos.'] },
        { heading: 'Evitar contar o mesmo dinheiro duas vezes', note: 'Antes de adicionar, procure o movimento na lista. Não volte a lançar como receita um pagamento de quota que já registou em Quotas e Recebimentos.' },
      ],
    },
    en: {
      slug: 'record-a-transaction', title: 'Record income or an expense',
      excerpt: 'Record money coming in or going out, with its date, amount and description.',
      sections: [
        { heading: 'Choose the right record', paragraphs: ['Income is money coming in; an expense is money going out. Paying the cleaner, for example, is an expense.', 'For money received to pay a fee, use Finance → Fees and receipts. That flow links the payment to the correct outstanding fee.'] },
        { heading: 'Add the transaction', steps: ['Open Finance → Transactions and select “New transaction”.', 'Choose Income or Expense in the Type field.', 'Enter a positive amount and the transaction date. The Type determines whether money came in or went out.', 'Use a clear description, such as “Stairwell cleaning — September”. Select the budget category and supplier where relevant.', 'Select “Add” and check that the list shows the correct type, date and amount.'] },
        { heading: 'Avoid counting the same money twice', note: 'Search the list before adding a transaction. Do not add a separate income record for a fee payment you already recorded in Fees and receipts.' },
      ],
    },
  }),
  withTranslations({
    id: 'schedule', category: 'fees', next: ['standalone', 'payment'],
    pt: {
      slug: 'criar-plano-quotas', title: 'Criar um plano de quotas',
      excerpt: 'Transforme o orçamento em valores a cobrar a cada fração.',
      sections: [
        { heading: 'Antes de gerar', paragraphs: ['Confirme as frações, as permilagens, as pessoas associadas e quem paga cada quota. Prepare o orçamento com as categorias e os valores do período pretendido.', 'O plano de quotas distribui os valores do orçamento pelas frações. A pré-visualização permite rever os cálculos antes de criar as cobranças.'] },
        { heading: 'Rever e gerar o plano', steps: ['Abra Financeiro → Plano de Quotas.', 'Selecione “Preparar plano” e escolha o orçamento correto.', 'Escolha o Vencimento mensal: é o dia limite de pagamento de cada mês.', 'Reveja a pré-visualização, incluindo as frações, os valores e a componente de reserva.', 'Selecione “Gerar Quotas”. Consulte o plano guardado e abra Financeiro → Quotas e Recebimentos para acompanhar as cobranças.'], note: 'As quotas geradas são valores a receber. Gerar o plano não significa que as pessoas já pagaram.' },
        { heading: 'Precisa de uma cobrança extra?', paragraphs: ['O botão “Quota Avulsa” permite preparar uma cobrança fora do plano habitual, por exemplo para uma obra. O formulário pede o valor, as datas, o método de distribuição e as frações abrangidas. Confirme essas opções antes de criar.'] },
        { heading: 'Não aparece nenhum orçamento?', paragraphs: ['Crie primeiro o orçamento em Financeiro → Orçamento e adicione as rubricas. Depois volte a “Preparar plano” e use “Atualizar orçamentos” se necessário.'] },
      ],
    },
    en: {
      slug: 'create-fee-schedule', title: 'Create a fee schedule',
      excerpt: 'Turn the budget into amounts to collect from each unit.',
      sections: [
        { heading: 'Before generating fees', paragraphs: ['Check units, ownership shares, linked people and who pays each fee. Prepare the budget with categories and amounts for the correct period.', 'The fee schedule distributes budget amounts across units. Its preview lets you review the calculations before creating charges.'] },
        { heading: 'Review and generate the schedule', steps: ['Open Finance → Fee schedule.', 'Select “Prepare schedule” and choose the correct budget.', 'Choose the Monthly due date: the payment deadline for each month.', 'Review the preview, including units, amounts and the reserve component.', 'Select “Generate fees”. Check the saved schedule and open Finance → Fees and receipts to follow the charges.'], note: 'Generated fees are amounts to collect. Generating the schedule does not mean people have paid.' },
        { heading: 'Need an extra charge?', paragraphs: ['Use “Standalone fee” to prepare a charge outside the regular schedule, for example for building works. The form asks for the amount, dates, distribution method and included units. Check these before creating the charge.'] },
        { heading: 'No budget appears?', paragraphs: ['Create a budget under Finance → Budget first and add its lines. Then return to “Prepare schedule” and use “Refresh budgets” if needed.'] },
      ],
    },
  }),
  withTranslations({
    id: 'payment', category: 'fees', next: ['credit', 'receipts'],
    pt: {
      slug: 'registar-pagamento-quota', title: 'Registar o pagamento de uma quota',
      excerpt: 'Registe o valor realmente recebido, incluindo pagamentos parciais, e consulte o recibo.',
      sections: [
        { heading: 'Antes de começar', paragraphs: ['Tenha a identificação de quem pagou, o valor recebido e a data. Confirme o recebimento nos seus registos. A quota deve já existir no Habitae.'] },
        { heading: 'Registar o recebimento', steps: ['Abra Financeiro → Quotas e Recebimentos. Pesquise o condómino ou a fração e confirme o orçamento selecionado, se existir.', 'Abra a pessoa para ver as suas quotas em aberto.', 'Selecione as linhas das quotas que o pagamento deve liquidar. Para pagar uma quota específica, deixe apenas essa linha selecionada.', 'Em “Registar recebimento”, indique o Valor recebido, a Data e a Forma de pagamento. Preencha a Data extrato banco quando se aplicar.', 'Confira o resumo e selecione “Registar recebimento” ou “Registar pagamento parcial”, conforme o valor.'], note: 'Confirme os totais Recebido e Em aberto. Uma quota só fica liquidada quando o valor em falta chega a zero.' },
        { heading: 'Exemplo de pagamento parcial', paragraphs: ['Uma quota tem 60 € em falta e a pessoa pagou 25 €. Selecione essa quota e registe 25 €. Continuam 35 € em aberto. Quando receber o restante, registe outro recebimento de 35 €.'] },
        { heading: 'Consultar o recibo', paragraphs: ['Na ficha da pessoa, abra “Recebimentos registados”. Use “Ver recibo PDF” para consultar o documento. O envio por email está disponível nas ações do recibo quando houver um destinatário. Confirme o endereço antes de enviar.'] },
        { heading: 'O valor é superior à dívida selecionada?', paragraphs: ['Confira se faltou selecionar alguma quota. Para dinheiro entregue antecipadamente, a página principal tem a opção “Saldo antecipado”, que guarda um valor para aplicação posterior. Não aumente o valor de uma quota só para o fazer coincidir com a transferência.'] },
      ],
    },
    en: {
      slug: 'record-fee-payment', title: 'Record a fee payment',
      excerpt: 'Record the amount actually received, including partial payments, and find the receipt.',
      sections: [
        { heading: 'Before you start', paragraphs: ['Have the payer’s identity, amount received and date ready. Confirm the money arrived using your records. The fee must already exist in Habitae.'] },
        { heading: 'Record the payment', steps: ['Open Finance → Fees and receipts. Search for the person or unit and check the selected budget, if shown.', 'Open the person to see their outstanding fees.', 'Select the fee rows covered by this payment. To pay one specific fee, select only that row.', 'In the payment form, enter the amount received, date and payment method. Add the bank statement date where applicable.', 'Check the summary, then select “Record receipt” or “Record partial payment”, depending on the amount.'], note: 'Check the Received and Outstanding totals. A fee is fully paid only when its remaining amount reaches zero.' },
        { heading: 'A partial payment example', paragraphs: ['A fee has €60 outstanding and the person pays €25. Select that fee and record €25. There is still €35 outstanding. When the rest arrives, record another payment of €35.'] },
        { heading: 'Find the receipt', paragraphs: ['On the person’s page, open the recorded receipts history. Use the view-receipt PDF action to open the document. Receipt actions also offer email delivery when a recipient is available. Check the address before sending.'] },
        { heading: 'More money than the selected debt?', paragraphs: ['Check whether you missed a fee when selecting rows. For money paid in advance, use “Advance credit” on the main page to keep credit for later use. Do not increase a fee just to match the transfer.'] },
      ],
    },
  }),
  withTranslations({
    id: 'meeting', category: 'assemblies', next: ['meeting-votes', 'minutes'],
    pt: {
      slug: 'preparar-reuniao', title: 'Preparar uma reunião e a respetiva ata',
      excerpt: 'Comece pela convocatória; depois registe presenças, decisões e a ata.',
      sections: [
        { heading: 'Convocatória e ata: qual é a diferença?', paragraphs: ['A convocatória anuncia quando e onde será a reunião e os assuntos a tratar. A ata regista o que aconteceu e as decisões tomadas. A aplicação separa estas duas etapas.'] },
        { heading: 'Preparar a convocatória', steps: ['Abra Assembleias → Reuniões e selecione “Nova Reunião”.', 'Na etapa Reunião, preencha o título, a data, o local e as horas de convocatória.', 'Abra Ordem de trabalhos e adicione os assuntos a discutir, por exemplo “Aprovação do orçamento”.', 'Selecione “Criar convocatória”. Reveja os dados guardados antes de exportar ou enviar a convocatória.'], note: 'Uma nova reunião mostra “Rascunho local” até ser criada. Confirme que ficou guardada na lista de reuniões.' },
        { heading: 'Enviar a convocatória', steps: ['Na lista de reuniões, abra o menu de opções da reunião.', 'Use “Ver convocatória” para rever o PDF antes de o enviar.', '“Enviar convocatórias” envia o email só aos titulares com consentimento documentado para receber comunicações por email.', 'Para os restantes, use “Cartas para correio registado”. “Cartas para todos os condóminos” prepara uma carta para cada titular.'], note: 'A convocatória exige pelo menos 10 dias de antecedência. Se a reunião estiver mais perto, altere a data antes de enviar. Registe o consentimento e guarde os comprovativos de envio em “Envios formais e comprovativos”.' },
        { heading: 'Depois de a reunião acontecer', paragraphs: ['Confirme na aplicação que a reunião se realizou para abrir as etapas Presenças, Votação e Ata. Registe quem esteve presente, os votos e as decisões de cada ponto.', 'Reveja o texto da ata e selecione “Guardar ata”. Use “Finalizar ata” depois da revisão; a finalização bloqueia alterações acidentais. A lista de assinaturas e as procurações têm áreas próprias no grupo Assembleias.'] },
      ],
    },
    en: {
      slug: 'prepare-meeting', title: 'Prepare a meeting and its minutes',
      excerpt: 'Start with the notice, then record attendance, decisions and minutes.',
      sections: [
        { heading: 'Notice or minutes?', paragraphs: ['The meeting notice tells people when and where to meet and what will be discussed. The minutes record what happened and what was decided. The app separates these two stages.'] },
        { heading: 'Prepare the notice', steps: ['Open Assemblies → Meetings and select “New meeting”.', 'In the Meeting step, enter the title, date, location and meeting call times.', 'Open Agenda and add topics to discuss, for example “Budget approval”.', 'Select “Create meeting notice”. Review the saved details before exporting or sending the notice.'], note: 'A new meeting is a local draft until you create it. Check that it appears in the meeting list.' },
        { heading: 'Send the meeting notice', steps: ['In the meeting list, open the meeting’s options menu.', 'Use “View meeting notice” to check the PDF before sending it.', '“Send meeting notices” emails only the owners whose consent to receive communications by email is documented.', 'For everyone else, use “Letters for registered post”. “Letters for all owners” prepares a letter for every owner.'], note: 'The notice must go out at least 10 days before the meeting. If the meeting is sooner, change its date before sending. Record consent and keep proof of each delivery under “Formal deliveries and proofs”.' },
        { heading: 'After the meeting takes place', paragraphs: ['Confirm in the app that the meeting was held to open Attendance, Voting and Minutes. Record attendance, votes and decisions for each topic.', 'Review the minutes text and save it. Finalise after reviewing; finalisation locks against accidental changes. Signature list and Proxies have their own areas under Assemblies.'] },
      ],
    },
  }),
  withTranslations({
    id: 'documents', category: 'documents', next: ['official', 'receipts'],
    pt: {
      slug: 'encontrar-documentos', title: 'Encontrar recibos e documentos PDF',
      excerpt: 'Saiba onde consultar um recibo, uma ata ou um PDF já gerado.',
      sections: [
        { heading: 'Encontrar um PDF guardado', steps: ['Selecione o condomínio correto.', 'Abra Documentos, no menu principal.', 'Procure o documento na lista de documentos guardados, por baixo de “Gerar documentos oficiais”, e use “Abrir PDF”.'], note: 'Confirme o nome do condomínio, a pessoa e o período no documento antes de o partilhar.' },
        { heading: 'Onde preparar cada documento', paragraphs: ['Recibos: abra Financeiro → Quotas e Recebimentos, escolha a pessoa e consulte os recebimentos registados.', 'Convocatórias e atas: abra Assembleias → Reuniões e escolha a reunião. A Lista de Assinaturas e as Procurações estão no mesmo grupo do menu.', 'Declarações: em Documentos, a secção “Gerar documentos oficiais” prepara a Declaração para efeitos de IRS e a Declaração de não dívida a partir dos dados do condomínio. Escolha o titular e as datas pedidas, selecione “Gerar PDF” e reveja o documento.'] },
        { heading: 'Pesquisar e eliminar documentos', paragraphs: ['Na lista de documentos guardados, pesquise por pessoa, período ou ficheiro e filtre pelo tipo de documento. Para remover um PDF, use Eliminar no menu do documento e leia a confirmação. Durante 30 dias, pode recuperá-lo em Administração → Registos eliminados. Eliminar o PDF não corrige o pagamento nem a reunião de origem.', 'A área Documentos está disponível para as funções Proprietário, Administrador e Gestor. Uma conta de Consulta não a pode abrir, porque os documentos contêm dados pessoais dos condóminos.'] },
        { heading: 'O documento está vazio ou tem dados errados?', paragraphs: ['Confirme os dados de origem: os contactos em Pessoas, as associações em Frações e o nome, NIF e morada em Configurações. Volte à área onde gerou o documento para preparar uma versão com os dados corrigidos.'] },
      ],
    },
    en: {
      slug: 'find-documents', title: 'Find receipts and PDF documents',
      excerpt: 'Know where to find a receipt, meeting minutes or a previously generated PDF.',
      sections: [
        { heading: 'Find a saved PDF', steps: ['Select the correct condominium.', 'Open Documents in the main menu.', 'Find the document in the list of saved documents, below “Generate official documents”, and use “Open PDF”.'], note: 'Check the condominium name, person and period in the document before sharing it.' },
        { heading: 'Where to prepare each document', paragraphs: ['Receipts: open Finance → Fees and receipts, select the person and open their recorded receipts.', 'Notices and minutes: open Assemblies → Meetings and choose the meeting. Signature list and Proxies are in the same menu group.', 'Declarations: in Documents, the “Generate official documents” section prepares the income tax declaration and the no-debt declaration from condominium records. Choose the holder and dates requested, select “Generate PDF” and review the document.'] },
        { heading: 'Search and delete documents', paragraphs: ['In the list of saved documents, search by person, period or filename and filter by document type. To remove a PDF, use Delete in the document’s menu and read the confirmation. For 30 days you can recover it in Administration → Deleted records. Deleting the PDF does not correct its source payment or meeting.', 'The Documents area is available to the Owner, Administrator and Manager roles. A Read-only account cannot open it, because the documents contain residents’ personal data.'] },
        { heading: 'Missing or incorrect details?', paragraphs: ['Check the source records: contacts in People, associations in Units, and the building name, tax number and address in Settings. Return to the document’s original area to generate a version with the corrected details.'] },
      ],
    },
  }),
  withTranslations({
    id: 'team', category: 'account', next: ['permissions', 'resident-access', 'troubleshooting'],
    pt: {
      slug: 'convidar-equipa', title: 'Convidar a equipa de gestão',
      excerpt: 'Convide colegas para a área de gestão e escolha a função e os condomínios de cada um.',
      sections: [
        { heading: 'Equipa de gestão ou residentes?', paragraphs: ['A equipa de gestão trabalha na aplicação em app.habitae.pt/app/. A primeira conta é criada aí, com “Criar conta”, e fica como proprietário da organização. Os restantes membros da equipa entram através de um convite.', 'Os residentes não fazem parte da equipa. Não criam conta: recebem um convite enviado a partir de Pessoas e entram no portal em app.habitae.pt/resident/.'] },
        { heading: 'Onde gerir os acessos', paragraphs: ['Só o proprietário da organização pode convidar e gerir a equipa. Na página “Os seus condomínios”, abra o menu da conta, no topo da página, escolha “Administração” e depois “Utilizadores”.'] },
        { heading: 'Enviar o convite', steps: ['Selecione “Enviar convite”.', 'Indique o Email da pessoa.', 'Escolha a Função: Administrador, Gestor ou Consulta.', 'Assinale os condomínios a que a pessoa deve ter acesso.', 'Selecione “Enviar convite” para confirmar. A pessoa recebe um email com um link pessoal.'], note: 'O convite aparece na lista de convites pendentes, com a data de expiração. Os convites pendentes já contam para o limite de membros da equipa do plano.' },
        { heading: 'Que função escolher', paragraphs: ['Administrador: trabalha em todos os registos, cria condomínios, altera as Configurações e consulta a auditoria e os registos eliminados.', 'Gestor: regista e altera os dados do dia a dia, como movimentos, quotas, pessoas e documentos.', 'Consulta: só vê informação. Não faz alterações nem abre a área Documentos.', 'Só o proprietário da organização gere a equipa e a subscrição.'] },
        { heading: 'Aceitar o convite', paragraphs: ['A pessoa abre o link do email e escolhe “Aceitar convite”. Indica o nome e cria uma palavra-passe; se já tiver conta no Habitae, usa a palavra-passe atual. A partir daí, entra em app.habitae.pt/app/.'] },
        { heading: 'Se o convite não chegar', paragraphs: ['Confirme o endereço de email e peça à pessoa para verificar o spam. Se o convite expirou ou o endereço estava errado, use “Cancelar convite” e envie um novo com os dados corretos.'] },
        { heading: 'Alterar um acesso existente', paragraphs: ['Na mesma lista, use “Editar” para mudar o nome, o email, a função ou os condomínios de um utilizador. “Desativar” impede a pessoa de entrar até ser reativada. “Enviar link de palavra-passe” envia-lhe um link de recuperação válido durante 30 minutos. Cada pessoa deve usar a sua própria conta.'] },
      ],
    },
    en: {
      slug: 'invite-your-team', title: 'Invite your management team',
      excerpt: 'Invite colleagues to the management area and choose each person’s role and condominiums.',
      sections: [
        { heading: 'Management team or residents?', paragraphs: ['The management team works in the app at app.habitae.pt/app/. The first account is created there, with “Create account”, and becomes the organisation owner. Other team members join through an invitation.', 'Residents are not part of the team. They do not create an account: they receive an invitation sent from People and sign in to the portal at app.habitae.pt/resident/.'] },
        { heading: 'Where to manage access', paragraphs: ['Only the organisation owner can invite and manage the team. On the Your condominiums page, open the account menu at the top of the page, choose “Administration”, then “Users”.'] },
        { heading: 'Send the invitation', steps: ['Select “Send invitation”.', 'Enter the person’s email address.', 'Choose their Role: Administrator, Manager or Read-only.', 'Tick the condominiums they should access.', 'Select “Send invitation” to confirm. The person receives an email with a personal link.'], note: 'The invitation appears in the pending list with its expiry date. Pending invitations already count towards your plan’s team member limit.' },
        { heading: 'Which role to choose', paragraphs: ['Administrator: works on all records, creates condominiums, changes Settings and can view the audit log and deleted records.', 'Manager: records and edits day-to-day data, such as transactions, fees, people and documents.', 'Read-only: can only view information. Cannot make changes or open the Documents area.', 'Only the organisation owner manages the team and the subscription.'] },
        { heading: 'Accepting the invitation', paragraphs: ['The person opens the link in the email and chooses “Accept invitation”. They enter their name and create a password; if they already have a Habitae account, they use their current password. From then on, they sign in at app.habitae.pt/app/.'] },
        { heading: 'If the invitation does not arrive', paragraphs: ['Check the email address and ask the person to check spam. If the invitation expired or the address was wrong, use “Cancel invitation” and send a new one with the correct details.'] },
        { heading: 'Change existing access', paragraphs: ['In the same list, use “Edit” to change a user’s name, email, role or condominiums. “Deactivate” stops the person signing in until they are reactivated. “Send password link” emails them a recovery link that is valid for 30 minutes. Each person should use their own account.'] },
      ],
    },
  }),
  withTranslations({
    id: 'billing', category: 'account', next: ['billing-changes', 'access-code', 'permissions'],
    pt: {
      slug: 'subscricao-e-faturacao', title: 'Consultar a subscrição e a faturação',
      excerpt: 'Onde ver o plano, como funciona o período gratuito e onde gerir faturas, pagamento e cancelamento.',
      sections: [
        { heading: 'Subscrição ou quotas?', paragraphs: ['A subscrição é o serviço Habitae pago pela organização. As quotas são os valores cobrados às frações do condomínio. São registos diferentes.', 'A gestão da subscrição pertence ao proprietário da organização: a conta responsável pela área de trabalho. Aqui, “proprietário” não significa o proprietário de um apartamento.'] },
        { heading: 'Abrir a subscrição', steps: ['Selecione o seu nome, no topo da página, para abrir o menu da conta.', 'Escolha “Subscrição e faturação”.', 'Confira o plano atual, o preço, a periodicidade, a data da próxima renovação e a utilização face aos limites do plano.'], note: 'Qualquer membro da equipa pode consultar esta página. Só o proprietário da organização pode subscrever, mudar de plano, usar um código de acesso ou gerir a faturação.' },
        { heading: 'Período gratuito', paragraphs: ['Quando cria a conta, a organização tem 15 dias gratuitos com acesso a tudo. A página da subscrição mostra quantos dias faltam.', 'Se escolher o plano mensal durante esse período, a primeira cobrança só acontece quando os 15 dias terminarem. Se escolher o plano anual, tem 30 dias gratuitos antes da primeira cobrança. Os 30 dias aplicam-se apenas à primeira subscrição da organização.', 'Para subscrever, escolha o plano e a periodicidade e use o botão “Subscrever”. Paga com cartão ou Revolut Pay, sem sair do Habitae; os dados de pagamento são processados pela Stripe.', 'Se o período gratuito terminar sem subscrição, a organização fica bloqueada até o proprietário subscrever.'] },
        { heading: 'Preços sem IVA', paragraphs: ['Os preços do Habitae são isentos de IVA ao abrigo do artigo 53.º do CIVA. A página da subscrição mostra esta indicação.'] },
        { heading: 'Tem um código de acesso?', paragraphs: ['Se recebeu um código de acesso, por exemplo numa oferta, o proprietário pode introduzi-lo em “Tem um código de acesso?” e selecionar “Utilizar código”. O código ativa acesso gratuito durante um período, sem cartão. O guia sobre códigos de acesso explica os detalhes.'] },
        { heading: 'Gerir faturas, pagamento e cancelamento', paragraphs: ['Depois de subscrever, o proprietário usa “Gerir faturação no Stripe” para abrir o portal de faturação da Stripe. Aí pode consultar e descarregar faturas, atualizar o método de pagamento, corrigir os dados de faturação, como o NIF e a morada, e cancelar a subscrição. O cancelamento produz efeito no fim do período já pago.', 'As mudanças de plano não se fazem no portal: escolha o próximo plano na própria página da subscrição. O guia sobre mudanças de plano explica como.', 'Se a página indicar que a gestão é feita através do suporte, ou que o portal não está disponível, contacte o suporte. Se não for o proprietário da organização, peça-lhe para tratar do assunto.'] },
      ],
    },
    en: {
      slug: 'subscription-and-billing', title: 'Check subscription and billing',
      excerpt: 'Where to see your plan, how the free trial works and where to manage invoices, payment and cancellation.',
      sections: [
        { heading: 'Subscription or condominium fees?', paragraphs: ['The subscription pays for your organisation’s Habitae service. Condominium fees are charges collected from building units. They are separate records.', 'The organisation owner manages the subscription: this is the account responsible for the workspace. Here, “owner” does not mean an apartment owner.'] },
        { heading: 'Open the subscription', steps: ['Select your name at the top of the page to open the account menu.', 'Choose “Subscription and billing”.', 'Check the current plan, price, billing interval, next renewal date and usage against the plan’s limits.'], note: 'Any team member can view this page. Only the organisation owner can subscribe, change plan, use an access code or manage billing.' },
        { heading: 'Free trial', paragraphs: ['When you create your account, your organisation gets 15 free days with full access. The subscription page shows how many days are left.', 'If you choose the monthly plan during that time, the first charge only happens when the 15 days end. If you choose the yearly plan, you get 30 free days before the first charge. The 30 days apply only to the organisation’s first subscription.', 'To subscribe, choose the plan and billing interval and use the “Subscribe” button. You pay by card or Revolut Pay without leaving Habitae; payment details are processed by Stripe.', 'If the free trial ends without a subscription, the organisation is blocked until the owner subscribes.'] },
        { heading: 'VAT-exempt prices', paragraphs: ['Habitae prices are exempt from VAT under Article 53 of the Portuguese VAT Code (CIVA). The subscription page shows this note.'] },
        { heading: 'Have an access code?', paragraphs: ['If you received an access code, for example in a giveaway, the owner can enter it under “Have an access code?” and select “Use code”. The code turns on free access for a period, with no card needed. The access code guide explains the details.'] },
        { heading: 'Manage invoices, payment and cancellation', paragraphs: ['After subscribing, the owner uses “Manage billing in Stripe” to open Stripe’s billing portal. There they can view and download invoices, update the payment method, correct billing details such as the tax number and address, and cancel the subscription. Cancellation takes effect at the end of the period already paid.', 'Plan changes are not made in the portal: choose your next plan on the subscription page itself. The plan changes guide explains how.', 'If the page says billing is managed through support, or that the portal is unavailable, contact support. If you are not the organisation owner, ask them to handle it.'] },
      ],
    },
  }),
  withTranslations({
    id: 'glossary', category: 'getting-started', next: ['start', 'schedule'],
    pt: {
      slug: 'glossario', title: 'Palavras do condomínio, sem complicar',
      excerpt: 'Fração, permilagem, quota, FCR e outros termos explicados com exemplos.',
      sections: [
        { heading: 'Organização e condomínio', paragraphs: ['Organização: a área de trabalho da sua equipa no Habitae. Pode reunir vários condomínios.', 'Condomínio: o edifício que está a gerir, com as suas frações, pessoas, contas e documentos.'] },
        { heading: 'Fração e condómino', paragraphs: ['Fração: uma unidade do edifício, como um apartamento, loja ou garagem.', 'Condómino: proprietário de uma fração. Um arrendatário ou inquilino é a pessoa que a ocupa por arrendamento; registe a relação correta na aplicação.'] },
        { heading: 'Permilagem', paragraphs: ['A parte de cada fração no edifício, medida em mil partes (‰). Por exemplo, 100‰ equivale a 10%. Pode ser usada para distribuir despesas pelas frações.'] },
        { heading: 'Orçamento, rubrica e FCR', paragraphs: ['Orçamento: o plano de despesas de um período. Rubrica ou categoria: uma linha desse plano, como Seguro ou Limpeza.', 'FCR significa Fundo Comum de Reserva: dinheiro reservado pelo condomínio para despesas de conservação. Na aplicação, a componente de reserva aparece separada da quota base.'] },
        { heading: 'Quota, vencimento e recebimento', paragraphs: ['Quota: um valor a cobrar a uma fração. Vencimento: a data limite para o pagamento.', 'Recebimento: o registo do dinheiro que chegou. Recibo: o documento relativo ao pagamento.', 'Pendente: ainda há um valor a pagar. Vencido: a data limite já passou e há valor por pagar. Parcial: foi recebida apenas uma parte. Saldo antecipado: dinheiro entregue para usar em pagamentos futuros.'] },
        { heading: 'Convocatória, ordem de trabalhos e ata', paragraphs: ['Convocatória: o aviso que anuncia a reunião. Ordem de trabalhos: a lista dos assuntos a discutir. Ata: o registo do que aconteceu e das decisões tomadas.'] },
      ],
    },
    en: {
      slug: 'glossary', title: 'Condominium terms, made simple',
      excerpt: 'Units, ownership shares, fees, reserve funds and other terms with examples.',
      sections: [
        { heading: 'Organisation and condominium', paragraphs: ['Organisation: your team’s Habitae workspace. It can contain several condominiums.', 'Condominium: the building you manage, with its units, people, accounts and documents.'] },
        { heading: 'Unit and owner', paragraphs: ['Unit (fração): an individual apartment, shop or garage in the building.', 'Condominium owner (condómino): someone who owns a unit. A tenant occupies a unit under a rental arrangement; record the correct relationship in the app.'] },
        { heading: 'Ownership share: permilagem', paragraphs: ['Each unit’s share of the building, measured in thousandths (‰). For example, 100‰ equals 10%. It can be used to distribute expenses across units.'] },
        { heading: 'Budget, category and reserve fund', paragraphs: ['Budget: the spending plan for a period. Category: a line in that plan, such as Insurance or Cleaning.', 'FCR is the Portuguese abbreviation for the common reserve fund: money set aside by the condominium for conservation expenses. The app shows the reserve component separately from the base fee.'] },
        { heading: 'Fee, due date and payment', paragraphs: ['Fee: an amount to collect from a unit. Due date: the deadline for payment.', 'Payment received: a record of money that arrived. Receipt: the document for that payment.', 'Pending: an amount is still owed. Overdue: the deadline has passed with money still owed. Partial: only some of the amount has been received. Advance credit: money paid ahead for future payments.'] },
        { heading: 'Notice, agenda and minutes', paragraphs: ['Notice: the announcement of a meeting. Agenda: the topics to discuss. Minutes: the record of what happened and what was decided.'] },
      ],
    },
  }),
  withTranslations({
    id: 'troubleshooting', category: 'account', next: ['start', 'team', 'billing'],
    pt: {
      slug: 'resolver-duvidas', title: 'Não encontra uma opção ou um registo?',
      excerpt: 'Verifique o condomínio, os filtros e os acessos antes de tentar de novo.',
      sections: [
        { heading: 'Não vejo um condomínio', paragraphs: ['Confirme a organização selecionada. Se o condomínio foi arquivado, use “Mostrar arquivados” na página dos seus condomínios.', 'Se foi convidado, confirme que aceitou o convite com o email correto. Peça ao proprietário da organização para verificar se esse condomínio está incluído no seu acesso.'] },
        { heading: 'Não vejo um botão para criar ou editar', paragraphs: ['Algumas ações dependem da sua função. Uma conta de Consulta permite ver informação, mas não fazer alterações. Peça ao proprietário da organização para verificar a sua função. No telemóvel, abra o menu para encontrar as áreas que não aparecem na navegação principal.'] },
        { heading: 'Não encontro uma quota ou um pagamento', steps: ['Confirme o condomínio e o orçamento ou período selecionados.', 'Limpe a pesquisa e escolha “Todo o período” no seletor de orçamento. Se um cartão de estado (Pendente, Pago ou Vencido) estiver selecionado, selecione-o de novo para ver todas as quotas.', 'Pesquise pela pessoa ou fração e abra os detalhes.', 'Veja as quotas em aberto e os recebimentos registados. Um pagamento parcial ainda deixa um valor em falta.'], note: 'Antes de repetir um registo, confirme que o primeiro não ficou guardado. Assim evita duplicados.' },
        { heading: 'Não consigo gerar quotas', paragraphs: ['Confirme que existe um orçamento com valores e que as frações têm os dados necessários. No Plano de Quotas, selecione o orçamento e reveja a pré-visualização. Se não houver orçamento, crie-o primeiro.'] },
        { heading: 'A organização está bloqueada', paragraphs: ['Se o período gratuito terminou ou um pagamento falhou, a aplicação mostra a página da subscrição. O proprietário da organização pode subscrever ou atualizar o método de pagamento nessa página.'] },
        { heading: 'Ainda precisa de ajuda?', paragraphs: ['Anote o nome da área, o que tentou fazer e a mensagem apresentada. Partilhe esses detalhes com o administrador da sua organização para que consiga reproduzir o problema.'] },
      ],
    },
    en: {
      slug: 'troubleshooting', title: 'Cannot find an option or a record?',
      excerpt: 'Check the building, filters and access before trying again.',
      sections: [
        { heading: 'A condominium is missing', paragraphs: ['Check the selected organisation. If the condominium was archived, use “Show archived” on your condominiums page.', 'If you were invited, make sure you accepted using the correct email. Ask the organisation owner to check whether that condominium is included in your access.'] },
        { heading: 'A create or edit button is missing', paragraphs: ['Some actions depend on your role. A Read-only account can view information but cannot change it. Ask the organisation owner to check your role. On a phone, open the menu to find areas outside the main navigation.'] },
        { heading: 'A fee or payment is missing', steps: ['Check the selected condominium and budget or period.', 'Clear the search and choose “All periods” in the budget selector. If a status card (Pending, Paid or Overdue) is selected, select it again to see all fees.', 'Search for the person or unit and open the details.', 'Check outstanding fees and recorded receipts. A partial payment still leaves an amount outstanding.'], note: 'Before repeating an entry, check whether the first attempt was saved. This helps avoid duplicates.' },
        { heading: 'I cannot generate fees', paragraphs: ['Check that you have a budget with amounts and units with the required details. In the Fee schedule, select the budget and review the preview. If there is no budget, create it first.'] },
        { heading: 'The organisation is blocked', paragraphs: ['If the free trial has ended or a payment failed, the app shows the subscription page. The organisation owner can subscribe or update the payment method there.'] },
        { heading: 'Still need help?', paragraphs: ['Note the screen name, what you tried to do and the message displayed. Share these details with your organisation administrator so they can reproduce the problem.'] },
      ],
    },
  }),
];

// A shared reading order keeps Previous/Next, both translations and the index
// consistent. Related suggestions (`next`) are separate from this sequence.
export const helpReadingOrder = [
  'start', 'access', 'glossary', 'condominium', 'units', 'people',
  'people-changes', 'resident-access', 'resident-app', 'map', 'access-devices',
  'transaction', 'transaction-review', 'bank', 'bank-import', 'invoices',
  'trial-balance', 'budget', 'budget-details', 'schedule', 'standalone',
  'safes', 'payment', 'credit', 'corrections', 'reminders',
  'suppliers', 'maintenance', 'cleaning', 'notices', 'inbox', 'meeting', 'proxy',
  'signature', 'meeting-votes', 'minutes', 'documents', 'receipts',
  'official', 'pdf-design', 'timeline', 'workspace', 'team', 'permissions',
  'settings', 'portal-design', 'privacy', 'assistants', 'audit',
  'deleted-records', 'billing', 'billing-changes', 'access-code', 'troubleshooting',
];
const guidesById = new Map([...guides, ...accountGuides, ...financeGuides, ...operationsGuides, ...newGuides].map((guide) => [guide.id, guide]));
if (new Set(helpReadingOrder).size !== helpReadingOrder.length ||
    helpReadingOrder.length !== guidesById.size ||
    helpReadingOrder.some((id) => !guidesById.has(id))) {
  throw new Error('The help reading order must include every guide exactly once.');
}
const allGuides = helpReadingOrder.map((id) => guidesById.get(id)!);

export const helpArticles: Record<Language, Article[]> = withTranslations({
  pt: allGuides.map(({ id, category, next, pt }) => ({ id, category, next, ...pt, updated: '2 nov 2026' })),
  en: allGuides.map(({ id, category, next, en }) => ({ id, category, next, ...en, updated: '2 Nov 2026' })),
}, (articles, language) => articles.map(article => ({ ...article, updated: language === 'es' ? '2 nov 2026' : '2 nov. 2026' })));
