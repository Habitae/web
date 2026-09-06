import type { Guide } from './helpTypes';

export const accountGuides: Guide[] = [
  {
    id: 'billing-changes', category: 'account', next: ['billing', 'workspace'],
    pt: {
      slug: 'alterar-plano-limites-subcricao', title: 'Alterar o plano e consultar os limites', excerpt: 'Compare a utilização, a periodicidade e as condições antes de mudar a subscrição.',
      sections: [
        { heading: 'Conferir o plano atual', steps: ['Entre como proprietário da organização e abra Subscrição e faturação no ícone de cartão.', 'Confira Estado, Plano atual, Periodicidade e Utilização e limites.', 'Se tiver um plano Pioneiro ou gerido pelo suporte, leia as condições apresentadas nessa página; nem todas as contas têm as mesmas opções.'] },
        { heading: 'Escolher outro plano', steps: ['Na área Alterar subscrição, selecione Mensal ou Anual.', 'Compare as funcionalidades e limites e escolha o plano pretendido.', 'Use Agendar alteração validada quando houver subscrição Stripe, ou a ação Mudar para / Subscrever apresentada para a sua conta.', 'Leia o resultado e confirme o plano atual e qualquer Próximo plano agendado.'], note: 'A validação pode recusar uma mudança se a utilização exceder os limites do novo plano. Não assuma que escolher um cartão de plano conclui a alteração.' },
        { heading: 'Pagamentos, faturas e cancelamento', paragraphs: ['Quando disponível, “Gerir faturação no Stripe” abre o portal de faturação. Use as opções apresentadas para consultar faturas, atualizar pagamento ou gerir o cancelamento.', 'Depois de sair do portal, volte à subscrição e confirme o estado e a data de fim indicados. Se o portal ou a opção necessária não estiverem disponíveis, contacte o suporte.'] },
        { heading: 'Ficheiros ou ações bloqueados pelo plano', paragraphs: ['Algumas funcionalidades, limites de utilização ou envios dependem do plano. Leia a mensagem apresentada e confira a subscrição antes de voltar a tentar. Se a conta não for proprietária, peça ao proprietário para tratar da alteração.'] },
      ],
    },
    en: {
      slug: 'change-plan-and-check-limits', title: 'Change plans and check subscription limits', excerpt: 'Compare usage, billing intervals and conditions before changing the subscription.',
      sections: [
        { heading: 'Check the current plan', steps: ['Sign in as organisation owner and open Subscription and Billing using the card icon.', 'Check status, current plan, billing interval and usage limits.', 'For a Pioneiro or support-managed plan, read the conditions shown; options differ between accounts.'] },
        { heading: 'Choose another plan', steps: ['In the change-subscription area, select Monthly or Annual.', 'Compare features and limits and select the intended plan.', 'Use the validated-scheduled-change action for a Stripe subscription, or the change-to/subscribe action shown for your account.', 'Read the result and check the current plan and any scheduled next plan.'], note: 'Validation can reject a change if usage exceeds the new plan’s limits. Selecting a plan card alone does not complete the change.' },
        { heading: 'Payments, invoices and cancellation', paragraphs: ['When available, Manage billing in Stripe opens the portal. Use its available options to view invoices, update payment details or manage cancellation.', 'Return to the subscription page afterwards and check the displayed status and end date. Contact support if the portal or required option is unavailable.'] },
        { heading: 'Plan restrictions', paragraphs: ['Some features, usage limits and sending actions depend on the plan. Read the message and check the subscription before retrying. If you are not the owner, ask them to handle changes.'] },
      ],
    },
  },
  {
    id: 'access', category: 'getting-started', next: ['start', 'permissions'],
    pt: {
      slug: 'conta-acesso-palavra-passe', title: 'Criar conta, entrar e alterar a palavra-passe', excerpt: 'Escolha entre criar a sua organização ou aceitar o convite de uma equipa.',
      sections: [
        { heading: 'Criar a sua própria área de trabalho', steps: ['Na página de entrada da aplicação, escolha “Criar conta”.', 'Preencha a empresa ou organização, o seu nome e o email.', 'Crie uma palavra-passe com pelo menos 10 caracteres e repita-a na confirmação.', 'Leia os termos e os avisos apresentados e conclua o registo. Siga a página de subscrição e o guia de configuração que aparecerem.'], note: 'A primeira configuração de uma instalação pode mostrar “Criar conta proprietária”. Essa conta fica responsável pela organização.' },
        { heading: 'Entrar numa equipa que já existe', paragraphs: ['Use o link do convite enviado pela equipa. Confirme o nome da organização e o email apresentado. Se for uma conta nova, indique o nome e crie e confirme a palavra-passe. Se já tiver conta, use a sua palavra-passe atual.', 'Se o convite estiver inválido ou expirado, peça um novo ao proprietário da organização. Criar outra organização não dá acesso aos condomínios da equipa.'] },
        { heading: 'Entrar e sair', paragraphs: ['Para voltar à aplicação, use o email e a palavra-passe da sua conta. Confirme a organização selecionada após entrar. Use “Terminar sessão” na área da conta quando terminar num computador partilhado.'] },
        { heading: 'Alterar ou recuperar o acesso', steps: ['Com sessão iniciada, abra “Alterar palavra-passe” no ícone de chave da barra superior.', 'Introduza a palavra-passe atual, a nova palavra-passe e a confirmação.', 'Guarde e confirme a mensagem “Palavra-passe alterada”.'], note: 'Se não conseguir entrar, peça ajuda ao proprietário da organização. A gestão de utilizadores permite definir uma nova palavra-passe. A página de entrada atual não tem um fluxo de recuperação por email; se for a conta proprietária, contacte o suporte.' },
      ],
    },
    en: {
      slug: 'account-login-password', title: 'Create an account, sign in and change your password', excerpt: 'Choose between your own workspace and an invitation to an existing team.',
      sections: [
        { heading: 'Create your own workspace', steps: ['On the app sign-in page, choose “Create account”.', 'Enter the company or organisation, your name and email.', 'Create a password with at least 10 characters and enter it again to confirm.', 'Read the terms and notices shown, then complete registration. Follow the subscription page and setup guide when they appear.'], note: 'The first setup of an installation may show “Create owner account”. That account is responsible for the organisation.' },
        { heading: 'Join an existing team', paragraphs: ['Open the invitation link sent by the team. Check the organisation name and email shown. For a new account, enter your name and create and confirm a password. If you already have an account, use your current password.', 'Ask the organisation owner for a new invitation if it is invalid or expired. Creating another organisation does not give you access to the team’s buildings.'] },
        { heading: 'Sign in and out', paragraphs: ['Return using your account email and password. Check the selected organisation after signing in. Use “Sign out” in the account area when you finish on a shared computer.'] },
        { heading: 'Change a password or recover access', steps: ['While signed in, open the change-password action using the key icon in the top bar.', 'Enter your current password, a new password and its confirmation.', 'Save and check the password-changed message.'], note: 'If you cannot sign in, ask the organisation owner for help. User management can set a new password. The current sign-in screen has no email password-recovery flow; contact support if it is the owner account.' },
      ],
    },
  },
  {
    id: 'workspace', category: 'account', next: ['permissions', 'billing'],
    pt: {
      slug: 'organizacoes-arquivar-condominios', title: 'Trocar de organização e arquivar condomínios', excerpt: 'Mantenha as áreas de trabalho separadas e retire edifícios da lista sem apagar os dados.',
      sections: [
        { heading: 'Organização e edifício são escolhas diferentes', paragraphs: ['Uma organização reúne a equipa, a subscrição e os condomínios. Escolher uma organização muda a área de trabalho; escolher um condomínio abre os dados desse edifício.'] },
        { heading: 'Trocar ou criar uma organização', steps: ['Volte à página de seleção de condomínios.', 'Se pertencer a várias organizações, escolha a pretendida em “Trocar organização”.', 'Para uma área de trabalho separada, use “Nova organização”, escreva o nome e selecione “Criar organização”.', 'Confirme a organização ativa antes de adicionar condomínios ou convidar pessoas.'], note: 'Uma organização nova tem os seus próprios dados, acessos e subscrição. Não move automaticamente os condomínios de outra organização.' },
        { heading: 'Arquivar e restaurar um condomínio', steps: ['Na lista de condomínios, use “Arquivar” no cartão do edifício e leia a confirmação.', 'O edifício deixa de aparecer na lista principal. Use “Mostrar arquivados” para o encontrar.', 'Use “Restaurar” no cartão para o voltar a colocar entre os ativos.'], note: 'Arquivar mantém os dados. “Eliminar” é uma ação diferente e remove o condomínio e os dados associados; leia a confirmação antes de a usar.' },
        { heading: 'Dados da administração', paragraphs: ['Na página de seleção, abra Administração na engrenagem. Preencha os dados da empresa e os contactos e use “Guardar administração”. Dentro de um edifício, a engrenagem abre as Configurações desse contexto. As ações disponíveis dependem da sua função.'] },
      ],
    },
    en: {
      slug: 'organisations-and-archived-buildings', title: 'Switch organisations and archive buildings', excerpt: 'Keep workspaces separate and remove buildings from the active list without erasing their records.',
      sections: [
        { heading: 'Organisation and building are different choices', paragraphs: ['An organisation brings together the team, subscription and condominiums. Selecting an organisation changes your workspace; selecting a condominium opens that building’s records.'] },
        { heading: 'Switch or create an organisation', steps: ['Return to the condominium selection page.', 'If you belong to several organisations, select one using the organisation switcher.', 'For a separate workspace, choose “New organisation”, enter its name and create it.', 'Check the active organisation before adding buildings or inviting people.'], note: 'A new organisation has its own records, access and subscription. It does not automatically move buildings from another organisation.' },
        { heading: 'Archive and restore a building', steps: ['Use “Archive” on the building’s card and read the confirmation.', 'It leaves the main list. Choose “Show archived” to find it.', 'Use “Restore” on its card to make it active again.'], note: 'Archiving keeps the records. “Delete” is a separate action that removes the condominium and associated data; read its confirmation before using it.' },
        { heading: 'Administration details', paragraphs: ['On the selection page, open Administration using the gear icon. Enter company and contact details and save the administration form. Inside a building, the gear opens Settings for that context. Available actions depend on your role.'] },
      ],
    },
  },
  {
    id: 'permissions', category: 'account', next: ['team', 'audit'],
    pt: {
      slug: 'funcoes-permissoes', title: 'Perceber as funções e os acessos', excerpt: 'Saiba quem pode consultar, editar, gerir utilizadores e tratar da subscrição.',
      sections: [
        { heading: 'As quatro funções', table: { columns: ['Função', 'O que permite'], rows: [['Proprietário da organização', 'Gerir a organização, os seus condomínios, utilizadores, configurações, auditoria e subscrição.'], ['Administrador', 'Gerir os registos dos condomínios atribuídos, configurações e auditoria. Não gere utilizadores nem a subscrição.'], ['Gestor', 'Criar e alterar registos nos condomínios atribuídos. Não gere configurações, auditoria, utilizadores ou subscrição.'], ['Consulta', 'Consultar informação dos condomínios atribuídos. Não pode criar ou alterar registos; alguns dados pessoais são ocultados.']] } },
        { heading: 'A função e a lista de condomínios trabalham em conjunto', paragraphs: ['A função define o tipo de ações. Os condomínios atribuídos definem onde a pessoa pode trabalhar. O proprietário da organização tem acesso ao conjunto da sua organização.', 'Os limites e funcionalidades da subscrição também se aplicam. Ter permissão de escrita não ativa uma funcionalidade que o plano não inclui.'] },
        { heading: 'Rever um acesso', steps: ['O proprietário abre Administração → Utilizadores.', 'Escolhe a pessoa, verifica a função e assinala os condomínios necessários.', 'Quando alguém deixa a equipa, revê o estado ativo e os acessos. Não é preciso partilhar a conta de outra pessoa.'], note: 'O proprietário da organização é uma função da conta. O proprietário de uma fração é uma relação na área Pessoas e Frações; uma não dá automaticamente a outra.' },
      ],
    },
    en: {
      slug: 'roles-and-permissions', title: 'Understand roles and access', excerpt: 'Find out who can view, edit, manage users and look after the subscription.',
      sections: [
        { heading: 'The four roles', table: { columns: ['Role', 'What it allows'], rows: [['Organisation owner', 'Manage the organisation, its buildings, users, settings, audit log and subscription.'], ['Administrator', 'Manage records for assigned buildings, settings and the audit log. Cannot manage users or the subscription.'], ['Manager', 'Create and change records in assigned buildings. Cannot manage settings, audit logs, users or subscriptions.'], ['View-only', 'Read information for assigned buildings. Cannot create or change records; some personal details are hidden.']] } },
        { heading: 'Role and building access work together', paragraphs: ['The role determines the actions. Assigned buildings determine where the person can work. The organisation owner can access all buildings in that organisation.', 'Subscription limits and features also apply. Write access does not enable a feature that your plan does not include.'] },
        { heading: 'Review someone’s access', steps: ['The owner opens Administration → Users.', 'Find the person, check their role and select the required condominiums.', 'When someone leaves the team, review their active status and access. Each person should use their own account.'], note: 'Organisation owner is an account role. Unit owner is a relationship under People and Units. One does not automatically grant the other.' },
      ],
    },
  },
  {
    id: 'settings', category: 'account', next: ['reminders', 'privacy'],
    pt: {
      slug: 'configuracoes-documentos-seguros', title: 'Configurar dados, documentos e seguros', excerpt: 'Preencha os dados do edifício e os modelos usados em avisos e recibos.',
      sections: [
        { heading: 'Antes de alterar', paragraphs: ['Abra a engrenagem dentro do condomínio. As configurações são geridas pelo proprietário da organização ou por um administrador.', 'O nome, NIF, morada e logótipos pertencem ao condomínio selecionado. Os parâmetros gerais e modelos guardados em Configurações pertencem à organização; confirme o impacto nos restantes condomínios.'] },
        { heading: 'O que existe em cada separador', table: { columns: ['Separador', 'O que preencher'], rows: [['Dados gerais', 'Nome, NIF, morada, código postal, logótipos claro/escuro e assinatura digitalizada.'], ['Envio automático de avisos', 'Preferências de avisos de quotas e seguros, formato e dias de pré-aviso.'], ['Configurar avisos / recibos', 'IBAN, BIC, destinatário de cheque, prazo MB, tamanho da folha, data de emissão e textos de documentos e emails.'], ['Parâmetros', 'Forma de pagamento por defeito, data valor mínima e dados de construção e pisos.'], ['Seguro do condomínio', 'Capital, validade, seguradora, apólice, coberturas e contactos; a primeira apólice permite anexar o documento.'], ['Informação conservatória', 'Conservatória, descrição predial, freguesia/concelho e referências do edifício.'], ['Privacidade e direitos', 'Registo de pedidos e exportação de dados da organização.']] } },
        { heading: 'Guardar e conferir', steps: ['Escolha o separador e preencha apenas os dados que consegue confirmar.', 'Use “Guardar alterações” e verifique se aparece alguma mensagem de erro.', 'Volte a abrir o separador para confirmar os valores guardados.', 'Gere um PDF de exemplo para conferir nome, morada, dados de pagamento e assinatura.'], note: 'A assinatura digitalizada é uma imagem usada nos documentos. Carregá-la não recolhe uma assinatura eletrónica dos participantes de uma assembleia.' },
        { heading: 'Logótipos, apólices e prazos', paragraphs: ['Use uma imagem legível para o logótipo e a assinatura. Na apólice digitalizada, use um documento aceite pelo seletor. O limite por ficheiro é 5 MB. Se o carregamento for recusado, siga a mensagem do formulário.', 'A data valor mínima pode impedir registos financeiros anteriores. Confirme-a antes de introduzir saldos ou movimentos antigos. Alterar o IBAN mostrado nos avisos não cria uma ligação automática ao banco.'] },
      ],
    },
    en: {
      slug: 'settings-documents-insurance', title: 'Configure details, documents and insurance', excerpt: 'Set up building details and the templates used in notices and receipts.',
      sections: [
        { heading: 'Before changing settings', paragraphs: ['Open the gear inside the condominium. Settings are managed by the organisation owner or an administrator.', 'The name, tax number, address and logos belong to the selected condominium. General parameters and templates saved in Settings belong to the organisation; check the impact on other buildings.'] },
        { heading: 'What each tab contains', table: { columns: ['Tab', 'What to enter'], rows: [['General details', 'Name, tax number, address, postal code, light/dark logos and scanned signature.'], ['Automatic notices', 'Fee and insurance notice preferences, format and advance-notice days.'], ['Notice / receipt settings', 'IBAN, BIC, cheque payee, MB deadline, paper size, issue date and document/email text.'], ['Parameters', 'Default payment method, earliest financial value date, construction and floor details.'], ['Condominium insurance', 'Insured amount, expiry, insurer, policy, coverage and contacts; the first policy supports a document upload.'], ['Registry information', 'Registry office, property description, locality and building references.'], ['Privacy and rights', 'Request records and organisation data export.']] } },
        { heading: 'Save and check', steps: ['Choose a tab and enter details you can verify.', 'Save changes and check for error messages.', 'Reopen the tab to check the stored values.', 'Generate a sample PDF to check the name, address, payment details and signature.'], note: 'A scanned signature is an image used on documents. Uploading it does not collect an electronic signature from meeting participants.' },
        { heading: 'Uploads and dates', paragraphs: ['Use legible images for logos and signatures. Upload a supported document for the scanned policy. The limit is 5 MB per file. If an upload is rejected, follow the form’s message.', 'The earliest value date can prevent earlier financial entries. Check it before entering old balances or transactions. Changing the IBAN on notices does not connect the app to your bank.'] },
      ],
    },
  },
  {
    id: 'privacy', category: 'account', next: ['permissions', 'audit'],
    pt: {
      slug: 'pedidos-privacidade-exportacao', title: 'Registar pedidos de privacidade e exportar dados', excerpt: 'Acompanhe pedidos na aplicação e perceba o alcance da exportação.',
      sections: [
        { heading: 'Registar um pedido', steps: ['Com acesso às configurações, abra Configurações → Privacidade e direitos.', 'Depois da verificação de identidade prevista pela sua organização, escolha o Tipo de pedido.', 'Preencha o nome, o email e as notas operacionais relevantes. Não coloque documentos de identificação nas notas.', 'Selecione “Registar pedido” e confirme que aparece em Pedidos registados.'] },
        { heading: 'Acompanhar o tratamento', paragraphs: ['A lista mostra o prazo registado e permite mudar o estado para Aberto, Em tratamento, Concluído ou Recusado. Use o estado que corresponde ao trabalho efetivamente realizado.', 'Mudar o estado para Concluído não altera nem apaga automaticamente os dados de uma pessoa. O pedido é um registo de acompanhamento; a operação correspondente tem de ser tratada separadamente.'] },
        { heading: 'Exportar dados da organização', steps: ['Selecione “Exportar dados da organização”.', 'Guarde o ficheiro JSON descarregado. JSON é um formato de dados estruturados, diferente de um relatório PDF.', 'Confirme a organização e o conteúdo antes de usar ou partilhar o ficheiro.'], note: 'Este botão exporta dados da organização, não apenas os da pessoa indicada no formulário. Não envie a exportação completa a um condómino como resposta automática a um pedido individual.' },
        { heading: 'Exportação não é restauro', paragraphs: ['A interface não tem um botão para restaurar a aplicação a partir deste ficheiro. Para cópias de segurança, recuperação ou uma operação que a interface não oferece, contacte o responsável pelo serviço.'] },
      ],
    },
    en: {
      slug: 'privacy-requests-and-data-export', title: 'Record privacy requests and export data', excerpt: 'Track requests in the app and understand what the export contains.',
      sections: [
        { heading: 'Record a request', steps: ['With settings access, open Settings → Privacy and rights.', 'After your organisation’s identity check, choose the request type.', 'Enter the name, email and relevant operational notes. Do not put identity documents in the notes.', 'Select the record-request action and check that it appears in the list.'] },
        { heading: 'Track progress', paragraphs: ['The list shows the recorded deadline and lets you choose Open, In progress, Completed or Rejected. Use the status that matches the work actually done.', 'Marking a request Completed does not automatically change or erase a person’s data. It is a tracking record; the corresponding operation must be handled separately.'] },
        { heading: 'Export organisation data', steps: ['Choose “Export organisation data”.', 'Save the downloaded JSON file. JSON is a structured data format, different from a PDF report.', 'Check the organisation and contents before using or sharing the file.'], note: 'This button exports organisation data, not just the person named in the form. Do not automatically send the full export to an owner in response to an individual request.' },
        { heading: 'Export is not restore', paragraphs: ['The interface has no button to restore the application from this file. For backups, recovery or an operation the interface does not offer, contact the service administrator.'] },
      ],
    },
  },
  {
    id: 'audit', category: 'account', next: ['permissions', 'corrections'],
    pt: {
      slug: 'consultar-auditoria', title: 'Consultar o registo de auditoria', excerpt: 'Procure quem realizou uma ação e em que condomínio.',
      sections: [
        { heading: 'Onde encontrar', paragraphs: ['Na página de seleção de condomínios, abra Administração → Auditoria. Está disponível para o proprietário da organização e administradores.', 'A auditoria lista eventos registados pelo sistema. É diferente da Linha cronológica, que resume a atividade operacional do condomínio.'] },
        { heading: 'Pesquisar um evento', steps: ['Escolha um Condomínio ou deixe “Todos”.', 'No campo Ação, introduza um termo como “payment”, “users” ou “auth”, quando souber o tipo de evento.', 'Selecione “Atualizar” para aplicar os filtros.', 'Leia a Data, o Utilizador, a Ação, o Condomínio e o Detalhe. “Sistema” identifica eventos sem um nome de utilizador apresentado.'], note: 'A vista carrega até 150 eventos por pedido. Uma pesquisa vazia não prova que uma ação nunca aconteceu; reveja os filtros e o período do problema com o responsável pelo serviço.' },
        { heading: 'Corrigir uma operação', paragraphs: ['A auditoria é uma vista de consulta, sem botão para desfazer eventos. Vá à área de origem, como Quotas e Recebimentos, e use a ação adequada. Anote a data e a referência do evento se precisar de ajuda.'] },
      ],
    },
    en: {
      slug: 'view-audit-log', title: 'Read the audit log', excerpt: 'Look up who performed an action and which building it concerned.',
      sections: [
        { heading: 'Where to find it', paragraphs: ['From condominium selection, open Administration → Audit. Organisation owners and administrators can access it.', 'The audit log lists recorded system events. The Timeline is a separate summary of operational activity.'] },
        { heading: 'Find an event', steps: ['Choose a condominium or leave “All”.', 'Enter an action term such as “payment”, “users” or “auth” when you know the event type.', 'Select “Refresh” to apply the filters.', 'Read the date, user, action, condominium and detail. “System” identifies events without a displayed user name.'], note: 'The view loads up to 150 events per request. Empty results do not prove an action never happened; review the filters and relevant period with the service administrator.' },
        { heading: 'Correct an operation', paragraphs: ['The audit log is a read-only view with no undo button. Go to the original area, such as Fees and Receipts, and use the appropriate action. Note the event date and reference if you need help.'] },
      ],
    },
  },
  {
    id: 'people-changes', category: 'people', next: ['map', 'proxy'],
    pt: {
      slug: 'alterar-proprietarios-pagadores', title: 'Alterar proprietários, pagadores e contactos', excerpt: 'Atualize uma mudança de pessoa sem confundir a fração, o contacto e o acesso à aplicação.',
      sections: [
        { heading: 'Corrigir contactos ou arquivar uma pessoa', steps: ['Abra Pessoas e Frações → Pessoas e use “Editar” na pessoa existente para corrigir nome ou contactos.', 'Guarde com “Atualizar” e confirme o registo.', 'Se deixar de ser necessário mostrar a pessoa na lista principal, use “Arquivar”. “Mostrar arquivadas” permite encontrá-la e restaurá-la.'], note: 'Eliminar uma pessoa também remove as suas relações com frações. Não use eliminar apenas para esconder uma pessoa da lista.' },
        { heading: 'Registar uma mudança de titular ou residente', steps: ['Crie a nova pessoa em Pessoas, se ainda não existir.', 'Abra Frações e a ação “Atribuir Pessoa à Fração” da unidade correta.', 'Escolha a pessoa, a relação (Proprietário, Arrendatário, Usufrutuário ou Procurador) e a Data de Início.', 'Use “Atribuir” e confirme a relação apresentada. Para remover uma relação, use a ação com o nome dessa relação e leia a confirmação.'] },
        { heading: 'Definir quem paga', paragraphs: ['Ao editar a fração, reveja “Quem paga a quota”. As opções de divisão permitem separar quota base e FCR ou usar percentagens entre proprietário e inquilino.', 'Associe as pessoas necessárias antes de gerar cobranças. Depois da alteração, confira as quotas existentes e a pré-visualização de futuros planos; não assuma que todos os registos anteriores foram reatribuídos.'] },
        { heading: 'Documentos e acesso à aplicação', paragraphs: ['Depois de atualizar as pessoas e as relações, volte a gerar o Mapa de Condóminos, as listas e as procurações que precisem dos novos dados.', 'Mudar uma relação ou arquivar uma pessoa não altera a função de uma conta da equipa. Os acessos continuam em Administração → Utilizadores.'] },
      ],
    },
    en: {
      slug: 'change-owners-payers-contacts', title: 'Update owners, payers and contact details', excerpt: 'Keep units, people and app access clear when someone changes.',
      sections: [
        { heading: 'Correct contacts or archive a person', steps: ['Open People and Units → People and edit the existing person to correct their name or contacts.', 'Save with “Update” and check the record.', 'To hide someone from the main list, use “Archive”. “Show archived” lets you find and restore them.'], note: 'Deleting a person also removes their unit relationships. Do not delete a person just to hide them from the list.' },
        { heading: 'Record a new owner or resident', steps: ['Add the new person under People if needed.', 'Open Units and the assign-person action for the correct unit.', 'Choose the person, relationship (Owner, Tenant, Usufructuary or Proxy) and start date.', 'Assign and check the displayed relationship. To remove one, use its named remove action and read the confirmation.'] },
        { heading: 'Choose who pays', paragraphs: ['When editing a unit, review who pays the fee. Split options can separate the base fee and reserve component or use percentages between owner and tenant.', 'Link the necessary people before generating charges. After changes, check existing fees and future schedule previews; do not assume all previous records were reassigned.'] },
        { heading: 'Documents and app access', paragraphs: ['After changing people and relationships, regenerate the resident map, lists and proxy forms that need the updated details.', 'Changing a relationship or archiving a person does not change a team account’s role. Access is managed in Administration → Users.'] },
      ],
    },
  },
  {
    id: 'timeline', category: 'getting-started', next: ['bank', 'payment'],
    pt: {
      slug: 'ler-linha-cronologica', title: 'Ler a Linha cronológica', excerpt: 'Perceba o resumo financeiro, a atividade recente e o que precisa de acompanhamento.',
      sections: [
        { heading: 'Abrir a visão geral', steps: ['Selecione o condomínio e abra Linha cronológica.', 'Escolha o período disponível no topo: todos os registos ou um orçamento.', 'Leia o resumo financeiro e a explicação dos valores antes de comparar com outro período.', 'Consulte Recentes e os cartões A acompanhar. Abra o cartão correspondente para tratar das quotas, tarefas, reuniões ou avisos.'] },
        { heading: 'Recebido não é o mesmo que previsto', paragraphs: ['Quotas previstas mostram o que foi cobrado; recebimentos mostram dinheiro já registado como recebido. Um valor em aberto ainda está por liquidar.', 'A posição bancária usa a base do extrato e movimentos confirmados no banco. Para perceber a diferença entre saldo bancário, contabilístico e disponível, abra Conta Bancária.'] },
        { heading: 'Se algo parecer em falta', paragraphs: ['Confirme o condomínio e o período. Abra o registo na sua área de origem para ver todos os detalhes. A cronologia é um resumo; para investigar ações da equipa, use a Auditoria quando tiver acesso.'] },
      ],
    },
    en: {
      slug: 'read-the-timeline', title: 'Read the Timeline', excerpt: 'Understand the financial summary, recent activity and items needing attention.',
      sections: [
        { heading: 'Open the overview', steps: ['Select the condominium and open Timeline.', 'Choose an available period at the top: all records or a budget.', 'Read the financial summary and its calculation breakdown before comparing periods.', 'Check Recent activity and the follow-up cards. Open the relevant card to deal with fees, tasks, meetings or notices.'] },
        { heading: 'Received is different from expected', paragraphs: ['Expected fees show charges raised; receipts show money recorded as received. An outstanding amount still needs to be settled.', 'The bank position uses the statement base and bank-confirmed transactions. Open Bank Account to understand bank, ledger and available balances.'] },
        { heading: 'If something seems missing', paragraphs: ['Check the condominium and period. Open the source record in its own area for full details. The Timeline is a summary; to investigate team actions, use the Audit log if you have access.'] },
      ],
    },
  },
];
