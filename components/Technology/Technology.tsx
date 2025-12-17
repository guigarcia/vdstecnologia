'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Code, Atom, FileCode, Server, FileJson, Brain } from 'lucide-react';
import Card from '../Card/Card';
import ScanLines from '../ScanLines/ScanLines';
import { useLanguage } from '@/contexts/LanguageContext';
import { technologies } from '@/lib/constants';
import styles from './Technology.module.css';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Atom,
  FileCode,
  Server,
  Python: FileJson, // Python icon não existe no lucide-react, usando FileJson como alternativa
  Brain,
};

export default function Technology() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
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

  useEffect(() => {
    if (!isVisible) return;

    const fullText = t('technology.title');
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 60);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);

    const activeInterval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % technologies.length);
    }, 2000);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
      clearInterval(progressInterval);
      clearInterval(activeInterval);
    };
  }, [isVisible, t]);

  return (
    <section id="tecnologia" ref={sectionRef} className={styles.technology}>
      <ScanLines />
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.matrixBg}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className={styles.matrixColumn} style={{ left: `${i * 5}%`, animationDelay: `${i * 0.1}s` }}>
                {Array.from({ length: 10 }).map((_, j) => (
                  <span key={j} className={styles.matrixChar}>
                    {String.fromCharCode(0x30A0 + Math.random() * 96)}
                  </span>
                ))}
              </div>
            ))}
          </div>
          
          <div className={styles.consoleHeader}>
            <div className={styles.consoleDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className={styles.consoleTitle}>tech-stack.sh</span>
            <div className={styles.systemStats}>
              <span className={styles.stat}>CPU: {Math.floor(65 + Math.random() * 10)}%</span>
              <span className={styles.stat}>MEM: {Math.floor(40 + Math.random() * 15)}%</span>
            </div>
          </div>

          <h2 className={styles.title}>
            <span className={styles.titleGradient}>
              {displayedText}
              {showCursor && <span className={styles.cursor}>█</span>}
            </span>
          </h2>

          <div className={styles.terminalBox}>
            <div className={styles.terminalLine}>
              <span className={styles.prompt}>{'$'}</span>
              <span className={styles.command}>npm run</span>
              <span className={styles.args}>build:production</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${loadingProgress}%` }}></div>
            </div>
            <div className={styles.terminalOutput}>
              <span className={styles.success}>✓</span>
              <span>Compilando: <span className={styles.highlight}>{technologies[activeIndex]?.name || 'React'}</span></span>
            </div>
          </div>

          <p className={styles.subtitle}>
            {t('technology.subtitle')}
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

