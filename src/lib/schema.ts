export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Brightmenti',
    url: 'https://brightmenti.com',
    logo: 'https://brightmenti.com/images/brightmenti-logo.png',
    description: 'Premium digital growth, technology, automation, and creative agency partner.',
    slogan: 'Build. Automate. Market. Scale.',
    sameAs: [
      'https://linkedin.com/company/brightmenti',
      'https://x.com/brightmenti',
      'https://github.com/brightmenti'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales & technical consultation',
      url: 'https://brightmenti.com/contact'
    }
  };
}

export function getServiceSchema(serviceName: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    provider: {
      '@type': 'Organization',
      name: 'Brightmenti',
      url: 'https://brightmenti.com'
    },
    description,
    url
  };
}

export function getProjectSchema(project: {
  title: string;
  description: string;
  slug: string;
  industry: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.title,
    description: project.description,
    url: 'https://brightmenti.com/portfolio/' + project.slug,
    creator: {
      '@type': 'Organization',
      name: 'Brightmenti'
    },
    genre: project.industry
  };
}
