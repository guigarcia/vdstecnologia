'use client';

import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoText}>VDS</span>
              <span className={styles.logoSubtext}>Tecnologia</span>
            </div>
            <p className={styles.tagline}>
              Transformando ideias em soluções tecnológicas com IA
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Navegação</h4>
              <a href="#sobre" className={styles.link}>Sobre</a>
              <a href="#servicos" className={styles.link}>Serviços</a>
              <a href="#tecnologia" className={styles.link}>Tecnologia</a>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Empresa</h4>
              <a href="#parceiros" className={styles.link}>Parceiros</a>
              <a href="#processo" className={styles.link}>Processo</a>
              <a href="#contato" className={styles.link}>Contato</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} VDS Tecnologia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

