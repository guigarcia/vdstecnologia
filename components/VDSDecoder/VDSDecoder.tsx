/**
 * VDSDecoder Component
 * 
 * Terminal-style animation revealing the meaning of VDS
 * Typing speed optimized for natural perception (50ms/char)
 * Matrix rain uses Japanese Katakana characters (0x30A0-0x30FF range)
 */

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './VDSDecoder.module.css';

export default function VDSDecoder() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [stage, setStage] = useState(0);
  const [commandText, setCommandText] = useState('');
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [showAscii, setShowAscii] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [decodingText, setDecodingText] = useState('');
  const [progressBar, setProgressBar] = useState(0);
  const [matrixColumns, setMatrixColumns] = useState<Array<{ left: string; delay: string; duration: string; chars: string[] }>>([]);
  const commandRef = useRef<HTMLDivElement>(null);

  const command = '$ vds --decode --mode=production';
  
  // ASCII art generated with love (and a bit of OCD)
  const asciiArt = `
  ██╗   ██╗██████╗ ███████╗
  ██║   ██║██╔══██╗██╔════╝
  ██║   ██║██║  ██║███████╗
  ╚██╗ ██╔╝██║  ██║╚════██║
   ╚████╔╝ ██████╔╝███████║
    ╚═══╝  ╚═════╝ ╚══════╝
  `;

  // Initialize on mount to avoid hydration issues
  useEffect(() => {
    setMounted(true);
    
    // Generate matrix columns only on client
    // Using Katakana range for that authentic Matrix feel
    const columns = Array.from({ length: 20 }).map((_, i) => ({
      left: `${i * 5}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${3 + Math.random() * 2}s`,
      chars: Array.from({ length: 15 }).map(() => 
        String.fromCharCode(0x30A0 + Math.random() * 96)
      )
    }));
    setMatrixColumns(columns);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Stage 1: Type command (like a real hacker)
    if (stage === 0) {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= command.length) {
          setCommandText(command.substring(0, index));
          index++;
        } else {
          clearInterval(interval);
          setTimeout(() => setStage(1), 300);
        }
      }, 50); // 50ms per character - the sweet spot
      return () => clearInterval(interval);
    }

    // Stage 2: Show output lines
    if (stage === 1) {
      const lines = [
        t('vds.decoder.line1'),
        t('vds.decoder.line2'),
      ];
      
      let lineIndex = 0;
      const interval = setInterval(() => {
        if (lineIndex < lines.length) {
          setOutputLines(prev => [...prev, lines[lineIndex]]);
          lineIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => setStage(2), 200);
        }
      }, 400);
      return () => clearInterval(interval);
    }

    // Stage 3: Progress bar (because progress bars are cool)
    if (stage === 2) {
      let progress = 0;
      const interval = setInterval(() => {
        if (progress <= 100) {
          setProgressBar(progress);
          progress += 4;
        } else {
          clearInterval(interval);
          setTimeout(() => setStage(3), 200);
        }
      }, 30);
      return () => clearInterval(interval);
    }

    // Stage 4: Decode text with glitch (the money shot)
    if (stage === 3) {
      const text = 'V.A.L.U.E - D.R.I.V.E.N - S.O.L.U.T.I.O.N.S';
      let index = 0;
      
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDecodingText(text.substring(0, index));
          // Glitch every 3rd character for that unstable look
          if (index % 3 === 0) {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 100);
          }
          index++;
        } else {
          clearInterval(interval);
          setTimeout(() => setStage(4), 400);
        }
      }, 50);
      return () => clearInterval(interval);
    }

    // Stage 5: Show results (the reveal)
    if (stage === 4) {
      const lines = [
        t('vds.decoder.value'),
        t('vds.decoder.driven'),
        t('vds.decoder.solutions'),
        t('vds.decoder.status'),
      ];
      
      let lineIndex = 0;
      const interval = setInterval(() => {
        if (lineIndex < lines.length) {
          setOutputLines(prev => [...prev, lines[lineIndex]]);
          lineIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setShowAscii(true);
            setStage(5);
          }, 300);
        }
      }, 500);
      return () => clearInterval(interval);
    }

    // Stage 6: Final - keep glitching ASCII periodically
    if (stage === 5) {
      const interval = setInterval(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [stage, t, mounted]);

  const renderProgressBar = () => {
    const blocks = 25;
    const filled = Math.floor((progressBar / 100) * blocks);
    // Using unicode blocks because we're fancy like that
    return '[' + '█'.repeat(filled) + '░'.repeat(blocks - filled) + ']';
  };

  return (
    <div className={styles.decoder}>
      <div className={styles.scanlines}></div>
      <div className={styles.terminal}>
        <div className={styles.terminalHeader}>
          <span className={styles.systemPrompt}>root@vds-core:~#</span>
          <span className={styles.terminalTitle}>vds-decoder v2.0.1</span>
          <div className={styles.statusIndicators}>
            <span className={styles.indicator}>SECURE</span>
            <span className={`${styles.indicator} ${styles.active}`}>ONLINE</span>
          </div>
        </div>
        
        <div className={styles.terminalBody}>
          <div className={styles.commandLine} ref={commandRef}>
            <span className={styles.prompt}>➜</span>
            <span className={styles.command}>{commandText}</span>
            {stage === 0 && <span className={styles.cursor}>▋</span>}
          </div>
          
          {stage >= 1 && (
            <div className={styles.output}>
              {outputLines.slice(0, stage === 1 ? 2 : stage === 4 || stage === 5 ? outputLines.length : 2).map((line, i) => (
                <div key={i} className={styles.outputLine}>
                  <span className={styles.arrow}>{'>'}</span>
                  <span className={styles.text}>{line}</span>
                  {line && (line.includes('✓') || line.includes('OPERATIONAL')) && (
                    <span className={styles.checkmark}>{line.includes('✓') ? '' : ''}</span>
                  )}
                </div>
              ))}
              
              {stage >= 2 && stage < 4 && (
                <div className={styles.outputLine}>
                  <span className={styles.arrow}>{'>'}</span>
                  <span className={styles.progress}>
                    {renderProgressBar()} {progressBar}%
                  </span>
                </div>
              )}
              
              {stage >= 3 && (
                <div className={`${styles.decodingLine} ${glitchActive ? styles.glitch : ''}`}>
                  <span className={styles.arrow}>{'>'}</span>
                  <span className={styles.decoding}>{decodingText}</span>
                </div>
              )}
            </div>
          )}
          
          {showAscii && (
            <div className={`${styles.asciiArt} ${glitchActive ? styles.glitch : ''}`}>
              <pre>{asciiArt}</pre>
              <div className={styles.subtitle}>
                {t('vds.decoder.subtitle')}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Matrix rain effect - because we can */}
      {mounted && (
        <div className={styles.matrixRain}>
          {matrixColumns.map((col, i) => (
            <div 
              key={i} 
              className={styles.matrixColumn}
              style={{
                left: col.left,
                animationDelay: col.delay,
                animationDuration: col.duration
              }}
            >
              {col.chars.map((char, j) => (
                <span key={j} className={styles.matrixChar}>
                  {char}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

