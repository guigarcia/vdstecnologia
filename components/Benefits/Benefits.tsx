'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Zap, Lightbulb, Award, TrendingUp } from 'lucide-react';
import Card from '../Card/Card';
import ScanLines from '../ScanLines/ScanLines';
import { benefits } from '@/lib/constants';
import styles from './Benefits.module.css';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Lightbulb,
  Award,
  TrendingUp,
};

export default function Benefits() {
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
    <section id="beneficios" ref={sectionRef} className={styles.benefits}>
      <ScanLines />
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>Por que escolher a VDS?</span>
          </h2>
          <p className={styles.subtitle}>
            Vantagens competitivas que fazem a diferença
          </p>
        </div>

        <div className={`${styles.grid} ${isVisible ? styles.visible : ''}`}>
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon];
            return (
              <Card
                key={benefit.title}
                variant="glass"
                className={`${styles.benefitCard} ${isVisible ? styles.visible : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.iconWrapper}>
                  {Icon && <Icon className={styles.icon} />}
                </div>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitDescription}>{benefit.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

