'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './LogoCloud.module.css';

interface Logo {
  src: string;
  alt: string;
  name: string;
  description?: string;
}

interface LogoCloudProps {
  logos: Logo[];
  columns?: number;
  className?: string;
}

export default function LogoCloud({
  logos,
  columns = 3,
  className = '',
}: LogoCloudProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.logoCloud} ${className}`}
      style={{ '--columns': columns } as React.CSSProperties}
    >
      {logos.map((logo, index) => (
        <div
          key={logo.name}
          className={`${styles.logoItem} ${isVisible ? styles.visible : ''}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className={styles.logoWrapper}>
            <img
              src={logo.src}
              alt={logo.alt}
              className={styles.logoImage}
            />
          </div>
          {logo.description && (
            <p className={styles.logoDescription}>{logo.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}

