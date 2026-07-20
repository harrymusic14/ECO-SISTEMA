import type { CSSProperties, ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

const Reveal = ({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) => {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Reveal;
