/**
 * VDS Tecnologia - Constants
 * 
 * Centralized data for partners, services, and modules
 * All partner logos are SVGs for optimal performance and scaling
 * 
 * Note: We genuinely use all these tools in production
 */

export const partners = {
  clouds: [
    {
      name: 'AWS',
      src: '/logos/aws-brand.svg',
      alt: 'Amazon Web Services',
      description: 'Experiência completa em soluções AWS',
    },
    {
      name: 'Azure',
      src: '/logos/azure-color.svg',
      alt: 'Microsoft Azure',
      description: 'Especialistas em infraestrutura Azure',
    },
    {
      name: 'GCP',
      src: '/logos/googlecloud-color.svg',
      alt: 'Google Cloud Platform',
      description: 'Soluções escaláveis na Google Cloud',
    },
  ],
  specialties: [
    {
      name: 'Snowflake',
      src: '/logos/snowflake-color.svg',
      alt: 'Snowflake',
      description: 'Super experiência em Snowflake para análise de dados',
    },
    {
      name: 'Cortex AI',
      type: 'custom' as const,
      text: 'Cortex AI',
      snowflakeLogo: '/logos/snowflake-color.svg',
      alt: 'Cortex AI',
      description: 'Especialização em Cortex AI e machine learning',
    },
    {
      name: 'VDS AI Framework',
      type: 'custom' as const,
      text: 'VDS AI Framework',
      alt: 'VDS AI Framework',
      description: 'Framework próprio de Dev, QA e Validação IA',
    },
  ],
};

export const services = [
  {
    key: 'dev',
    icon: 'Brain',
  },
  {
    key: 'integration',
    icon: 'Zap',
  },
  {
    key: 'transformation',
    icon: 'Rocket',
  },
];

export const technologies = [
  { name: 'Next.js', icon: 'Code' },
  { name: 'React', icon: 'Atom' },
  { name: 'TypeScript', icon: 'FileCode' },
  { name: 'Node.js', icon: 'Server' },
  { name: 'Python', icon: 'Python' },
  { name: 'AI/ML', icon: 'Brain' },
];

export const processSteps = [
  {
    key: 'step1',
    icon: 'Search',
  },
  {
    key: 'step2',
    icon: 'Code',
  },
  {
    key: 'step3',
    icon: 'CheckCircle',
  },
  {
    key: 'step4',
    icon: 'Cloud',
  },
];

export const benefits = [
  {
    key: 'speed',
    icon: 'Zap',
  },
  {
    key: 'innovation',
    icon: 'Lightbulb',
  },
  {
    key: 'experience',
    icon: 'Award',
  },
  {
    key: 'scalability',
    icon: 'TrendingUp',
  },
  {
    key: 'quality',
    icon: 'CheckCircle',
  },
  {
    key: 'security',
    icon: 'Shield',
  },
];

/**
 * VDS Modules - The 6 Pillars of our methodology
 * 
 * Each module represents a core principle in our development process
 * Colors chosen for semantic meaning and visual hierarchy
 */
export const vdsModules = [
  {
    key: 'valueFirst',
    icon: 'Target',
    color: '#ff6b00', // Orange: The color of impact
  },
  {
    key: 'velocityControl',
    icon: 'Zap',
    color: '#00d4ff', // Cyan: The color of speed
  },
  {
    key: 'validatedDelivery',
    icon: 'CheckCircle',
    color: '#00ff88', // Green: The color of validation
  },
  {
    key: 'secureDesign',
    icon: 'Shield',
    color: '#ff00ff', // Magenta: The color of security
  },
  {
    key: 'scaleReady',
    icon: 'TrendingUp',
    color: '#ffdd00', // Yellow: The color of growth
  },
  {
    key: 'vdsFramework',
    icon: 'Package',
    color: '#00ff88', // Green: Our proprietary framework
  },
];

