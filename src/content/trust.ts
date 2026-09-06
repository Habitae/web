import type { Language } from '../context/I18nContext';

export type TrustPageId = 'about' | 'contact';
type Section = { id: string; title: string; paragraphs: string[]; contacts?: boolean; links?: { label: string; href: string }[] };
type TrustContent = { title: string; description: string; sections: Section[] };

export const trustContent: Record<Language, Record<TrustPageId, TrustContent>> = {
  pt: {
    about: {
      title: 'Sobre o Habitae',
      description: 'Conheça o Habitae, software de gestão de condomínios em Portugal, e a informação disponível para condóminos e administradores.',
      sections: [
        { id: 'habitae', title: 'Gestão de condomínios em Portugal', paragraphs: [
          'O Habitae é um projeto de software de gestão de condomínios em Portugal. Reúne finanças, quotas, documentos, pessoas e tarefas do condomínio num só lugar, para que a administração possa acompanhar o trabalho e encontrar a informação de que precisa.',
          'Este é o site oficial do Habitae em habitae.pt. Aqui pode conhecer as funcionalidades e os planos apresentados, consultar guias em português e inglês e entrar em contacto para esclarecer dúvidas sobre o produto.',
        ] },
        { id: 'para-quem', title: 'Para condóminos e administradores', paragraphs: [
          'O produto destina-se a quem participa na administração do seu condomínio e a administradores profissionais que organizam o trabalho de vários condomínios. Os guias abordam a criação de frações, os planos de quotas, o registo de pagamentos, a preparação de assembleias e o acesso da equipa.',
          'A informação pública ajuda a avaliar se os fluxos de trabalho do Habitae correspondem às necessidades do seu edifício ou da sua equipa. Os guias não dão acesso a dados privados de condomínios.',
        ], links: [{ label: 'Consultar o centro de ajuda', href: '/ajuda/' }] },
        { id: 'disponibilidade', title: 'Disponibilidade e próximos passos', paragraphs: [
          'A aplicação está em preparação para disponibilização pública. A página de acesso antecipado apresenta a disponibilidade da lista de espera. A existência de um guia não significa que o registo público na aplicação já esteja aberto.',
          'Para falar sobre o seu condomínio, esclarecer questões sobre os planos ou partilhar necessidades da administração, utilize os contactos publicados. Pode também consultar os documentos de privacidade e condições, que identificam os pontos ainda em revisão.',
        ], links: [{ label: 'Acesso antecipado', href: '/app/' }, { label: 'Contactar o Habitae', href: '/contact/' }, { label: 'Privacidade', href: '/privacy/' }] },
      ],
    },
    contact: {
      title: 'Contactar o Habitae',
      description: 'Contactos oficiais do Habitae em Caxarias, Portugal, para dúvidas sobre software de gestão de condomínios, planos e acesso antecipado.',
      sections: [
        { id: 'contactos', title: 'Email, telefone e morada', contacts: true, paragraphs: [
          'Utilize os contactos abaixo para falar sobre o Habitae, esclarecer dúvidas sobre o produto ou apresentar as necessidades do seu condomínio. São os contactos públicos do projeto associado ao site habitae.pt.',
          'Pode enviar uma mensagem por email ou utilizar o número de telefone indicado. Para combinar uma conversa, indique o assunto e a sua disponibilidade. Confirme por contacto qualquer visita à morada publicada.',
        ] },
        { id: 'mensagem', title: 'Como podemos ajudar', paragraphs: [
          'Se está a avaliar o Habitae, indique se gere o seu próprio condomínio ou se trabalha numa administração profissional, quantos condomínios pretende organizar e quais as tarefas que gostaria de simplificar. Este contexto ajuda a tornar a conversa útil para o seu caso.',
          'Se a dúvida diz respeito a um guia, inclua o endereço da página e a etapa que precisa de esclarecer. Uma descrição geral da questão é suficiente para iniciar a conversa.',
        ], links: [{ label: 'Guias de utilização', href: '/ajuda/' }] },
        { id: 'acesso', title: 'Acesso antecipado e privacidade', paragraphs: [
          'A aplicação está em preparação para disponibilização pública. Consulte a página de acesso antecipado para saber se a lista de espera está aberta. Entrar em contacto não cria automaticamente uma conta nem uma inscrição na lista de espera.',
          'A página de privacidade descreve o tratamento de dados apresentado pelo site e assinala os detalhes operacionais ainda por completar. Para esclarecer uma questão sobre esses documentos, indique na mensagem a página ou o ponto a que se refere.',
        ], links: [{ label: 'Acesso antecipado', href: '/app/' }, { label: 'Privacidade', href: '/privacy/' }, { label: 'Sobre o Habitae', href: '/about/' }] },
      ],
    },
  },
  en: {
    about: {
      title: 'About Habitae',
      description: 'Learn about Habitae, condominium management software for Portugal, and the information available to owners and administrators.',
      sections: [
        { id: 'habitae', title: 'Condominium management in Portugal', paragraphs: [
          'Habitae is a condominium management software project for Portugal. It brings condominium finances, fees, documents, people and tasks into one place so administrators can follow their work and find the information they need.',
          'This is the official Habitae website at habitae.pt. Here you can explore the published features and plans, read guides in Portuguese and English, and contact the project with questions about the product.',
        ] },
        { id: 'para-quem', title: 'For owners and administrators', paragraphs: [
          'The product is intended for people who help administer their own condominium and for professional administrators organising work across several condominiums. The guides cover creating units, fee schedules, recording payments, preparing meetings and team access.',
          'The public information helps you assess whether Habitae workflows fit your building or team. Reading a guide does not provide access to private condominium records.',
        ], links: [{ label: 'Read the help centre', href: '/help/' }] },
        { id: 'disponibilidade', title: 'Availability and next steps', paragraphs: [
          'The application is being prepared for public availability. The early access page shows whether waitlist signup is available. A published guide does not mean that public application registration is already open.',
          'Use the published contact details to discuss your condominium, ask about plans or share the needs of your administration team. You can also read the privacy and terms documents, which identify the details still under review.',
        ], links: [{ label: 'Early access', href: '/app/' }, { label: 'Contact Habitae', href: '/contact/' }, { label: 'Privacy', href: '/privacy/' }] },
      ],
    },
    contact: {
      title: 'Contact Habitae',
      description: 'Official Habitae contact details in Caxarias, Portugal, for questions about condominium management software, plans and early access.',
      sections: [
        { id: 'contactos', title: 'Email, phone and address', contacts: true, paragraphs: [
          'Use the details below to discuss Habitae, ask questions about the product or describe what your condominium needs. These are the public contact details of the project associated with habitae.pt.',
          'You can send an email or use the listed telephone number. To arrange a conversation, include the topic and your availability. Please contact us to confirm arrangements before visiting the published address.',
        ] },
        { id: 'mensagem', title: 'How we can help', paragraphs: [
          'If you are evaluating Habitae, tell us whether you manage your own condominium or work for a professional administrator, how many condominiums you need to organise and which tasks you would like to simplify. This context helps make the conversation useful for your situation.',
          'For questions about a guide, include its page address and the step you need help understanding. A general description of the question is enough to start the conversation.',
        ], links: [{ label: 'Usage guides', href: '/help/' }] },
        { id: 'acesso', title: 'Early access and privacy', paragraphs: [
          'The application is being prepared for public availability. Check the early access page to see whether the waitlist is open. Contacting Habitae does not automatically create an account or subscribe you to the waitlist.',
          'The privacy page describes the data handling presented by the website and marks operational details that still need completing. If you have a question about those documents, include the relevant page or section in your message.',
        ], links: [{ label: 'Early access', href: '/app/' }, { label: 'Privacy', href: '/privacy/' }, { label: 'About Habitae', href: '/about/' }] },
      ],
    },
  },
};
