'use client';

import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function Card({
  children,
  variant = 'default',
  className = '',
  onClick,
  style,
}: CardProps) {
  return (
    <div
      className={`${styles.card} ${styles[variant]} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}

