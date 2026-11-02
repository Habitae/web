import { withTranslations } from '../../shared/i18n.mjs';
import type { Guide } from './helpTypes';

// Guides for features added after the first help centre: the resident portal, access codes,
// invoices, cash reports, keys and fobs, the inbox, portal and PDF design, deleted records and assistants.
export const newGuides: Guide[] = [
  withTranslations({
    id: 'resident-access', category: 'people', next: ['resident-app', 'people'],
    pt: {
      slug: 'dar-acesso-residentes-portal', title: 'Dar acesso aos residentes ao portal', excerpt: 'Convide condóminos e inquilinos a partir de Pessoas, acompanhe o estado do acesso e revogue-o quando for preciso.',
      sections: [
        { heading: 'Antes de convidar', paragraphs: ['Os convites são enviados pelo proprietário da organização ou por um administrador. As funções Gestor e Consulta não veem as ações de acesso.', 'A pessoa tem de estar ativa e ter um email na ficha. Esse email passa a ser o email de entrada no portal. Os residentes não ocupam lugares da equipa.', 'Uma pessoa com frações em vários condomínios usa a mesma conta. Cada condomínio dá e retira o seu próprio acesso.'] },
        { heading: 'Enviar o convite', steps: ['Abra Pessoas e Frações → Pessoas e encontre a pessoa.', 'Abra o menu de opções da pessoa e escolha “Convidar residente”.', 'Confirme a mensagem “Link enviado por email. É válido durante 30 minutos.”'], note: 'Se a opção não aparecer, a pessoa não tem email ou está arquivada. Acrescente o email com “Editar” e tente novamente.' },
        { heading: 'O que o residente faz', steps: ['Recebe um email do Habitae com um link pessoal para definir a palavra-passe. O link só pode ser usado uma vez e expira ao fim de 30 minutos.', 'Em “Definir palavra-passe”, escolhe uma palavra-passe com 10 a 256 caracteres e seleciona “Guardar palavra-passe”.', 'Entra em app.habitae.pt/resident/ com o email e a palavra-passe, em “Entrar no portal”.'], note: 'Os residentes nunca criam conta sozinhos e não entram em app.habitae.pt/app/, que é a área de gestão. Se o link expirar, envie outro. No portal, o residente também pode usar “Esqueci-me da palavra-passe”.' },
        { heading: 'Acompanhar e revogar o acesso', paragraphs: ['Na lista de Pessoas, “Acesso autorizado” indica um residente com acesso ativo e “Revogado” um acesso retirado. Abra a pessoa para ver o estado em Portal do Residente: Acesso autorizado, Revogado ou Sem acesso.', 'Se o residente perdeu a palavra-passe, use “Enviar link de palavra-passe”. Para retirar o acesso, use “Revogar acesso” e confirme: as sessões do residente terminam e os dados deste condomínio deixam de aparecer no portal. Pode convidar a pessoa outra vez mais tarde.', 'Se mudar o email da pessoa, revogue primeiro o acesso anterior e só depois envie um convite para o novo email.'] },
      ],
    },
    en: {
      slug: 'give-residents-portal-access', title: 'Give residents access to the portal', excerpt: 'Invite owners and tenants from People, follow their access status and revoke it when needed.',
      sections: [
        { heading: 'Before inviting', paragraphs: ['Invitations are sent by the organisation owner or an administrator. The Manager and Read-only roles do not see the access actions.', 'The person must be active and have an email address on their record. That email becomes their portal sign-in email. Residents do not use team seats.', 'A person with units in several condominiums uses the same account. Each condominium grants and removes its own access.'] },
        { heading: 'Send the invitation', steps: ['Open People and units → People and find the person.', 'Open the person’s options menu and choose “Invite resident”.', 'Check for the message “Link sent by email. Valid for 30 minutes.”'], note: 'If the option does not appear, the person has no email address or is archived. Add the email with “Edit” and try again.' },
        { heading: 'What the resident does', steps: ['They receive an email from Habitae with a personal link to set their password. The link works once and expires after 30 minutes.', 'On “Set password”, they choose a password of 10 to 256 characters and select “Save password”.', 'They sign in at app.habitae.pt/resident/ with their email and password, using “Sign in to portal”.'], note: 'Residents never create an account on their own and do not sign in at app.habitae.pt/app/, which is the management area. If the link expires, send another. In the portal, residents can also use “Forgot password”.' },
        { heading: 'Follow and revoke access', paragraphs: ['In the People list, “Access authorised” marks a resident with active access and “Revoked” an access that was removed. Open the person to see the status under Resident Portal: Access authorised, Revoked or No access.', 'If the resident has lost their password, use “Send password link”. To remove access, use “Revoke access” and confirm: the resident’s sessions end and this condominium’s data no longer appears in their portal. You can invite the person again later.', 'If you change the person’s email address, revoke the previous access first and only then send an invitation to the new address.'] },
      ],
    },
  }),
  withTranslations({
    id: 'resident-app', category: 'people', next: ['resident-access', 'inbox'],
    pt: {
      slug: 'usar-portal-residente', title: 'Usar o portal do residente no telemóvel', excerpt: 'O que os residentes podem consultar e fazer, como instalar o portal no ecrã principal e como gerir as notificações.',
      sections: [
        { heading: 'O que existe no portal', table: { columns: ['Página', 'Para que serve'], rows: [['Resumo', 'Valor por pagar, quotas pendentes, avisos e documentos recentes e contacto com a administração.'], ['Avisos', 'Avisos publicados pela administração para o condomínio ou para a fração do residente.'], ['Calendário', 'Reuniões agendadas, com a opção “Adicionar ao calendário”.'], ['Quotas', 'Quotas por pagar e pagas, e os avisos de débito, recibos e faturas endereçados ao residente.'], ['Mensagens', 'Conversas com a administração e ocorrências com categoria, local e até três fotografias.'], ['Definições', 'Dados pessoais, notificações, idioma, tamanho do texto, acesso offline e conta. Abrem-se a partir do avatar.']] }, note: 'A administração pode mudar os nomes e ocultar algumas páginas, por isso o portal do seu condomínio pode ser um pouco diferente. O portal não recebe pagamentos: para pagar ou esclarecer uma quota, contacte a administração.' },
        { heading: 'Instalar no telemóvel', paragraphs: ['O portal funciona no navegador e pode ser instalado no ecrã principal, como uma aplicação. Abra app.habitae.pt/resident/ e entre na sua conta.'], steps: ['Abra Definições → Aplicação e privacidade.', 'Se aparecer “Instalar aplicação”, selecione-a e confirme no navegador.', 'No iPhone ou iPad, abra o portal no Safari, use o menu Partilhar e escolha “Adicionar ao ecrã principal”.'], note: 'Com “Guardar todos os dados neste dispositivo” ativo em Acesso offline, pode consultar quotas, documentos, avisos e conversas sem internet. Enviar mensagens, criar pedidos e alterar dados exige ligação.' },
        { heading: 'Notificações', paragraphs: ['As notificações ativam-se em cada dispositivo. Depois de entrar, o Resumo pode sugerir ativá-las. Também pode abrir Definições → Notificações a qualquer momento e escolher “Ativar notificações”.', 'Pode escolher separadamente: Mensagens da administração; Faturas, avisos de débito e recibos; Lembretes de pagamento; e Atualizações de ocorrências.', 'Chegam quando a administração escreve, quando um documento financeiro é endereçado ao residente e quando a administração muda o estado de uma ocorrência. Os lembretes de pagamento chegam três dias antes do vencimento, no dia do vencimento e sete dias depois, se a quota continuar por pagar.', 'Para parar, desligue um tipo ou use “Desativar neste dispositivo”. Terminar sessão também desliga as notificações nesse dispositivo; ative-as de novo depois de entrar.'], note: 'No iPhone ou iPad, as notificações exigem o iOS/iPadOS 16.4 ou posterior e o portal aberto a partir do ecrã principal. No ecrã bloqueado não aparecem nomes, valores nem o conteúdo das mensagens.' },
        { heading: 'Eliminar a conta do portal', steps: ['Abra Definições e escolha “Eliminar conta”.', 'Leia o aviso, confirme com a sua palavra-passe e selecione “Eliminar conta”.'], note: 'Isto apaga apenas o acesso ao portal e para as notificações em todos os dispositivos. As frações, quotas, documentos e conversas continuam com a administração. Para voltar a entrar, peça um novo convite.' },
      ],
    },
    en: {
      slug: 'use-resident-portal', title: 'Use the resident portal on a phone', excerpt: 'What residents can see and do, how to add the portal to the Home Screen and how to manage notifications.',
      sections: [
        { heading: 'What the portal contains', table: { columns: ['Page', 'What it is for'], rows: [['Summary', 'Amount due, pending fees, recent notices and documents, and contact with the administration.'], ['Notices', 'Notices published by the administration for the condominium or the resident’s unit.'], ['Calendar', 'Scheduled meetings, with an “Add to calendar” option.'], ['Fees', 'Unpaid and paid fees, and the debit notices, receipts and invoices addressed to the resident.'], ['Messages', 'Conversations with the administration, and incident reports with a category, location and up to three photos.'], ['Settings', 'Personal details, notifications, language, text size, offline access and account. Open them from the avatar.']] }, note: 'The administration can rename and hide some pages, so your condominium’s portal may look slightly different. The portal does not take payments: to pay or ask about a fee, contact the administration.' },
        { heading: 'Install on your phone', paragraphs: ['The portal works in the browser and can be added to the Home Screen like an app. Open app.habitae.pt/resident/ and sign in.'], steps: ['Open Settings → App and privacy.', 'If “Install app” appears, select it and confirm in the browser.', 'On iPhone or iPad, open the portal in Safari, use the Share menu and choose “Add to Home Screen”.'], note: 'With “Save all data on this device” turned on under Offline access, you can read fees, documents, notices and conversations without internet. Sending messages, creating requests and editing details need a connection.' },
        { heading: 'Notifications', paragraphs: ['Notifications are turned on for each device. After signing in, the Summary may suggest turning them on. You can also open Settings → Notifications at any time and choose “Enable notifications”.', 'You can choose each type separately: Messages from the administration; Invoices, debit notices and receipts; Payment reminders; and Issue updates.', 'They arrive when the administration writes, when a financial document is addressed to the resident and when the administration changes an incident’s status. Payment reminders arrive three days before the due date, on the due date and seven days after it if the fee is still unpaid.', 'To stop them, turn off a type or use “Disable on this device”. Signing out also turns notifications off on that device; turn them on again after signing in.'], note: 'On iPhone or iPad, notifications need iOS/iPadOS 16.4 or later and the portal opened from the Home Screen. The lock screen never shows names, amounts or message contents.' },
        { heading: 'Delete your portal account', steps: ['Open Settings and choose “Delete account”.', 'Read the warning, confirm with your password and select “Delete account”.'], note: 'This only deletes your portal access and stops notifications on all devices. Units, fees, documents and conversations stay with the administration. To sign in again, ask for a new invitation.' },
      ],
    },
  }),
  withTranslations({
    id: 'access-code', category: 'account', next: ['billing', 'billing-changes'],
    pt: {
      slug: 'utilizar-codigo-acesso', title: 'Utilizar um código de acesso', excerpt: 'Ative o acesso gratuito que recebeu num código, sem cartão, e saiba o que acontece quando termina.',
      sections: [
        { heading: 'O que é um código de acesso', paragraphs: ['Um código de acesso dá à organização acesso gratuito a um plano do Habitae durante o número de dias definido no código. Não pede cartão e não se renova sozinho.', 'Os códigos têm o formato HAB-XXXX-XXXX-XXXX. Maiúsculas, minúsculas e hífenes não fazem diferença.'] },
        { heading: 'Utilizar o código', steps: ['Entre com a conta do proprietário da organização. Só o proprietário pode utilizar um código.', 'Abra o menu “Conta e preferências” e escolha “Subscrição e faturação”. Se o período gratuito já terminou, o Habitae abre esta página quando entra.', 'Em “Tem um código de acesso?”, introduza o código e selecione “Utilizar código”.', 'Quando aparecer “Código aplicado!”, confira o plano e a data de fim. No ecrã de acesso, selecione “Entrar no Habitae” para continuar.'], note: 'A caixa do código só aparece enquanto a organização não tem uma subscrição paga ativa. Um código não substitui uma subscrição Stripe em curso.' },
        { heading: 'Durante o acesso gratuito', paragraphs: ['A página mostra “Acesso com código” e a data até à qual o acesso gratuito é válido.', 'Pode escolher um plano antes dessa data. A primeira cobrança só acontece quando o acesso gratuito terminar.', 'Se o código for retirado, a página avisa e mostra a nova data de fim. Subscreva um plano antes dessa data para continuar.'] },
        { heading: 'Quando termina ou o código é recusado', paragraphs: ['Sem subscrição, a organização deixa de ter acesso à área de gestão quando o acesso gratuito termina. O Habitae abre a página de subscrição ao entrar; escolha um plano em “Escolha o seu plano” para continuar.', 'Se o código for recusado, leia a mensagem: o código pode não ser válido, ter expirado, ter atingido o número máximo de utilizações ou já ter sido usado por esta organização. Depois de 10 tentativas, aguarde 15 minutos.'] },
      ],
    },
    en: {
      slug: 'redeem-access-code', title: 'Redeem an access code', excerpt: 'Start the free access you received as a code, with no card, and learn what happens when it ends.',
      sections: [
        { heading: 'What an access code is', paragraphs: ['An access code gives the organisation free access to a Habitae plan for the number of days set in the code. It needs no card and does not renew on its own.', 'Codes look like HAB-XXXX-XXXX-XXXX. Upper case, lower case and hyphens make no difference.'] },
        { heading: 'Use the code', steps: ['Sign in with the organisation owner’s account. Only the owner can use a code.', 'Open the “Account and preferences” menu and choose “Subscription and billing”. If the free trial has already ended, Habitae opens this page when you sign in.', 'Under “Have an access code?”, enter the code and select “Use code”.', 'When “Code applied!” appears, check the plan and the end date. On the access screen, select “Sign in to Habitae” to continue.'], note: 'The code box only appears while the organisation has no active paid subscription. A code cannot replace a running Stripe subscription.' },
        { heading: 'During free access', paragraphs: ['The page shows “Access by code” and the date until which free access is valid.', 'You can choose a plan before that date. The first charge only happens when the free access ends.', 'If the code is withdrawn, the page warns you and shows the new end date. Subscribe to a plan before that date to continue.'] },
        { heading: 'When it ends or the code is refused', paragraphs: ['Without a subscription, the organisation loses access to the management area when free access ends. Habitae opens the subscription page when you sign in; choose a plan under “Choose your plan” to continue.', 'If the code is refused, read the message: the code may be invalid, expired, fully used or already used by this organisation. After 10 attempts, wait 15 minutes.'] },
      ],
    },
  }),
  withTranslations({
    id: 'invoices', category: 'finance', next: ['suppliers', 'trial-balance'],
    pt: {
      slug: 'registar-pagar-faturas-fornecedores', title: 'Registar e pagar faturas de fornecedores', excerpt: 'Digitalize ou introduza faturas, registe os pagamentos e acompanhe o que está por pagar.',
      sections: [
        { heading: 'Adicionar uma fatura', steps: ['Abra Financeiro → Faturas e despesas e selecione “Adicionar fatura”.', 'Em “Digitalizar fatura”, use “Tirar fotografia” no telemóvel ou “Escolher PDF ou imagem” (PDF, JPG ou PNG até 6 MB). Também pode preencher os campos sem documento.', 'A leitura sugere a referência, as datas, o total e o fornecedor, quando o NIF corresponde a um fornecedor registado. Confira cada campo e preencha os que faltarem.', 'Escolha o fornecedor, a rubrica do orçamento (opcional) e o fundo, confirme que conferiu os dados com o documento original e guarde.'], note: 'Uma fatura registada fica por pagar. A saída de dinheiro só aparece em Movimentos quando regista ou associa o pagamento.' },
        { heading: 'Pagar uma fatura', paragraphs: ['No menu da fatura, “Pagar” regista um novo pagamento: escolha a conta de pagamento, a data e o valor. Se pagar só uma parte, a fatura fica Parcialmente paga.', 'Se o pagamento já está em Movimentos, use “Associar pagamento” e escolha o movimento. Só aparecem despesas sem fatura, com data igual ou posterior à da fatura e valor até ao montante por pagar.', 'Para pagar várias faturas com uma só transferência, use “Pagar várias faturas”, selecione pelo menos duas e reparta o total exato. Com “Usar movimento já registado”, a data, o valor e a conta têm de coincidir com o movimento.'], note: 'Para registar pagamentos, o condomínio precisa de uma conta bancária ou caixa. Se não houver nenhuma, a página mostra “Adicionar conta”.' },
        { heading: 'Acompanhar e corrigir', paragraphs: ['Os cartões Faturas por pagar, Em atraso, Faturas pagas e Anuladas filtram a lista. A pesquisa procura fornecedor, referência ou descrição, e “Abrir documento” mostra o original guardado.', '“Corrigir” altera os dados da fatura e pede o motivo da correção, que fica no histórico. “Anular” só está disponível em faturas sem pagamentos e pede data e motivo. Se o fornecedor devolveu dinheiro, use “Registar devolução”.', 'Registar e pagar faturas está disponível para o proprietário, administradores e gestores. A função Consulta só consulta.'] },
      ],
    },
    en: {
      slug: 'record-pay-supplier-invoices', title: 'Record and pay supplier invoices', excerpt: 'Scan or enter invoices, record payments and follow what is still unpaid.',
      sections: [
        { heading: 'Add an invoice', steps: ['Open Finance → Invoices and expenses and select “Add invoice”.', 'Under “Scan invoice”, use “Take a photo” on a phone or “Choose PDF or image” (PDF, JPG or PNG up to 6 MB). You can also fill in the fields without a document.', 'The reader suggests the reference, dates, total and supplier when the tax number matches a registered supplier. Check every field and fill in any that are missing.', 'Choose the supplier, the budget category (optional) and the fund, confirm that you checked the details against the original document, and save.'], note: 'A recorded invoice stays unpaid. The money only leaves in Transactions when you record or link the payment.' },
        { heading: 'Pay an invoice', paragraphs: ['In the invoice menu, “Pay” records a new payment: choose the payment account, date and amount. If you pay only part, the invoice becomes Partially paid.', 'If the payment is already in Transactions, use “Link payment” and choose the entry. Only expenses with no invoice, dated on or after the invoice date and no larger than the amount due are listed.', 'To pay several invoices with one transfer, use “Pay several invoices”, select at least two and split the exact total. With “Use an existing entry”, the date, amount and account must match that entry.'], note: 'To record payments, the condominium needs a bank account or cash account. If there is none, the page shows “Add account”.' },
        { heading: 'Follow up and correct', paragraphs: ['The Unpaid invoices, Overdue, Paid invoices and Cancelled cards filter the list. Search looks for supplier, reference or description, and “Open document” shows the stored original.', '“Correct” changes the invoice details and asks for a correction reason, which stays in the history. “Cancel” is only available on invoices with no payments and asks for a date and reason. If the supplier refunded money, use “Record refund”.', 'Recording and paying invoices is available to the owner, administrators and managers. The Read-only role can only view.'] },
      ],
    },
  }),
  withTranslations({
    id: 'trial-balance', category: 'finance', next: ['invoices', 'minutes'],
    pt: {
      slug: 'preparar-balancete', title: 'Preparar e aprovar o balancete', excerpt: 'Escolha o período, confira as secções, guarde uma versão e registe a aprovação da assembleia.',
      sections: [
        { heading: 'Escolher o período', steps: ['Abra Financeiro → Balancetes.', 'No seletor de período, escolha Este mês, Este trimestre, Este ano ou Personalizado e indique as datas.', 'Percorra as secções: Resumo, Contas e reconciliação, Quotas e adiantamentos, Fornecedores, Fundo de reserva, Orçamento e Movimentos.'], note: 'Se o período abranger só parte de um orçamento, os valores previstos não são rateados automaticamente. O balancete avisa quando isso acontece.' },
        { heading: 'Conferir antes de apresentar', paragraphs: ['Em Contas e reconciliação, compare o saldo registado com o extrato do banco. Use “Adicionar extrato” para registar o saldo do extrato e explicar as diferenças com ajustamentos. Leia também os Pontos a verificar.', 'As faturas por pagar e os adiantamentos dos condóminos aparecem separados do saldo. O fundo comum de reserva e outros fundos afetos são apresentados à parte.', 'Para corrigir um registo de base, use o separador Corrigir registos. Cada correção pede um motivo e fica no histórico.'] },
        { heading: 'Guardar uma versão e registar a aprovação', steps: ['Selecione “Guardar versão” e, se quiser, escreva notas às contas. A versão guarda os valores desse momento; alterações posteriores exigem uma nova versão.', 'Depois da assembleia, escolha a versão em “Versão do relatório” e use “Registar aprovação” com a data da aprovação e a ata e ponto da deliberação.'], note: 'A aprovação só pode ser registada uma vez por versão. Identifica a deliberação; não substitui a ata assinada nem os documentos de suporte.' },
        { heading: 'Exportar ou imprimir', paragraphs: ['“Exportar CSV” descarrega todas as secções para uma folha de cálculo. “Imprimir” gera o relatório completo, seja qual for o separador aberto.'] },
      ],
    },
    en: {
      slug: 'prepare-cash-report', title: 'Prepare and approve the cash report', excerpt: 'Choose the period, check each section, save a version and record the meeting’s approval.',
      sections: [
        { heading: 'Choose the period', steps: ['Open Finance → Cash reports.', 'In the period selector, choose This month, This quarter, This year or Custom and enter the dates.', 'Go through the sections: Summary, Accounts and reconciliation, Charges and advances, Suppliers, Reserve fund, Budget and Transactions.'], note: 'If the period covers only part of a budget, planned amounts are not prorated automatically. The report warns you when this happens.' },
        { heading: 'Check before presenting', paragraphs: ['In Accounts and reconciliation, compare the recorded balance with the bank statement. Use “Add statement” to record the statement balance and explain differences with adjustments. Also read the Items to check.', 'Unpaid invoices and owners’ advances are shown separately from the balance. The common reserve fund and other earmarked funds are shown on their own.', 'To correct an underlying record, use the Correct records tab. Each correction asks for a reason and stays in the history.'] },
        { heading: 'Save a version and record approval', steps: ['Select “Save version” and, if you wish, add notes to the accounts. The version keeps the figures of that moment; later changes need a new version.', 'After the meeting, choose the version under “Report version” and use “Record approval” with the approval date and the minutes and resolution item.'], note: 'Approval can be recorded only once per version. It identifies the resolution; it does not replace the signed minutes or supporting documents.' },
        { heading: 'Export or print', paragraphs: ['“Export CSV” downloads every section for a spreadsheet. “Print” produces the full report, whichever tab is open.'] },
      ],
    },
  }),
  withTranslations({
    id: 'access-devices', category: 'people', next: ['units', 'people'],
    pt: {
      slug: 'gerir-chaves-tags-comandos', title: 'Gerir chaves, tags e comandos', excerpt: 'Registe cada item, saiba a quem está atribuído e guarde o histórico de entregas, perdas e revogações.',
      sections: [
        { heading: 'Registar um item', steps: ['Abra Pessoas e Frações → Chaves e tags e selecione “Registar item”.', 'Escolha o tipo (Chave, Tag de acesso, Comando, Cartão de acesso ou Outro) e introduza o código do item. O código é único em cada condomínio e mantém os zeros à esquerda.', 'Acrescente uma descrição, como “portão da garagem”, se ajudar a identificá-lo.', 'Na atribuição, escolha “Sem atribuição — guardar no inventário”, o próprio condomínio ou uma fração, e registe.'], note: 'Cada item é Normal ou Master, independentemente do tipo. Para mudar, use “Alterar classificação” nos detalhes do item; a alteração fica no histórico.' },
        { heading: 'Entregar, devolver e registar ocorrências', paragraphs: ['“Atribuir item” regista uma nova atribuição e mantém a anterior no histórico. Quando o item volta, use “Devolver ao inventário” para terminar a atribuição atual.', '“Registar perda” e “Registar dano” mantêm a atribuição para acompanhamento. Um item danificado só volta a ser atribuído depois de “Recuperar para o inventário”. “Retirar de uso” é definitivo.', '“Registar revogação” regista que o acesso foi retirado. Um item pode estar perdido e revogado ao mesmo tempo. “Ver histórico” mostra todas as atribuições e movimentos.'], note: 'O Habitae regista a gestão dos acessos. Não comunica com o controlador da porta nem desativa tags: a desativação ou a recolha física são feitas à parte.' },
        { heading: 'Arquivar ou eliminar', paragraphs: ['“Arquivar item” esconde-o do inventário sem alterar a atribuição nem o acesso. Pode usar “Restaurar do arquivo” em qualquer momento.', '“Mover para a reciclagem” elimina o item e o histórico. O proprietário ou um administrador pode recuperá-lo em Administração → Registos eliminados durante 30 dias.'] },
      ],
    },
    en: {
      slug: 'manage-keys-fobs-remotes', title: 'Manage keys, fobs and remotes', excerpt: 'Register each item, know who has it and keep a history of handovers, losses and revocations.',
      sections: [
        { heading: 'Register an item', steps: ['Open People and units → Keys and fobs and select “Register item”.', 'Choose the type (Key, Access fob, Remote, Access card or Other) and enter the item’s code. The code is unique within each condominium and keeps leading zeros.', 'Add a description, such as “garage gate”, if it helps to identify it.', 'For the assignment, choose “Unassigned — keep in inventory”, the condominium itself or a unit, and register it.'], note: 'Each item is Normal or Master, whatever its type. To change it, use “Change classification” in the item details; the change stays in the history.' },
        { heading: 'Hand over, return and record events', paragraphs: ['“Assign item” records a new assignment and keeps the previous one in the history. When the item comes back, use “Return to inventory” to end the current assignment.', '“Record loss” and “Record damage” keep the assignment for follow-up. A damaged item can only be assigned again after “Recover to inventory”. “Retire item” is permanent.', '“Record revocation” records that access was withdrawn. An item can be lost and revoked at the same time. “View history” shows every assignment and event.'], note: 'Habitae records how access is managed. It does not talk to the door controller or disable fobs: disabling or physically collecting them is done separately.' },
        { heading: 'Archive or delete', paragraphs: ['“Archive item” hides it from the inventory without changing the assignment or access. You can use “Restore from archive” at any time.', '“Move to recycle bin” deletes the item and its history. The owner or an administrator can recover it in Administration → Deleted records for 30 days.'] },
      ],
    },
  }),
  withTranslations({
    id: 'inbox', category: 'operations', next: ['maintenance', 'resident-access'],
    pt: {
      slug: 'caixa-entrada-mensagens-residentes', title: 'Responder a mensagens e ocorrências dos residentes', excerpt: 'Use a Caixa de entrada para conversar com os residentes, acompanhar ocorrências e ligá-las a reparações.',
      sections: [
        { heading: 'Onde chegam as mensagens', paragraphs: ['Abra Caixa de entrada, no menu principal do condomínio. Está disponível para o proprietário, administradores e gestores; a função Consulta não vê as conversas.', 'Só pode escrever a residentes com acesso autorizado ao portal.'] },
        { heading: 'Encontrar e responder', steps: ['Use a pesquisa ou o filtro Todas as conversas, Por ler ou Ocorrências.', 'Abra a conversa, escreva a resposta e selecione “Enviar resposta”.', 'Para começar uma conversa, use “Novo pedido” e escolha o destinatário, o tipo (Mensagem ou Reportar ocorrência), o assunto e a mensagem.'], note: 'O residente recebe uma notificação se a tiver ativado no portal. Uma resposta do residente reabre um pedido resolvido.' },
        { heading: 'Gerir uma ocorrência', paragraphs: ['As ocorrências mostram a categoria, o local e as fotografias enviadas pelo residente. Em “Gerir pedido”, mude o estado do pedido (Aberto, Em curso, Resolvido ou Fechado), indique a quem está atribuído e selecione “Guardar atribuição”.', 'Para acompanhar a reparação, associe uma tarefa de Manutenção com “Associar reparação” ou crie uma nova com “Criar e associar reparação”.', '“Arquivar conversa” tira a conversa da sua lista sem a apagar; encontre-a em Arquivadas e use “Restaurar conversa”. Uma conversa fechada só recebe mensagens depois de “Reabrir conversa”.'] },
      ],
    },
    en: {
      slug: 'inbox-resident-messages', title: 'Answer resident messages and incidents', excerpt: 'Use the Inbox to talk with residents, follow incidents and link them to repairs.',
      sections: [
        { heading: 'Where messages arrive', paragraphs: ['Open Inbox from the condominium’s main menu. It is available to the owner, administrators and managers; the Read-only role cannot see conversations.', 'You can only write to residents whose portal access is authorised.'] },
        { heading: 'Find and reply', steps: ['Use search or the All conversations, Unread or Incidents filter.', 'Open the conversation, write your reply and select “Send reply”.', 'To start a conversation, use “New request” and choose the recipient, the type (Message or Report incident), the subject and the message.'], note: 'The resident gets a notification if they turned notifications on in the portal. A reply from the resident reopens a resolved request.' },
        { heading: 'Manage an incident', paragraphs: ['Incidents show the category, location and photos sent by the resident. In “Manage request”, change the request status (Outstanding, In progress, Resolved or Closed), enter who it is assigned to and select “Save assignment”.', 'To follow the repair, link a Maintenance task with “Link repair” or create one with “Create and link repair”.', '“Archive chat” removes the conversation from your list without deleting it; find it under Archived and use “Restore chat”. A closed conversation only takes messages again after “Reopen conversation”.'] },
      ],
    },
  }),
  withTranslations({
    id: 'portal-design', category: 'account', next: ['resident-app', 'settings'],
    pt: {
      slug: 'personalizar-portal-residentes', title: 'Personalizar o portal dos residentes', excerpt: 'Escolha um modelo, ajuste a aparência e as páginas e publique a versão que os residentes veem.',
      sections: [
        { heading: 'Onde fica', paragraphs: ['Dentro do condomínio, abra Configurações → Portal dos residentes. Está disponível para o proprietário da organização e administradores. A pré-visualização ao lado mostra o resultado enquanto edita.'] },
        { heading: 'O que pode ajustar', table: { columns: ['Separador', 'O que muda'], rows: [['Modelos', 'Ponto de partida: Completo, Essencial, Comunidade, Financeiro, Acolhedor ou Minimalista.'], ['Identidade', 'Imagem de capa, nome do portal e títulos das páginas e listas.'], ['Aparência', 'Cor de destaque, estilo dos cartões, espaçamento, fundo, tamanho do texto e mensagem de boas-vindas.'], ['Navegação', 'Ordem, nomes e visibilidade das páginas. O Resumo e as Definições ficam sempre visíveis.'], ['Conteúdo', 'Blocos do Resumo e cartões personalizados para avisos, regras, eventos ou atalhos.']] } },
        { heading: 'Guardar e publicar', steps: ['Use “Guardar rascunho” para guardar as alterações sem as mostrar aos residentes.', 'Quando estiver pronto, selecione “Publicar no portal”. Os residentes passam a ver esta versão.'], note: '“Repor configuração inicial” só altera o rascunho; publique para o aplicar. A imagem de capa é guardada assim que a carrega.' },
      ],
    },
    en: {
      slug: 'customise-resident-portal', title: 'Customise the resident portal', excerpt: 'Pick a template, adjust the look and pages, and publish the version residents see.',
      sections: [
        { heading: 'Where to find it', paragraphs: ['Inside the condominium, open Settings → Resident portal. It is available to the organisation owner and administrators. The preview alongside shows the result as you edit.'] },
        { heading: 'What you can adjust', table: { columns: ['Tab', 'What it changes'], rows: [['Templates', 'Starting point: Complete, Essential, Community, Finance, Welcoming or Minimal.'], ['Identity', 'Cover image, portal name and page and list titles.'], ['Appearance', 'Accent colour, card style, spacing, background, text size and welcome message.'], ['Navigation', 'Order, names and visibility of pages. Summary and Settings always stay visible.'], ['Content', 'Summary blocks and custom cards for notices, rules, events or shortcuts.']] } },
        { heading: 'Save and publish', steps: ['Use “Save draft” to keep your changes without showing them to residents.', 'When ready, select “Publish to portal”. Residents then see this version.'], note: '“Reset to defaults” only changes the draft; publish to apply it. The cover image is saved as soon as you upload it.' },
      ],
    },
  }),
  withTranslations({
    id: 'pdf-design', category: 'documents', next: ['receipts', 'settings'],
    pt: {
      slug: 'personalizar-pdfs', title: 'Personalizar os PDFs', excerpt: 'Ajuste cores, logótipo, textos e colunas dos avisos, recibos, atas e outros PDFs do condomínio.',
      sections: [
        { heading: 'Escolher o que alterar', paragraphs: ['Dentro do condomínio, abra Configurações → Personalizar PDFs. As alterações aplicam-se aos próximos PDFs deste condomínio; os documentos já arquivados não mudam.', 'Em “Aplicar a”, escolha Padrão do condomínio para todos os documentos, ou um tipo de documento, como Aviso de débito, Recibo de quota, Convocatória ou Ata. Num documento, as opções que não alterar seguem o padrão do condomínio.'] },
        { heading: 'O que pode mudar', table: { columns: ['Separador', 'Opções'], rows: [['Aspeto', 'Cores, tipo de letra, tamanho do texto e impressão em cor económica ou a preto e branco.'], ['Logótipo e assinatura', 'Logótipo em PNG ou JPEG até 2 MB, com tamanho e posição, e assinatura nos documentos que a usam.'], ['Textos', 'Título e texto introdutório de cada documento, texto do rodapé e números de página.'], ['Campos e colunas', 'Dados do cabeçalho e do destinatário. Num documento específico, escolha e ordene campos, secções e colunas.']] } },
        { heading: 'Pré-visualizar e guardar', steps: ['Use “Atualizar pré-visualização” para ver o resultado com dados fictícios. A pré-visualização não envia emails nem altera documentos.', 'Selecione “Guardar alterações”.'], note: 'Para desfazer, use “Repor padrão original” no padrão do condomínio ou “Usar padrão do condomínio” num documento, e guarde.' },
      ],
    },
    en: {
      slug: 'customise-pdfs', title: 'Customise PDFs', excerpt: 'Adjust colours, logo, wording and columns on the condominium’s notices, receipts, minutes and other PDFs.',
      sections: [
        { heading: 'Choose what to change', paragraphs: ['Inside the condominium, open Settings → Customize PDFs. Changes apply to this condominium’s next PDFs; documents already archived do not change.', 'In “Apply to”, choose Condominium defaults for every document, or a document type such as Debit notice, Quota receipt, Meeting notice or Minutes. In a document, any option you leave unchanged follows the condominium defaults.'] },
        { heading: 'What you can change', table: { columns: ['Tab', 'Options'], rows: [['Appearance', 'Colours, font, text size and economy colour or black-and-white printing.'], ['Logo and signature', 'A PNG or JPEG logo up to 2 MB, with size and position, and the signature on documents that use one.'], ['Wording', 'Each document’s title and introduction, footer text and page numbers.'], ['Fields and columns', 'Header and recipient details. In a specific document, choose and order fields, sections and columns.']] } },
        { heading: 'Preview and save', steps: ['Use “Refresh preview” to see the result with sample data. The preview sends no email and changes no documents.', 'Select “Save changes”.'], note: 'To undo, use “Reset original defaults” on the condominium defaults or “Use condominium defaults” on a document, then save.' },
      ],
    },
  }),
  withTranslations({
    id: 'deleted-records', category: 'account', next: ['audit', 'access-devices'],
    pt: {
      slug: 'recuperar-registos-eliminados', title: 'Recuperar registos eliminados', excerpt: 'Recupere uma eliminação nos 30 dias seguintes, incluindo os dados associados.',
      sections: [
        { heading: 'Onde fica', paragraphs: ['Na página de seleção de condomínios, abra Administração → Registos eliminados. Está disponível para o proprietário da organização e administradores, mesmo depois de um condomínio inteiro ter sido eliminado.'] },
        { heading: 'Recuperar uma eliminação', steps: ['Em Por recuperar, encontre a eliminação pela data e por quem a fez.', 'Use “Ver registos incluídos” para confirmar o que vai voltar.', 'Selecione “Recuperar” e confirme. A eliminação volta inteira, com os dados associados.'], note: 'A recuperação nunca substitui dados atuais. Se houver um conflito, como um código repetido, a recuperação para; resolva o conflito e tente outra vez dentro do prazo.' },
        { heading: 'Prazos e limites', paragraphs: ['Cada eliminação pode ser recuperada durante 30 dias. Depois disso, os dados expiram e fica apenas o registo da eliminação, em Prazo terminado.', 'Os itens arquivados não aparecem aqui: restaure-os na respetiva página, sem prazo.'] },
      ],
    },
    en: {
      slug: 'recover-deleted-records', title: 'Recover deleted records', excerpt: 'Recover a deletion within 30 days, including its related data.',
      sections: [
        { heading: 'Where to find it', paragraphs: ['On the condominium selection page, open Administration → Deleted records. It is available to the organisation owner and administrators, even after a whole condominium has been deleted.'] },
        { heading: 'Recover a deletion', steps: ['Under Available to recover, find the deletion by its date and who made it.', 'Use “View included records” to check what will come back.', 'Select “Recover” and confirm. The whole deletion comes back, with its related data.'], note: 'Recovery never replaces current data. If there is a conflict, such as a duplicate code, recovery stops; resolve the conflict and try again before the deadline.' },
        { heading: 'Deadlines and limits', paragraphs: ['Each deletion can be recovered for 30 days. After that, the data expires and only the record of the deletion remains, under Expired.', 'Archived items do not appear here: restore them on their own page, with no deadline.'] },
      ],
    },
  }),
  withTranslations({
    id: 'assistants', category: 'account', next: ['permissions', 'privacy'],
    pt: {
      slug: 'ligar-assistente-ia', title: 'Ligar um assistente de IA ao Habitae', excerpt: 'Autorize um assistente compatível com MCP a consultar ou alterar registos e revogue o acesso quando quiser.',
      sections: [
        { heading: 'Como funciona', paragraphs: ['Pode ligar um assistente compatível com MCP aos condomínios da sua organização. A ligação fica associada a si e a uma organização, e o assistente só faz o que as permissões autorizadas e a sua função permitem.', 'Os dados que o assistente consulta são partilhados com ele. Dê apenas as permissões de que precisa.'] },
        { heading: 'Ligar com autorização', steps: ['Abra o menu “Conta e preferências” e escolha “Ligações a assistentes”.', 'Em “Ligar um assistente”, copie o endereço do servidor e introduza-o no assistente.', 'O Habitae mostra um ecrã de autorização. Confira o assistente, a organização e as permissões e escolha “Autorizar ligação” ou “Recusar”.'], note: 'Uma ligação autorizada expira ao fim de 90 dias; depois disso, o assistente pede uma nova autorização.' },
        { heading: 'Ligação manual com token', steps: ['Se o assistente pedir um token de acesso, preencha em Ligação manual o nome da ligação, a validade (7, 30 ou 90 dias) e as permissões.', 'Selecione “Criar ligação” e copie o token para o assistente. O token só é apresentado uma vez.'], note: 'Consultar registos está sempre incluído. Eliminar registos, Enviar emails aos condóminos e Gerir utilizadores, convites e definições também exigem Criar e alterar registos. A função Consulta só pode dar acesso de consulta, e a gestão de utilizadores só pode ser dada pelo proprietário ou por administradores.' },
        { heading: 'Rever e revogar', paragraphs: ['Em Ligações criadas, veja cada ligação, as permissões e a data de expiração. Use “Revogar” para cortar o acesso de imediato.'] },
      ],
    },
    en: {
      slug: 'connect-ai-assistant', title: 'Connect an AI assistant to Habitae', excerpt: 'Authorise an MCP-compatible assistant to read or change records, and revoke access whenever you want.',
      sections: [
        { heading: 'How it works', paragraphs: ['You can connect an MCP-compatible assistant to your organisation’s condominiums. The connection belongs to you and one organisation, and the assistant can only do what the granted permissions and your role allow.', 'The data the assistant reads is shared with it. Grant only the permissions you need.'] },
        { heading: 'Connect with authorisation', steps: ['Open the “Account and preferences” menu and choose “Assistant connections”.', 'Under “Connect an assistant”, copy the server address and enter it in the assistant.', 'Habitae shows an authorisation screen. Check the assistant, organisation and permissions, then choose “Authorise connection” or “Decline”.'], note: 'An authorised connection expires after 90 days; after that, the assistant asks for authorisation again.' },
        { heading: 'Manual connection with a token', steps: ['If the assistant asks for an access token, fill in the connection name, validity (7, 30 or 90 days) and permissions under Manual connection.', 'Select “Create connection” and copy the token into the assistant. The token is shown only once.'], note: 'View records is always included. Delete records, Email residents and Manage users, invitations and settings also need Create and edit records. The Read-only role can only grant read access, and user management can only be granted by the owner or administrators.' },
        { heading: 'Review and revoke', paragraphs: ['Under Created connections, see each connection, its permissions and expiry date. Use “Revoke” to cut access immediately.'] },
      ],
    },
  }),
];
