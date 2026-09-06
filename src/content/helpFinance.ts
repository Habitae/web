import type { Guide } from './helpTypes';

export const financeGuides: Guide[] = [
  {
    id: 'transaction-review', category: 'finance', next: ['bank', 'corrections'],
    pt: {
      slug: 'conferir-corrigir-exportar-movimentos', title: 'Conferir, corrigir e exportar movimentos', excerpt: 'Use os filtros, reveja o FCR e exporte os registos que está a consultar.',
      sections: [
        { heading: 'Encontrar um movimento', steps: ['Abra Financeiro → Movimentos e escolha o contexto de consulta.', 'Use a pesquisa e os filtros de datas, categoria, origem e FCR para reduzir a lista.', 'Confira receita ou despesa, valor, data e origem do registo. Ordene a lista se isso ajudar a comparar com o extrato.'] },
        { heading: 'Corrigir ou eliminar', paragraphs: ['Nas ações de um movimento manual, use Editar, corrija os campos e selecione Guardar. Eliminar pede confirmação e recalcula os totais.', 'Se a entrada tiver origem numa quota ou noutro registo, trate a correção na área de origem. Não crie outro movimento para compensar um duplicado sem perceber os registos envolvidos.'] },
        { heading: 'Categoria de texto e categoria do orçamento', paragraphs: ['A Categoria de texto livre serve para descrever e filtrar. A Categoria do Orçamento cria a ligação à rubrica de planeamento. Escrever o mesmo nome no campo livre não substitui selecionar a rubrica.'] },
        { heading: 'Movimentos do fundo de reserva', paragraphs: ['O formulário tem a opção FCR. Uma despesa marcada como utilização da reserva pede confirmação específica; reveja-a antes de guardar.', 'Editar ou eliminar um movimento que afeta o FCR também altera os valores da reserva. Confira o FCR e o saldo disponível na Conta Bancária após a alteração.'] },
        { heading: 'Exportar CSV', steps: ['Aplique os filtros pretendidos e confira as linhas visíveis.', 'Selecione Exportar CSV.', 'Abra o ficheiro numa folha de cálculo e confira datas, valores e o conjunto exportado.'], note: 'O CSV contém os movimentos visíveis com os filtros atuais. Para exportar um conjunto maior, limpe ou ajuste os filtros primeiro.' },
      ],
    },
    en: {
      slug: 'review-correct-export-transactions', title: 'Review, correct and export transactions', excerpt: 'Use filters, review reserve movements and export the records you are viewing.',
      sections: [
        { heading: 'Find a transaction', steps: ['Open Finance → Transactions and choose the viewing context.', 'Use search and date, category, source and reserve filters to narrow the list.', 'Check income or expense, amount, date and source. Sort the list if it helps comparison with a statement.'] },
        { heading: 'Correct or delete', paragraphs: ['Use Edit on a manual transaction, correct the fields and save. Delete asks for confirmation and recalculates totals.', 'If an entry originates from a fee or another record, correct it in its source area. Do not create another transaction to offset a duplicate without understanding the related records.'] },
        { heading: 'Text category and budget category', paragraphs: ['The free-text category is for description and filtering. Budget Category links the transaction to the planned category. Typing the same name into free text does not replace selecting the budget category.'] },
        { heading: 'Reserve fund movements', paragraphs: ['The form has an FCR option. Expenses marked as using the reserve ask for a specific confirmation; review it before saving.', 'Editing or deleting reserve movements also changes reserve amounts. Check the reserve and available balance in Bank Account afterwards.'] },
        { heading: 'Export CSV', steps: ['Apply your filters and check the visible rows.', 'Select Export CSV.', 'Open the file in a spreadsheet and check dates, amounts and the exported selection.'], note: 'The CSV contains transactions visible with the current filters. Clear or adjust filters first to export a wider selection.' },
      ],
    },
  },
  {
    id: 'bank', category: 'finance', next: ['bank-import', 'safes'],
    pt: {
      slug: 'saldo-conta-bancaria', title: 'Perceber o saldo da Conta Bancária', excerpt: 'Distinga o saldo do banco, o dinheiro reservado e o valor disponível.',
      sections: [
        { heading: 'Abrir e ler os valores', steps: ['Abra Financeiro → Conta Bancária.', 'Veja a data do extrato base. Se aparecer “Sem extrato” ou um traço, ainda não existe uma posição bancária de referência.', 'Consulte os cartões e os Detalhes para perceber de onde vêm os valores.', 'Use “Atualizar” depois de corrigir ou importar registos.'], table: { columns: ['Valor', 'Significado'], rows: [['Saldo Bancário', 'Posição do extrato base, ajustada pelas entradas e saídas confirmadas no banco.'], ['Total Alocado', 'Dinheiro protegido pelo FCR e pelos cofres.'], ['Disponível', 'Saldo bancário menos o total alocado.'], ['Atualização', 'Variação desde o extrato base.'], ['Saldo contabilístico', 'Total dos movimentos registados no sistema, que pode diferir da posição bancária.']] } },
        { heading: 'Exemplo: há dinheiro no banco, mas parte está reservada', paragraphs: ['Com 5 000 € no banco, 1 000 € de FCR e 500 € em cofres, o disponível é 3 500 €. Os 1 500 € alocados continuam no saldo bancário, mas têm uma finalidade definida.'] },
        { heading: 'Preparar o relatório', paragraphs: ['Escolha “Conta toda” ou um orçamento no seletor e use “Abrir PDF”. O seletor define o contexto do PDF; os cartões desta página mostram a posição global da conta.', 'Use “Movimentos” para conferir os registos e “Importar extrato” para estabelecer ou atualizar a base. Esta página não é uma ligação em tempo real ao seu banco.'] },
      ],
    },
    en: {
      slug: 'understand-bank-balance', title: 'Understand the Bank Account balance', excerpt: 'Separate the bank balance, reserved money and what is available.',
      sections: [
        { heading: 'Open and read the figures', steps: ['Open Finance → Bank Account.', 'Check the base statement date. “No statement” or a dash means there is no reference bank position yet.', 'Read the summary cards and Details to understand the figures.', 'Refresh after correcting or importing records.'], table: { columns: ['Figure', 'Meaning'], rows: [['Bank balance', 'Base statement position adjusted by bank-confirmed money in and out.'], ['Total allocated', 'Money protected by the common reserve fund and earmarked funds.'], ['Available', 'Bank balance minus total allocated.'], ['Update', 'Change since the base statement.'], ['Ledger balance', 'Total of recorded transactions, which can differ from the bank position.']] } },
        { heading: 'Example: some of the bank balance is reserved', paragraphs: ['With €5,000 in the bank, €1,000 in the common reserve and €500 in earmarked funds, €3,500 is available. The allocated €1,500 remains in the bank balance but has a specified purpose.'] },
        { heading: 'Prepare the report', paragraphs: ['Select the whole account or a budget and open the PDF. This selector sets the PDF scope; the cards on this page show the global account position.', 'Open Transactions to check entries or Import statement to establish or update the base. This page is not a live connection to your bank.'] },
      ],
    },
  },
  {
    id: 'bank-import', category: 'finance', next: ['bank', 'payment'],
    pt: {
      slug: 'importar-extrato-bancario', title: 'Importar e conferir um extrato bancário', excerpt: 'Reveja as linhas, evite duplicados e associe recebimentos às quotas corretas.',
      sections: [
        { heading: 'Preparar um ficheiro compatível', paragraphs: ['O importador lê tabelas de texto separadas por tabulações, ponto e vírgula ou vírgula. Procura o cabeçalho “DATA MOV.” e as colunas nesta ordem: data do movimento, data valor, descrição, valor e saldo. As datas dos movimentos devem estar no formato AAAA-MM-DD.', 'O seletor aceita .csv, .tsv, .txt e .xls, mas .xls só funciona quando contém este formato de texto. Ficheiros Excel binários, .xlsx e PDFs não são lidos. Não basta mudar a extensão de um ficheiro.'] },
        { heading: 'Rever antes de importar', steps: ['Abra Financeiro → Conta Bancária → Importar extrato e escolha o ficheiro.', 'Em “Rever importação”, confira o titular, a conta, a data, o saldo final e cada movimento.', 'Escolha “Selecionar novos” ou assinale as linhas pretendidas. As linhas marcadas como duplicadas ficam excluídas; confira-as também, porque a comparação usa datas e valores.', 'Nas receitas que pagam quotas, escolha a Fração / condómino e a rubrica de quotas em aberto. Nas despesas, escolha a categoria apropriada.', 'Confirme se quer “Atualizar o saldo bancário base e a data do extrato”. Só use a opção quando o saldo e a data extraídos estiverem corretos.', 'Selecione “Importar selecionados” e confira as quantidades importadas e ignoradas.'] },
        { heading: 'Associar o dinheiro à dívida', note: 'Escolher uma fração e uma rubrica em aberto permite liquidar as quotas mais antigas dessa rubrica. Sem essa afetação, a receita fica apenas como movimento bancário e não liquida a quota.' },
        { heading: 'Depois da importação', paragraphs: ['Confirme Movimentos, Conta Bancária e, se liquidou quotas, Quotas e Recebimentos. Não registe de novo os mesmos pagamentos manualmente.', 'Pode atualizar apenas o saldo base sem selecionar movimentos, quando o extrato tiver um saldo final válido. Se o formato for recusado ou os valores parecerem errados, cancele e obtenha uma exportação compatível do banco.'] },
      ],
    },
    en: {
      slug: 'import-bank-statement', title: 'Import and check a bank statement', excerpt: 'Review rows, avoid duplicates and assign incoming payments to the right fees.',
      sections: [
        { heading: 'Prepare a compatible file', paragraphs: ['The importer reads text tables separated by tabs, semicolons or commas. It looks for the header “DATA MOV.” and these columns in order: movement date, value date, description, amount and balance. Movement dates must use YYYY-MM-DD.', 'The picker accepts .csv, .tsv, .txt and .xls, but .xls works only when it contains this text format. Binary Excel files, .xlsx and PDFs are not parsed. Renaming an extension does not convert a file.'] },
        { heading: 'Review before importing', steps: ['Open Finance → Bank Account → Import statement and choose the file.', 'Check the account holder, account, date, final balance and every movement in the review.', 'Select new rows or tick individual entries. Rows flagged as duplicates are excluded; review them too because matching uses dates and amounts.', 'For income that pays fees, select the unit/person and an outstanding fee category. For expenses, choose the appropriate category.', 'Decide whether to update the base bank balance and statement date. Only do so if the extracted balance and date are correct.', 'Import selected rows and check the imported and skipped counts.'] },
        { heading: 'Link money to outstanding fees', note: 'Choosing a unit and an outstanding fee category settles the oldest fees in that category. Without this allocation, income is only a bank transaction and does not settle the fee.' },
        { heading: 'After importing', paragraphs: ['Check Transactions, Bank Account and, if fees were settled, Fees and Receipts. Do not manually record the same payments again.', 'You can update only the base balance without selecting movements when the statement has a valid final balance. Cancel if the format is rejected or values look wrong, and obtain a compatible bank export.'] },
      ],
    },
  },
  {
    id: 'safes', category: 'finance', next: ['standalone', 'bank'],
    pt: {
      slug: 'gerir-cofres-reservas', title: 'Gerir cofres e valores a repor', excerpt: 'Acompanhe dinheiro reservado para uma finalidade, como uma obra.',
      sections: [
        { heading: 'O que é um cofre?', paragraphs: ['Um cofre acompanha dinheiro reservado através de uma quota avulsa. É uma separação dentro dos registos do condomínio, não uma nova conta bancária.', 'O FCR é apresentado separadamente. Criar um cofre e incluir FCR numa cobrança são opções diferentes.'] },
        { heading: 'Criar e acompanhar', steps: ['Abra Cobranças → Plano de Quotas e prepare uma Quota Avulsa.', 'Ative “Criar cofre para esta quota avulsa” e confirme os valores antes de criar.', 'Registe os pagamentos recebidos em Quotas e Recebimentos.', 'Abra Financeiro → Cofres. Confira Reservado, Por Receber e Por Repor.'], note: 'O valor previsto da cobrança ainda não é dinheiro reservado. Os recebimentos e o valor usado anteriormente determinam quanto está efetivamente reservado.' },
        { heading: 'Registar dinheiro usado anteriormente', steps: ['Use “Editar cofre” no cofre correto.', 'Indique o Valor usado anteriormente e uma Nota que explique o registo.', 'Em “Quotas que repõem este cofre”, selecione as quotas avulsas disponíveis destinadas à reposição.', 'Use “Guardar cofre” e reveja “Falta repor”.'], note: 'Este formulário regista um valor histórico usado e as suas fontes de reposição. Não efetua transferências bancárias nem substitui o registo de uma despesa.' },
        { heading: 'Exemplo de reposição', paragraphs: ['Se foram usados 300 € e já entraram 100 € pelas quotas ligadas à reposição, faltam repor 200 €. Consulte também a Conta Bancária para ver como os cofres afetam o disponível.'] },
      ],
    },
    en: {
      slug: 'manage-earmarked-funds', title: 'Manage earmarked funds and replenishment', excerpt: 'Track money set aside for a purpose such as building works.',
      sections: [
        { heading: 'What is a cofre?', paragraphs: ['A cofre tracks money earmarked through a standalone fee. It separates amounts within the building’s records; it is not a new bank account.', 'The common reserve fund is shown separately. Creating an earmarked fund and including FCR in a charge are different options.'] },
        { heading: 'Create and track a fund', steps: ['Open Collections → Fee Schedule and prepare a standalone fee.', 'Enable the option to create a cofre for that fee and check amounts before creating it.', 'Record incoming payments in Fees and Receipts.', 'Open Finance → Cofres and check Reserved, To receive and To replenish.'], note: 'A planned charge is not yet reserved cash. Receipts and previously used amounts determine what is actually reserved.' },
        { heading: 'Record previously used money', steps: ['Edit the correct fund.', 'Enter the previously used amount and a note explaining it.', 'Select available standalone fees that will replenish this fund.', 'Save and check the remaining replenishment amount.'], note: 'This form records historical use and its replenishment sources. It does not transfer money or replace an expense entry.' },
        { heading: 'A replenishment example', paragraphs: ['If €300 was used and €100 has arrived through linked replenishment fees, €200 remains to replenish. Also check Bank Account to see how earmarked funds affect available money.'] },
      ],
    },
  },
  {
    id: 'budget-details', category: 'finance', next: ['schedule', 'standalone'],
    pt: {
      slug: 'rubricas-distribuicao-orcamento', title: 'Distribuir rubricas e acompanhar o orçamento', excerpt: 'Escolha que frações participam em cada despesa e compare o previsto com o gasto.',
      sections: [
        { heading: 'Criar ou rever uma rubrica', steps: ['Abra Financeiro → Orçamento e selecione o orçamento.', 'Nas Categorias de Despesas, adicione Nome, Valor Planeado, Tipo e Descrição quando útil.', 'Confirme “Contribui para o FCR”. Esta opção determina se a categoria entra na base de cálculo da reserva.', 'Guarde e confira os totais do orçamento. Pode usar Adicionar nas Categorias Sugeridas como ponto de partida; reveja o valor e a aplicação de cada uma.'] },
        { heading: 'Definir a aplicação por fração', steps: ['Na categoria, use “Definir Aplicação”.', 'Escolha Todas as frações, Tipos de fração específicos ou Frações personalizadas.', 'Se escolher tipos ou frações, assinale os participantes corretos.', 'Guarde a aplicação e reveja a pré-visualização do Plano de Quotas.'], note: 'Por exemplo, uma despesa da garagem pode ser atribuída apenas às frações abrangidas pelo orçamento aprovado. Confirme os participantes e as permilagens em vez de assumir que todas as despesas se repartem da mesma forma.' },
        { heading: 'Comparar o previsto com o realizado', paragraphs: ['Associe cada despesa registada em Movimentos à categoria do orçamento correspondente. O orçamento apresenta o planeado, a reserva, o gasto real e a execução.', 'Use “Imprimir” para preparar o relatório. Alterar o orçamento depois de gerar quotas exige rever os planos e cobranças já existentes; a alteração do planeamento não é um recebimento.'] },
        { heading: 'Eliminar ou corrigir', paragraphs: ['Use a edição do orçamento para corrigir período, descrição ou percentagem. As categorias e o orçamento têm ações de eliminação; confira as associações e a mensagem apresentada antes de confirmar. Para corrigir uma cobrança já gerada, consulte também o guia de correções de quotas.'] },
      ],
    },
    en: {
      slug: 'budget-categories-and-allocation', title: 'Allocate budget categories and track spending', excerpt: 'Choose which units share each expense and compare planned and actual amounts.',
      sections: [
        { heading: 'Create or review a category', steps: ['Open Finance → Budget and select the budget.', 'Under expense categories, enter the name, planned amount, type and an optional description.', 'Check whether it contributes to FCR. This determines whether the category is included in the reserve calculation base.', 'Save and check the budget totals. Add suggested categories as a starting point, then review each amount and allocation.'] },
        { heading: 'Choose participating units', steps: ['Use the category’s allocation action, “Definir Aplicação”.', 'Choose all units, specific unit types or custom units.', 'For types or custom units, select the correct participants.', 'Save and review the Fee Schedule preview.'], note: 'For example, a garage expense can be assigned only to the units covered by the agreed budget. Check participants and ownership shares rather than assuming every expense is distributed identically.' },
        { heading: 'Compare planned and actual spending', paragraphs: ['Link each expense in Transactions to the corresponding budget category. The budget shows planned amounts, reserve, actual spending and execution.', 'Use Print for the report. If you change a budget after generating fees, review existing schedules and charges; changing a plan does not record a payment.'] },
        { heading: 'Correct or delete', paragraphs: ['Edit the budget to correct its period, description or percentage. Categories and budgets have delete actions; check associations and the displayed message before confirming. For an already generated charge, also read the fee-corrections guide.'] },
      ],
    },
  },
  {
    id: 'standalone', category: 'fees', next: ['safes', 'payment'],
    pt: {
      slug: 'criar-quota-avulsa', title: 'Criar uma quota avulsa ou extraordinária', excerpt: 'Prepare uma cobrança única ou prestações para uma obra ou outra despesa extra.',
      sections: [
        { heading: 'Escolher o tipo de cobrança', paragraphs: ['Em Cobranças → Plano de Quotas, escolha “Quota Avulsa” e dê-lhe um título claro, por exemplo “Pintura da fachada”.', '“Valor único com prazo de pagamento” cria uma quota por fração. “Parcelada mensalmente” cria uma quota por mês durante a duração escolhida.'] },
        { heading: 'Preencher e rever', steps: ['Escolha “Cobrar a”: a predefinição da fração, Proprietário, Inquilino ou Procurador.', 'Escolha distribuição por permilagem ou valores manuais por fração.', 'Na distribuição por permilagem, indique o valor total da cobrança. Em valores manuais, confira se está a introduzir o valor único ou o valor de cada mensalidade.', 'Indique a data de início, o prazo ou duração e o dia limite ou vencimento mensal.', 'Em “Aplicar a”, escolha todas as frações, tipos específicos ou frações personalizadas.', 'Reveja a distribuição apresentada e selecione “Criar quota avulsa”. Confirme as cobranças em Quotas e Recebimentos.'], note: 'Exemplo: em modo manual mensal, 20 € por fração durante 3 meses cria três cobranças de 20 €, totalizando 60 € por fração. Não introduza 60 € em cada mensalidade se esse é o total pretendido.' },
        { heading: 'Reserva e abatimento no orçamento', paragraphs: ['“Incluir Fundo Comum de Reserva” vem desligado para quotas avulsas. Ative-o apenas quando esta cobrança incluir reserva.', '“Criar cofre” protege os valores recebidos para essa finalidade. “Abater no orçamento” associa a cobrança à rubrica escolhida; fica indisponível quando cria um cofre. Confirme a opção adequada antes de guardar.'] },
        { heading: 'Alterar uma quota avulsa', paragraphs: ['Abra a edição do plano guardado para rever os valores e as opções. Se já houver pagamentos, respeite os bloqueios apresentados e confirme o impacto nas cobranças; não crie um segundo plano para esconder um erro no primeiro.'] },
      ],
    },
    en: {
      slug: 'create-standalone-fee', title: 'Create a standalone or extraordinary fee', excerpt: 'Prepare a one-off charge or instalments for works or another extra expense.',
      sections: [
        { heading: 'Choose the charge type', paragraphs: ['Open Collections → Fee Schedule → Standalone Fee and use a clear title such as “Facade painting”.', 'A single amount with a payment deadline creates one fee per unit. Monthly instalments create one fee per month for the chosen duration.'] },
        { heading: 'Complete and review', steps: ['Choose the payer: unit default, Owner, Tenant or Proxy.', 'Choose distribution by ownership share or manual amounts per unit.', 'For ownership-share distribution, enter the total charge. For manual amounts, check whether you are entering a one-off amount or each monthly instalment.', 'Enter the start date, deadline or duration and the due day.', 'Choose all units, specific types or custom units as participants.', 'Review the distribution and create the standalone fee. Check the resulting charges in Fees and Receipts.'], note: 'Example: a manual monthly amount of €20 for 3 months creates three €20 charges, totalling €60 per unit. Do not enter €60 for each month if that is the intended overall total.' },
        { heading: 'Reserve and budget offset', paragraphs: ['Include common reserve fund is off by default for standalone fees. Enable it only when this charge should include reserve.', 'Creating a cofre protects incoming money for its purpose. The budget-offset option links the charge to a category; it is unavailable when creating a cofre. Check the appropriate option before saving.'] },
        { heading: 'Change a standalone fee', paragraphs: ['Edit the saved schedule to review amounts and options. If payments already exist, respect displayed restrictions and check the effect on charges; do not create a second schedule to hide an error in the first.'] },
      ],
    },
  },
  {
    id: 'corrections', category: 'fees', next: ['credit', 'audit'],
    pt: {
      slug: 'corrigir-dispensar-reabrir-quotas', title: 'Corrigir, dispensar ou reabrir uma quota', excerpt: 'Escolha a ação certa para um valor errado, uma dispensa ou um pagamento mal registado.',
      sections: [
        { heading: 'Criar ou corrigir uma quota individual', paragraphs: ['Em Cobranças → Quotas e Recebimentos, “Nova Quota” cria uma cobrança individual. Escolha fração, valor, período, vencimento, pagador e estado e selecione “Registar”. Use Pendente se ainda não recebeu o dinheiro.', 'Na ficha da pessoa, use “Editar” na quota para corrigir os campos disponíveis, como valor, período, datas, pagador e notas. Guarde e confira o valor em falta.'] },
        { heading: 'Dispensar uma cobrança', steps: ['Na quota em aberto, use “Dispensar”.', 'Escreva o motivo da dispensa e confirme “Dispensar quota”.', 'Confira o estado Dispensado e o motivo guardado.'], note: 'Dispensar significa deixar de cobrar essa quota. Não é um pagamento e não deve ser usado para esconder um recebimento em falta.' },
        { heading: 'Reabrir uma quota paga por engano', steps: ['Abra a pessoa e os Recebimentos registados.', 'Na quota paga, use “Reabrir quota” e leia a confirmação.', 'Confira a quota em aberto e os saldos antes de registar o pagamento correto.'], note: 'Reabrir limpa os dados de liquidação da quota e repõe o saldo antecipado que tenha sido aplicado. Não devolve dinheiro pelo banco. Para devolver saldo antecipado, use “Devolver saldo”.' },
        { heading: 'Alterar o vencimento de um plano', paragraphs: ['Em Plano de Quotas, use a ação de vencimento do plano guardado, escolha o dia e guarde. A alteração aplica-se às quotas em aberto; confira as datas atualizadas.', 'No mesmo plano pode consultar, imprimir, editar linhas e eliminar registos, conforme as ações disponíveis. A eliminação de planos com pagamentos concluídos pode ser bloqueada. “Apagar todos” afeta o ano selecionado e é irreversível; não é uma forma de corrigir uma única quota.'] },
      ],
    },
    en: {
      slug: 'correct-waive-reopen-fees', title: 'Correct, waive or reopen a fee', excerpt: 'Choose the right action for a wrong amount, a waiver or an incorrectly recorded payment.',
      sections: [
        { heading: 'Create or correct an individual fee', paragraphs: ['In Collections → Fees and Receipts, New Fee creates an individual charge. Choose the unit, amount, period, due date, payer and status, then record it. Use Pending if the money has not arrived.', 'On the person’s page, edit the fee to correct available fields such as amount, period, dates, payer and notes. Save and check the outstanding amount.'] },
        { heading: 'Waive a charge', steps: ['Use the waive action on an outstanding fee.', 'Enter the waiver reason and confirm.', 'Check the Waived status and saved reason.'], note: 'Waiving means the fee is no longer being collected. It is not a payment and should not hide a missing receipt.' },
        { heading: 'Reopen a fee marked paid by mistake', steps: ['Open the person and their recorded receipts.', 'Use “Reopen fee” on the paid fee and read the confirmation.', 'Check the outstanding fee and balances before recording the correct payment.'], note: 'Reopening clears the fee’s settlement details and restores any advance balance applied. It does not send money back through the bank. Use Refund balance for an advance-balance refund.' },
        { heading: 'Change a schedule’s due day', paragraphs: ['In Fee Schedule, use the saved schedule’s due-day action, choose a day and save. The change applies to outstanding fees; check the updated dates.', 'Saved schedules also offer viewing, printing, row editing and deletion where available. Deleting schedules with completed payments can be blocked. Delete all affects the selected year and cannot be undone; it is not for correcting one fee.'] },
      ],
    },
  },
  {
    id: 'credit', category: 'fees', next: ['payment', 'receipts'],
    pt: {
      slug: 'saldo-antecipado-devolucoes', title: 'Registar saldo antecipado e devoluções', excerpt: 'Guarde pagamentos adiantados, use-os em quotas futuras ou registe uma devolução.',
      sections: [
        { heading: 'Recebeu dinheiro antes de haver uma quota?', steps: ['Abra Cobranças → Quotas e Recebimentos → Saldo antecipado.', 'Escolha o Condómino e indique o Valor recebido, a data e os restantes dados pedidos.', 'Selecione “Registar saldo” e confira o saldo disponível da pessoa.'], note: 'Este registo representa dinheiro já recebido. Não serve para criar um desconto, uma promessa de pagamento ou uma quota futura.' },
        { heading: 'Aplicar saldo às quotas', steps: ['Abra a pessoa e selecione as quotas em aberto que pretende liquidar.', 'Ative “Utilizar saldo disponível”.', 'No Valor recebido, indique apenas dinheiro novo recebido nessa operação; se só usar saldo existente, confirme que não está a registar uma nova entrada.', 'Reveja os valores de saldo aplicado e de dívida restante e registe o recebimento.'], note: 'Exemplo: há 30 € de saldo e uma quota de 50 €. Se a pessoa entregar mais 20 €, a liquidação combina os 30 € já existentes com os 20 € novos.' },
        { heading: 'Devolver saldo', steps: ['Na ficha da pessoa com saldo disponível, escolha “Devolver saldo”.', 'Indique o Valor devolvido, a Data da devolução, a Forma de pagamento e a Data extrato banco quando aplicável.', 'Registe a devolução e confira a redução do saldo.'], note: 'Registe apenas uma devolução realmente efetuada e dentro do saldo disponível. O botão guarda o registo; não executa uma transferência bancária.' },
      ],
    },
    en: {
      slug: 'advance-balances-and-refunds', title: 'Record advance balances and refunds', excerpt: 'Keep advance payments, apply them to future fees or record a refund.',
      sections: [
        { heading: 'Money arrived before a fee exists?', steps: ['Open Collections → Fees and Receipts → Advance balance.', 'Choose the person and enter the received amount, date and other requested details.', 'Record the balance and check the person’s available credit.'], note: 'This represents money already received. It is not a discount, a promise to pay or a future fee.' },
        { heading: 'Apply credit to fees', steps: ['Open the person and select the outstanding fees to settle.', 'Enable Use available balance.', 'Enter only newly received money as the amount received; if using existing credit alone, check that you are not recording a new cash inflow.', 'Review credit applied and remaining debt, then record the settlement.'], note: 'Example: €30 of credit and a €50 fee. If the person brings another €20, settlement combines the existing €30 with the new €20.' },
        { heading: 'Refund available credit', steps: ['On the person’s page, choose Refund balance when credit is available.', 'Enter the refunded amount, refund date, payment method and bank statement date where applicable.', 'Record the refund and check the reduced balance.'], note: 'Record only an actual refund within the available credit. This button records it; it does not execute a bank transfer.' },
      ],
    },
  },
  {
    id: 'receipts', category: 'documents', next: ['payment', 'settings'],
    pt: {
      slug: 'recibos-personalizados-email', title: 'Gerar, agrupar e enviar recibos', excerpt: 'Prepare um PDF a partir de recebimentos já registados, sem cobrar duas vezes.',
      sections: [
        { heading: 'Escolher os recebimentos', steps: ['Abra Cobranças → Quotas e Recebimentos → Gerar Recibo.', 'Escolha o Condómino e o Orçamento e selecione “Abrir”.', 'Assinale os recebimentos que devem constar no documento.', 'Confira o número de recebimentos e o Total do recibo.', 'Use a ação de gerar PDF ou “Enviar por email”, depois de confirmar o destinatário.'], note: 'Gerar um recibo não regista um pagamento nem altera quotas ou saldos. Só aparecem recebimentos já guardados; se não encontrar nenhum, registe primeiro o pagamento na área própria.' },
        { heading: 'Agrupar na ficha da pessoa', paragraphs: ['Em Recebimentos registados, pode agrupar por dia e selecionar recebimentos para um recibo personalizado. As ações do grupo permitem exportar ou enviar os recibos apresentados.', 'Depois de liquidar várias quotas em conjunto, o aviso de confirmação pode oferecer um recibo consolidado. Reveja o total e a pessoa antes de o enviar.'] },
        { heading: 'Falta o email ou o recibo está errado?', paragraphs: ['Corrija o email em Pessoas. Confirme a seleção, o orçamento, as datas e os pagamentos de origem antes de gerar outro documento.', 'Os textos, dados de pagamento, formato da folha e data de emissão são configurados em Configurações → Configurar avisos / recibos. Um PDF já descarregado não se altera quando edita os dados de origem.'] },
      ],
    },
    en: {
      slug: 'custom-receipts-and-email', title: 'Generate, group and email receipts', excerpt: 'Prepare a PDF from recorded payments without recording the money twice.',
      sections: [
        { heading: 'Choose the receipts', steps: ['Open Collections → Fees and Receipts → Generate Receipt.', 'Choose the person and budget, then Open.', 'Select the received payments to include.', 'Check the count and receipt total.', 'Generate the PDF or send by email after checking the recipient.'], note: 'Generating a receipt does not record a payment or change fees or balances. Only saved receipts appear; record the payment first if none are available.' },
        { heading: 'Group on the person’s page', paragraphs: ['In recorded receipts, group by day or select entries for a custom receipt. Group actions export or email the displayed receipts.', 'After settling several fees together, the confirmation may offer a consolidated receipt. Check its total and recipient before sending.'] },
        { heading: 'Missing email or incorrect document?', paragraphs: ['Correct the email under People. Check selected records, budget, dates and original payments before generating another document.', 'Text, payment details, paper size and issue-date settings are under Settings → Notice / receipt settings. A previously downloaded PDF does not change when you edit its source data.'] },
      ],
    },
  },
  {
    id: 'reminders', category: 'fees', next: ['notices', 'settings'],
    pt: {
      slug: 'avisos-debito-comunicacoes', title: 'Preparar avisos de débito e comunicações', excerpt: 'Escolha o documento e o destinatário certos para cobrar ou informar.',
      sections: [
        { heading: 'Preparar um aviso de dívida', steps: ['Abra Cobranças → Quotas e Recebimentos e selecione o orçamento.', 'Na pessoa com quotas em dívida, use a ação de aviso de débito para consultar o PDF ou preparar o email.', 'No envio, confira o destinatário, o Assunto e a Mensagem. A página indica também a cópia para a administração.', 'Se pretende alterar o prazo das quotas incluídas, ative a opção de alterar a data limite e escolha a Nova data limite.', 'Selecione “Enviar aviso” e confira a mensagem de resultado.'], note: 'Alterar a data limite neste envio muda as quotas em aberto incluídas no aviso. As quotas pagas não são alteradas. Deixe a opção desligada se só pretende lembrar o prazo existente.' },
        { heading: 'Qual é a área certa para cada comunicação?', table: { columns: ['Precisa de enviar…', 'Use…'], rows: [['Uma cobrança ou recibo', 'Quotas e Recebimentos.'], ['Um aviso de obras, limpeza ou interrupção de serviço', 'Operação → Avisos.'], ['Uma convocatória de assembleia', 'Assembleias → Reuniões.']] } },
        { heading: 'O que fazem as opções de envio automático?', paragraphs: ['Configurações → Envio automático de avisos guarda as preferências de quotas, formato, dias de pré-aviso e seguros a expirar. O plano pode limitar a ativação.', 'Na versão aqui documentada, estas preferências não têm um processo de envio agendado implementado. Não assuma que os emails saíram por ativar a opção: use as ações de envio disponíveis e confirme o resultado.'] },
        { heading: 'Se o envio falhar', paragraphs: ['Confirme o email em Pessoas e a mensagem apresentada. A conta precisa das permissões e funcionalidades do plano, e o serviço de email tem de estar disponível. Consulte os registos antes de repetir um envio para evitar duplicados.'] },
      ],
    },
    en: {
      slug: 'debt-notices-and-communications', title: 'Prepare debt notices and communications', excerpt: 'Choose the right document and recipient when collecting fees or sharing news.',
      sections: [
        { heading: 'Prepare a debt notice', steps: ['Open Collections → Fees and Receipts and select the budget.', 'Use the debt-notice action for a person with outstanding fees to view a PDF or compose an email.', 'Check the recipient, subject and message. The page also identifies the administration copy.', 'If you intend to change the included fees’ deadline, enable the deadline-change option and choose the new date.', 'Send the notice and check the result message.'], note: 'Changing the deadline here updates outstanding fees included in the notice. Paid fees are unchanged. Leave it off if you only want to remind someone of the existing deadline.' },
        { heading: 'Which area sends each communication?', table: { columns: ['To send…', 'Use…'], rows: [['A charge notice or receipt', 'Fees and Receipts.'], ['Works, cleaning or service-interruption information', 'Operations → Notices.'], ['An assembly notice', 'Assemblies → Meetings.']] } },
        { heading: 'What do automatic notice settings do?', paragraphs: ['Settings → Automatic notices stores fee notice preferences, format, advance-notice days and expiring-insurance preferences. Your plan can restrict activation.', 'In the version documented here, these preferences have no implemented scheduled sending process. Enabling them does not confirm emails were sent: use the available send actions and check the result.'] },
        { heading: 'If sending fails', paragraphs: ['Check the email under People and read the error. Your account needs the relevant permissions and plan features, and the email service must be available. Check records before repeating a send to avoid duplicates.'] },
      ],
    },
  },
];
