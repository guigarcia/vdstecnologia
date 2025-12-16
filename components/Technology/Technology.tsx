'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Code, Atom, FileCode, Server, Python, Brain } from 'lucide-react';
import Card from '../Card/Card';
import { technologies } from '@/lib/constants';
import styles from './Technology.module.css';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Atom,
  FileCode,
  Server,
  Python,
  Brain,
};

export default function Technology() {
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
    <section id="tecnologia" ref={sectionRef} className={styles.technology}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>Tecnologias</span>
          </h2>
          <p className={styles.subtitle}>
            Stack moderna e inovadora para desenvolvimento de soluções de ponta
          </p>
        </div>

        <div className={`${styles.grid} ${isVisible ? styles.visible : ''}`}>
          {technologies.map((tech, index) => {
            const Icon = iconMap[tech.icon];
            return (
              <Card
                key={tech.name}
                variant="glass"
                className={`${styles.techCard} ${isVisible ? styles.visible : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {Icon && <Icon className={styles.icon} />}
                <h3 className={styles.techName}>{tech.name}</h3>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

