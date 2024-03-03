'use client';

import { MutableRefObject, useEffect, useRef, useState } from 'react';

type Options = {
  root: HTMLElement | null;
  rootMargin: string;
  threshold: number;
};
// custom hook returning ref and state of connected IntersectionObserver
export function useIsVisible(
  options: Options
): [MutableRefObject<HTMLCanvasElement>, boolean] {
  const containerRef = useRef<HTMLCanvasElement>(null!);
  const [isIntersecting, setIntersecting] = useState(false);

  const intersectionCallback = (entries: IntersectionObserverEntry[]): void => {
    const [entry] = entries;
    setIntersecting(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(intersectionCallback, options);
    if (containerRef.current) observer.observe(containerRef.current);
    // cleanup
    return () => {
      if (containerRef.current) observer.disconnect();
    };
  }, [containerRef, options]);

  return [containerRef, isIntersecting];
}
