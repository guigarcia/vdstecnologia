/**
 * FloatingCTA Component
 * 
 * Persistent contact button that appears after scroll
 * Uses Fibonacci sequence for spacing (8, 13, 21, 34)
 * Keyboard shortcut: Ctrl+Shift+K
 */

'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import styles from './FloatingCTA.module.css';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const element = document.querySelector('#contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard shortcut for quick access
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.ctrlKey && e.shiftKey) {
        handleClick();
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  return (
    <button
      className={`${styles.floatingCTA} ${isVisible ? styles.visible : ''} ${isHovered ? styles.hovered : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Fale Conosco"
      title="Fale Conosco (ou use Ctrl+Shift+K)"
    >
      <MessageSquare className={styles.icon} />
      <span className={styles.text}>Contato</span>
    </button>
  );
}

