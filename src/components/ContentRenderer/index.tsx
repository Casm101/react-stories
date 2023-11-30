import { useEffect, useRef } from "react";

interface ContentRendererProps {
    type: 'image' | 'video' | 'custom';
    story?: () => React.ReactNode;
    src?: string;
    isPaused: boolean;
    isMuted: boolean;
}


export const ContentRenderer = ({
    type = 'image',
    story,
    src,
    isPaused,
    isMuted
}: ContentRendererProps) => {    

    // Feature to pause video on story pause
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (isPaused && videoRef.current) videoRef.current.pause();
        if (!isPaused && videoRef.current) videoRef.current.play();
    }, [isPaused]);

    // Render image type
    if (type === 'image') return (
        <img src={src} alt="" />
    );

    // Render video type
    if (type === 'video') return (
        <video
            ref={videoRef}
            src={src}
            autoPlay
            playsInline
            muted={isMuted}
        />
    );

    // Render custom story type
    if (type === 'custom' && story) return story();
}