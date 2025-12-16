'use client';

import React, { useEffect, useRef, useState } from 'react';
import GlitchEffect from '../GlitchEffect/GlitchEffect';
import styles from './HackerTerminal.module.css';

const codeSnippets = [
  'const ai = new AIEngine({ model: "gpt-4", temperature: 0.7 });',
  'async function deployToProduction() { ... }',
  'class NeuralNetwork extends TensorFlow { ... }',
  'export default async function handler(req, res) { ... }',
  'interface DataPipeline { transform(): Promise<void>; }',
  'const pipeline = await snowflake.createCortexPipeline();',
  'function optimizePerformance() { return 10x_faster; }',
  'import { GPT, Claude, Gemini } from "@ai/models";',
];

const terminalMessages = [
  '> Initializing AI development environment...',
  '> Loading neural networks...',
  '> Compiling quantum algorithms...',
  '> Deploying to cloud infrastructure...',
  '> AI agents activated...',
  '> System ready. Development speed: ∞',
];

export default function HackerTerminal() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [terminalText, setTerminalText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Typing effect para terminal
    const message = terminalMessages[messageIndex];
    let charIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (charIndex < message.length) {
        setTerminalText(message.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setMessageIndex((prev) => (prev + 1) % terminalMessages.length);
          setTerminalText('');
        }, 2000);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [messageIndex]);

  useEffect(() => {
    // Código caindo estilo Matrix
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '14px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        const char = text[Math.floor(Math.random() * text.length)];
        
        // Alternar entre laranja e azul
        const color = Math.random() > 0.5 
          ? `rgba(255, 107, 53, ${Math.random() * 0.8 + 0.2})`
          : `rgba(0, 102, 255, ${Math.random() * 0.8 + 0.2})`;
        
        ctx.fillStyle = color;
        ctx.fillText(char, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hackerTerminal}>
      <canvas ref={canvasRef} className={styles.matrixCanvas} />
      <div className={styles.scanLinesIntense}></div>
      <div className={styles.glitchOverlay}></div>
      
      <div className={styles.content}>
        <div className={styles.terminal}>
          <div className={styles.terminalHeader}>
            <span className={styles.dot} style={{ background: '#FF2E63' }}></span>
            <span className={styles.dot} style={{ background: '#FFB800' }}></span>
            <span className={styles.dot} style={{ background: '#00FF88' }}></span>
            <span className={styles.terminalTitle}>vds@ai-development:~$</span>
          </div>
          <div className={styles.terminalBody}>
            <GlitchEffect intensity="high">
              <div className={styles.terminalOutput}>
                <span className={styles.prompt}>{'>'}</span>
                <span className={styles.terminalText}>{terminalText}</span>
                <span className={styles.cursor}>_</span>
              </div>
            </GlitchEffect>
          </div>
        </div>
        
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>10x</span>
            <span className={styles.statLabel}>FASTER</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>∞</span>
            <span className={styles.statLabel}>POSSIBILITIES</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>AI</span>
            <span className={styles.statLabel}>POWERED</span>
          </div>
        </div>
      </div>
    </section>
  );
}

