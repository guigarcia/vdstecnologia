'use client';

import React, { useEffect, useRef, useState } from 'react';
import LogoCloud from '../LogoCloud/LogoCloud';
import { partners } from '@/lib/constants';
import styles from './Partners.module.css';

export default function Partners() {
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

  return (
    <section id="parceiros" ref={sectionRef} className={styles.partners}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>Nossos Parceiros</span>
          </h2>
          <p className={styles.subtitle}>
            Trabalhamos com as principais plataformas cloud e tecnologias de ponta
          </p>
        </div>

        <div className={styles.sections}>
          <div className={`${styles.section} ${isVisible ? styles.visible : ''}`}>
            <h3 className={styles.sectionTitle}>Cloud Partners</h3>
            <p className={styles.sectionDescription}>
              Experiência nas principais plataformas cloud do mercado
            </p>
            <LogoCloud logos={partners.clouds} columns={3} />
          </div>

          <div className={`${styles.section} ${isVisible ? styles.visible : ''}`}>
            <h3 className={styles.sectionTitle}>Especializações</h3>
            <p className={styles.sectionDescription}>
              Super experiência em Snowflake e Cortex AI
            </p>
            <LogoCloud logos={partners.specialties} columns={2} />
          </div>

          <div className={`${styles.section} ${isVisible ? styles.visible : ''}`}>
            <h3 className={styles.sectionTitle}>Parcerias Oficiais</h3>
            <p className={styles.sectionDescription}>
              Parceiros estratégicos em desenvolvimento
            </p>
            <LogoCloud logos={partners.official} columns={1} />
          </div>
        </div>
      </div>
    </section>
  );
}

