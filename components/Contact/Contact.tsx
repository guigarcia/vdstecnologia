'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Send, Mail, Phone } from 'lucide-react';
import Button from '../Button/Button';
import Card from '../Card/Card';
import ScanLines from '../ScanLines/ScanLines';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './Contact.module.css';

export default function Contact() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio do formulário
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    alert(t('contact.success'));
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contato" ref={sectionRef} className={styles.contact}>
      <ScanLines />
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>{t('contact.title')}</span>
          </h2>
          <p className={styles.subtitle}>
            {t('contact.subtitle')}
          </p>
        </div>

        <div className={styles.content}>
          <Card variant="glass" className={`${styles.formCard} ${isVisible ? styles.visible : ''}`}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder={t('contact.namePlaceholder')}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder={t('contact.emailPlaceholder')}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={styles.textarea}
                  placeholder={t('contact.messagePlaceholder')}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? t('contact.submitting') : t('contact.send')}
                <Send size={20} />
              </Button>
            </form>
          </Card>

          <div className={`${styles.info} ${isVisible ? styles.visible : ''}`}>
            <Card variant="glass" className={styles.infoCard}>
              <Mail className={styles.infoIcon} />
              <h3 className={styles.infoTitle}>{t('contact.emailLabel')}</h3>
              <p className={styles.infoText}>contato@vdstecnologia.com.br</p>
            </Card>

            <Card variant="glass" className={styles.infoCard}>
              <Phone className={styles.infoIcon} />
              <h3 className={styles.infoTitle}>{t('contact.phoneLabel')}</h3>
              <p className={styles.infoText}>+55 (11) 9999-9999</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

