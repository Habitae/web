/** Public business details supplied by the site owner. Keep listings consistent with these values. */
export const organizationDetails = {
  name: 'Habitae',
  url: 'https://habitae.pt/',
  email: 'joaollfrias@hotmail.com',
  telephone: '+351923072360',
  address: {
    streetAddress: 'Av. 21 de Junho 4 2FTE',
    postalCode: '2435-087',
    addressLocality: 'Caxarias',
    addressCountry: 'PT',
  },
} as const;

export const organizationSchema = {
  '@type': 'Organization',
  '@id': `${organizationDetails.url}#organization`,
  name: organizationDetails.name,
  url: organizationDetails.url,
  description: 'Habitae: gestão de condomínios em Portugal. Finanças, quotas, documentos, pessoas e tarefas num só lugar.',
  logo: `${organizationDetails.url}default-condominium-logo-light.png`,
  email: organizationDetails.email,
  telephone: organizationDetails.telephone,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: `${organizationDetails.url}contact/`,
    email: organizationDetails.email,
    telephone: organizationDetails.telephone,
    availableLanguage: ['pt', 'en', 'fr'],
  },
  address: { '@type': 'PostalAddress', ...organizationDetails.address },
} as const;
