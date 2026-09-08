import { withFrench } from '../../shared/i18n.mjs';
import type { Guide } from './helpTypes';

export const operationsGuides: Guide[] = [
  withFrench({
    id: 'suppliers', category: 'operations', next: ['maintenance', 'transaction'],
    pt: {
      slug: 'gerir-fornecedores', title: 'Adicionar e gerir fornecedores', excerpt: 'Guarde os contactos de quem presta serviços ao condomínio.',
      sections: [
        { heading: 'Adicionar um fornecedor', steps: ['Abra Condomínio → Fornecedores e escolha “Novo Fornecedor”.', 'Preencha o Nome. Acrescente NIF, email, telefone e morada quando disponíveis.', 'Nas Notas, registe informação útil, como horário de contacto ou referência do contrato.', 'Selecione “Criar” e confirme o fornecedor na lista.'] },
        { heading: 'Usar o fornecedor nos registos', paragraphs: ['Ao criar uma despesa em Movimentos ou uma tarefa de Manutenção, escolha o fornecedor no formulário. Na Limpeza, escolha-o como Prestador de serviço.', 'Criar o contacto não regista uma despesa nem envia uma encomenda. Registe o trabalho e o respetivo pagamento nas áreas apropriadas.'] },
        { heading: 'Corrigir ou eliminar', paragraphs: ['Use “Editar” e “Atualizar” para corrigir o contacto existente.', 'Eliminar um fornecedor remove a sua associação aos movimentos e tarefas ligados. Leia a confirmação e prefira corrigir os dados se o fornecedor ainda faz parte do histórico que precisa de consultar.'] },
      ],
    },
    en: {
      slug: 'manage-suppliers', title: 'Add and manage suppliers', excerpt: 'Keep contact details for the people and businesses servicing your building.',
      sections: [
        { heading: 'Add a supplier', steps: ['Open Condominium → Suppliers and choose New Supplier.', 'Enter the name. Add tax number, email, phone and address when available.', 'Use Notes for useful details such as contact hours or contract reference.', 'Create the supplier and check the list.'] },
        { heading: 'Use the supplier in records', paragraphs: ['Choose the supplier when creating an expense in Transactions or a Maintenance task. For Cleaning, choose them as the service provider.', 'Creating a contact does not record an expense or send an order. Record the work and its payment in the appropriate areas.'] },
        { heading: 'Correct or delete', paragraphs: ['Edit and update the existing contact to correct details.', 'Deleting a supplier removes their association from linked transactions and tasks. Read the confirmation and correct the details instead when the contact is still needed for your records.'] },
      ],
    },
  }),
  withFrench({
    id: 'maintenance', category: 'operations', next: ['notices', 'suppliers'],
    pt: {
      slug: 'planear-manutencao', title: 'Criar e acompanhar uma tarefa de manutenção', excerpt: 'Registe um problema, atribua um fornecedor e acompanhe o trabalho até à conclusão.',
      sections: [
        { heading: 'Criar a tarefa', steps: ['Abra Operação → Manutenção e escolha a ação de nova tarefa.', 'Dê um título específico, como “Reparar porta da garagem”, e descreva o problema.', 'Escolha uma Fração ou deixe “Área comum”. Associe um Fornecedor se já souber quem fará o trabalho.', 'Defina a Prioridade, a data Reportada em, o Prazo e o Custo estimado quando conhecidos.', 'Acrescente notas e selecione “Criar tarefa”.'] },
        { heading: 'Atualizar o progresso', paragraphs: ['Use as ações da tarefa para a marcar Em execução ou Concluída. Se precisar de voltar ao início, use “Repor como pendente”. Confira os totais de pendentes, em execução e concluídas.', 'Se a tarefa foi criada por engano, a ação de eliminar pede confirmação. Não elimine uma tarefa concluída apenas para a retirar dos pendentes; use o estado correto.'] },
        { heading: 'Informar os condóminos', paragraphs: ['Use “Criar aviso ligado a esta tarefa” para abrir um aviso com esse contexto. Reveja a mensagem, as datas e os destinatários na área Avisos antes de publicar ou enviar.'] },
        { heading: 'Registar o custo real', note: 'O custo estimado é uma previsão. Concluir a tarefa não regista automaticamente uma despesa paga; registe o movimento financeiro correspondente quando existir.' },
      ],
    },
    en: {
      slug: 'plan-maintenance', title: 'Create and track a maintenance task', excerpt: 'Record a problem, assign a supplier and follow the work through completion.',
      sections: [
        { heading: 'Create the task', steps: ['Open Operations → Maintenance and choose the new-task action.', 'Use a specific title such as “Repair garage door” and describe the problem.', 'Choose a unit or leave Common area. Assign a supplier if you know who will do the work.', 'Set priority, reported date, deadline and estimated cost where known.', 'Add notes and create the task.'] },
        { heading: 'Update progress', paragraphs: ['Use the task actions to mark In progress or Completed. Return it to Pending if needed. Check the pending, in-progress and completed totals.', 'Delete asks for confirmation when a task was created by mistake. Do not delete completed work just to remove it from pending tasks; use the correct status.'] },
        { heading: 'Inform residents', paragraphs: ['Use the create-linked-notice action to open a notice with the task’s context. Review its message, dates and recipients under Notices before publishing or sending.'] },
        { heading: 'Record actual cost', note: 'Estimated cost is a forecast. Completing a task does not automatically record a paid expense; enter the financial transaction when it exists.' },
      ],
    },
  }),
  withFrench({
    id: 'cleaning', category: 'operations', next: ['suppliers', 'documents'],
    pt: {
      slug: 'limpeza-folha-presencas', title: 'Planear limpezas e gerar a folha de presenças', excerpt: 'Agende visitas, marque o trabalho realizado e prepare o registo mensal em PDF.',
      sections: [
        { heading: 'Agendar uma tarefa', steps: ['Abra Operação → Limpeza e escolha “Nova tarefa”.', 'Selecione a Área, a Data prevista e o Prestador de serviço, se existir.', 'Acrescente instruções nas Notas e selecione “Agendar tarefa”.', 'Confirme a visita no Plano de limpeza. Use o filtro para ver todas, pendentes ou concluídas.'] },
        { heading: 'Registar o que foi feito', paragraphs: ['Atualize a tarefa para Em execução ou Concluída quando o trabalho acontecer. Pode reabrir uma tarefa concluída ou eliminar uma tarefa criada por engano, após confirmação.', 'Agendar uma visita não cria automaticamente todas as visitas futuras. Registe as datas necessárias no plano.'] },
        { heading: 'Gerar a folha mensal', steps: ['Na mesma página, escolha “Gerar folha de presenças”.', 'Escolha o Mês e indique o nome em Funcionária.', 'Defina as Linhas de visita, de 1 a 12. O formulário sugere 9–10 para duas visitas por semana.', 'Selecione “Gerar PDF” e reveja o mês e o nome antes de imprimir.'], note: 'A folha PDF serve para registar presenças. Gerá-la não marca as tarefas como concluídas nem regista o pagamento do prestador.' },
        { heading: 'O PDF não abriu?', paragraphs: ['Se a aplicação pedir, permita a abertura de janelas para este site e volte a gerar o documento. Consulte também o Arquivo de PDFs para os documentos guardados.'] },
      ],
    },
    en: {
      slug: 'cleaning-and-attendance-sheet', title: 'Plan cleaning and generate an attendance sheet', excerpt: 'Schedule visits, track completed work and prepare a monthly PDF record.',
      sections: [
        { heading: 'Schedule a task', steps: ['Open Operations → Cleaning and choose New task.', 'Choose the area, planned date and service provider if available.', 'Add instructions in Notes and schedule the task.', 'Check the visit in the cleaning plan. Filter for all, pending or completed tasks.'] },
        { heading: 'Record completed work', paragraphs: ['Mark tasks In progress or Completed when the work happens. You can reopen a completed task or delete an incorrect one after confirmation.', 'Scheduling one visit does not automatically create all future visits. Add the required dates to the plan.'] },
        { heading: 'Generate the monthly sheet', steps: ['Choose the generate-attendance-sheet action on the same page.', 'Choose the month and enter the cleaner’s name.', 'Set 1–12 visit rows. The form suggests 9–10 for two visits a week.', 'Generate the PDF and check the month and name before printing.'], note: 'The PDF sheet is for recording attendance. Generating it does not complete tasks or record a payment to the provider.' },
        { heading: 'The PDF did not open?', paragraphs: ['If prompted, allow this site to open a new window and generate the document again. Also check the PDF archive for saved documents.'] },
      ],
    },
  }),
  withFrench({
    id: 'notices', category: 'operations', next: ['maintenance', 'reminders'],
    pt: {
      slug: 'publicar-enviar-avisos', title: 'Publicar, imprimir e enviar avisos', excerpt: 'Avise sobre obras, limpeza ou interrupções de serviço, com datas e público definidos.',
      sections: [
        { heading: 'Preparar o aviso', steps: ['Abra Operação → Avisos e escolha um modelo ou crie um novo aviso.', 'Preencha Título, Tipo, Área afetada e Mensagem. Nos modelos, responda aos campos pedidos e reveja o texto resultante.', 'Confirme a Data de publicação e, se necessário, a Data de expiração.', 'Associe uma tarefa de manutenção e as frações abrangidas quando fizer sentido.', 'Selecione “Publicar aviso” e confira o registo no Quadro de avisos.'], note: 'Publicar guarda o aviso. O envio por email é uma ação separada.' },
        { heading: 'Imprimir ou enviar por email', steps: ['Use “Imprimir aviso” para abrir o documento. A opção de mostrar o nome do condomínio controla esse dado no PDF.', 'Para email, edite o aviso, ative “Permitir envio opcional por email” e escolha o Público.', 'Guarde, use “Enviar por email” no aviso e leia a confirmação dos destinatários.', 'Confirme a mensagem com o número de destinatários após o envio.'] },
        { heading: 'Retirar um aviso do quadro', paragraphs: ['Use “Expirar aviso” quando deixar de ser relevante. O aviso passa ao arquivo, onde continua disponível para consulta.', 'Filtre por Estado e Tipo para encontrar avisos antigos. “Eliminar aviso” remove o registo e é diferente de o expirar.'] },
      ],
    },
    en: {
      slug: 'publish-and-send-notices', title: 'Publish, print and email notices', excerpt: 'Share works, cleaning or service information with clear dates and audiences.',
      sections: [
        { heading: 'Prepare a notice', steps: ['Open Operations → Notices and choose a template or a new notice.', 'Enter title, type, affected area and message. For a template, complete the requested fields and review the resulting text.', 'Check publication date and an optional expiry date.', 'Link a maintenance task and affected units where relevant.', 'Publish and check the notice board entry.'], note: 'Publishing saves the notice. Sending email is a separate action.' },
        { heading: 'Print or send by email', steps: ['Use Print notice to open the document. The show-condominium-name option controls that detail in the PDF.', 'For email, edit the notice, allow optional email delivery and select the audience.', 'Save, use Send by email on the notice and read the recipient confirmation.', 'Check the recipient count reported after sending.'] },
        { heading: 'Remove a notice from the active board', paragraphs: ['Expire a notice when it is no longer relevant. It moves to the archive for reference.', 'Filter by status and type to find old notices. Deleting removes the record and is different from expiring it.'] },
      ],
    },
  }),
  withFrench({
    id: 'meeting-votes', category: 'assemblies', next: ['minutes', 'signature'],
    pt: {
      slug: 'presencas-votacoes-assembleia', title: 'Registar presenças e votações da assembleia', excerpt: 'Confirme quem participou, quem foi representado e os votos de cada ponto.',
      sections: [
        { heading: 'Preparar os dados da sessão', steps: ['Abra Assembleias → Reuniões e a reunião pretendida. Confirme que se realizou para abrir Presenças e Votação.', 'Em Presenças, indique número da ata, tipo de assembleia, convocatória realizada, modo de convocação, início e fim efetivos e presidente da mesa.', 'Use “Importar frações” para trazer os titulares e permilagens. Reveja os dados; “Atualizar dados” volta a importar o contexto.', 'Marque cada entrada como Presente, Representado ou Ausente. Para representados, indique o representante e confirme a procuração quando estiver anexa.'], note: 'Frações com os mesmos titulares são atualizadas em conjunto. A permilagem continua a ser somada por fração. Importar os nomes não confirma que estiveram presentes.' },
        { heading: 'Registar cada votação', steps: ['Abra Votação e escolha o ponto da ordem de trabalhos.', 'Confirme a proposta, o tipo de ponto e a regra de votação selecionada.', 'Registe os votos a favor, contra ou abstenções dos titulares presentes ou representados.', 'Reveja os totais, os votos pendentes e o resultado apresentado. Complete o texto da deliberação e guarde.'], note: 'A aplicação calcula com os dados e a regra escolhidos. Confirme que correspondem à reunião e ao ponto em discussão; o resultado calculado não substitui essa verificação.' },
        { heading: 'Trazer contas ou orçamento para o ponto', paragraphs: ['Na área de dados do Habitae do ponto, escolha Contas do exercício ou Orçamento proposto e o exercício correto. Use “Trazer dados para a ata”.', 'Confira a data de corte, as receitas, despesas e rubricas da fotografia guardada. “Atualizar fotografia” substitui esses dados pelos recalculados; reveja-os antes de aprovar o texto.'] },
        { heading: 'Preparar o seguimento', paragraphs: ['Os tipos de ponto podem pedir dados próprios, como fornecedor, valor máximo, responsável, prazo ou condições de uma quota extraordinária. Preencha-os para que a ata e as ações após a reunião tenham o contexto necessário.'] },
      ],
    },
    en: {
      slug: 'meeting-attendance-and-votes', title: 'Record assembly attendance and votes', excerpt: 'Confirm participants, representatives and votes for each agenda item.',
      sections: [
        { heading: 'Prepare the session details', steps: ['Open Assemblies → Meetings and the relevant meeting. Confirm it was held to open Attendance and Voting.', 'Enter the minutes number, assembly type, meeting call held, notice method, actual start/end times and chair.', 'Import units to bring in owners and ownership shares. Review them; Update data imports the context again.', 'Mark each entry Present, Represented or Absent. For representation, enter the representative and confirm the proxy document when attached.'], note: 'Units with the same owners update together. Ownership shares are still added per unit. Importing names does not confirm attendance.' },
        { heading: 'Record each vote', steps: ['Open Voting and choose the agenda item.', 'Check the proposal, item type and selected voting rule.', 'Record votes for, against or abstaining for present or represented owners.', 'Review totals, pending votes and the displayed result. Complete the decision text and save.'], note: 'The app calculates from your data and selected rule. Check that they match the meeting and agenda item; the calculated result does not replace that check.' },
        { heading: 'Bring accounts or a budget into an item', paragraphs: ['In the item’s Habitae data area, choose accounts or proposed budget and the correct financial period. Bring the data into the minutes.', 'Check the cutoff date, income, expenses and categories in the saved snapshot. Updating the snapshot replaces those figures with recalculated data; review them before approving the text.'] },
        { heading: 'Prepare follow-up', paragraphs: ['Item types can request details such as supplier, maximum amount, responsible person, deadline or extraordinary fee terms. Complete them so minutes and follow-up actions have the required context.'] },
      ],
    },
  }),
  withFrench({
    id: 'minutes', category: 'assemblies', next: ['meeting-votes', 'documents'],
    pt: {
      slug: 'atas-anexos-assinaturas-acoes', title: 'Rever atas, anexos, assinaturas e ações', excerpt: 'Do rascunho ao documento final, com histórico e seguimento das decisões.',
      sections: [
        { heading: 'Preparar e rever o texto', steps: ['Na reunião realizada, abra Ata e confira a Pré-visualização factual.', 'Use “Preparar rascunho” para criar texto a partir dos dados guardados no Habitae. Reveja o conteúdo antes de substituir uma redação em que já trabalhou.', 'Edite a redação, complete informação em falta e confira os alertas de presenças, votações e dados.', 'Escolha o estado Rascunho, Revista ou Aprovada conforme o trabalho realizado. Confirme a leitura e aprovação apenas quando aconteceram.', 'Use “Guardar ata” e confira que a gravação terminou.'], note: 'O rascunho é preparado a partir de dados locais, sem envio a um serviço externo de escrita. Continua a precisar de revisão de nomes, datas, valores e decisões.' },
        { heading: 'Anexar os documentos da reunião', paragraphs: ['Guarde primeiro a reunião. Na área Anexos, escolha a categoria e use “Adicionar” para carregar o ficheiro. Abra o nome do anexo para confirmar o conteúdo; use Remover para um anexo incorreto enquanto a ata estiver editável.', '“Abrir pacote de assinatura” prepara os documentos para esse processo. Carregar uma procuração é diferente de marcar a respetiva representação nas Presenças.'] },
        { heading: 'Acompanhar assinaturas e concordâncias', steps: ['Use “Sincronizar presenças” para preparar a lista de participantes.', 'Registe o estado real: Pendente, Assinada, Concordância por email ou Recusada.', 'Guarde os comprovativos correspondentes no processo da reunião.'], note: 'Escolher “Assinada” regista um estado; não recolhe por si só uma assinatura eletrónica nem envia um pedido ao participante.' },
        { heading: 'Transformar decisões em trabalho', paragraphs: ['Em Ações após a reunião, use “Preparar a partir das deliberações”. Reveja as ações propostas e os dados antes de executar as que estiverem disponíveis.', 'Use “Criar no Habitae” na ação revista. A execução pode criar uma tarefa de manutenção, um lembrete ou uma quota avulsa. Confirme o estado e os registos de destino antes de repetir.', 'Uma ação do tipo Comunicação cria apenas um rascunho interno; não envia email. A área antiga de Comunicações não está disponível no menu atual. Para informar os condóminos, prepare e envie um aviso em Operação → Avisos.'] },
        { heading: 'Finalizar, reabrir e recuperar versões', paragraphs: ['“Finalizar ata” guarda e bloqueia a redação contra alterações acidentais. O estado Aprovada, por si só, ainda deixa o texto editável.', 'Se precisar de corrigir uma ata finalizada, use “Reabrir ata” e leia a confirmação: o estado passa a Revista e a versão finalizada fica no histórico. No Histórico de versões da reunião editável, “Restaurar” recupera uma versão anterior.', 'Uma nova reunião pode ter apenas um rascunho local no navegador. A aplicação oferece recuperá-lo ao voltar a criar uma reunião. Para registos já criados, confira o indicador de gravação automática e use a gravação manual antes de sair.'] },
      ],
    },
    en: {
      slug: 'minutes-attachments-signoffs-actions', title: 'Review minutes, attachments, sign-offs and actions', excerpt: 'Move from draft to final document, keeping history and following up decisions.',
      sections: [
        { heading: 'Prepare and review the text', steps: ['Open Minutes for the held meeting and check the factual preview.', 'Prepare a draft from saved Habitae data. Review before replacing text you have already worked on.', 'Edit the wording, complete missing details and check attendance, vote and data alerts.', 'Choose Draft, Reviewed or Approved to match progress. Confirm reading and approval only when they happened.', 'Save the minutes and check that saving completed.'], note: 'Drafting uses local records without sending them to an external writing service. Names, dates, amounts and decisions still need review.' },
        { heading: 'Attach meeting documents', paragraphs: ['Save the meeting first. In Attachments, choose a category and add a file. Open its name to check the contents; remove incorrect attachments while the minutes are editable.', 'Open signing pack prepares documents for that process. Uploading a proxy is separate from recording representation under Attendance.'] },
        { heading: 'Track signatures and agreement', steps: ['Synchronise attendance to prepare the participant list.', 'Record the actual status: Pending, Signed, Email agreement or Refused.', 'Keep the corresponding evidence with the meeting records.'], note: 'Choosing Signed records a status; it does not itself collect an electronic signature or send a request to the participant.' },
        { heading: 'Turn decisions into work', paragraphs: ['Under post-meeting actions, prepare actions from decisions. Review proposed actions and details before executing available ones.', 'Use Create in Habitae on the reviewed action. Execution can create a maintenance task, reminder or standalone fee. Check status and destination records before repeating it.', 'A Communication action creates an internal draft only; it does not send email. The older Communications area is not available in the current menu. To inform residents, prepare and send a notice under Operations → Notices.'] },
        { heading: 'Finalise, reopen and recover versions', paragraphs: ['Finalise minutes saves and protects the text against accidental changes. Approved status alone still leaves it editable.', 'To correct finalised minutes, reopen them and read the confirmation: status returns to Reviewed and the finalised version remains in history. Restore under the editable meeting’s version history recovers a previous version.', 'A new meeting can be only a local browser draft. The app offers to recover it when you create a meeting again. For saved meetings, check the autosave indicator and save manually before leaving.'] },
      ],
    },
  }),
  withFrench({
    id: 'signature', category: 'assemblies', next: ['meeting-votes', 'proxy'],
    pt: {
      slug: 'lista-assinaturas', title: 'Preparar a lista de assinaturas', excerpt: 'Gere a folha da assembleia com os titulares e as permilagens registados.',
      sections: [
        { heading: 'Antes de gerar', paragraphs: ['Confirme as frações e os titulares em Pessoas e Frações. A lista usa esses dados; não é preciso escrever os nomes novamente neste ecrã.'] },
        { heading: 'Preparar o PDF', steps: ['Abra Assembleias → Lista de Assinaturas.', 'Preencha o Título, a Data e o Local da assembleia.', 'Confira o número de assinaturas, as frações e a permilagem apresentados.', 'Reveja a pré-visualização e use “Abrir PDF” para imprimir ou guardar.'], note: 'Gerar a folha não confirma a presença de ninguém. Depois da reunião, registe as presenças e guarde a folha assinada no processo da ata.' },
        { heading: 'Faltam nomes ou frações?', paragraphs: ['Se não houver frações, o PDF fica indisponível. Corrija os dados e as associações em Pessoas e Frações e volte a abrir esta área para gerar a lista atualizada.'] },
      ],
    },
    en: {
      slug: 'signature-list', title: 'Prepare the signature list', excerpt: 'Generate an assembly sheet from recorded owners and ownership shares.',
      sections: [
        { heading: 'Before generating', paragraphs: ['Check units and owners under People and Units. The list uses those records; you do not need to type the names again here.'] },
        { heading: 'Prepare the PDF', steps: ['Open Assemblies → Signature List.', 'Enter the assembly title, date and location.', 'Check the displayed signature count, units and ownership shares.', 'Review the preview and open the PDF to print or save.'], note: 'Generating the sheet does not confirm attendance. After the meeting, record attendance and attach the signed sheet to the minutes.' },
        { heading: 'Missing names or units?', paragraphs: ['The PDF is unavailable without units. Correct details and associations under People and Units, then reopen this area to generate an updated list.'] },
      ],
    },
  }),
  withFrench({
    id: 'proxy', category: 'assemblies', next: ['people-changes', 'meeting-votes'],
    pt: {
      slug: 'preparar-procuracoes', title: 'Preparar procurações para a assembleia', excerpt: 'Gere os formulários e confira os dados de quem será representado.',
      sections: [
        { heading: 'O que precisa de estar registado', paragraphs: ['As procurações são preparadas a partir dos proprietários ativos e das suas frações. Confirme os titulares antes de gerar.', 'Se quiser preencher um procurador já registado, crie a pessoa e associe-a à fração com a relação Procurador.'] },
        { heading: 'Gerar os formulários', steps: ['Abra Assembleias → Procurações.', 'Escolha a Data do documento.', 'Ative “Preencher procurador existente” para usar a associação guardada, ou deixe desligado para preencher depois.', 'Confira os proprietários, as frações e a pré-visualização e use “Abrir PDF”.'], note: 'Gerar o formulário não confirma que foi assinado nem que a pessoa compareceu. Confira a procuração recebida e registe a representação na reunião.' },
        { heading: 'Juntar ao processo da reunião', paragraphs: ['Na reunião realizada, marque a presença como Representado, indique o representante e confirme a procuração anexa quando aplicável. Adicione o ficheiro na categoria Procuração dos anexos da ata.'] },
      ],
    },
    en: {
      slug: 'prepare-proxy-forms', title: 'Prepare proxy forms for an assembly', excerpt: 'Generate forms and check the details of people being represented.',
      sections: [
        { heading: 'Required records', paragraphs: ['Forms use active owners and their units. Check ownership details before generating.', 'To fill an existing representative, add the person and link them to the unit with the Proxy relationship.'] },
        { heading: 'Generate forms', steps: ['Open Assemblies → Proxies.', 'Choose the document date.', 'Enable Fill existing proxy to use the saved association, or leave it off to complete later.', 'Check owners, units and the preview, then open the PDF.'], note: 'Generating a form does not confirm it was signed or that someone attended. Check the received proxy and record representation in the meeting.' },
        { heading: 'Add to the meeting record', paragraphs: ['For a held meeting, mark Represented, enter the representative and confirm the attached proxy where applicable. Add the file under the Proxy category in the minutes attachments.'] },
      ],
    },
  }),
  withFrench({
    id: 'map', category: 'people', next: ['people-changes', 'documents'],
    pt: {
      slug: 'mapa-condominos', title: 'Gerar o Mapa de Condóminos', excerpt: 'Prepare uma ficha por fração, preenchida ou em branco para recolher dados.',
      sections: [
        { heading: 'Preparar as fichas', steps: ['Abra Pessoas e Frações → Mapa de Condóminos.', 'Escolha a Data do documento.', 'Deixe “Preencher com dados existentes” ativo para usar os registos atuais. Desative para preparar fichas por preencher.', 'Confira a pré-visualização: é criada uma página por fração.', 'Use “Abrir PDF” para guardar ou imprimir.'] },
        { heading: 'Usar os dados recolhidos', paragraphs: ['Se recolher correções nas fichas impressas, introduza-as em Pessoas e Frações. Preencher um PDF fora da aplicação não atualiza os registos automaticamente.', 'Se não existirem frações, crie-as primeiro. Se os nomes estiverem errados, reveja as relações da fração antes de gerar novamente.'] },
      ],
    },
    en: {
      slug: 'resident-map', title: 'Generate the resident map', excerpt: 'Prepare one form per unit, prefilled or blank for collecting details.',
      sections: [
        { heading: 'Prepare the forms', steps: ['Open People and Units → Resident Map.', 'Choose the document date.', 'Leave Fill existing data enabled to use current records, or disable it for blank forms.', 'Check the preview: there is one page per unit.', 'Open the PDF to save or print.'] },
        { heading: 'Use the collected details', paragraphs: ['Enter corrections collected on printed forms under People and Units. Filling in a PDF outside the app does not automatically update the records.', 'Create units first if none exist. For incorrect names, review unit relationships before generating again.'] },
      ],
    },
  }),
  withFrench({
    id: 'official', category: 'documents', next: ['documents', 'corrections'],
    pt: {
      slug: 'declaracoes-irs-divida', title: 'Gerar declarações de pagamentos e de dívida', excerpt: 'Escolha o titular e o período e reveja o documento criado pelos registos.',
      sections: [
        { heading: 'Antes de começar', paragraphs: ['Registe a pessoa e confira as frações, quotas e pagamentos associados. Abra Documentação → Documentos → Gerar documentos oficiais.', 'Os nomes dos documentos identificam os modelos disponíveis na aplicação. Confira os dados e a finalidade do documento antes de o utilizar.'] },
        { heading: 'Declaração de IRS', steps: ['No cartão Declaração para efeitos de IRS, escolha o Titular.', 'Selecione o Exercício e a Data de emissão.', 'Use “Gerar PDF” e confira o titular, o exercício e os pagamentos apresentados.'], note: 'O documento é preparado a partir dos pagamentos registados. Gerá-lo não envia uma declaração às Finanças nem confirma o tratamento fiscal dos valores.' },
        { heading: 'Declaração de não dívida ou de dívida', steps: ['No cartão Declaração de não dívida, escolha o Titular.', 'Em “Verificar em”, indique a data a que se refere a consulta. Defina também a Data de emissão.', 'Selecione “Gerar PDF” e leia o resultado.'], note: 'Se houver valores em aberto, o sistema gera uma declaração de dívida. Não altere apenas o título do PDF: confira e corrija os registos de origem se o resultado estiver errado.' },
        { heading: 'Encontrar ou corrigir a declaração', paragraphs: ['Consulte o Arquivo de PDFs para documentos guardados. Para corrigir nomes, contactos ou valores, altere os dados na área respetiva e gere uma nova versão. Uma exportação anterior mantém o conteúdo que tinha quando foi gerada.'] },
      ],
    },
    en: {
      slug: 'payment-and-debt-declarations', title: 'Generate payment and debt declarations', excerpt: 'Choose the person and period, then review the document generated from records.',
      sections: [
        { heading: 'Before you start', paragraphs: ['Add the person and check associated units, fees and payments. Open Documentation → Documents → Generate official documents.', 'Document names identify the templates available in the app. Check the data and intended use before using a document.'] },
        { heading: 'IRS declaration', steps: ['In the IRS declaration card, choose the person.', 'Select the financial year and issue date.', 'Generate the PDF and check the person, period and payments shown.'], note: 'The document uses recorded payments. Generating it does not submit a return to the tax authority or confirm the tax treatment of the amounts.' },
        { heading: 'No-debt or debt declaration', steps: ['Choose the person in the no-debt declaration card.', 'Choose the date to check as of, and the issue date.', 'Generate the PDF and read the result.'], note: 'If amounts remain outstanding, the system generates a debt declaration. Do not just change the PDF title: check and correct source records if the result is wrong.' },
        { heading: 'Find or correct the declaration', paragraphs: ['Check the PDF archive for saved documents. Correct names, contacts or amounts in their original areas and generate a new version. Earlier exports keep the content they had when generated.'] },
      ],
    },
  }),
];
