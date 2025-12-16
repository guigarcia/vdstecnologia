'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Cloud, Database, Sparkles } from 'lucide-react';
import LogoCloud from '../LogoCloud/LogoCloud';
import { partners } from '@/lib/constants';
import styles from './About.module.css';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const allPartners = [
    ...partners.clouds,
    ...partners.specialties,
    ...partners.official,
  ];

  return (
    <section id="sobre" ref={sectionRef} className={styles.about}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>Sobre a VDS Tecnologia</span>
          </h2>
          <p className={styles.subtitle}>
            Somos especialistas em transformar ideias em soluções tecnológicas 
            inovadoras, utilizando inteligência artificial como parceiro estratégico 
            no desenvolvimento.
          </p>
        </div>

        <div className={styles.content}>
          <div className={`${styles.textContent} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.feature}>
              <div className={styles.iconWrapper}>
                <Cloud className={styles.icon} />
              </div>
              <div>
                <h3 className={styles.featureTitle}>Experiência em Clouds</h3>
                <p className={styles.featureDescription}>
                  Trabalhamos com as principais plataformas cloud: AWS, Azure e Google Cloud Platform, 
                  oferecendo soluções escaláveis e confiáveis.
                </p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.iconWrapper}>
                <Database className={styles.icon} />
              </div>
              <div>
                <h3 className={styles.featureTitle}>Especialização em Snowflake</h3>
                <p className={styles.featureDescription}>
                  Super experiência em Snowflake e Cortex AI, oferecendo soluções avançadas 
                  de análise de dados e machine learning.
                </p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.iconWrapper}>
                <Sparkles className={styles.icon} />
              </div>
              <div>
                <h3 className={styles.featureTitle}>Parceria com Cursor</h3>
                <p className={styles.featureDescription}>
                  Somos parceiros oficiais da Cursor, utilizando as melhores ferramentas 
                  de desenvolvimento assistido por IA para entregar resultados excepcionais.
                </p>
              </div>
            </div>
          </div>

          <div className={`${styles.logosSection} ${isVisible ? styles.visible : ''}`}>
            <LogoCloud logos={allPartners} columns={3} />
          </div>
        </div>
      </div>
    </section>
  );
}

