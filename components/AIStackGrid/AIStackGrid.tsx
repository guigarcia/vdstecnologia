/**
 * AIStackGrid Component
 * 
 * Clean grid layout showcasing our AI tool ecosystem
 * Simplified from 3D carousel for better UX and performance
 * 
 * All tools listed are actively used in our development workflow
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './AIStackGrid.module.css';

const aiTools = [
  { name: 'OpenAI', category: 'LLM' },
  { name: 'Claude', category: 'LLM' },
  { name: 'Gemini', category: 'LLM' },
  { name: 'Cursor', category: 'IDE' },
  { name: 'GitHub Copilot', category: 'CODE AI' },
  { name: 'DeepSeek', category: 'LLM' },
  { name: 'Azure AI', category: 'CLOUD' },
  { name: 'Anthropic', category: 'LLM' },
  { name: 'HuggingFace', category: 'ML' },
  { name: 'Ollama', category: 'LOCAL' },
];

export default function AIStackGrid() {
  const { t } = useLanguage();
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
    <section id="ai-stack" ref={sectionRef} className={styles.aiStack}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.terminalLine}>
            <span className={styles.prompt}>{'>'}</span>
            <span className={styles.command}>cat ai-stack.txt</span>
          </div>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>AI STACK</span>
          </h2>
          <p className={styles.subtitle}>
            {t('aistack.subtitle')}
          </p>
        </div>

        <div className={`${styles.grid} ${isVisible ? styles.visible : ''}`}>
          {aiTools.map((tool, index) => (
            <div
              key={tool.name}
              className={styles.gridItem}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={styles.itemContent}>
                <span className={styles.toolName}>{tool.name}</span>
                <span className={styles.category}>{tool.category}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.footer} ${isVisible ? styles.visible : ''}`}>
          <span className={styles.footerPrompt}>{'>'}</span>
          <span className={styles.footerText}>
            10 AI tools integrated | Status: ACTIVE
          </span>
        </div>
      </div>
    </section>
  );
}

