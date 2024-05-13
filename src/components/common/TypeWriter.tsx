'use client';
import { HTMLAttributes, useEffect, useState } from 'react';

type TypeWriterProps = HTMLAttributes<HTMLDivElement> & {
  children: string;
  delay?: number;
  infinite?: boolean;
};

export default function TypeWriter({ children, delay = 100, infinite = false, ...passProps }: TypeWriterProps) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  function reset() {
    setCurrentText('');
    setCurrentIndex(0);
  }

  useEffect(() => {
    reset();
  }, [children]);

  useEffect(() => {
    if (!children) return;
    const timeout = setTimeout(() => {
      setCurrentText((prev) => prev + children[currentIndex]);
      if (currentIndex === children.length - 1) {
        if (infinite) {
          setCurrentIndex(0);
          setCurrentText('');
        }
        return;
      }
      
      setCurrentIndex((prev) => prev + 1);
    }, delay);
    return () => clearTimeout(timeout);
  }, [children, currentIndex, delay]);

  return <>
    <span {...passProps}>{currentText}</span>
  </>;
}