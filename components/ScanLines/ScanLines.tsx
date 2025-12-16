'use client';

import React from 'react';
import styles from './ScanLines.module.css';

export default function ScanLines() {
  return (
    <div className={styles.scanLines}>
      <div className={styles.line}></div>
    </div>
  );
}
