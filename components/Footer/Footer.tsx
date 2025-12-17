'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <Image
                src="/logos/VDS AI Orange.png"
                alt="VDS Tecnologia"
                width={160}
                height={55}
                className={styles.logoImage}
              />
            </div>
            <p className={styles.tagline}>
              {t('footer.tagline')}
            </p>
            <div className={styles.systemInfo}>
              <div className={styles.statusLine}>
                <span className={styles.statusDot}></span>
                <span className={styles.statusText}>SYSTEM ONLINE</span>
              </div>
              <div className={styles.versionLine}>
                <span className={styles.mono}>v2.0.25</span>
                <span className={styles.separator}>|</span>
                <span className={styles.mono}>BUILD #{currentYear}1217</span>
              </div>
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>{t('footer.navigation')}</h4>
              <a href="#sobre" className={styles.link}>{t('menu.about')}</a>
              <a href="#servicos" className={styles.link}>{t('menu.services')}</a>
              <a href="#tecnologia" className={styles.link}>{t('menu.technology')}</a>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>{t('footer.company')}</h4>
              <a href="#parceiros" className={styles.link}>{t('menu.partners')}</a>
              <a href="#processo" className={styles.link}>{t('menu.process')}</a>
              <a href="#contato" className={styles.link}>{t('menu.contact')}</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.terminalLine}>
            <span className={styles.prompt}>{'>'}</span>
            <span className={styles.command}>vds-tech</span>
            <span className={styles.path}>@{currentYear}</span>
            <span className={styles.separator}>~</span>
            <span className={styles.copyrightText}>{t('footer.rights')}</span>
          </div>
          <div className={styles.hashLine}>
            <span className={styles.hash}>SHA-256: </span>
            <span className={styles.hashValue}>a7f9e2c8d4b1f6a3e9c7b2d5f8a4e1c9</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

