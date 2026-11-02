import type { Language } from '../context/I18nContext';
import type { Article, Figure } from './helpTypes';
import sizes from './helpScreenshotSizes.json' with { type: 'json' };

// Screenshots of the app with demo data, taken by scripts/capture-help-screenshots.mjs
// (npm run help:screenshots) in each language. `section` is the index of the
// guide section the picture follows; `id` names the files in public/help-screens/.
type Screenshot = { id: string; guide: string; section: number; alt: Record<Language, string> };

const screenshots: Screenshot[] = [
  { id: 'start', guide: 'start', section: 2, alt: {
    pt: 'Linha cronológica do Condomínio Aurora com as próximas ações da administração abertas e o menu lateral com os grupos Financeiro, Pessoas e Frações, Operação e Assembleias.',
    en: 'Timeline of Condomínio Aurora with the next administration actions expanded and the side menu showing the Finance, People and units, Operations and Assemblies groups.',
    fr: 'Chronologie de la copropriété Aurora avec les prochaines actions de l’administration ouvertes et le menu latéral avec les groupes Finances, Personnes et lots, Opérations et Assemblées.',
    es: 'Cronología de la comunidad Aurora con las próximas acciones de la administración abiertas y el menú lateral con los grupos Finanzas, Personas y unidades, Operación y Juntas.',
  } },
  { id: 'access', guide: 'access', section: 0, alt: {
    pt: 'Página de entrada do Habitae com os campos Email e Palavra-passe, o botão Entrar no Habitae e as ligações para o Portal do residente e Criar conta.',
    en: 'Habitae sign-in page with the Email and Password fields, the Sign in to Habitae button and links to the Resident portal and Create account.',
    fr: 'Page de connexion d’Habitae avec les champs E-mail et Mot de passe, le bouton Se connecter à Habitae et les liens vers le Portail des résidents et la création de compte.',
    es: 'Página de acceso de Habitae con los campos Email y Contraseña, el botón Entrar en Habitae y los enlaces al Portal del residente y a Crear cuenta.',
  } },
  { id: 'condominium', guide: 'condominium', section: 1, alt: {
    pt: 'Formulário Novo condomínio com o Nome “Edifício Jardim” preenchido e os campos NIPC, Morada e Código postal por preencher, e o botão Criar.',
    en: 'New condominium form with the Name “Garden Building” filled in, empty NIPC, Address and Postal code fields and the Create button.',
    fr: 'Formulaire Nouvelle copropriété avec le nom « Résidence du Jardin » saisi, les champs NIPC, Adresse et Code postal vides et le bouton Créer.',
    es: 'Formulario Nueva comunidad con el nombre «Edificio Jardín» rellenado, los campos NIPC, Dirección y Código postal vacíos y el botón Crear.',
  } },
  { id: 'workspace', guide: 'workspace', section: 1, alt: {
    pt: 'Página Os seus condomínios com o seletor de organização, os botões Nova organização e Novo condomínio e o cartão do Condomínio Aurora com o menu de ações.',
    en: 'Your condominiums page with the organisation selector, the New organisation and New condominium buttons and the Condomínio Aurora card with its actions menu.',
    fr: 'Page Vos copropriétés avec le sélecteur d’organisation, les boutons Nouvelle organisation et Nouvelle copropriété et la carte de la copropriété Aurora avec son menu d’actions.',
    es: 'Página Sus comunidades con el selector de organización, los botones Nueva organización y Nueva comunidad y la tarjeta de la comunidad Aurora con su menú de acciones.',
  } },
  { id: 'units', guide: 'units', section: 0, alt: {
    pt: 'Página Frações com quatro apartamentos, o proprietário de cada um e a permilagem, com o total de 1000‰ e o botão Nova Fração.',
    en: 'Units page listing four apartments with each owner and ownership share, a 1000‰ total and the New unit button.',
    fr: 'Page Lots avec quatre appartements, le propriétaire et la quote-part de chacun, le total de 1000 ‰ et le bouton Nouveau lot.',
    es: 'Página Unidades con cuatro pisos, el propietario y la cuota de participación de cada uno, el total de 1000 ‰ y el botón Nueva unidad.',
  } },
  { id: 'units-form', guide: 'units', section: 1, alt: {
    pt: 'Formulário da nova fração com Letra da Fração, Designação, Tipo de Fração, Andar, Permilagem, Quem paga a quota e Notas.',
    en: 'New unit form with the unit letter, description, unit type, floor, ownership share, who pays the fee and notes.',
    fr: 'Formulaire du nouveau lot avec la lettre, la désignation, le type de lot, l’étage, la quote-part, le payeur de la charge et les notes.',
    es: 'Formulario de la nueva unidad con letra, denominación, tipo de unidad, planta, cuota de participación, quién paga la cuota y notas.',
  } },
  { id: 'people', guide: 'people', section: 1, alt: {
    pt: 'Formulário Nova Pessoa com Nome, NIF, Email, Telefone, Morada e Notas.',
    en: 'New person form with Name, tax number, Email, Phone, Address and Notes.',
    fr: 'Formulaire Nouvelle personne avec le nom, le NIF, l’e-mail, le téléphone, l’adresse et les notes.',
    es: 'Formulario Nueva persona con nombre, NIF, email, teléfono, dirección y notas.',
  } },
  { id: 'people-changes', guide: 'people-changes', section: 0, alt: {
    pt: 'Página Pessoas com quatro condóminos de demonstração, os contactos de cada um e o menu de opções de cada pessoa.',
    en: 'People page with four demo owners, their contact details and an options menu for each person.',
    fr: 'Page Personnes avec quatre copropriétaires de démonstration, leurs coordonnées et un menu d’options pour chacun.',
    es: 'Página Personas con cuatro propietarios de demostración, sus datos de contacto y un menú de opciones para cada uno.',
  } },
  { id: 'resident-access', guide: 'resident-access', section: 1, alt: {
    pt: 'Menu de opções de uma pessoa na página Pessoas, com Editar, Convidar residente, Arquivar e Apagar.',
    en: 'A person’s options menu on the People page, with Edit, Invite resident, Archive and Delete.',
    fr: 'Menu d’options d’une personne dans la page Personnes, avec Modifier, Inviter un résident, Archiver et Supprimer.',
    es: 'Menú de opciones de una persona en la página Personas, con Editar, Invitar residente, Archivar y Eliminar.',
  } },
  { id: 'resident-app', guide: 'resident-app', section: 0, alt: {
    pt: 'Portal do residente num telemóvel: saudação, cartão do condomínio, valor por pagar com quotas pendentes e a barra Resumo, Avisos, Calendário, Quotas e Mensagens.',
    en: 'Resident portal on a phone: greeting, condominium card, amount due with outstanding fees and the Summary, Notices, Calendar, Fees and Messages bar.',
    fr: 'Portail des résidents sur un téléphone : salutation, carte de la copropriété, montant à payer avec les charges en attente et la barre Résumé, Avis, Calendrier, Charges et Messages.',
    es: 'Portal del residente en un móvil: saludo, tarjeta de la comunidad, importe pendiente con las cuotas por pagar y la barra Resumen, Avisos, Calendario, Cuotas y Mensajes.',
  } },
  { id: 'map', guide: 'map', section: 0, alt: {
    pt: 'Página Mapa de Condóminos com a data, a opção Preencher dados, o botão Abrir PDF e a pré-visualização da ficha de uma fração.',
    en: 'Resident map page with the date, the Fill in details option, the Open PDF button and a preview of one unit’s form.',
    fr: 'Page Tableau des copropriétaires avec la date, l’option de préremplissage, le bouton Ouvrir le PDF et l’aperçu de la fiche d’un lot.',
    es: 'Página Listado de propietarios con la fecha, la opción de rellenar datos, el botón Abrir PDF y la vista previa de la ficha de una unidad.',
  } },
  { id: 'access-devices', guide: 'access-devices', section: 0, alt: {
    pt: 'Formulário Registar item em Chaves e tags com Tipo, Classificação, Código, Descrição e Atribuição.',
    en: 'Register item form under Keys and fobs, with Type, Classification, Code, Description and Assignment.',
    fr: 'Formulaire Enregistrer un élément dans Clés et badges, avec le type, la classification, le code, la description et l’attribution.',
    es: 'Formulario Registrar elemento en Llaves y tags, con tipo, clasificación, código, descripción y asignación.',
  } },
  { id: 'transaction', guide: 'transaction', section: 1, alt: {
    pt: 'Formulário Novo Movimento com Tipo, Valor, Data, Categoria do orçamento, Fornecedor, Descrição e a opção do Fundo de Reserva.',
    en: 'New transaction form with Type, Amount, Date, budget category, Supplier, Description and the reserve fund option.',
    fr: 'Formulaire Nouveau mouvement avec le type, le montant, la date, la catégorie du budget, le fournisseur, la description et l’option du fonds de réserve.',
    es: 'Formulario Nuevo movimiento con tipo, importe, fecha, categoría del presupuesto, proveedor, descripción y la opción del fondo de reserva.',
  } },
  { id: 'transaction-review', guide: 'transaction-review', section: 0, alt: {
    pt: 'Página Movimentos com os cartões Receitas, Despesas e Saldo, a pesquisa, os filtros e a lista de movimentos com data, categoria, descrição e valor.',
    en: 'Transactions page with the Income, Expenses and Balance cards, search, filters and the list of transactions with date, category, description and amount.',
    fr: 'Page Mouvements avec les cartes Recettes, Dépenses et Solde, la recherche, les filtres et la liste des mouvements avec date, catégorie, description et montant.',
    es: 'Página Movimientos con las tarjetas Ingresos, Gastos y Saldo, la búsqueda, los filtros y la lista de movimientos con fecha, categoría, descripción e importe.',
  } },
  { id: 'bank', guide: 'bank', section: 0, alt: {
    pt: 'Página Conta Bancária com Banco menos Alocado igual a Disponível, a alocação do saldo por finalidade e os detalhes do extrato base.',
    en: 'Bank account page showing Bank minus Allocated equals Available, the balance allocation by purpose and the base statement details.',
    fr: 'Page Compte bancaire montrant Banque moins Alloué égale Disponible, la répartition du solde par finalité et le détail du relevé de base.',
    es: 'Página Cuenta bancaria con Banco menos Asignado igual a Disponible, la asignación del saldo por finalidad y los detalles del extracto base.',
  } },
  { id: 'bank-import', guide: 'bank-import', section: 1, alt: {
    pt: 'Revisão da importação de um extrato de demonstração com quatro movimentos, as colunas para fração ou condómino e rubrica, e o botão para importar.',
    en: 'Import review of a demo statement with four transactions, columns for unit or owner and category, and the import button.',
    fr: 'Vérification de l’import d’un relevé de démonstration avec quatre mouvements, les colonnes lot ou copropriétaire et rubrique, et le bouton d’import.',
    es: 'Revisión de la importación de un extracto de demostración con cuatro movimientos, las columnas de unidad o propietario y partida, y el botón de importar.',
  } },
  { id: 'invoices', guide: 'invoices', section: 0, alt: {
    pt: 'Formulário Adicionar fatura com a opção de digitalizar um PDF ou fotografia e os campos Fornecedor, Referência, Descrição, datas e Montante.',
    en: 'Add invoice form with the option to scan a PDF or photo and the Supplier, Reference, Description, date and Amount fields.',
    fr: 'Formulaire Ajouter une facture avec l’option de numériser un PDF ou une photo et les champs fournisseur, référence, description, dates et montant.',
    es: 'Formulario Añadir factura con la opción de digitalizar un PDF o una foto y los campos proveedor, referencia, descripción, fechas e importe.',
  } },
  { id: 'trial-balance', guide: 'trial-balance', section: 0, alt: {
    pt: 'Página Balancetes com saldo anterior, recebimentos, pagamentos e saldo final, a escolha do período, os pontos a verificar e as secções do relatório.',
    en: 'Cash reports page with opening balance, receipts, payments and closing balance, the period choice, points to check and the report sections.',
    fr: 'Page Bilans de trésorerie avec le solde initial, les encaissements, les paiements et le solde final, le choix de la période, les points à vérifier et les sections du rapport.',
    es: 'Página Balances con saldo anterior, cobros, pagos y saldo final, la elección del periodo, los puntos a revisar y las secciones del informe.',
  } },
  { id: 'budget', guide: 'budget', section: 1, alt: {
    pt: 'Página Orçamento de 2026 com despesas, reserva, total gasto e saldo disponível, a tabela de categorias e o gráfico de execução.',
    en: '2026 Budget page with expenses, reserve, total spent and available balance, the category table and the execution chart.',
    fr: 'Page Budget 2026 avec les dépenses, la réserve, le total dépensé et le solde disponible, le tableau des catégories et le graphique d’exécution.',
    es: 'Página Presupuesto 2026 con gastos, reserva, total gastado y saldo disponible, la tabla de categorías y el gráfico de ejecución.',
  } },
  { id: 'budget-details', guide: 'budget-details', section: 1, alt: {
    pt: 'Categorias do orçamento com o total, o gasto e a diferença, e o menu de uma categoria com Editar categoria, Definir aplicação e Eliminar categoria.',
    en: 'Budget categories with total, spent and difference, and a category menu with Edit category, Set allocation and Delete category.',
    fr: 'Catégories du budget avec le total, la dépense et l’écart, et le menu d’une catégorie avec Modifier, Définir la répartition et Supprimer.',
    es: 'Categorías del presupuesto con total, gastado y diferencia, y el menú de una categoría con Editar categoría, Definir aplicación y Eliminar categoría.',
  } },
  { id: 'schedule', guide: 'schedule', section: 1, alt: {
    pt: 'Página Plano de Quotas com o orçamento de 2026 selecionado, os botões Quota Avulsa e Preparar plano e o plano de quotas gerado.',
    en: 'Fee schedule page with the 2026 budget selected, the Standalone fee and Prepare schedule buttons and the generated fee schedule.',
    fr: 'Page Échéancier des charges avec le budget 2026 sélectionné, les boutons Charge ponctuelle et Préparer l’échéancier et l’échéancier généré.',
    es: 'Página Plan de cuotas con el presupuesto 2026 seleccionado, los botones Cuota puntual y Preparar plan y el plan de cuotas generado.',
  } },
  { id: 'standalone', guide: 'standalone', section: 1, alt: {
    pt: 'Formulário Nova quota avulsa com Título, Cobrar a, Método de Distribuição, Tipo de cobrança, Valor Total, Data de Início, prazo e dia limite.',
    en: 'New standalone fee form with Title, Charge to, distribution method, charge type, total amount, start date, payment period and due day.',
    fr: 'Formulaire Nouvelle charge ponctuelle avec le titre, le payeur, la méthode de répartition, le type d’appel, le montant total, la date de début, le délai et le jour limite.',
    es: 'Formulario Nueva cuota puntual con título, cobrar a, método de reparto, tipo de cobro, importe total, fecha de inicio, plazo y día límite.',
  } },
  { id: 'safes', guide: 'safes', section: 1, alt: {
    pt: 'Fim do formulário da quota avulsa com as opções Incluir Fundo Comum de Reserva e Criar cofre para esta quota avulsa, o abate ao orçamento e as frações abrangidas.',
    en: 'End of the standalone fee form with the options to include the reserve fund and to create a protected fund for this fee, the budget offset and the units charged.',
    fr: 'Fin du formulaire de charge ponctuelle avec les options d’inclure le fonds de réserve et de créer un fonds protégé, l’imputation au budget et les lots concernés.',
    es: 'Final del formulario de cuota puntual con las opciones de incluir el fondo de reserva y de crear una caja para esta cuota, la compensación en el presupuesto y las unidades afectadas.',
  } },
  { id: 'payment', guide: 'payment', section: 1, alt: {
    pt: 'Página Quotas e Recebimentos com o total previsto, pendente, pago e vencido, o seletor de orçamento, a pesquisa e a lista de condóminos.',
    en: 'Fees and receipts page with expected, pending, paid and overdue totals, the budget selector, search and the list of owners.',
    fr: 'Page Charges et encaissements avec les totaux prévu, en attente, payé et échu, le sélecteur de budget, la recherche et la liste des copropriétaires.',
    es: 'Página Cuotas y cobros con los totales previsto, pendiente, pagado y vencido, el selector de presupuesto, la búsqueda y la lista de propietarios.',
  } },
  { id: 'corrections', guide: 'corrections', section: 1, alt: {
    pt: 'Detalhe de um condómino com os valores em aberto, vencido e recebido e a lista de quotas em aberto por mês, com as ações de cada quota.',
    en: 'An owner’s details with outstanding, overdue and received amounts and the list of outstanding fees by month, with each fee’s actions.',
    fr: 'Détail d’un copropriétaire avec les montants en cours, échus et encaissés et la liste des charges en cours par mois, avec les actions de chacune.',
    es: 'Detalle de un propietario con los importes pendientes, vencidos y cobrados y la lista de cuotas pendientes por mes, con las acciones de cada una.',
  } },
  { id: 'reminders', guide: 'reminders', section: 0, alt: {
    pt: 'Menu de um condómino em Quotas e Recebimentos com Abrir detalhe, Aviso de débito até ao mês atual, Aviso anual de débito e Enviar aviso de débito por email.',
    en: 'An owner’s menu in Fees and receipts with Open details, Debit notice up to the current month, Annual debit notice and Send debit notice by email.',
    fr: 'Menu d’un copropriétaire dans Charges et encaissements avec Ouvrir le détail, Avis de débit jusqu’au mois en cours, Avis de débit annuel et Envoyer l’avis par e-mail.',
    es: 'Menú de un propietario en Cuotas y cobros con Abrir detalle, Aviso de débito hasta el mes actual, Aviso anual de débito y Enviar aviso de débito por email.',
  } },
  { id: 'credit', guide: 'credit', section: 0, alt: {
    pt: 'Janela Registar saldo antecipado com Condómino, Valor recebido, Data de recebimento, Data no extrato do banco e Observações.',
    en: 'Record advance credit window with Owner, Amount received, Date received, bank statement date and Notes.',
    fr: 'Fenêtre d’enregistrement d’un crédit anticipé avec le copropriétaire, le montant reçu, la date de réception, la date du relevé bancaire et les observations.',
    es: 'Ventana Registrar saldo anticipado con propietario, importe recibido, fecha de cobro, fecha del extracto bancario y observaciones.',
  } },
  { id: 'receipts', guide: 'receipts', section: 1, alt: {
    pt: 'Painel Gerar recibo com a escolha do condómino e do orçamento e a opção Recibos históricos mensais para todos os condóminos.',
    en: 'Generate receipt panel with the owner and budget choice and the monthly historical receipts option for all owners.',
    fr: 'Panneau Générer un reçu avec le choix du copropriétaire et du budget et l’option des reçus mensuels historiques pour tous les copropriétaires.',
    es: 'Panel Generar recibo con la elección del propietario y del presupuesto y la opción de recibos mensuales históricos para todos los propietarios.',
  } },
  { id: 'suppliers', guide: 'suppliers', section: 0, alt: {
    pt: 'Página Fornecedores com três fornecedores de demonstração, o contacto e a morada de cada um e o botão Novo Fornecedor.',
    en: 'Suppliers page with three demo suppliers, each with contact details and address, and the New supplier button.',
    fr: 'Page Fournisseurs avec trois fournisseurs de démonstration, leurs coordonnées et adresses, et le bouton Nouveau fournisseur.',
    es: 'Página Proveedores con tres proveedores de demostración, sus datos de contacto y dirección, y el botón Nuevo proveedor.',
  } },
  { id: 'maintenance', guide: 'maintenance', section: 0, alt: {
    pt: 'Página Manutenção com os totais por estado e a lista de tarefas com prioridade, prazo, custo e estado, e o botão Nova Tarefa.',
    en: 'Maintenance page with totals by status and the task list with priority, due date, cost and status, and the New task button.',
    fr: 'Page Maintenance avec les totaux par état et la liste des tâches avec priorité, échéance, coût et état, et le bouton Nouvelle tâche.',
    es: 'Página Mantenimiento con los totales por estado y la lista de tareas con prioridad, plazo, coste y estado, y el botón Nueva tarea.',
  } },
  { id: 'cleaning', guide: 'cleaning', section: 0, alt: {
    pt: 'Página Limpeza com os botões Nova Tarefa e Gerar folha de presenças e o plano de limpeza com uma tarefa planeada.',
    en: 'Cleaning page with the New task and Generate attendance sheet buttons and the cleaning plan with one planned task.',
    fr: 'Page Nettoyage avec les boutons Nouvelle tâche et Générer la feuille de présence et le plan de nettoyage avec une tâche planifiée.',
    es: 'Página Limpieza con los botones Nueva tarea y Generar hoja de asistencia y el plan de limpieza con una tarea planificada.',
  } },
  { id: 'notices', guide: 'notices', section: 0, alt: {
    pt: 'Página Avisos com um aviso ativo, o filtro por tipo e os modelos de aviso agrupados por tema.',
    en: 'Notices page with one active notice, the type filter and the notice templates grouped by topic.',
    fr: 'Page Avis avec un avis actif, le filtre par type et les modèles d’avis regroupés par thème.',
    es: 'Página Avisos con un aviso activo, el filtro por tipo y las plantillas de aviso agrupadas por tema.',
  } },
  { id: 'inbox', guide: 'inbox', section: 1, alt: {
    pt: 'Caixa de entrada com a pesquisa, o filtro de conversas e uma ocorrência de um residente aberta, com a mensagem e o campo Responder.',
    en: 'Inbox with search, the conversation filter and a resident’s incident open, showing the message and the Reply field.',
    fr: 'Boîte de réception avec la recherche, le filtre des conversations et un incident d’un résident ouvert, avec le message et le champ de réponse.',
    es: 'Bandeja de entrada con la búsqueda, el filtro de conversaciones y una incidencia de un residente abierta, con el mensaje y el campo Responder.',
  } },
  { id: 'meeting', guide: 'meeting', section: 1, alt: {
    pt: 'Página Reuniões com uma assembleia geral agendada, a data, as horas da 1.ª e 2.ª convocatória, o local e o botão Nova Reunião.',
    en: 'Meetings page with a scheduled general meeting, its date, first and second call times, location and the New meeting button.',
    fr: 'Page Réunions avec une assemblée générale planifiée, sa date, les heures de première et seconde convocation, le lieu et le bouton Nouvelle réunion.',
    es: 'Página Reuniones con una junta general programada, su fecha, las horas de primera y segunda convocatoria, el lugar y el botón Nueva reunión.',
  } },
  { id: 'meeting-votes', guide: 'meeting-votes', section: 0, alt: {
    pt: 'Cartão da assembleia com a pergunta “A reunião realizou-se?” e os botões Sim, preparar ata e Não se realizou.',
    en: 'Meeting card asking “Did the meeting take place?” with the Yes, prepare minutes and It did not take place buttons.',
    fr: 'Carte de la réunion demandant « La réunion a-t-elle eu lieu ? » avec les boutons pour préparer le procès-verbal ou indiquer qu’elle n’a pas eu lieu.',
    es: 'Tarjeta de la junta con la pregunta «¿Se celebró la junta?» y los botones para preparar el acta o indicar que no se celebró.',
  } },
  { id: 'proxy', guide: 'proxy', section: 1, alt: {
    pt: 'Página Procurações com a data, a opção para preencher o procurador existente, o botão Abrir PDF e a pré-visualização de uma procuração.',
    en: 'Proxies page with the date, the option to fill in an existing proxy holder, the Open PDF button and a preview of a proxy form.',
    fr: 'Page Procurations avec la date, l’option de préremplir le mandataire, le bouton Ouvrir le PDF et l’aperçu d’une procuration.',
    es: 'Página Poderes de representación con la fecha, la opción de rellenar el representante, el botón Abrir PDF y la vista previa de un poder.',
  } },
  { id: 'signature', guide: 'signature', section: 1, alt: {
    pt: 'Página Lista de Assinaturas com Título, Data e Local, o botão Abrir PDF e a pré-visualização da lista com frações e permilagens.',
    en: 'Signature list page with Title, Date and Location, the Open PDF button and a preview of the list with units and ownership shares.',
    fr: 'Page Liste de signatures avec le titre, la date et le lieu, le bouton Ouvrir le PDF et l’aperçu de la liste avec les lots et les quotes-parts.',
    es: 'Página Lista de firmas con título, fecha y lugar, el botón Abrir PDF y la vista previa de la lista con unidades y cuotas de participación.',
  } },
  { id: 'documents', guide: 'documents', section: 0, alt: {
    pt: 'Página Documentos com os cartões para gerar documentos oficiais, como a declaração para efeitos de IRS e a declaração de não dívida, e a declaração para venda de fração.',
    en: 'Documents page with the cards to generate official documents, such as the IRS declaration and the no-debt declaration, and the declaration for the sale of a unit.',
    fr: 'Page Documents avec les cartes pour générer les documents officiels, comme la déclaration IRS et l’attestation d’absence de dette, et la déclaration pour la vente d’un lot.',
    es: 'Página Documentos con las tarjetas para generar documentos oficiales, como la declaración del IRS y el certificado de no deuda, y la declaración para la venta de una unidad.',
  } },
  { id: 'documents', guide: 'official', section: 1, alt: {
    pt: 'Cartões Declaração para efeitos de IRS e Declaração de não dívida na página Documentos, cada um com o titular, o exercício ou a data e o botão Gerar PDF.',
    en: 'IRS declaration and no-debt declaration cards on the Documents page, each with the person, the year or date and the Generate PDF button.',
    fr: 'Cartes Déclaration IRS et attestation d’absence de dette dans la page Documents, chacune avec la personne, l’exercice ou la date et le bouton Générer le PDF.',
    es: 'Tarjetas Declaración del IRS y certificado de no deuda en la página Documentos, cada una con el titular, el ejercicio o la fecha y el botón Generar PDF.',
  } },
  { id: 'timeline', guide: 'timeline', section: 0, alt: {
    pt: 'Linha cronológica com o valor disponível, o saldo no banco e a falta na reserva, os movimentos financeiros do período e os cartões de quotas, reuniões, manutenção e avisos.',
    en: 'Timeline with the available amount, bank balance and reserve shortfall, the financial transactions for the period and the fees, meetings, maintenance and notices cards.',
    fr: 'Chronologie avec le montant disponible, le solde bancaire et le manque de réserve, les mouvements financiers de la période et les cartes charges, réunions, maintenance et avis.',
    es: 'Cronología con el importe disponible, el saldo bancario y el déficit de la reserva, los movimientos financieros del periodo y las tarjetas de cuotas, reuniones, mantenimiento y avisos.',
  } },
  { id: 'team', guide: 'team', section: 2, alt: {
    pt: 'Formulário Enviar convite em Administração, com o Email, a Função e a escolha dos condomínios a que a pessoa terá acesso.',
    en: 'Send invitation form under Administration, with Email, Role and the condominiums the person will be able to access.',
    fr: 'Formulaire Envoyer une invitation dans Administration, avec l’e-mail, le rôle et les copropriétés auxquelles la personne aura accès.',
    es: 'Formulario Enviar invitación en Administración, con el email, la función y las comunidades a las que la persona tendrá acceso.',
  } },
  { id: 'permissions', guide: 'permissions', section: 2, alt: {
    pt: 'Separador Utilizadores da Administração com o botão Enviar convite e dois utilizadores, cada um com a sua função e as ações Editar e Desativar.',
    en: 'Users tab in Administration with the Send invitation button and two users, each with their role and the Edit and Deactivate actions.',
    fr: 'Onglet Utilisateurs de l’Administration avec le bouton Envoyer une invitation et deux utilisateurs, chacun avec son rôle et les actions Modifier et Désactiver.',
    es: 'Pestaña Usuarios de Administración con el botón Enviar invitación y dos usuarios, cada uno con su función y las acciones Editar y Desactivar.',
  } },
  { id: 'audit', guide: 'audit', section: 1, alt: {
    pt: 'Separador Auditoria da Administração com os filtros Condomínio e Ação e a lista de eventos com data, utilizador, ação e detalhe.',
    en: 'Audit log tab in Administration with the Condominium and Action filters and the list of events with date, user, action and details.',
    fr: 'Onglet Journal d’audit de l’Administration avec les filtres Copropriété et Action et la liste des événements avec date, utilisateur, action et détail.',
    es: 'Pestaña Auditoría de Administración con los filtros Comunidad y Acción y la lista de eventos con fecha, usuario, acción y detalle.',
  } },
  { id: 'deleted-records', guide: 'deleted-records', section: 1, alt: {
    pt: 'Separador Registos eliminados da Administração com o filtro de estado Por recuperar e a indicação de que não há registos nesse estado.',
    en: 'Deleted records tab in Administration with the Available to recover status filter and a note that there are no records with that status.',
    fr: 'Onglet Éléments supprimés de l’Administration avec le filtre d’état « À récupérer » et l’indication qu’aucun élément n’a cet état.',
    es: 'Pestaña Registros eliminados de Administración con el filtro de estado Por recuperar y la indicación de que no hay registros en ese estado.',
  } },
  { id: 'assistants', guide: 'assistants', section: 1, alt: {
    pt: 'Janela Ligações a assistentes com o endereço do servidor para copiar, a secção Ligação manual e a lista de ligações criadas.',
    en: 'Assistant connections window with the server address to copy, the Manual connection section and the list of connections created.',
    fr: 'Fenêtre Connexions aux assistants avec l’adresse du serveur à copier, la section de connexion manuelle et la liste des connexions créées.',
    es: 'Ventana Conexiones con asistentes con la dirección del servidor para copiar, la sección de conexión manual y la lista de conexiones creadas.',
  } },
  { id: 'settings', guide: 'settings', section: 1, alt: {
    pt: 'Configurações do condomínio no separador Dados gerais, com País e moeda, NIF, nome, morada, código postal e os logótipos, e os restantes separadores à esquerda.',
    en: 'Condominium Settings on the General details tab, with country and currency, tax number, name, address, postal code and logos, and the other tabs on the left.',
    fr: 'Paramètres de la copropriété sur l’onglet Informations générales, avec le pays et la devise, le NIF, le nom, l’adresse, le code postal et les logos, et les autres onglets à gauche.',
    es: 'Configuración de la comunidad en la pestaña Datos generales, con país y moneda, NIF, nombre, dirección, código postal y logotipos, y las demás pestañas a la izquierda.',
  } },
  { id: 'portal-design', guide: 'portal-design', section: 0, alt: {
    pt: 'Separador Portal dos residentes com os modelos de página inicial e a pré-visualização do portal tal como os residentes o veem.',
    en: 'Resident portal tab with the home page templates and a preview of the portal as residents see it.',
    fr: 'Onglet Portail des résidents avec les modèles de page d’accueil et l’aperçu du portail tel que les résidents le voient.',
    es: 'Pestaña Portal del residente con las plantillas de página de inicio y la vista previa del portal tal como lo ven los residentes.',
  } },
  { id: 'pdf-design', guide: 'pdf-design', section: 0, alt: {
    pt: 'Separador Personalizar PDFs com as cores, o tipo de letra, o tamanho do texto e a impressão, e a pré-visualização de um recibo com dados fictícios.',
    en: 'Customize PDFs tab with colours, font, text size and print options, and a preview of a receipt with sample data.',
    fr: 'Onglet Personnaliser les PDF avec les couleurs, la police, la taille du texte et l’impression, et l’aperçu d’un reçu avec des données fictives.',
    es: 'Pestaña Personalizar PDF con los colores, la tipografía, el tamaño del texto y la impresión, y la vista previa de un recibo con datos ficticios.',
  } },
  { id: 'privacy', guide: 'privacy', section: 0, alt: {
    pt: 'Separador Privacidade e direitos com o formulário Pedidos de titulares, o botão Exportar dados da organização e a lista de pedidos registados.',
    en: 'Privacy and rights tab with the data subject request form, the Export organisation data button and the list of recorded requests.',
    fr: 'Onglet Confidentialité et droits avec le formulaire des demandes des personnes concernées, le bouton d’export des données de l’organisation et la liste des demandes.',
    es: 'Pestaña Privacidad y derechos con el formulario de solicitudes de los titulares, el botón Exportar datos de la organización y la lista de solicitudes registradas.',
  } },
  { id: 'billing', guide: 'billing', section: 1, alt: {
    pt: 'Página Subscrição e faturação com o plano atual, o preço, a periodicidade, a utilização face aos limites e a secção Alterar subscrição.',
    en: 'Subscription and billing page with the current plan, price, billing period, usage against limits and the Change subscription section.',
    fr: 'Page Abonnement et facturation avec l’offre actuelle, le prix, la périodicité, l’utilisation par rapport aux limites et la section Modifier l’abonnement.',
    es: 'Página Suscripción y facturación con el plan actual, el precio, la periodicidad, el uso frente a los límites y la sección Cambiar suscripción.',
  } },
  { id: 'billing-changes', guide: 'billing-changes', section: 2, alt: {
    pt: 'Secção Alterar subscrição com a escolha Mensal ou Anual e os planos Habitae S, M e L com preço e limites.',
    en: 'Change subscription section with the Monthly or Yearly choice and the Habitae S, M and L plans with price and limits.',
    fr: 'Section Modifier l’abonnement avec le choix mensuel ou annuel et les offres Habitae S, M et L avec prix et limites.',
    es: 'Sección Cambiar suscripción con la elección mensual o anual y los planes Habitae S, M y L con precio y límites.',
  } },
  { id: 'access-code', guide: 'access-code', section: 1, alt: {
    pt: 'Caixa “Tem um código de acesso?” na página de subscrição, com o campo do código e o botão Utilizar código.',
    en: '“Have an access code?” box on the subscription page, with the code field and the Use code button.',
    fr: 'Encadré « Vous avez un code d’accès ? » sur la page d’abonnement, avec le champ du code et le bouton pour l’utiliser.',
    es: 'Recuadro «¿Tiene un código de acceso?» en la página de suscripción, con el campo del código y el botón para usarlo.',
  } },
];

const sizeOf: Record<string, Partial<Record<Language, number[]>>> = sizes;
// Puts each guide's screenshots after the section they illustrate, as figures in that
// language. French and Spanish copy starts from the Portuguese, so figures are always
// replaced, never inherited.
export function withScreenshots(articles: Article[], language: Language): Article[] {
  return articles.map((article) => {
    const shots = screenshots.filter((shot) => shot.guide === article.id && sizeOf[shot.id]?.[language]);
    return {
      ...article,
      sections: article.sections.map(({ figures: _inherited, ...section }, index) => {
        const figures: Figure[] = shots.filter((shot) => shot.section === index).map((shot) => {
          const [width, height] = sizeOf[shot.id][language]!;
          return { src: `help-screens/${shot.id}-${language}.webp`, alt: shot.alt[language], width, height };
        });
        return figures.length ? { ...section, figures } : section;
      }),
    };
  });
}
