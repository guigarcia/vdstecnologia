'use client';

import React from 'react';
import styles from './GlitchEffect.module.css';

interface GlitchEffectProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export default function GlitchEffect({ children, intensity = 'medium', className = '' }: GlitchEffectProps) {
  return (
    <div className={`${styles.glitchWrapper} ${styles[intensity]} ${className}`}>
      <div className={styles.glitch} data-text={typeof children === 'string' ? children : ''}>
        {children}
      </div>
    </div>
  );
}
