import React, { useState, useEffect, useRef } from 'react';

export default function TextType({
  text,
  typingSpeed = 55,
  deletingSpeed = 35,
  pauseTime = 2200,
  loop = true,
  showCursor = true,
  className = '',
}) {
  const texts = Array.isArray(text) ? text : [text];
  const [displayed, setDisplayed] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState('idle'); // idle | typing | pausing | deleting | done
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  // Start typing only when scrolled into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    if (phase === 'idle') { setPhase('typing'); return; }
    if (phase === 'done') return;

    const current = texts[textIndex];

    if (phase === 'typing') {
      if (charIndex < current.length) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex(c => c + 1);
        }, typingSpeed);
        return () => clearTimeout(t);
      }
      // Finished typing
      if (!loop && textIndex === texts.length - 1) {
        setPhase('done');
        return;
      }
      setPhase('pausing');
    }

    if (phase === 'pausing') {
      const t = setTimeout(() => {
        if (texts.length === 1 && loop) {
          setCharIndex(0);
          setDisplayed('');
          setPhase('typing');
        } else {
          setPhase('deleting');
        }
      }, pauseTime);
      return () => clearTimeout(t);
    }

    if (phase === 'deleting') {
      const current2 = texts[textIndex];
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayed(current2.slice(0, charIndex - 1));
          setCharIndex(c => c - 1);
        }, deletingSpeed);
        return () => clearTimeout(t);
      }
      const next = (textIndex + 1) % texts.length;
      setTextIndex(next);
      setPhase('typing');
    }
  }, [isVisible, phase, charIndex, textIndex, texts, typingSpeed, deletingSpeed, pauseTime, loop]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {showCursor && (
        <span className={`ttype-cursor${phase === 'done' ? ' ttype-cursor--done' : ''}`}>|</span>
      )}
    </span>
  );
}
