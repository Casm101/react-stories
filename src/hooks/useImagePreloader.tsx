import { useEffect, useRef } from 'react';

const useImagePreloader = (images: string[]) => {
  // Store previously preloaded images
  const cachedImages = useRef(new Set());

  // Preload images each time dependency is updated
  useEffect(() => {
    images.forEach(src => {
      if (!cachedImages.current.has(src) && src !== '') {
        const img = new Image();
        img.src = src;
        cachedImages.current.add(src);
      }
    });
  }, [images]);
};

export default useImagePreloader;
