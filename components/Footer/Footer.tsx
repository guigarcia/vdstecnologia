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
          <p className={styles.copyright}>
            © {currentYear} {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}

