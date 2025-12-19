/**
 * LanguageContext - Bilingual Support
 * 
 * Provides PT-BR and EN translations across the application
 * Language preference persisted in localStorage
 * 
 * All translations maintain equivalent tone and meaning
 * between languages while respecting cultural nuances
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  // Hero
  'hero.title.main': {
    pt: 'DESENVOLVIMENTO',
    en: 'DEVELOPMENT',
  },
  'hero.title.sub': {
    pt: 'COM IA',
    en: 'WITH AI',
  },
  'hero.subtitle.main': {
    pt: 'PARCEIRO ESTRATÉGICO EM TECNOLOGIA',
    en: 'STRATEGIC TECHNOLOGY PARTNER',
  },
  'hero.description': {
    pt: 'Transformamos ideias em soluções tecnológicas inovadoras, utilizando inteligência artificial para acelerar o desenvolvimento e entregar resultados excepcionais.',
    en: 'We transform ideas into innovative technology solutions, using artificial intelligence to accelerate development and deliver exceptional results.',
  },
  'hero.cta': {
    pt: 'Fale Conosco',
    en: 'Contact Us',
  },
  
  // Menu
  'menu.about': {
    pt: 'Sobre',
    en: 'About',
  },
  'menu.services': {
    pt: 'Serviços',
    en: 'Services',
  },
  'menu.technology': {
    pt: 'Tecnologia',
    en: 'Technology',
  },
  'menu.partners': {
    pt: 'Parceiros',
    en: 'Partners',
  },
  'menu.process': {
    pt: 'Processo',
    en: 'Process',
  },
  'menu.contact': {
    pt: 'Contato',
    en: 'Contact',
  },
  
  // About
  'about.title': {
    pt: 'Sobre a VDS Tecnologia',
    en: 'About VDS Technology',
  },
  'about.subtitle': {
    pt: 'Somos especialistas em transformar ideias em soluções tecnológicas inovadoras, utilizando inteligência artificial como parceiro estratégico no desenvolvimento.',
    en: 'We are experts in transforming ideas into innovative technological solutions, using artificial intelligence as a strategic partner in development.',
  },
  
  // Services
  'services.title': {
    pt: 'Nossos Serviços',
    en: 'Our Services',
  },
  'services.subtitle': {
    pt: 'Soluções completas em desenvolvimento e integração de IA',
    en: 'Complete solutions in AI development and integration',
  },
  
  // Technology
  'technology.title': {
    pt: 'Tecnologias',
    en: 'Technologies',
  },
  'technology.subtitle': {
    pt: 'Stack moderna e inovadora para desenvolvimento de soluções de ponta',
    en: 'Modern and innovative stack for cutting-edge solutions development',
  },
  
  // AI Stack
  'aistack.title': {
    pt: 'AI STACK',
    en: 'AI STACK',
  },
  'aistack.subtitle': {
    pt: 'Powered by the most advanced AI models and tools',
    en: 'Powered by the most advanced AI models and tools',
  },
  
  // Partners
  'partners.title': {
    pt: 'Nossos Parceiros',
    en: 'Our Partners',
  },
  'partners.subtitle': {
    pt: 'Trabalhamos com as principais plataformas cloud e tecnologias de ponta',
    en: 'We work with the leading cloud platforms and cutting-edge technologies',
  },
  
  // Process
  'process.title': {
    pt: 'Nosso Processo',
    en: 'Our Process',
  },
  'process.subtitle': {
    pt: 'Metodologia ágil com IA acelerando cada etapa do desenvolvimento',
    en: 'Agile methodology with AI accelerating every stage of development',
  },
  
  // Benefits
  'benefits.title': {
    pt: 'Por que escolher a VDS?',
    en: 'Why choose VDS?',
  },
  'benefits.fullname': {
    pt: 'Value-Driven Solutions',
    en: 'Value-Driven Solutions',
  },
  'benefits.subtitle': {
    pt: 'Vantagens competitivas que fazem a diferença',
    en: 'Competitive advantages that make the difference',
  },
  
  // Contact
  'contact.title': {
    pt: 'Entre em Contato',
    en: 'Get in Touch',
  },
  'contact.subtitle': {
    pt: 'Estamos prontos para transformar suas ideias em realidade',
    en: "We're ready to transform your ideas into reality",
  },
  'contact.name': {
    pt: 'Nome',
    en: 'Name',
  },
  'contact.email': {
    pt: 'Email',
    en: 'Email',
  },
  'contact.message': {
    pt: 'Mensagem',
    en: 'Message',
  },
  'contact.send': {
    pt: 'Enviar Mensagem',
    en: 'Send Message',
  },
  'contact.namePlaceholder': {
    pt: 'Seu nome',
    en: 'Your name',
  },
  'contact.emailPlaceholder': {
    pt: 'seu@email.com',
    en: 'your@email.com',
  },
  'contact.messagePlaceholder': {
    pt: 'Conte-nos sobre seu projeto...',
    en: 'Tell us about your project...',
  },
  
  // Services items
  'services.dev.title': {
    pt: 'Desenvolvimento com IA',
    en: 'AI-Powered Development',
  },
  'services.dev.description': {
    pt: 'Criamos soluções inteligentes utilizando IA como parceiro estratégico no desenvolvimento, acelerando processos e entregando resultados inovadores.',
    en: 'We create intelligent solutions using AI as a strategic partner in development, accelerating processes and delivering innovative results.',
  },
  'services.integration.title': {
    pt: 'Integração de IA',
    en: 'AI Integration',
  },
  'services.integration.description': {
    pt: 'Integramos inteligência artificial em processos de negócio existentes, transformando operações e aumentando eficiência operacional.',
    en: 'We integrate artificial intelligence into existing business processes, transforming operations and increasing operational efficiency.',
  },
  'services.transformation.title': {
    pt: 'Transformação Digital',
    en: 'Digital Transformation',
  },
  'services.transformation.description': {
    pt: 'Consultoria especializada em transformação digital, ajudando empresas a aproveitarem o máximo da tecnologia moderna e IA.',
    en: 'Specialized consulting in digital transformation, helping companies leverage the maximum of modern technology and AI.',
  },
  
  // Process steps
  'process.step1.title': {
    pt: 'Análise e Planejamento',
    en: 'Analysis & Planning',
  },
  'process.step1.description': {
    pt: 'Definimos KPIs (tempo, custo, conversão, SLA, risco), baseline e objetivos. IA acelera a análise e planejamento estratégico.',
    en: 'We define KPIs (time, cost, conversion, SLA, risk), baseline and objectives. AI accelerates strategic analysis and planning.',
  },
  'process.step2.title': {
    pt: 'Desenvolvimento Ágil',
    en: 'Agile Development',
  },
  'process.step2.description': {
    pt: 'Desenvolvimento rápido e eficiente com IA como parceiro, reduzindo tempo de entrega significativamente.',
    en: 'Fast and efficient development with AI as a strategic partner, significantly reducing time to market.',
  },
  'process.step3.title': {
    pt: 'Integração e Testes',
    en: 'Integration & Testing',
  },
  'process.step3.description': {
    pt: 'Integração perfeita com sistemas existentes e testes automatizados garantindo qualidade.',
    en: 'Seamless integration with existing systems and automated testing to ensure quality.',
  },
  'process.step4.title': {
    pt: 'Deploy e Suporte',
    en: 'Deploy & Support',
  },
  'process.step4.description': {
    pt: 'Deploy em clouds modernas com suporte contínuo e otimizações baseadas em IA.',
    en: 'Deployment on modern cloud platforms with continuous support and AI-driven optimizations.',
  },
  
  // Benefits
  'benefits.speed.title': {
    pt: 'Velocidade',
    en: 'Speed',
  },
  'benefits.speed.description': {
    pt: 'Desenvolvimento acelerado com IA, reduzindo tempo de entrega em até 70%.',
    en: 'Accelerated development with AI, reducing delivery time by up to 70%.',
  },
  'benefits.innovation.title': {
    pt: 'Inovação',
    en: 'Innovation',
  },
  'benefits.innovation.description': {
    pt: 'Soluções modernas e inovadoras utilizando as mais recentes tecnologias.',
    en: 'Modern and innovative solutions using the latest technologies.',
  },
  'benefits.experience.title': {
    pt: 'Experiência',
    en: 'Experience',
  },
  'benefits.experience.description': {
    pt: 'Profissionais seniores com muitos anos de mercado, especialistas em IA e grandes clouds.',
    en: 'Senior professionals with years of experience, experts in AI and major cloud platforms.',
  },
  'benefits.scalability.title': {
    pt: 'Escalabilidade',
    en: 'Scalability',
  },
  'benefits.scalability.description': {
    pt: 'Soluções escaláveis preparadas para crescer com seu negócio.',
    en: 'Scalable solutions ready to grow with your business.',
  },
  'benefits.quality.title': {
    pt: 'Qualidade',
    en: 'Quality',
  },
  'benefits.quality.description': {
    pt: 'Framework próprio de QA e validação garantindo a excelência em cada entrega.',
    en: 'Proprietary QA and validation framework ensuring excellence in every delivery.',
  },
  'benefits.security.title': {
    pt: 'Segurança',
    en: 'Security',
  },
  'benefits.security.description': {
    pt: 'Desenvolvimento seguro com boas práticas e compliance para ambientes críticos.',
    en: 'Secure development with best practices and compliance for critical environments.',
  },
  
  // About features
  'about.feature1.title': {
    pt: 'Experiência em Clouds',
    en: 'Cloud Experience',
  },
  'about.feature1.description': {
    pt: 'Trabalhamos com as principais plataformas cloud: AWS, Azure e Google Cloud Platform, oferecendo soluções escaláveis e confiáveis.',
    en: 'We work with leading cloud platforms: AWS, Azure, and Google Cloud Platform, delivering scalable and reliable solutions.',
  },
  'about.feature2.title': {
    pt: 'Especialização em Snowflake',
    en: 'Snowflake Expertise',
  },
  'about.feature2.description': {
    pt: 'Super experiência em Snowflake e Cortex AI, oferecendo soluções avançadas de análise de dados e machine learning.',
    en: 'Deep expertise in Snowflake and Cortex AI, offering advanced data analytics and machine learning solutions.',
  },
  'about.feature3.title': {
    pt: 'Heavy Users do Cursor',
    en: 'Cursor Heavy Users',
  },
  'about.feature3.description': {
    pt: 'Somos heavy users do Cursor, utilizando intensamente as melhores ferramentas de desenvolvimento assistido por IA para entregar resultados excepcionais.',
    en: 'We are heavy users of Cursor, intensively using the best AI-assisted development tools to deliver exceptional results.',
  },
  
  // Footer
  'footer.navigation': {
    pt: 'Navegação',
    en: 'Navigation',
  },
  'footer.company': {
    pt: 'Empresa',
    en: 'Company',
  },
  'footer.tagline': {
    pt: 'Transformando ideias em soluções tecnológicas com IA',
    en: 'Transforming ideas into AI-powered tech solutions',
  },
  'footer.rights': {
    pt: 'VDS Tecnologia. Todos os direitos reservados.',
    en: 'VDS Technology. All rights reserved.',
  },
  
  // Partners
  'partners.clouds.title': {
    pt: 'Cloud Partners',
    en: 'Cloud Partners',
  },
  'partners.clouds.description': {
    pt: 'Experiência nas principais plataformas cloud do mercado',
    en: 'Experience in the main cloud platforms in the market',
  },
  'partners.specialties.title': {
    pt: 'Especializações',
    en: 'Specializations',
  },
  'partners.specialties.description': {
    pt: 'Super experiência em Snowflake e Cortex AI',
    en: 'Deep expertise in Snowflake and Cortex AI',
  },
  
  // Partner descriptions
  'partners.aws.description': {
    pt: 'Experiência completa em soluções AWS',
    en: 'Complete experience in AWS solutions',
  },
  'partners.azure.description': {
    pt: 'Especialistas em infraestrutura Azure',
    en: 'Azure infrastructure specialists',
  },
  'partners.gcp.description': {
    pt: 'Soluções escaláveis na Google Cloud',
    en: 'Scalable solutions on Google Cloud',
  },
  'partners.snowflake.description': {
    pt: 'Super experiência em Snowflake para análise de dados',
    en: 'Deep expertise in Snowflake for data analytics',
  },
  'partners.cortex.description': {
    pt: 'Especialização em Cortex AI e machine learning',
    en: 'Expertise in Cortex AI and machine learning',
  },
  'partners.vdsframework.description': {
    pt: 'Framework próprio de Dev, QA e Validação IA',
    en: 'Proprietary Dev, QA and AI Validation Framework',
  },
  
  // Contact info labels
  'contact.emailLabel': {
    pt: 'Email',
    en: 'Email',
  },
  'contact.phoneLabel': {
    pt: 'Telefone',
    en: 'Phone',
  },
  'contact.submitting': {
    pt: 'Enviando...',
    en: 'Sending...',
  },
  'contact.success': {
    pt: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
    en: 'Message sent successfully! We will contact you soon.',
  },
  
  // VDS Decoder
  'vds.decoder.line1': {
    pt: 'Initializing VDS Protocol...',
    en: 'Initializing VDS Protocol...',
  },
  'vds.decoder.line2': {
    pt: 'Decoding: V.A.L.U.E - D.R.I.V.E.N - S.O.L.U.T.I.O.N.S',
    en: 'Decoding: V.A.L.U.E - D.R.I.V.E.N - S.O.L.U.T.I.O.N.S',
  },
  'vds.decoder.value': {
    pt: 'VALUE: Impact-first approach ✓',
    en: 'VALUE: Impact-first approach ✓',
  },
  'vds.decoder.driven': {
    pt: 'DRIVEN: AI-accelerated execution ✓',
    en: 'DRIVEN: AI-accelerated execution ✓',
  },
  'vds.decoder.solutions': {
    pt: 'SOLUTIONS: Production-ready delivery ✓',
    en: 'SOLUTIONS: Production-ready delivery ✓',
  },
  'vds.decoder.status': {
    pt: 'System Status: OPERATIONAL',
    en: 'System Status: OPERATIONAL',
  },
  'vds.decoder.subtitle': {
    pt: 'TECNOLOGIA GUIADA POR RESULTADO',
    en: 'TECHNOLOGY DRIVEN BY RESULTS',
  },
  
  // VDS System
  'vds.system.title': {
    pt: 'Pilares VDS',
    en: 'VDS Pillars',
  },
  'vds.system.fullname': {
    pt: 'Value-Driven Solutions',
    en: 'Value-Driven Solutions',
  },
  'vds.system.subtitle': {
    pt: 'Sistema operacional de entrega de valor: 6 módulos integrados que garantem resultados excepcionais',
    en: 'Value delivery operating system: 6 integrated modules ensuring exceptional results',
  },
  'vds.system.footer': {
    pt: 'Sistema pronto. Todos os módulos operacionais. Ready for deployment.',
    en: 'System ready. All modules operational. Ready for deployment.',
  },
  
  // VDS System - Value First
  'vds.system.valueFirst.title': {
    pt: 'Value First',
    en: 'Value First',
  },
  'vds.system.valueFirst.description': {
    pt: 'Começamos pelo resultado mensurável. Definimos KPIs, baseline e objetivos antes de escrever a primeira linha de código.',
    en: 'We start with measurable results. We define KPIs, baseline and objectives before writing the first line of code.',
  },
  'vds.system.valueFirst.code': {
    pt: `export const valueFirst = () => {\n  return measureImpact() \n    && defineKPIs();\n}`,
    en: `export const valueFirst = () => {\n  return measureImpact() \n    && defineKPIs();\n}`,
  },
  
  // VDS System - Velocity with Control
  'vds.system.velocityControl.title': {
    pt: 'Velocity with Control',
    en: 'Velocity with Control',
  },
  'vds.system.velocityControl.description': {
    pt: 'IA acelera o desenvolvimento em até 70%. Processo rigoroso garante que a velocidade não comprometa a qualidade.',
    en: 'AI accelerates development by up to 70%. Rigorous process ensures speed doesn\'t compromise quality.',
  },
  'vds.system.velocityControl.code': {
    pt: `export const velocityControl = () => {\n  return AI.accelerate() \n    && Process.validate();\n}`,
    en: `export const velocityControl = () => {\n  return AI.accelerate() \n    && Process.validate();\n}`,
  },
  
  // VDS System - Validated Delivery
  'vds.system.validatedDelivery.title': {
    pt: 'Validated Delivery',
    en: 'Validated Delivery',
  },
  'vds.system.validatedDelivery.description': {
    pt: 'Framework próprio de QA e validação. Cada entrega passa por testes rigorosos e validação assistida por IA.',
    en: 'Proprietary QA and validation framework. Every delivery goes through rigorous testing and AI-assisted validation.',
  },
  'vds.system.validatedDelivery.code': {
    pt: `export const validatedDelivery = () => {\n  return QA.test() \n    && Framework.validate();\n}`,
    en: `export const validatedDelivery = () => {\n  return QA.test() \n    && Framework.validate();\n}`,
  },
  
  // VDS System - Secure by Design
  'vds.system.secureDesign.title': {
    pt: 'Secure by Design',
    en: 'Secure by Design',
  },
  'vds.system.secureDesign.description': {
    pt: 'Segurança e compliance desde o início. Boas práticas e validações em cada etapa para ambientes críticos.',
    en: 'Security and compliance from the start. Best practices and validations at every stage for critical environments.',
  },
  'vds.system.secureDesign.code': {
    pt: `export const secureDesign = () => {\n  return Compliance.check() \n    && Security.enforce();\n}`,
    en: `export const secureDesign = () => {\n  return Compliance.check() \n    && Security.enforce();\n}`,
  },
  
  // VDS System - Scale Ready
  'vds.system.scaleReady.title': {
    pt: 'Scale Ready',
    en: 'Scale Ready',
  },
  'vds.system.scaleReady.description': {
    pt: 'Arquitetura cloud-native preparada para crescer. Soluções escaláveis que evoluem com seu negócio.',
    en: 'Cloud-native architecture ready to grow. Scalable solutions that evolve with your business.',
  },
  'vds.system.scaleReady.code': {
    pt: `export const scaleReady = () => {\n  return Cloud.provision() \n    && Architecture.optimize();\n}`,
    en: `export const scaleReady = () => {\n  return Cloud.provision() \n    && Architecture.optimize();\n}`,
  },
  
  // VDS System - VDS Framework
  'vds.system.vdsFramework.title': {
    pt: 'VDS Framework',
    en: 'VDS Framework',
  },
  'vds.system.vdsFramework.description': {
    pt: 'Framework proprietário de desenvolvimento, QA e validação assistida por IA. Acelera entregas mantendo qualidade.',
    en: 'Proprietary development, QA and AI-assisted validation framework. Accelerates delivery while maintaining quality.',
  },
  'vds.system.vdsFramework.code': {
    pt: `export const vdsFramework = () => {\n  return Dev.accelerate() \n    && QA.validate() \n    && AI.assist();\n}`,
    en: `export const vdsFramework = () => {\n  return Dev.accelerate() \n    && QA.validate() \n    && AI.assist();\n}`,
  },
  
  // About - Value Anchor
  'about.value.anchor': {
    pt: 'Nosso ponto de partida é sempre o valor: eficiência, receita, redução de risco, qualidade e velocidade.',
    en: 'Our starting point is always value: efficiency, revenue, risk reduction, quality and speed.',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('language') as Language;
    if (saved) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language);
      document.documentElement.setAttribute('lang', language === 'pt' ? 'pt-BR' : 'en');
    }
  }, [language, mounted]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'pt' ? 'en' : 'pt'));
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

