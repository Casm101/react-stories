/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from 'react';
import { ContentRenderer } from '../ContentRenderer';
import { ProgressBar } from '../ProgressBar';
import './styles.scss';
import useImagePreloader from '../../hooks/useImagePreloader';


interface TStory {
    type: 'image' | 'video' | 'custom';
    story?: React.ReactNode;
    src?: string;
    seeMore?: React.ReactNode | boolean;
    storyDuration?: number;
}

interface ReactStoryProps {
    stories: TStory[];
    height?: string;
    width?: string;
    loop?: boolean;
    orientation?: 'portrait' | 'landscape';
    defaultDuration?: number;
    preloadedAssets?: number;
}


export const ReactStory = ({
    stories,
    loop = false,
    orientation = 'portrait',
    defaultDuration = 5000,
    height,
    width,
    preloadedAssets = 2
}: ReactStoryProps) => {
    
    const [pause, setPause] = useState(false);
    const [storyTimers, setStoryTimers] = useState<React.ReactNode[]>([]);
    const [currentStory, setCurrrentStory] = useState<number>(0);
    const [nextToPreload, setNextToPreload] = useState<string[]>([]);
    const numStories = stories?.length;

    const mousedownId = useRef<any>();

    useImagePreloader(nextToPreload);

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
        if (e.key === 'ArrowLeft') prevStory();
        if (e.key === 'ArrowRight') nextStory();
    }, [prevStory, nextStory]);

    // Keyboard event listeners
    useEffect(() => {
        window.addEventListener('keydown', handleKeyboardEvent);

        return () => {
            window.removeEventListener('keydown', handleKeyboardEvent);
        }
    }, [handleKeyboardEvent]);

    // Manage asset preloading
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
            className={["reactstory-styled", orientation].join(' ')}
            style={{
                height: height ? height : '640px',
                width: width ? width : '360px'
            }}
        >

            {/* Container that renders individual stories */}
            <div className="story-render">
                <ContentRenderer
                    isPaused={pause}
                    {...stories[currentStory]}
                />
            </div>

            {/* Story header container */}
            <div className={["story-header", pause ? 'hidden' : null].join(' ')}>
                
                {/* Story timer container */}
                <div className="story-timer-container">
                    {storyTimers}
                </div>
            </div>

            {/* Story see more container */}
            <div className="story-seemore">
                {typeof (stories[currentStory]?.seeMore) == 'boolean' ?
                    <>
                        <span>⌃</span>
                        <span>See More</span>
                    </>
                    :
                    <></>
                }

                {typeof (stories[currentStory]?.seeMore) == 'object' ?
                    <>
                        {stories[currentStory].seeMore}
                    </>
                    :
                    <></>
                }
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