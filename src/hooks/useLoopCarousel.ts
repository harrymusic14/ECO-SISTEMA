import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';

export const buildExtended = <T,>(items: T[], buffer: number): T[] => [
  ...items.slice(-buffer),
  ...items,
  ...items.slice(0, buffer),
];

type Options = {
  itemCount: number;
  autoAdvanceMs?: number;
  transitionMs?: number;
  buffer?: number;
  storageKey?: string;
};

export function useLoopCarousel({
  itemCount,
  autoAdvanceMs = 4000,
  transitionMs = 220,
  buffer = 6,
  storageKey,
}: Options) {
  const realStart = buffer;
  const realEnd = buffer + itemCount - 1;

  const getStoredRealId = () => {
    if (!storageKey || typeof window === 'undefined') return 0;
    const stored = Number(window.sessionStorage.getItem(storageKey));
    if (Number.isInteger(stored) && stored >= 0 && stored < itemCount) return stored;
    return 0;
  };

  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(() => realStart + getStoredRealId());
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const movedRef = useRef(false);

  useEffect(() => {
    if (!storageKey) return;
    if (index >= realStart && index <= realEnd) {
      window.sessionStorage.setItem(storageKey, String(index - realStart));
    }
  }, [index, storageKey, realStart, realEnd]);

  useEffect(() => {
    if (isHovering || isDragging) return;
    const id = setInterval(() => {
      setTransitionEnabled(true);
      setIndex((i) => i + 1);
    }, autoAdvanceMs);
    return () => clearInterval(id);
  }, [isHovering, isDragging, index, autoAdvanceMs]);

  useEffect(() => {
    if (!transitionEnabled) {
      const raf1 = requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionEnabled(true));
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [transitionEnabled]);

  // Reubica el índice dentro del rango "real" sin animación una vez que las
  // cosas se calman. No depende de que una transición CSS termine (si se
  // interrumpe por un nuevo arrastre, el navegador nunca dispara
  // transitionend), así que es inmune a movimientos rápidos y seguidos.
  useEffect(() => {
    if (index < realStart || index > realEnd) {
      const timer = setTimeout(() => {
        const realId = (((index - realStart) % itemCount) + itemCount) % itemCount;
        setTransitionEnabled(false);
        setIndex(realStart + realId);
      }, transitionMs + 60);
      return () => clearTimeout(timer);
    }
  }, [index, realStart, realEnd, itemCount, transitionMs]);

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    movedRef.current = false;
    startXRef.current = e.clientX;
    setIsDragging(true);
    setTransitionEnabled(false);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const delta = e.clientX - startXRef.current;
    if (Math.abs(delta) > 5) movedRef.current = true;
    setDragOffset(delta);
  };

  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    setTransitionEnabled(true);

    const viewportPx = viewportRef.current?.offsetWidth ?? window.innerWidth;
    const slideWidthPx = Math.min(760, viewportPx * 0.72);
    const threshold = slideWidthPx * 0.2;

    if (dragOffset < -threshold) {
      setIndex((i) => i + 1);
    } else if (dragOffset > threshold) {
      setIndex((i) => i - 1);
    }
    setDragOffset(0);
  };

  const goToSlide = (extendedIndex: number) => {
    if (movedRef.current) return;
    if (extendedIndex === index) return;
    setTransitionEnabled(true);
    setIndex(extendedIndex);
  };

  const trackStyle: CSSProperties = {
    transition: transitionEnabled ? `transform ${transitionMs}ms ease` : 'none',
    ['--index' as string]: index,
    ['--drag-offset' as string]: `${dragOffset}px`,
  };

  return {
    viewportRef,
    index,
    trackStyle,
    movedRef,
    goToSlide,
    viewportHandlers: {
      onMouseEnter: () => setIsHovering(true),
      onMouseLeave: () => { setIsHovering(false); endDrag(); },
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: endDrag,
    },
  };
}
