/**
 * IntroSequence - The Boot Experience
 * 
 * This is where we go FULL HACKER MODE
 * No holding back. Maximum attitude. Pure cyberpunk energy.
 */

'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './IntroSequence.module.css';

export default function IntroSequence() {
  const [show, setShow] = useState(true);
  const [stage, setStage] = useState(0);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check localStorage
    const skipIntro = localStorage.getItem('vds-skip-intro');
    if (skipIntro === 'true') {
      setShow(false);
      return;
    }
  }, []);

  // Auto-scroll terminal as lines appear
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [bootLines]);

  // Force scroll when logo appears
  useEffect(() => {
    if (stage === 1 && terminalBodyRef.current) {
      setTimeout(() => {
        if (terminalBodyRef.current) {
          terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [stage]);

  useEffect(() => {
    // Stage 0: Boot sequence
    if (stage === 0) {
      const lines = [
        '> VDS SYSTEM BOOT SEQUENCE v2.0.1',
        '> BIOS: OK | RAM: OK | CPU: OK',
        '> ',
        '> Initializing core protocols...',
        '> [░░░░░░░░░░░░░░░░░░░░] 0%',
        '> [████░░░░░░░░░░░░░░░░] 20% - Loading AI engines',
        '> [████████░░░░░░░░░░░░] 40% - Mounting cloud infrastructure',
        '> [████████████░░░░░░░░] 60% - Decrypting VALUE protocols',
        '> [████████████████░░░░] 80% - Activating DRIVEN systems',
        '> [████████████████████] 100% - SOLUTIONS framework deployed',
        '> ',
        '> All systems operational',
        '> Decoding identity...',
        '> ',
        '> V . A . L . U . E',
        '> D . R . I . V . E . N', 
        '> S . O . L . U . T . I . O . N . S',
        '> ',
        '> System ready. Welcome aboard.',
      ];

      let index = 0;
      const interval = setInterval(() => {
        if (index < lines.length) {
          setBootLines(prev => [...prev, lines[index]]);
          // Glitch intenso em momentos chave
          if (lines[index].includes('100%') || lines[index].includes('V . A . L . U . E')) {
            setGlitchIntensity(5);
            setTimeout(() => setGlitchIntensity(0), 300);
          } else if (index % 4 === 0) {
            setGlitchIntensity(2);
            setTimeout(() => setGlitchIntensity(0), 150);
          }
          index++;
        } else {
          clearInterval(interval);
          setTimeout(() => setStage(1), 800);
        }
      }, 150);

      return () => clearInterval(interval);
    }

    // Stage 1: Show ASCII and auto-close after delay
    if (stage === 1) {
      setTimeout(() => {
        setGlitchIntensity(5);
        setTimeout(() => {
          setShow(false);
        }, 500);
      }, 3000); // 3s delay para apreciar o logo
    }
  }, [stage]);

  const handleSkip = () => {
    setGlitchIntensity(5);
    setTimeout(() => setShow(false), 300);
  };

  const handleSkipAlways = () => {
    localStorage.setItem('vds-skip-intro', 'true');
    setGlitchIntensity(5);
    setTimeout(() => setShow(false), 300);
  };

  if (!show) return null;

  const asciiLogo = `
██╗   ██╗██████╗ ███████╗
██║   ██║██╔══██╗██╔════╝
██║   ██║██║  ██║███████╗
╚██╗ ██╔╝██║  ██║╚════██║
 ╚████╔╝ ██████╔╝███████║
  ╚═══╝  ╚═════╝ ╚══════╝
  `;

  return (
    <div className={`${styles.intro} ${glitchIntensity > 0 ? styles.glitch : ''}`}>
      {/* CRT Effect */}
      <div className={styles.crt}></div>
      <div className={styles.scanlines}></div>
      
      {/* Matrix Rain Background */}
      <div className={styles.matrixBg}></div>

      <div className={styles.content}>
        {/* Company Name */}
        <div className={styles.brandHeader}>
          <h1 className={styles.brandName}>VDS TECNOLOGIA</h1>
          <p className={styles.brandTagline}>Value-Driven Solutions</p>
        </div>

        {/* Terminal Window */}
        <div className={styles.terminal}>
          <div className={styles.terminalHeader}>
            <div className={styles.headerLeft}>
              <span className={styles.led}></span>
              <span className={styles.prompt}>root@vds-core:~#</span>
            </div>
            <span className={styles.status}>BOOTING...</span>
          </div>

          <div className={styles.terminalBody} ref={terminalBodyRef}>
            {bootLines.map((line, i) => (
              <div key={i} className={styles.bootLine}>
                {line && line.startsWith('[') ? (
                  <span className={styles.progressLine}>{line}</span>
                ) : line === '' ? (
                  <br />
                ) : line && line.includes('✓') ? (
                  <span className={styles.successLine}>✓ {line}</span>
                ) : (
                  <span>{'>'} {line}</span>
                )}
              </div>
            ))}

            {stage >= 1 && (
              <div className={styles.asciiContainer}>
                <pre className={styles.ascii}>{asciiLogo}</pre>
                <div className={styles.motto}>
                  TECHNOLOGY DRIVEN BY RESULTS
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button 
            className={styles.btnSkip} 
            onClick={handleSkip}
          >
            [ PULAR AGORA ]
          </button>
          <button 
            className={styles.btnSkipAlways} 
            onClick={handleSkipAlways}
          >
            [ NÃO MOSTRAR NOVAMENTE ]
          </button>
        </div>

        {/* Progress indicator */}
        {stage < 1 && (
          <div className={styles.progress}>
            <div className={styles.progressBar}></div>
          </div>
        )}
      </div>
    </div>
  );
}

