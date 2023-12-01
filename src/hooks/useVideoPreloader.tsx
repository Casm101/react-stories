import { useEffect, useRef } from 'react';

const useVideoPreloader = (videos: string[]) => {
    
    // Store previously preloaded videos
    const cachedVideos = useRef(new Set());
    
    // Preload videos each time dependency is updated
    useEffect(() => {
        videos.forEach((src) => {            
            if (!cachedVideos.current.has(src) && src !== '') {
                const video = document.createElement('video');
                video.src = src;
                cachedVideos.current.add(src);
            }
        });
    }, [videos]);
};

export default useVideoPreloader;