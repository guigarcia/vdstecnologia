'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Send, Mail, Phone } from 'lucide-react';
import Button from '../Button/Button';
import Card from '../Card/Card';
import ScanLines from '../ScanLines/ScanLines';
import styles from './Contact.module.css';

export default function Contact() {
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
    
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
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
            <span className={styles.titleGradient}>Entre em Contato</span>
          </h2>
          <p className={styles.subtitle}>
            Estamos prontos para transformar suas ideias em realidade
          </p>
        </div>

        <div className={styles.content}>
          <Card variant="glass" className={`${styles.formCard} ${isVisible ? styles.visible : ''}`}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="Seu nome"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="seu@email.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={styles.textarea}
                  placeholder="Conte-nos sobre seu projeto..."
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                <Send size={20} />
              </Button>
            </form>
          </Card>

          <div className={`${styles.info} ${isVisible ? styles.visible : ''}`}>
            <Card variant="glass" className={styles.infoCard}>
              <Mail className={styles.infoIcon} />
              <h3 className={styles.infoTitle}>Email</h3>
              <p className={styles.infoText}>contato@vdstecnologia.com</p>
            </Card>

            <Card variant="glass" className={styles.infoCard}>
              <Phone className={styles.infoIcon} />
              <h3 className={styles.infoTitle}>Telefone</h3>
              <p className={styles.infoText}>+55 (11) 9999-9999</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

