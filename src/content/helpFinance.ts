import { withTranslations } from '../../shared/i18n.mjs';
import type { Guide } from './helpTypes';

export const financeGuides: Guide[] = [
  withTranslations({
    id: 'transaction-review', category: 'finance', next: ['bank', 'corrections'],
    pt: {
      slug: 'conferir-corrigir-exportar-movimentos', title: 'Conferir, corrigir e exportar movimentos', excerpt: 'Use os filtros, reveja o FCR e exporte os registos que está a consultar.',
      sections: [
        { heading: 'Encontrar um movimento', steps: ['Abra Financeiro → Movimentos. Selecione o cartão Receitas ou Despesas para mostrar só esse tipo.', 'Use a pesquisa e, em “Filtros”, a data inicial e final, a categoria, a origem e o fundo de reserva.', 'Confira receita ou despesa, valor, data e origem do registo. Ordene a lista se isso ajudar a comparar com o extrato.'] },
        { heading: 'Corrigir ou eliminar', paragraphs: ['Nas ações de um movimento manual, use Editar, corrija os campos e selecione Guardar. Eliminar pede confirmação e recalcula os totais.', 'Os movimentos que vêm de uma quota paga ou estornada não têm estas ações: corrija-os em Financeiro → Quotas e Recebimentos. Não crie outro movimento para compensar um duplicado sem perceber os registos envolvidos.'] },
        { heading: 'Categoria de texto e categoria do orçamento', paragraphs: ['A Categoria de texto livre serve para descrever e filtrar. A Categoria do Orçamento cria a ligação à rubrica de planeamento. Escrever o mesmo nome no campo livre não substitui selecionar a rubrica.'] },
        { heading: 'Movimentos do fundo de reserva', paragraphs: ['O formulário tem a opção FCR. Uma despesa marcada como utilização da reserva pede confirmação específica; reveja-a antes de guardar.', 'Editar ou eliminar um movimento que afeta o FCR também altera os valores da reserva. Confira o FCR e o saldo disponível na Conta Bancária após a alteração.'] },
        { heading: 'Exportar CSV', steps: ['Aplique os filtros pretendidos e confira as linhas visíveis.', 'Selecione Exportar CSV.', 'Abra o ficheiro numa folha de cálculo e confira datas, valores e o conjunto exportado.'], note: 'O CSV contém os movimentos visíveis com os filtros atuais. Para exportar um conjunto maior, limpe ou ajuste os filtros primeiro.' },
      ],
    },
    en: {
      slug: 'review-correct-export-transactions', title: 'Review, correct and export transactions', excerpt: 'Use filters, review reserve movements and export the records you are viewing.',
      sections: [
        { heading: 'Find a transaction', steps: ['Open Finance → Transactions. Select the Income or Expenses card to show only that type.', 'Use search and, under Filters, the start and end dates, category, source and reserve fund.', 'Check income or expense, amount, date and source. Sort the list if it helps comparison with a statement.'] },
        { heading: 'Correct or delete', paragraphs: ['Use Edit on a manual transaction, correct the fields and save. Delete asks for confirmation and recalculates totals.', 'Transactions that come from a paid or reversed fee do not have these actions: correct them in Finance → Fees and receipts. Do not create another transaction to offset a duplicate without understanding the related records.'] },
        { heading: 'Text category and budget category', paragraphs: ['The free-text category is for description and filtering. Budget Category links the transaction to the planned category. Typing the same name into free text does not replace selecting the budget category.'] },
        { heading: 'Reserve fund movements', paragraphs: ['The form has a reserve fund option. Expenses marked as using the reserve ask for a specific confirmation; review it before saving.', 'Editing or deleting reserve movements also changes reserve amounts. Check the reserve and available balance in Bank account afterwards.'] },
        { heading: 'Export CSV', steps: ['Apply your filters and check the visible rows.', 'Select Export CSV.', 'Open the file in a spreadsheet and check dates, amounts and the exported selection.'], note: 'The CSV contains transactions visible with the current filters. Clear or adjust filters first to export a wider selection.' },
      ],
    },
  }),
  withTranslations({
    id: 'bank', category: 'finance', next: ['bank-import', 'safes'],
    pt: {
      slug: 'saldo-conta-bancaria', title: 'Perceber o saldo da Conta Bancária', excerpt: 'Distinga o saldo do banco, o dinheiro reservado e o valor disponível.',
      sections: [
        { heading: 'Abrir e ler os valores', steps: ['Abra Financeiro → Conta Bancária.', 'No topo, a página mostra Banco − Alocado = Disponível.', 'Em “Detalhes”, veja o Extrato base e a respetiva data. Se aparecer “Sem extrato” ou um traço, ainda não existe uma posição bancária de referência.', 'Em “Alocação do saldo”, veja quanto está no FCR, nos cofres e disponível.'], table: { columns: ['Valor', 'Significado'], rows: [['Banco', 'Posição do extrato base, ajustada pelas entradas e saídas confirmadas no banco.'], ['Alocado', 'Dinheiro protegido pelo FCR e pelos cofres.'], ['Disponível', 'Saldo bancário menos o total alocado.'], ['Movimentos desde o extrato', 'Variação desde o extrato base.'], ['Saldo contabilístico', 'Total dos movimentos registados no sistema, que pode diferir da posição bancária.']] } },
        { heading: 'Exemplo: há dinheiro no banco, mas parte está reservada', paragraphs: ['Com 5 000 € no banco, 1 000 € de FCR e 500 € em cofres, o disponível é 3 500 €. Os 1 500 € alocados continuam no saldo bancário, mas têm uma finalidade definida.'] },
        { heading: 'Preparar o relatório', paragraphs: ['No seletor ao lado de “Abrir PDF”, escolha “PDF: conta toda” ou um orçamento e selecione “Abrir PDF”. O seletor só define o âmbito do PDF; os valores desta página referem-se sempre à conta toda.', 'Use “Importar extrato” para estabelecer ou atualizar a base e confira os registos em Financeiro → Movimentos. Esta página não é uma ligação em tempo real ao seu banco.'] },
      ],
    },
    en: {
      slug: 'understand-bank-balance', title: 'Understand the Bank account balance', excerpt: 'Separate the bank balance, reserved money and what is available.',
      sections: [
        { heading: 'Open and read the figures', steps: ['Open Finance → Bank account.', 'At the top, the page shows Bank − Allocated = Available.', 'Under Details, check the base statement and its date. “No statement” or a dash means there is no reference bank position yet.', 'Under Balance allocation, see how much is in the reserve fund, in protected funds and available.'], table: { columns: ['Figure', 'Meaning'], rows: [['Bank', 'Base statement position adjusted by bank-confirmed money in and out.'], ['Allocated', 'Money protected by the reserve fund and protected funds.'], ['Available', 'Bank balance minus total allocated.'], ['Transactions since the statement', 'Change since the base statement.'], ['Accounting balance', 'Total of recorded transactions, which can differ from the bank position.']] } },
        { heading: 'Example: some of the bank balance is reserved', paragraphs: ['With €5,000 in the bank, €1,000 in the reserve fund and €500 in protected funds, €3,500 is available. The allocated €1,500 remains in the bank balance but has a specified purpose.'] },
        { heading: 'Prepare the report', paragraphs: ['In the selector next to Open PDF, choose “PDF: whole account” or a budget, then select Open PDF. The selector only sets the PDF scope; the figures on this page always refer to the whole account.', 'Use Import statement to establish or update the base and check entries in Finance → Transactions. This page is not a live connection to your bank.'] },
      ],
    },
  }),
  withTranslations({
    id: 'bank-import', category: 'finance', next: ['bank', 'payment'],
    pt: {
      slug: 'importar-extrato-bancario', title: 'Importar e conferir um extrato bancário', excerpt: 'Reveja as linhas, evite duplicados e associe recebimentos às quotas corretas.',
      sections: [
        { heading: 'Preparar um ficheiro compatível', paragraphs: ['O importador lê tabelas de texto separadas por tabulações, ponto e vírgula ou vírgula. Procura o cabeçalho “DATA MOV.” e as colunas nesta ordem: data do movimento, data valor, descrição, valor e saldo. As datas dos movimentos devem estar no formato AAAA-MM-DD.', 'O seletor aceita .csv, .tsv, .txt e .xls, mas .xls só funciona quando contém este formato de texto. Ficheiros Excel binários, .xlsx e PDFs não são lidos. Não basta mudar a extensão de um ficheiro.'] },
        { heading: 'Rever antes de importar', steps: ['Abra Financeiro → Conta Bancária, selecione “Importar extrato” e escolha o ficheiro.', 'Em “Rever importação”, confira o titular, a conta, a data, o saldo final e cada movimento.', 'Use “Selecionar novos” ou assinale as linhas pretendidas. As linhas marcadas “Já existe” ficam bloqueadas. As linhas com aviso de possível duplicado (mesma data e valor, outra descrição) não ficam pré-selecionadas: assinale-as só se forem mesmo movimentos diferentes.', 'Nas receitas que pagam quotas, escolha a Fração / condómino e, em Rubrica / categoria, uma das rubricas de quotas em aberto. Nas despesas, escolha uma categoria de despesa do orçamento ou uma categoria geral.', 'A opção “Atualizar o saldo bancário base e a data do extrato” vem ativa. Desative-a se o saldo final ou a data extraídos não estiverem corretos.', 'Selecione “Importar selecionados” e confira as quantidades importadas e os duplicados ignorados.'] },
        { heading: 'Associar o dinheiro à dívida', note: 'Escolher uma fração e uma rubrica em aberto liquida as quotas mais antigas dessa rubrica e regista o recebimento na ficha do condómino. Se o valor exceder a dívida, o excedente fica como saldo antecipado. Sem essa afetação, a receita fica apenas como movimento bancário e não liquida a quota.' },
        { heading: 'Depois da importação', paragraphs: ['Confirme Movimentos, Conta Bancária e, se liquidou quotas, Quotas e Recebimentos. Não registe de novo os mesmos pagamentos manualmente.', 'Se não assinalar nenhum movimento, o botão passa a “Atualizar só o saldo base”: use-o quando só quer registar o saldo final do extrato. Se o formato for recusado ou os valores parecerem errados, cancele e obtenha uma exportação compatível do banco.'] },
      ],
    },
    en: {
      slug: 'import-bank-statement', title: 'Import and check a bank statement', excerpt: 'Review rows, avoid duplicates and assign incoming payments to the right fees.',
      sections: [
        { heading: 'Prepare a compatible file', paragraphs: ['The importer reads text tables separated by tabs, semicolons or commas. It looks for the header “DATA MOV.” and these columns in order: movement date, value date, description, amount and balance. Movement dates must use YYYY-MM-DD.', 'The picker accepts .csv, .tsv, .txt and .xls, but .xls works only when it contains this text format. Binary Excel files, .xlsx and PDFs are not parsed. Renaming an extension does not convert a file.'] },
        { heading: 'Review before importing', steps: ['Open Finance → Bank account, select Import statement and choose the file.', 'In Review import, check the account holder, account, date, final balance and every movement.', 'Use Select new or tick individual rows. Rows marked “Already exists” are locked. Rows flagged as a possible duplicate (same date and amount, different description) are not preselected: tick them only if they really are different movements.', 'For income that pays fees, choose the Unit / resident and, under Category / budget item, one of the open fee categories. For expenses, choose a budget expense category or a general category.', '“Update the base bank balance and statement date” is ticked by default. Untick it if the extracted final balance or date is wrong.', 'Select Import selected and check the imported count and the duplicates skipped.'] },
        { heading: 'Link money to outstanding fees', note: 'Choosing a unit and an open fee category settles the oldest fees in that category and records the payment on the resident’s page. If the amount exceeds the debt, the surplus becomes advance credit. Without this allocation, income is only a bank transaction and does not settle the fee.' },
        { heading: 'After importing', paragraphs: ['Check Transactions, Bank account and, if fees were settled, Fees and receipts. Do not manually record the same payments again.', 'If you tick no movements, the button changes to Update the base balance only: use it when you only want to record the statement’s final balance. Cancel if the format is rejected or values look wrong, and obtain a compatible bank export.'] },
      ],
    },
  }),
  withTranslations({
    id: 'safes', category: 'finance', next: ['standalone', 'bank'],
    pt: {
      slug: 'gerir-cofres-reservas', title: 'Gerir cofres e valores a repor', excerpt: 'Acompanhe dinheiro reservado para uma finalidade, como uma obra.',
      sections: [
        { heading: 'O que é um cofre?', paragraphs: ['Um cofre acompanha dinheiro reservado através de uma quota avulsa. É uma separação dentro dos registos do condomínio, não uma nova conta bancária.', 'O FCR é apresentado separadamente. Criar um cofre e incluir FCR numa cobrança são opções diferentes.'] },
        { heading: 'Criar e acompanhar', steps: ['Abra Financeiro → Plano de Quotas e selecione “Quota Avulsa”.', 'Ative “Criar cofre para esta quota avulsa” e confirme os valores antes de criar.', 'Registe os pagamentos recebidos em Quotas e Recebimentos.', 'Abra Financeiro → Cofres. Confira Reservado, Por Receber e Por Repor.'], note: 'O valor previsto da cobrança ainda não é dinheiro reservado. Os recebimentos e o valor usado anteriormente determinam quanto está efetivamente reservado.' },
        { heading: 'Registar dinheiro usado anteriormente', steps: ['No cofre correto, selecione “Editar”.', 'Indique o Valor usado anteriormente e uma Nota que explique o registo.', 'Em “Quotas que repõem este cofre”, selecione as quotas avulsas disponíveis destinadas à reposição.', 'Use “Guardar cofre” e reveja “Falta repor”.'], note: 'Este formulário regista um valor histórico usado e as suas fontes de reposição. Não efetua transferências bancárias nem substitui o registo de uma despesa.' },
        { heading: 'Exemplo de reposição', paragraphs: ['Se foram usados 300 € e já entraram 100 € pelas quotas ligadas à reposição, faltam repor 200 €. Consulte também a Conta Bancária para ver como os cofres afetam o disponível.'] },
      ],
    },
    en: {
      slug: 'manage-earmarked-funds', title: 'Manage protected funds and replenishment', excerpt: 'Track money set aside for a purpose such as building works.',
      sections: [
        { heading: 'What is a protected fund?', paragraphs: ['A protected fund tracks money earmarked through a standalone fee. It separates amounts within the building’s records; it is not a new bank account. Protected funds are listed under Finance → Reserve funds.', 'The common reserve fund (FCR) is shown separately. Creating a protected fund and including the reserve fund in a charge are different options.'] },
        { heading: 'Create and track a fund', steps: ['Open Finance → Fee schedule and select Standalone fee.', 'Tick “Create a protected fund for this standalone fee” and check amounts before creating it.', 'Record incoming payments in Fees and receipts.', 'Open Finance → Reserve funds and check Reserved, To receive and To replenish.'], note: 'A planned charge is not yet reserved cash. Receipts and previously used amounts determine what is actually reserved.' },
        { heading: 'Record previously used money', steps: ['On the correct fund, select Edit.', 'Enter the previously used amount and a note explaining it.', 'Under “Fees that replenish this protected fund”, select the available standalone fees meant for replenishment.', 'Select Save protected fund and check Still to replenish.'], note: 'This form records historical use and its replenishment sources. It does not transfer money or replace an expense entry.' },
        { heading: 'A replenishment example', paragraphs: ['If €300 was used and €100 has arrived through linked replenishment fees, €200 remains to replenish. Also check Bank account to see how protected funds affect available money.'] },
      ],
    },
  }),
  withTranslations({
    id: 'budget-details', category: 'finance', next: ['schedule', 'standalone'],
    pt: {
      slug: 'rubricas-distribuicao-orcamento', title: 'Distribuir rubricas e acompanhar o orçamento', excerpt: 'Escolha que frações participam em cada despesa e compare o previsto com o gasto.',
      sections: [
        { heading: 'Criar ou rever uma rubrica', steps: ['Abra Financeiro → Orçamento e selecione o orçamento.', 'Em Categorias de Despesas, selecione “Nova Categoria” e preencha Nome, Valor Planeado, Tipo e, se útil, Descrição.', 'Confirme “Contribui para o FCR”. Esta opção determina se a categoria entra na base de cálculo da reserva.', 'Guarde e confira os totais do orçamento. Pode usar Adicionar nas Categorias Sugeridas como ponto de partida; reveja o valor e a aplicação de cada uma.'] },
        { heading: 'Definir a aplicação por fração', steps: ['No menu de opções da categoria, selecione “Definir aplicação”.', 'Escolha Todas as frações, Tipos de fração específicos ou Frações personalizadas.', 'Se escolher tipos ou frações, assinale os participantes corretos.', 'Guarde a aplicação e reveja a pré-visualização do Plano de Quotas.'], note: 'Por exemplo, uma despesa da garagem pode ser atribuída apenas às frações abrangidas pelo orçamento aprovado. Confirme os participantes e as permilagens em vez de assumir que todas as despesas se repartem da mesma forma.' },
        { heading: 'Comparar o previsto com o realizado', paragraphs: ['Associe cada despesa registada em Movimentos à categoria do orçamento correspondente. O orçamento apresenta o planeado, a reserva, o gasto real e a execução.', 'Use “Imprimir” para preparar o relatório. Alterar o orçamento depois de gerar quotas exige rever os planos e cobranças já existentes; a alteração do planeamento não é um recebimento.'] },
        { heading: 'Eliminar ou corrigir', paragraphs: ['Use “Editar orçamento” para corrigir o ano, as datas, a percentagem do FCR ou a descrição. “Eliminar categoria” e “Eliminar orçamento” pedem confirmação; os registos eliminados podem ser recuperados em Registos eliminados durante 30 dias. Para corrigir uma cobrança já gerada, consulte também o guia de correções de quotas.'] },
      ],
    },
    en: {
      slug: 'budget-categories-and-allocation', title: 'Allocate budget categories and track spending', excerpt: 'Choose which units share each expense and compare planned and actual amounts.',
      sections: [
        { heading: 'Create or review a category', steps: ['Open Finance → Budget and select the budget.', 'Under Expense categories, select New category and enter the name, planned amount, type and, if useful, a description.', 'Check whether it contributes to the reserve fund. This determines whether the category is included in the reserve calculation base.', 'Save and check the budget totals. Add suggested categories as a starting point, then review each amount and allocation.'] },
        { heading: 'Choose participating units', steps: ['In the category’s options menu, select Set allocation.', 'Choose All units, Specific unit types or Custom units.', 'For types or custom units, select the correct participants.', 'Save the allocation and review the Fee schedule preview.'], note: 'For example, a garage expense can be assigned only to the units covered by the agreed budget. Check participants and ownership shares rather than assuming every expense is distributed identically.' },
        { heading: 'Compare planned and actual spending', paragraphs: ['Link each expense in Transactions to the corresponding budget category. The budget shows planned amounts, reserve, actual spending and execution.', 'Use Print for the report. If you change a budget after generating fees, review existing schedules and charges; changing a plan does not record a payment.'] },
        { heading: 'Correct or delete', paragraphs: ['Use Edit budget to correct the year, dates, reserve fund percentage or description. Delete category and Delete budget ask for confirmation; deleted records can be restored from Deleted records for 30 days. For an already generated charge, also read the fee-corrections guide.'] },
      ],
    },
  }),
  withTranslations({
    id: 'standalone', category: 'fees', next: ['safes', 'payment'],
    pt: {
      slug: 'criar-quota-avulsa', title: 'Criar uma quota avulsa ou extraordinária', excerpt: 'Prepare uma cobrança única ou prestações para uma obra ou outra despesa extra.',
      sections: [
        { heading: 'Escolher o tipo de cobrança', paragraphs: ['Em Financeiro → Plano de Quotas, selecione “Quota Avulsa” e dê-lhe um título claro, por exemplo “Pintura da fachada”.', '“Valor único com prazo de pagamento” cria uma quota por fração. “Parcelada mensalmente” cria uma quota por mês durante a duração escolhida.'] },
        { heading: 'Preencher e rever', steps: ['Escolha “Cobrar a”: a predefinição da fração, Proprietário, Inquilino ou Procurador.', 'Escolha distribuição por permilagem ou valores manuais por fração.', 'Na distribuição por permilagem, indique o valor total da cobrança. Em valores manuais, confira se está a introduzir o valor único ou o valor de cada mensalidade.', 'Indique a data de início, o prazo ou duração e o dia limite ou vencimento mensal.', 'Em “Aplicar a”, escolha todas as frações, tipos específicos ou frações personalizadas.', 'Reveja a distribuição apresentada e selecione “Criar quota avulsa”. Confirme as cobranças em Quotas e Recebimentos.'], note: 'Exemplo: em modo manual mensal, 20 € por fração durante 3 meses cria três cobranças de 20 €, totalizando 60 € por fração. Não introduza 60 € em cada mensalidade se esse é o total pretendido.' },
        { heading: 'Reserva e abatimento no orçamento', paragraphs: ['“Incluir Fundo Comum de Reserva” vem desligado para quotas avulsas. Ative-o apenas quando esta cobrança incluir reserva.', '“Criar cofre” protege os valores recebidos para essa finalidade. “Abater no orçamento” associa a cobrança à rubrica escolhida; fica indisponível quando cria um cofre. Confirme a opção adequada antes de guardar.'] },
        { heading: 'Alterar uma quota avulsa', paragraphs: ['No menu de opções da quota avulsa guardada, selecione “Editar”. Se já houver quotas pagas ou processadas, só pode alterar o título, as observações ou quem paga; os valores, as datas e as frações ficam bloqueados. Não crie um segundo plano para esconder um erro no primeiro.'] },
      ],
    },
    en: {
      slug: 'create-standalone-fee', title: 'Create a standalone or extraordinary fee', excerpt: 'Prepare a one-off charge or instalments for works or another extra expense.',
      sections: [
        { heading: 'Choose the charge type', paragraphs: ['In Finance → Fee schedule, select Standalone fee and give it a clear title such as “Facade painting”.', '“One-off amount with payment deadline” creates one fee per unit. “Monthly instalments” creates one fee per month for the chosen duration.'] },
        { heading: 'Complete and review', steps: ['Choose Charge to: Unit default, Owner, Tenant or Proxy.', 'Choose distribution by ownership share or manual amounts by unit.', 'For ownership-share distribution, enter the total charge. For manual amounts, check whether you are entering a one-off amount or each monthly instalment.', 'Enter the start date, deadline or duration and the deadline day or monthly due date.', 'Under Apply to, choose All units, Specific unit types or Custom units.', 'Review the distribution and create the standalone fee. Check the resulting charges in Fees and receipts.'], note: 'Example: a manual monthly amount of €20 for 3 months creates three €20 charges, totalling €60 per unit. Do not enter €60 for each month if that is the intended overall total.' },
        { heading: 'Reserve and budget offset', paragraphs: ['Include reserve fund is off by default for standalone fees. Enable it only when this charge should include reserve.', 'Creating a protected fund sets incoming money aside for its purpose. Deduct from budget links the charge to a category; it is unavailable when creating a protected fund. Check the appropriate option before saving.'] },
        { heading: 'Change a standalone fee', paragraphs: ['In the saved standalone fee’s options menu, select Edit. If fees have already been paid or processed, you can only change the title, notes or who pays; amounts, dates and units are locked. Do not create a second schedule to hide an error in the first.'] },
      ],
    },
  }),
  withTranslations({
    id: 'corrections', category: 'fees', next: ['credit', 'audit'],
    pt: {
      slug: 'corrigir-dispensar-reabrir-quotas', title: 'Corrigir, dispensar ou reabrir uma quota', excerpt: 'Escolha a ação certa para um valor errado, uma dispensa ou um pagamento mal registado.',
      sections: [
        { heading: 'Criar ou corrigir uma quota individual', paragraphs: ['Em Financeiro → Quotas e Recebimentos, “Nova Quota” cria uma cobrança individual. Escolha fração, valor, período, vencimento, estado e pagador e selecione “Registar”. Use Pendente se ainda não recebeu o dinheiro.', 'Abra a pessoa com “Abrir detalhe” e use “Editar” na quota para corrigir os campos disponíveis, como valor, período, datas, pagador e notas. Guarde e confira o valor em falta.'] },
        { heading: 'Dispensar uma cobrança', steps: ['Na quota em aberto, use “Dispensar”.', 'Escreva o motivo da dispensa e confirme “Dispensar quota”.', 'Confira o estado Dispensado e o motivo guardado.'], note: 'Dispensar significa deixar de cobrar essa quota. Não é um pagamento e não deve ser usado para esconder um recebimento em falta. A ação só aparece em quotas sem nenhum valor recebido.' },
        { heading: 'Reabrir uma quota paga por engano', steps: ['Abra a pessoa e os Recebimentos registados.', 'Na quota paga, use “Reabrir quota” e leia a confirmação.', 'Confira a quota em aberto e os saldos antes de registar o pagamento correto.'], note: 'Reabrir limpa os dados de liquidação da quota e repõe o saldo antecipado que tenha sido aplicado. Não devolve dinheiro pelo banco. Para devolver saldo antecipado, use “Devolver saldo”.' },
        { heading: 'Alterar o vencimento de um plano', paragraphs: ['Em Financeiro → Plano de Quotas, abra o menu de opções do plano do orçamento e selecione “Alterar vencimento”. Escolha o dia e guarde. A alteração aplica-se às quotas em aberto; confira as datas atualizadas.', 'No mesmo menu pode imprimir ou apagar o plano; “Ver quotas” mostra as linhas do plano para as editar ou eliminar. Planos com pagamentos concluídos não podem ser apagados. “Apagar orçamento” apaga todos os planos e quotas do orçamento selecionado; pode recuperá-los em Registos eliminados durante 30 dias, mas não é uma forma de corrigir uma única quota.'] },
      ],
    },
    en: {
      slug: 'correct-waive-reopen-fees', title: 'Correct, waive or reopen a fee', excerpt: 'Choose the right action for a wrong amount, a waiver or an incorrectly recorded payment.',
      sections: [
        { heading: 'Create or correct an individual fee', paragraphs: ['In Finance → Fees and receipts, New fee creates an individual charge. Choose the unit, amount, period, due date, status and payer, then select Record. Use Pending if the money has not arrived.', 'Open the person with Open details and use Edit on the fee to correct available fields such as amount, period, dates, payer and notes. Save and check the outstanding amount.'] },
        { heading: 'Waive a charge', steps: ['On the outstanding fee, use Waive.', 'Enter the waiver reason and confirm with Waive fee.', 'Check the Waived status and saved reason.'], note: 'Waiving means the fee is no longer being collected. It is not a payment and should not hide a missing receipt. The action only appears on fees with nothing received.' },
        { heading: 'Reopen a fee marked paid by mistake', steps: ['Open the person and their recorded receipts.', 'Use Reopen fee on the paid fee and read the confirmation.', 'Check the outstanding fee and balances before recording the correct payment.'], note: 'Reopening clears the fee’s settlement details and restores any advance credit applied. It does not send money back through the bank. Use Refund credit for an advance-credit refund.' },
        { heading: 'Change a schedule’s due day', paragraphs: ['In Finance → Fee schedule, open the budget schedule’s options menu and select Change due date. Choose the day and save. The change applies to outstanding fees; check the updated dates.', 'The same menu lets you print or delete the schedule; View fees shows the schedule’s rows so you can edit or delete them. Schedules with completed payments cannot be deleted. Delete budget removes all schedules and fees for the selected budget; you can restore them from Deleted records for 30 days, but it is not a way to correct one fee.'] },
      ],
    },
  }),
  withTranslations({
    id: 'credit', category: 'fees', next: ['payment', 'receipts'],
    pt: {
      slug: 'saldo-antecipado-devolucoes', title: 'Registar saldo antecipado e devoluções', excerpt: 'Guarde pagamentos adiantados, use-os em quotas futuras ou registe uma devolução.',
      sections: [
        { heading: 'Recebeu dinheiro antes de haver uma quota?', steps: ['Abra Financeiro → Quotas e Recebimentos e selecione “Saldo antecipado”.', 'Escolha o Condómino e indique o Valor recebido, a data e os restantes dados pedidos.', 'Selecione “Registar saldo” e confira o saldo disponível da pessoa.'], note: 'Este registo representa dinheiro já recebido. Não serve para criar um desconto, uma promessa de pagamento ou uma quota futura.' },
        { heading: 'Aplicar saldo às quotas', steps: ['Abra a pessoa com “Abrir detalhe” e, em Quotas em aberto, selecione as quotas que pretende liquidar.', 'Ative “Utilizar saldo disponível”.', 'No Valor recebido, indique apenas dinheiro novo recebido nessa operação; se só usar saldo existente, confirme que não está a registar uma nova entrada.', 'Reveja o saldo aplicado e o valor que fica em aberto e selecione “Registar recebimento” (ou “Registar pagamento parcial”, se ainda faltar pagar parte).'], note: 'Exemplo: há 30 € de saldo e uma quota de 50 €. Se a pessoa entregar mais 20 €, a liquidação combina os 30 € já existentes com os 20 € novos.' },
        { heading: 'Devolver saldo', steps: ['Na ficha da pessoa com saldo disponível, escolha “Devolver saldo”.', 'Indique o Valor devolvido, a Data da devolução, a Forma de pagamento e a Data extrato banco quando aplicável.', 'Selecione “Registar devolução” e confira a redução do saldo.'], note: 'Registe apenas uma devolução realmente efetuada e dentro do saldo disponível. O botão guarda o registo; não executa uma transferência bancária.' },
      ],
    },
    en: {
      slug: 'advance-balances-and-refunds', title: 'Record advance credit and refunds', excerpt: 'Keep advance payments, apply them to future fees or record a refund.',
      sections: [
        { heading: 'Money arrived before a fee exists?', steps: ['Open Finance → Fees and receipts and select Advance credit.', 'Choose the resident and enter the amount received, the date and other requested details.', 'Select Record credit and check the person’s available credit.'], note: 'This represents money already received. It is not a discount, a promise to pay or a future fee.' },
        { heading: 'Apply credit to fees', steps: ['Open the person with Open details and, under Outstanding fees, select the fees to settle.', 'Tick Use available credit.', 'Enter only newly received money as the amount received; if using existing credit alone, check that you are not recording a new cash inflow.', 'Review the credit applied and what remains outstanding, then select Record receipt (or Record partial payment if part is still unpaid).'], note: 'Example: €30 of credit and a €50 fee. If the person brings another €20, settlement combines the existing €30 with the new €20.' },
        { heading: 'Refund available credit', steps: ['On the person’s page, choose Refund credit when credit is available.', 'Enter the refunded amount, refund date, payment method and bank statement date where applicable.', 'Select Record refund and check the reduced balance.'], note: 'Record only an actual refund within the available credit. This button records it; it does not execute a bank transfer.' },
      ],
    },
  }),
  withTranslations({
    id: 'receipts', category: 'documents', next: ['payment', 'settings'],
    pt: {
      slug: 'recibos-personalizados-email', title: 'Gerar, agrupar e enviar recibos', excerpt: 'Prepare um PDF a partir de recebimentos já registados, sem cobrar duas vezes.',
      sections: [
        { heading: 'O recibo criado ao registar um pagamento', paragraphs: ['Quando regista um recebimento, a Habitae cria um único recibo consolidado para as quotas liquidadas. No ecrã “Pagamento registado”, use “Ver PDF” ou “Enviar recibo”; reveja o total e a pessoa antes de enviar.'] },
        { heading: 'Escolher os recebimentos', steps: ['Abra Financeiro → Quotas e Recebimentos e selecione “Gerar Recibo”.', 'Escolha o Condómino e o Orçamento e selecione “Abrir”.', 'Assinale os recebimentos que devem constar no documento.', 'Confira o número de recebimentos e o Total do recibo.', 'Selecione “Gerar recibo PDF” ou “Enviar por email”. O envio só fica disponível quando a pessoa tem email registado.'], note: 'Gerar um recibo não regista um pagamento nem altera quotas ou saldos. Só aparecem recebimentos já guardados; se não encontrar nenhum, registe primeiro o pagamento na área própria.' },
        { heading: 'Recibos de meses anteriores', paragraphs: ['Na mesma janela, “Gerar para todos os condóminos” cria um recibo por condómino e por mês com os recebimentos registados no orçamento selecionado. Os recibos ficam guardados nos documentos e nenhum email é enviado.'] },
        { heading: 'Agrupar na ficha da pessoa', paragraphs: ['Abra a pessoa com “Abrir detalhe”. Em Recebimentos registados, use “Agrupar por” Mês ou Dia de pagamento. Cada grupo tem ações para enviar ou exportar o recibo desse mês ou dia.', 'Para juntar só alguns recebimentos, use “Adicionar ao recibo personalizado” em cada linha e depois o botão “Recibo personalizado”, que exporta o PDF.'] },
        { heading: 'Falta o email ou o recibo está errado?', paragraphs: ['Corrija o email em Pessoas. Confirme a seleção, o orçamento, as datas e os pagamentos de origem antes de gerar outro documento.', 'Os textos opcionais dos recibos e do corpo do email estão em Configurações → Pagamentos e email. O logótipo, a assinatura e o aspeto dos PDFs estão em Configurações → Personalizar PDFs. Um PDF já descarregado não se altera quando edita os dados de origem.', 'Os recibos gerados ficam guardados em Documentos. Se o condómino tiver acesso ao portal do residente, pode descarregar aí os recibos que lhe são dirigidos.'] },
      ],
    },
    en: {
      slug: 'custom-receipts-and-email', title: 'Generate, group and email receipts', excerpt: 'Prepare a PDF from recorded payments without recording the money twice.',
      sections: [
        { heading: 'The receipt created when you record a payment', paragraphs: ['When you record a receipt, Habitae creates a single consolidated receipt for the fees settled. On the Payment recorded screen, use View PDF or Send receipt; check the total and the person before sending.'] },
        { heading: 'Choose the receipts', steps: ['Open Finance → Fees and receipts and select Generate receipt.', 'Choose the resident and budget, then select Open.', 'Select the received payments to include.', 'Check the count and receipt total.', 'Select Generate PDF receipt or Send by email. Sending is only available when the person has an email address on file.'], note: 'Generating a receipt does not record a payment or change fees or balances. Only saved receipts appear; record the payment first if none are available.' },
        { heading: 'Receipts for earlier months', paragraphs: ['In the same window, Generate for all residents creates one receipt per resident and per month from the payments recorded in the selected budget. The receipts are saved in documents and no email is sent.'] },
        { heading: 'Group on the person’s page', paragraphs: ['Open the person with Open details. Under recorded receipts, use Group by Month or Payment day. Each group has actions to send or export the receipt for that month or day.', 'To combine only some payments, use Add to custom receipt on each row, then the Custom receipt button, which exports the PDF.'] },
        { heading: 'Missing email or incorrect document?', paragraphs: ['Correct the email under People. Check selected records, budget, dates and original payments before generating another document.', 'Optional receipt text and email body text are under Settings → Payments and email. The logo, signature and PDF appearance are under Settings → Customize PDFs. A previously downloaded PDF does not change when you edit its source data.', 'Generated receipts are saved in Documents. If the resident has access to the resident portal, they can download the receipts addressed to them there.'] },
      ],
    },
  }),
  withTranslations({
    id: 'reminders', category: 'fees', next: ['notices', 'settings'],
    pt: {
      slug: 'avisos-debito-comunicacoes', title: 'Preparar avisos de débito e comunicações', excerpt: 'Escolha o documento e o destinatário certos para cobrar ou informar.',
      sections: [
        { heading: 'Preparar um aviso de dívida', steps: ['Abra Financeiro → Quotas e Recebimentos. Para um aviso anual, escolha o orçamento no seletor.', 'No menu de opções da pessoa, escolha “Aviso de débito até ao mês atual” ou “Aviso anual de débito” para abrir o PDF, ou “Enviar aviso de débito por email” para preparar o envio.', 'No envio, confira o destinatário, o Assunto e a Mensagem. A página indica também a cópia para a administração.', 'Se pretende alterar o prazo das quotas incluídas, ative a opção de alterar a data limite e escolha a Nova data limite.', 'Selecione “Enviar aviso” e confira a mensagem de resultado.'], note: 'Alterar a data limite neste envio muda as quotas em aberto incluídas no aviso. As quotas pagas não são alteradas. Deixe a opção desligada se só pretende lembrar o prazo existente.' },
        { heading: 'O que recebe o condómino?', paragraphs: ['O condómino recebe um email com o aviso de débito em PDF e a administração recebe uma cópia. O aviso enviado fica guardado em Documentos. Abrir o PDF pelo menu não envia nem guarda nada.', 'Se tiver acesso ao portal do residente, o condómino vê aí as quotas em aberto e pode descarregar os avisos e recibos que lhe são dirigidos. Se ativar as notificações no portal, recebe lembretes de pagamento três dias antes do vencimento, no próprio dia e sete dias depois.'] },
        { heading: 'Qual é a área certa para cada comunicação?', table: { columns: ['Precisa de enviar…', 'Use…'], rows: [['Uma cobrança ou recibo', 'Financeiro → Quotas e Recebimentos.'], ['Um aviso de obras, limpeza ou interrupção de serviço', 'Operação → Avisos.'], ['Uma convocatória de assembleia', 'Assembleias → Reuniões.']] } },
        { heading: 'O que fazem as opções de envio automático?', paragraphs: ['Configurações → Avisos automáticos guarda as preferências dos avisos de cobrança de quotas, o formato, os dias de pré-aviso e o aviso de seguros a expirar. A ativação exige um plano com envio automático de emails.', 'Na versão aqui documentada, estas preferências não têm um processo de envio agendado implementado. Não assuma que os emails saíram por ativar a opção: use as ações de envio disponíveis e confirme o resultado.'] },
        { heading: 'Se o envio falhar', paragraphs: ['Confirme o email em Pessoas e a mensagem apresentada. O aviso de débito precisa também de um email da administração configurado para a cópia. A conta precisa das permissões e funcionalidades do plano, e o serviço de email tem de estar disponível. Consulte os registos antes de repetir um envio para evitar duplicados.'] },
      ],
    },
    en: {
      slug: 'debt-notices-and-communications', title: 'Prepare debit notices and communications', excerpt: 'Choose the right document and recipient when collecting fees or sharing news.',
      sections: [
        { heading: 'Prepare a debit notice', steps: ['Open Finance → Fees and receipts. For an annual notice, choose the budget in the selector.', 'In the person’s options menu, choose “Debit notice up to the current month” or “Annual debit notice” to open the PDF, or “Send debit notice by email” to prepare the email.', 'Check the recipient, subject and message. The page also identifies the administration copy.', 'If you intend to change the included fees’ deadline, tick “Change the payment deadline in this notice” and choose the new deadline.', 'Select Send notice and check the result message.'], note: 'Changing the deadline here updates outstanding fees included in the notice. Paid fees are unchanged. Leave it off if you only want to remind someone of the existing deadline.' },
        { heading: 'What does the resident receive?', paragraphs: ['The resident receives an email with the debit notice as a PDF, and the administration receives a copy. The sent notice is saved in Documents. Opening the PDF from the menu does not send or save anything.', 'With access to the resident portal, the resident sees their outstanding fees there and can download the notices and receipts addressed to them. If they turn on notifications in the portal, they get payment reminders three days before the due date, on the day and seven days after.'] },
        { heading: 'Which area sends each communication?', table: { columns: ['To send…', 'Use…'], rows: [['A charge notice or receipt', 'Finance → Fees and receipts.'], ['Works, cleaning or service-interruption information', 'Operations → Notices.'], ['An assembly notice', 'Assemblies → Meetings.']] } },
        { heading: 'What do automatic notice settings do?', paragraphs: ['Settings → Automatic notices stores the fee collection notice preferences, format, advance-notice days and the expiring-insurance notice. Turning them on requires a plan with automated email.', 'In the version documented here, these preferences have no implemented scheduled sending process. Enabling them does not confirm emails were sent: use the available send actions and check the result.'] },
        { heading: 'If sending fails', paragraphs: ['Check the email under People and read the error. A debit notice also needs an administration email address configured for the copy. Your account needs the relevant permissions and plan features, and the email service must be available. Check records before repeating a send to avoid duplicates.'] },
      ],
    },
  }),
];
