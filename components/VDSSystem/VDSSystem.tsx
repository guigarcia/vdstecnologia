/**
 * VDSSystem Component - Core System Architecture
 * 
 * Visualizes our 6-pillar methodology as an operating system
 * Each module represents a fundamental principle in our process
 * 
 * Technical notes:
 * - Uptime simulation updates every 5s for realism
 * - Intersection Observer for scroll-triggered animations
 * - SVG connections show data flow between modules
 * - Modular architecture with proper TypeScript typing
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Target, Zap, CheckCircle, Shield, TrendingUp, Package } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { vdsModules } from '@/lib/constants';
import styles from './VDSSystem.module.css';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  Zap,
  CheckCircle,
  Shield,
  TrendingUp,
  Package,
};

export default function VDSSystem() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [uptime, setUptime] = useState('99.9%');
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Simulate uptime changes - because real systems fluctuate
  // (But ours stay above 99.9% because we're that good 😎)
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      const uptimes = ['99.9%', '99.98%', '99.95%', '100%'];
      setUptime(uptimes[Math.floor(Math.random() * uptimes.length)]);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  // Each module gets its own metric because details matter
  const getMetric = (index: number) => {
    const metrics = [
      { label: 'Impact', value: 'HIGH' },
      { label: 'Throughput', value: 'OPTIMAL' },
      { label: 'Quality', value: '100%' },
      { label: 'Security', value: 'ENFORCED' },
      { label: 'Scalability', value: 'READY' },
      { label: 'Framework', value: 'ACTIVE' },
    ];
    return metrics[index];
  };

  return (
    <section id="vds-system" ref={sectionRef} className={styles.vdsSystem}>
      <div className={styles.container}>
        {/* System Header - Because every good system needs a status bar */}
        <div className={`${styles.systemHeader} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.headerTop}>
            <div className={styles.systemInfo}>
              <span className={styles.systemName}>VDS_CORE_v2.0</span>
              <span className={styles.divider}>|</span>
              <span className={styles.status}>
                <span className={styles.ledGreen}></span>
                Status: <span className={styles.statusOnline}>ONLINE</span>
              </span>
              <span className={styles.divider}>|</span>
              <span className={styles.modules}>
                Modules: <span className={styles.moduleCount}>6/6 ACTIVE</span>
              </span>
              <span className={styles.divider}>|</span>
              <span className={styles.uptime}>
                Uptime: <span className={styles.uptimeValue}>{uptime}</span>
              </span>
            </div>
          </div>
          
          <div className={styles.headerContent}>
            <h2 className={styles.title}>
              <span className={styles.titleGradient}>{t('vds.system.title')}</span>
              <span className={styles.fullName}>{t('vds.system.fullname')}</span>
            </h2>
            <p className={styles.subtitle}>
              {t('vds.system.subtitle')}
            </p>
          </div>
        </div>

        {/* Connection Lines SVG - Pure CSS would be messy, SVG is elegant */}
        <svg className={styles.connectionLines} viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 107, 0, 0)" />
              <stop offset="50%" stopColor="rgba(255, 107, 0, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 107, 0, 0)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Connecting lines between modules - representing data flow */}
          {isVisible && (
            <>
              <line x1="200" y1="150" x2="500" y2="150" className={styles.connectionLine} />
              <line x1="500" y1="150" x2="800" y2="150" className={styles.connectionLine} />
              <line x1="350" y1="300" x2="650" y2="300" className={styles.connectionLine} />
              <line x1="200" y1="450" x2="800" y2="450" className={styles.connectionLine} />
              
              {/* Data flow particles - because movement indicates life */}
              <circle className={styles.dataParticle} r="4">
                <animateMotion dur="3s" repeatCount="indefinite" path="M200,150 L800,150" />
              </circle>
              <circle className={styles.dataParticle} r="4">
                <animateMotion dur="4s" repeatCount="indefinite" path="M350,300 L650,300" />
              </circle>
            </>
          )}
        </svg>

        {/* Modules Grid - The meat of our operation */}
        <div className={`${styles.modulesGrid} ${isVisible ? styles.visible : ''}`}>
          {vdsModules.map((module, index) => {
            const Icon = iconMap[module.icon];
            const metric = getMetric(index);
            const isActive = activeModule === index;
            
            return (
              <div
                key={module.key}
                className={`${styles.moduleCard} ${isVisible ? styles.visible : ''} ${isActive ? styles.active : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
                onMouseEnter={() => setActiveModule(index)}
                onMouseLeave={() => setActiveModule(null)}
              >
                {/* Module Header - Status indicators for that pro look */}
                <div className={styles.moduleHeader}>
                  <div className={styles.moduleStatus}>
                    <span className={styles.ledActive}></span>
                    <span className={styles.moduleId}>MODULE_{index + 1}</span>
                  </div>
                  <div className={styles.moduleMetric}>
                    <span className={styles.metricLabel}>{metric.label}:</span>
                    <span className={styles.metricValue}>{metric.value}</span>
                  </div>
                </div>

                {/* Module Icon - With that sweet glow effect */}
                <div className={styles.iconWrapper} style={{ borderColor: module.color }}>
                  {Icon && <Icon className={styles.icon} style={{ color: module.color }} />}
                  <div className={styles.iconGlow} style={{ background: `radial-gradient(circle, ${module.color}40 0%, transparent 70%)` }}></div>
                </div>

                {/* Module Title */}
                <h3 className={styles.moduleTitle} style={{ color: module.color }}>
                  {t(`vds.system.${module.key}.title`)}
                </h3>

                {/* Module Description */}
                <p className={styles.moduleDescription}>
                  {t(`vds.system.${module.key}.description`)}
                </p>

                {/* Code Snippet - Real code, not Lorem Ipsum */}
                <div className={styles.codeSnippet}>
                  <div className={styles.codeHeader}>
                    <span className={styles.codeDot}></span>
                    <span className={styles.codeDot}></span>
                    <span className={styles.codeDot}></span>
                    <span className={styles.fileName}>{module.key}.module.ts</span>
                  </div>
                  <pre className={styles.codeContent}>
                    <code>{t(`vds.system.${module.key}.code`)}</code>
                  </pre>
                </div>

                {/* Scan Effect - Because scanning looks cool */}
                <div className={styles.scanEffect}></div>
              </div>
            );
          })}
        </div>

        {/* System Footer */}
        <div className={`${styles.systemFooter} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.footerContent}>
            <span className={styles.footerText}>
              <span className={styles.prompt}>{'>'}</span>
              {t('vds.system.footer')}
            </span>
          </div>
        </div>
      </div>

      {/* Cyberpunk Grid Background - Subtle but essential */}
      <div className={styles.cyberGrid}></div>
    </section>
  );
}

