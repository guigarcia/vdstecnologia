'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import ScanLines from '../ScanLines/ScanLines';
import styles from './AIStack.module.css';

const aiTools = [
  { name: 'OpenAI', src: '/logos/openai.svg', category: 'LLM', glow: 'green' },
  { name: 'Claude', src: '/logos/claude-color.svg', category: 'LLM', glow: 'orange' },
  { name: 'Gemini', src: '/logos/gemini-color.svg', category: 'LLM', glow: 'blue' },
  { name: 'Cursor', src: '/logos/cursor-text.svg', category: 'Heavy User IDE', glow: 'orange' },
  { name: 'GitHub Copilot', src: '/logos/copilot-color.svg', category: 'Code AI', glow: 'cyan' },
  { name: 'DeepSeek', src: '/logos/deepseek-color.svg', category: 'LLM', glow: 'blue' },
  { name: 'Azure AI', src: '/logos/azureai-color.svg', category: 'Cloud AI', glow: 'blue' },
  { name: 'Anthropic', src: '/logos/anthropic.svg', category: 'LLM', glow: 'orange' },
  { name: 'HuggingFace', src: '/logos/huggingface-color.svg', category: 'ML Platform', glow: 'orange' },
  { name: 'Ollama', src: '/logos/ollama.svg', category: 'Local AI', glow: 'cyan' },
];

export default function AIStack() {
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

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="ai-stack" ref={sectionRef} className={styles.aiStack}>
      <ScanLines />
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.iconBadge}>
            <Sparkles className={styles.sparkleIcon} />
          </div>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>AI STACK</span>
          </h2>
          <p className={styles.subtitle}>
            Powered by the most advanced AI models and tools
          </p>
        </div>

        <div className={`${styles.grid} ${isVisible ? styles.visible : ''}`}>
          {aiTools.map((tool, index) => (
            <div
              key={tool.name}
              className={`${styles.aiCard} ${isVisible ? styles.visible : ''} ${styles[`glow-${tool.glow}`]}`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className={styles.logoWrapper}>
                <img
                  src={tool.src}
                  alt={tool.name}
                  className={styles.logoImage}
                />
              </div>
              <h3 className={styles.aiName}>{tool.name}</h3>
              <span className={styles.category}>{tool.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

