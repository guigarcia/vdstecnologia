'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './Header.module.css';

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: t('menu.about'), href: '#sobre' },
    { label: t('menu.services'), href: '#servicos' },
    { label: t('menu.technology'), href: '#tecnologia' },
    { label: t('menu.partners'), href: '#parceiros' },
    { label: t('menu.process'), href: '#processo' },
    { label: t('menu.contact'), href: '#contato' },
  ];

  const handleMenuClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src="/logos/VDS AI Orange.png"
            alt="VDS Tecnologia"
            width={140}
            height={50}
            className={styles.logoImage}
            priority
          />
        </div>

        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick(item.href);
              }}
              className={styles.navLink}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            onClick={toggleLanguage}
            className={styles.languageToggle}
            aria-label="Toggle language"
          >
            <Globe size={18} />
            <span className={styles.langText}>{language.toUpperCase()}</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={styles.mobileMenuToggle}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}

