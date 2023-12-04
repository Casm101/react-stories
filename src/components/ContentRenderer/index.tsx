/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

// Type imports
import { TStoryCustom, TStoryMedia } from "../../types";

type ContentRendererProps = (TStoryMedia | TStoryCustom) & {
    isPaused: boolean,
    isMuted: boolean,
    videoRef: React.RefObject<HTMLVideoElement> | null
};


export const ContentRenderer: React.FC<ContentRendererProps> = ({
    type = 'image',
    isPaused,
    isMuted,
    videoRef,
    ...props
}) => {

    // Feature to pause video on story pause
    useEffect(() => {
        if (isPaused && videoRef && videoRef.current) videoRef.current.pause();
        if (!isPaused && videoRef && videoRef.current) videoRef.current.play();
    }, [isPaused]);

    // Render image type
    if (type === 'image') {
        const { src } = props as TStoryMedia;
        return (
            <img src={src} alt="" />
        );
    }

    // Render video type
    if (type === 'video') {
        const { src } = props as TStoryMedia;
        return (
            <video
                ref={videoRef}
                src={src}
                autoPlay
                playsInline
                muted={isMuted}
            />
        );
    }

    // Render custom story type
    if (type === 'custom') {
        const { story } = props as TStoryCustom;
        return <>{story(isMuted, isPaused)}</>;
    }

    // Return null if no criteria is met
    return null;
}