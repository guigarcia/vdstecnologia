'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './ContactTerminal.module.css';

// Konami code sequence
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function ContactTerminal() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([
    '> VDS Contact System v2.0',
    '> Secure connection established',
    '> Type "help" for available commands',
    '> ',
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [matrixMode, setMatrixMode] = useState(false);
  const [hackerMode, setHackerMode] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalLines]);

  const addLine = (line: string) => {
    setTerminalLines(prev => [...prev, line]);
  };

  const addMatrix = () => {
    const matrixLines = [
      '> 01010110 01000100 01010011',
      '> Decoding binary...',
      '> V.D.S = Value-Driven Solutions',
      '> Matrix mode activated...',
    ];
    matrixLines.forEach((line, i) => {
      setTimeout(() => addLine(line), i * 300);
    });
  };

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    
    addLine(`> ${cmd}`);

    switch(command) {
      case 'help':
        addLine('> Available commands:');
        addLine('  whoami     - Who we are');
        addLine('  about      - About VDS');
        addLine('  skills     - Our expertise');
        addLine('  stack      - Technology stack');
        addLine('  projects   - View projects');
        addLine('  matrix     - Enter the matrix');
        addLine('  hack       - Hacker mode');
        addLine('  fortune    - Get a fortune');
        addLine('  joke       - Developer joke');
        addLine('  clear      - Clear terminal');
        addLine('  status     - System status');
        addLine('> ');
        addLine('> Easter eggs hidden... try to find them! 🥚');
        break;

      case 'whoami':
        addLine('> VDS Tecnologia');
        addLine('> Value-Driven Solutions');
        addLine('> Your AI-powered development partner');
        break;

      case 'about':
        addLine('> VDS = Value-Driven Solutions');
        addLine('> We transform ideas into AI-powered solutions');
        addLine('> Reducing delivery time by up to 70%');
        addLine('> Framework: VDS AI Framework (proprietary)');
        break;

      case 'skills':
        addLine('> Core Competencies:');
        addLine('  ✓ AI-Accelerated Development');
        addLine('  ✓ Cloud Architecture (AWS, Azure, GCP)');
        addLine('  ✓ Snowflake & Cortex AI');
        addLine('  ✓ Full-Stack Development');
        addLine('  ✓ DevOps & CI/CD');
        break;

      case 'stack':
        addLine('> Primary Stack:');
        addLine('  - AI: GPT-4, Claude, Gemini, Cursor');
        addLine('  - Cloud: AWS, Azure, GCP, Snowflake');
        addLine('  - Frontend: React, Next.js, TypeScript');
        addLine('  - Backend: Node.js, Python, Go');
        addLine('  - Tools: Cursor IDE, GitHub Copilot');
        break;

      case 'projects':
        addLine('> Featured Projects:');
        addLine('  1. AI-powered CRM (70% faster development)');
        addLine('  2. Data Pipeline with Cortex AI');
        addLine('  3. Cloud Migration (AWS → Multi-cloud)');
        addLine('> Contact us to see more!');
        break;

      case 'matrix':
        setMatrixMode(true);
        addMatrix();
        setTimeout(() => setMatrixMode(false), 5000);
        break;

      case 'hack':
        setHackerMode(true);
        addLine('> Initializing hacker mode...');
        addLine('> Accessing mainframe...');
        addLine('> Bypassing firewall...');
        addLine('> ACCESS GRANTED');
        addLine('> Just kidding! 😄');
        addLine('> We only hack productivity, not systems!');
        setTimeout(() => setHackerMode(false), 5000);
        break;

      case 'fortune':
        const fortunes = [
          'Your next project will be a great success!',
          'AI will accelerate your development by 70% today.',
          'The cloud is calling... time to deploy!',
          'You will solve that bug in the next 10 minutes.',
          'A great partnership with VDS is in your future.',
        ];
        addLine(`> 🔮 ${fortunes[Math.floor(Math.random() * fortunes.length)]}`);
        break;

      case 'joke':
        const jokes = [
          'Why do programmers prefer dark mode? Because light attracts bugs!',
          'How many programmers does it take to change a light bulb? None, that\'s a hardware problem.',
          'A SQL query walks into a bar, walks up to two tables and asks... "Can I join you?"',
          'Why did the developer go broke? Because he used up all his cache!',
          'There are 10 types of people: those who understand binary and those who don\'t.',
        ];
        addLine(`> 😄 ${jokes[Math.floor(Math.random() * jokes.length)]}`);
        break;

      case 'clear':
        setTerminalLines(['> Terminal cleared.', '> Type "help" for commands']);
        break;

      case 'status':
        addLine('> System Status:');
        addLine('  - Encryption: ✓ ACTIVE');
        addLine('  - Connection: ✓ SECURE');
        addLine('  - Form: ✓ READY');
        addLine('  - AI Assistants: ✓ ONLINE');
        addLine('  - Uptime: 99.9%');
        break;

      case 'sudo':
        addLine('> Nice try! 😏');
        addLine('> But we\'re not that kind of terminal...');
        break;

      case 'rm -rf /':
      case 'rm -rf':
        addLine('> 🚨 CRITICAL ERROR DETECTED');
        addLine('> Just kidding! Your system is safe.');
        addLine('> Please don\'t try this at home! 😅');
        break;

      case 'ls':
        addLine('> about.md  services.json  stack.yml');
        addLine('> contact.txt  team.db  projects/');
        break;

      case 'cat about.md':
        addLine('> # VDS Tecnologia');
        addLine('> Value-Driven Solutions powered by AI');
        addLine('> Transforming ideas into reality since 2024');
        break;

      case '42':
        addLine('> The Answer to Life, the Universe, and Everything! 🌌');
        break;

      case 'ping vds':
        addLine('> PING vdstecnologia.com (192.168.1.1)');
        addLine('> 64 bytes from vds: icmp_seq=1 ttl=64 time=0.1 ms');
        addLine('> VDS is ONLINE and ready! ✓');
        break;

      case 'coffee':
      case 'make coffee':
        addLine('> ☕ Brewing coffee...');
        addLine('> Error 418: I\'m a teapot!');
        addLine('> (But we can still code together!)');
        break;

      case 'konami':
        addLine('> 🎮 Try the Konami Code: ↑↑↓↓←→←→BA');
        break;

      case 'robots':
        addLine('> 🤖 Ah, you read robots.txt!');
        addLine('> You\'re the curious type. We like that.');
        addLine('> Fun fact: This site was built WITH AI, not just about AI');
        break;

      case 'secrets':
      case 'easter eggs':
        addLine('> 🥚 Easter eggs found so far:');
        addLine('  - robots.txt message');
        addLine('  - Fibonacci spacing');
        addLine('  - Konami code (↑↑↓↓←→←→BA)');
        addLine('  - Ctrl+Shift+K shortcut');
        addLine('  - This command!');
        addLine('> Keep exploring... there\'s more! 👀');
        break;

      case 'hire me':
      case 'job':
      case 'career':
        addLine('> 💼 Interested in joining VDS?');
        addLine('> We\'re always looking for talented devs!');
        addLine('> Send us a message using the form →');
        break;

      case 'source':
      case 'github':
        addLine('> 📦 Interested in our code?');
        addLine('> This site is open-source in spirit');
        addLine('> (Check the comments - we left messages for you!)');
        addLine('> Try: /humans.txt or /.well-known/security.txt');
        break;

      case 'easteregg':
      case 'eastereggs':
        addLine('> 🥚 You found the easter egg command!');
        addLine('> But this is too easy... keep digging!');
        break;

      case 'konami':
        addLine('> 🎮 Try the Konami Code: ↑↑↓↓←→←→BA');
        break;

      default:
        if (command.includes('love') || command.includes('❤')) {
          addLine('> We ❤️ coding too!');
        } else if (command.includes('hello') || command.includes('hi') || command.includes('oi')) {
          addLine('> Hello! 👋 Type "help" to see what I can do!');
        } else {
          addLine(`> Command not found: ${cmd}`);
          addLine('> Type "help" for available commands');
        }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Konami code detection
    if (KONAMI_CODE[konamiIndex] === e.key) {
      const nextIndex = konamiIndex + 1;
      setKonamiIndex(nextIndex);
      
      if (nextIndex === KONAMI_CODE.length) {
        setKonamiIndex(0);
        addLine('> ');
        addLine('> 🎮 KONAMI CODE ACTIVATED!');
        addLine('> 🚀 ULTRA MODE ENABLED');
        addLine('> ✨ You found the secret!');
        addLine('> 🎁 Easter egg: VDS gives you +30 developer skill');
        addLine('> ');
        setHackerMode(true);
        setTimeout(() => setHackerMode(false), 5000);
      }
    } else {
      setKonamiIndex(0);
    }

    if (e.key === 'Enter' && currentInput.trim()) {
      handleCommand(currentInput);
      setCurrentInput('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      addLine('> ERROR: All fields are required.');
      return;
    }

    setIsSubmitting(true);
    addLine('> ');
    addLine('> 📡 Transmitting data...');
    addLine('> 🔐 Encrypting message...');
    
    setTimeout(() => {
      addLine('> ✓ Message sent successfully!');
      addLine('> 📬 Thank you for contacting VDS.');
      addLine('> 🚀 We will respond shortly.');
      addLine('> Session ID: ' + Math.random().toString(36).substr(2, 9).toUpperCase());
      addLine('> ');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <section id="contato" ref={sectionRef} className={`${styles.contact} ${matrixMode ? styles.matrixMode : ''} ${hackerMode ? styles.hackerMode : ''}`}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>{t('contact.title')}</span>
          </h2>
          <p className={styles.subtitle}>
            {t('contact.subtitle')}
          </p>
        </div>

        <div className={`${styles.terminalContainer} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.terminal}>
            <div className={styles.terminalHeader}>
              <span className={styles.systemPrompt}>root@vds-contact:~#</span>
              <div className={styles.statusIndicators}>
                <span className={styles.indicator}>ENCRYPTED</span>
                <span className={`${styles.indicator} ${styles.active}`}>SECURE</span>
              </div>
            </div>

            <div className={styles.terminalBody} ref={terminalBodyRef}>
              {terminalLines.map((line, i) => (
                <div key={i} className={styles.terminalLine}>
                  {line}
                </div>
              ))}

              <div className={styles.inputLine}>
                <span className={styles.prompt}>{'>'}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className={styles.terminalInput}
                  placeholder="Type 'help' for commands..."
                />
              </div>
            </div>
          </div>

          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <span className={styles.labelPrompt}>{'>'}</span>
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={styles.input}
                  placeholder={t('contact.namePlaceholder')}
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <span className={styles.labelPrompt}>{'>'}</span>
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={styles.input}
                  placeholder={t('contact.emailPlaceholder')}
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <span className={styles.labelPrompt}>{'>'}</span>
                  {t('contact.message')}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className={styles.textarea}
                  placeholder={t('contact.messagePlaceholder')}
                  rows={5}
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? '> Transmitting...' : '> Send Encrypted Message'}
              </button>
            </form>

            <div className={styles.contactInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email:</span>
                <span className={styles.infoValue}>contato@vdstecnologia.com.br</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Phone:</span>
                <span className={styles.infoValue}>+55 (11) 9999-9999</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
