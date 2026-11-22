const modelContext = typeof navigator !== 'undefined' ? navigator.modelContext : undefined;

if (typeof modelContext?.registerTool === 'function') {
  modelContext.registerTool({
    name: 'get_dagaz_business_profile',
    description: 'Get Dagaz.Dev services, contact information, and official profiles.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
    execute: async () => ({
      name: 'Dagaz.Dev',
      url: 'https://dagaz.dev/',
      description: 'Consultoria e desenvolvimento para modernização, integração e inovação em ambientes SAP.',
      email: 'hello@dagaz.dev',
      services: ['Estratégia SAP', 'ABAP', 'SAP Fiori', 'SAP BTP', 'Integração', 'Mentoria técnica'],
      socialProfiles: [
        'https://www.linkedin.com/company/dagaz-dev',
        'https://www.instagram.com/dagaz.dev',
        'https://github.com/dagaz-dev',
      ],
    }),
  });
}
