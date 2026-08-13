import type { CSSProperties, ReactNode } from 'react';

const Reveal = ({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default Reveal;
