'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../Button/Button';
import ParticleSystem from '../ParticleSystem/ParticleSystem';
import styles from './Hero.module.css';

export default function Hero() {
  const handleContactClick = () => {
    const element = document.querySelector('#contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero}>
      <ParticleSystem />
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>
            <span className={styles.titleGradient}>
              Desenvolvimento com IA
            </span>
            <br />
            <span className={styles.titleSubtext}>
              como parceiro estratégico
            </span>
          </h1>
          <p className={styles.subtitle}>
            Transformamos ideias em soluções tecnológicas inovadoras, 
            utilizando inteligência artificial para acelerar o desenvolvimento 
            e entregar resultados excepcionais.
          </p>
          <div className={styles.ctaGroup}>
            <Button
              variant="primary"
              size="lg"
              onClick={handleContactClick}
              className={styles.ctaButton}
            >
              Fale Conosco
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
      </div>
    </section>
  );
}

