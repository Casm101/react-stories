/* eslint-disable react-hooks/exhaustive-deps */

// Component imports
import { useCallback, useEffect, useRef, useState } from 'react';
import { ContentRenderer } from '../ContentRenderer';
import { ProgressBar } from '../ProgressBar';

// Style imports
import './styles.scss';

// Hook imports
import useImagePreloader from '../../hooks/useImagePreloader';

// Type imports
import { TStoryMedia, TStoryCustom, TSeeMoreCustom } from '../../types';


type ReactStoryProps = {
    stories: (TStoryMedia | TStoryCustom)[];
    height?: string;
    width?: string;
    loop?: boolean;
    defaultDuration?: number;
    preloadedAssets?: number;
};


export const ReactStory = ({
    stories,
    loop = false,
    defaultDuration = 5000,
    height,
    width,
    preloadedAssets = 2
}: ReactStoryProps) => {
    
    const [pause, setPause] = useState<boolean>(false);
    const [isMuted, setMuted] = useState<boolean>(false);
    const [storyTimers, setStoryTimers] = useState<React.ReactNode[]>([]);
    const [currentStory, setCurrrentStory] = useState<number>(0);
    const [nextToPreload, setNextToPreload] = useState<string[]>([]);
    const numStories = stories?.length;

    const mousedownId = useRef<number>();

    
    // Function to toggle muted state
    const toggleMuted = () => {
        setMuted(current => !current);
    };

    // Function to toggle paused state
    const togglePaused = () => {
        setPause(current => !current);
    }

    // Function to fetch previous story
    const prevStory = useCallback(() => {
        setCurrrentStory(currentStory - 1 > 0 ? currentStory - 1 : 0);
    }, [currentStory]);

    // Function to fetch next story
    const nextStory = useCallback(() => {
        const nextStoryIndex = currentStory + 1;
        if (nextStoryIndex < numStories) setCurrrentStory(nextStoryIndex);
        else if (loop) setCurrrentStory(0);
    }, [currentStory, numStories, loop]);

    useEffect(() => {
        setStoryTimers(
            Array.from({ length: numStories }).map((_, index) => (
                <ProgressBar
                    isCompleted={currentStory > index}
                    isActive={currentStory === index}
                    isPaused={pause}
                    skipCallback={nextStory}
                    duration={defaultDuration}
                    customDuration={stories[index].storyDuration}
                    key={index}
                />
            ))
        );
    }, [currentStory, numStories, pause, stories, nextStory, defaultDuration]);

    // Function to toggle overlay visibility (on mouse down event)
    const mouseDownAction = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        mousedownId.current = setTimeout(() => {
            setPause(true);
        }, 200);
    };

    // Function to toggle overlay visibility (on mouse up event)
    const mouseUpAction = (action: 'prev' | 'next') => (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      mousedownId.current && clearTimeout(mousedownId.current);
      if (pause) {
        setPause(false);
      } else {
        if (action == 'prev') prevStory();
        if (action == 'next') nextStory();
      }
    };

    // Function to handle keyboard events
    const handleKeyboardEvent = useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            prevStory();
            setPause(false);
        }
        if (e.key === 'ArrowRight') {
            nextStory();
            setPause(false);
        }
        if (e.key === 'ArrowUp') stories[currentStory]?.seeMore?.action()
        if (e.code === 'Space') togglePaused();
        if (e.key === 'm') toggleMuted();
    }, [prevStory, nextStory]);

    // Keyboard event listeners
    useEffect(() => {
        window.addEventListener('keydown', handleKeyboardEvent);

        return () => {
            window.removeEventListener('keydown', handleKeyboardEvent);
        }
    }, [handleKeyboardEvent]);

    // Manage asset preloading
    useImagePreloader(nextToPreload);
    useEffect(() => {
        if (preloadedAssets > 0) {
            setNextToPreload(stories.slice(currentStory, currentStory + preloadedAssets).map(story => {
                if (story.type === 'image' && story.src) return story.src;
                return '';
            }))
        }
    }, [currentStory]);

    return (
        <div
            className={["reactstory-styled"].join(' ')}
            style={{
                height: height ? height : '640px',
                width: width ? width : '360px'
            }}
        >

            {/* Container that renders individual stories */}
            <div className="story-render">
                <ContentRenderer
                    isPaused={pause}
                    isMuted={isMuted}
                    {...stories[currentStory]}
                />
            </div>

            {/* Story header container */}
            <div className={["story-header", pause ? 'hidden' : null].join(' ')}>
                
                {/* Story timer container */}
                <div className="story-timer-container">
                    {storyTimers}
                </div>

                {/* Story enhanced controls */}
                <div className="story-user-controls">
                    <span className='sound' onClick={toggleMuted}>
                        { isMuted ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" /></svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>
                        }
                    </span>
                    <span className='sound' onClick={togglePaused}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" /></svg>
                    </span>
                </div>
            </div>

            {/* Story see more container */}
            <div className="story-seemore">
                <div className='seemore-wrapper' onClick={stories[currentStory]?.seeMore?.action}>
                    {stories[currentStory]?.seeMore?.type === 'standard' &&
                        <>
                            <span>⌃</span>
                            <span>See More</span>    
                        </>
                    }

                    {stories[currentStory]?.seeMore?.type === 'custom' &&
                        <>
                            {(stories[currentStory]?.seeMore as TSeeMoreCustom)?.content}
                        </>
                    }
                </div>
            </div>

            {/* Tap and click controls for stories */}
            <div className="story-controls">
                <div
                    className="previous-story"
                    onTouchStart={mouseDownAction}
                    onTouchEnd={mouseUpAction('prev')}
                    onMouseDown={mouseDownAction}
                    onMouseUp={mouseUpAction('prev')}
                />
                <div
                    className="next-story"
                    onTouchStart={mouseDownAction}
                    onTouchEnd={mouseUpAction('next')}
                    onMouseDown={mouseDownAction}
                    onMouseUp={mouseUpAction('next')}
                />
            </div>
        </div>
    );
}