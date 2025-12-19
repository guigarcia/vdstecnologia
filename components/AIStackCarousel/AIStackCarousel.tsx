'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ScanLines from '../ScanLines/ScanLines';
import styles from './AIStackCarousel.module.css';

const aiTools = [
  { name: 'OpenAI', logo: '/logos/openai.svg', category: 'LLM', color: '#10a37f' },
  { name: 'Claude', logo: '/logos/claude-color.svg', category: 'LLM', color: '#cc785c' },
  { name: 'Gemini', logo: '/logos/gemini-color.svg', category: 'LLM', color: '#4285f4' },
  { name: 'Cursor', logo: '/logos/cursor-text.svg', category: 'IDE', color: '#000000' },
  { name: 'GitHub Copilot', logo: '/logos/copilot-color.svg', category: 'CODE AI', color: '#24292e' },
  { name: 'DeepSeek', logo: '/logos/deepseek-color.svg', category: 'LLM', color: '#0066cc' },
  { name: 'Azure AI', logo: '/logos/azureai-color.svg', category: 'CLOUD AI', color: '#0078d4' },
  { name: 'Anthropic', logo: '/logos/anthropic.svg', category: 'LLM', color: '#cc785c' },
  { name: 'HuggingFace', logo: '/logos/huggingface-color.svg', category: 'ML', color: '#ff9d00' },
  { name: 'Ollama', logo: '/logos/ollama.svg', category: 'LOCAL LLM', color: '#000000' },
];

export default function AIStackCarousel() {
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
      <ScanLines />
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
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
              className={styles.card}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                '--tool-color': tool.color
              } as React.CSSProperties}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardHeader}>
                  <span className={styles.category} style={{ borderColor: tool.color, color: tool.color }}>
                    {tool.category}
                  </span>
                </div>
                
                <div className={styles.logoWrapper}>
                  <img 
                    src={tool.logo} 
                    alt={tool.name}
                    className={styles.logo}
                  />
                </div>
                
                <h3 className={styles.toolName}>{tool.name}</h3>
                
                <div className={styles.cardGlow} style={{ background: `radial-gradient(circle, ${tool.color}40, transparent)` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
