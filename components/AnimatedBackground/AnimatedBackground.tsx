'use client';

import React from 'react';
import styles from './AnimatedBackground.module.css';

export default function AnimatedBackground() {
  return (
    <>
      <div className={styles.meshBackground}></div>
      <div className={styles.cyberGrid}></div>
    </>
  );
}

