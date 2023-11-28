/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from 'react';
import { ProgressBar } from '../ProgressBar';
import './styles.scss';


interface TStories {
    story: React.ReactNode;
    seeMore?: React.ReactNode | boolean;
}

interface ReactStoryProps {
    stories: TStories[];
}


export const ReactStory = ({
    stories
}: ReactStoryProps) => {
    
    const [pause, setPause] = useState(false);
    const [storyTimers, setStoryTimers] = useState<React.ReactNode[]>([]);
    const [currentStory, setCurrrentStory] = useState<number>(0);
    const numStories = stories?.length;

    const mousedownId = useRef<any>();

    // Function to fetch previous story
    const prevStory = () => {
        setCurrrentStory(
            currentStory - 1 > 0 ?
            currentStory - 1 :
            0    
        );
    };

    // Function to fetch next story
    const nextStory = useCallback(() => {
        setCurrrentStory(
            currentStory + 1 < numStories ?
            currentStory + 1 :
            0 
        );
    }, [currentStory, numStories]);

    useEffect(() => {
        setStoryTimers(
            Array.from({ length: numStories }).map((_, index) => (
                <ProgressBar
                    isCompleted={currentStory > index}
                    isActive={currentStory === index}
                    isPaused={pause}
                    skipCallback={nextStory}
                    key={index}
                />
            ))
        );
    }, [currentStory, numStories, pause, stories, nextStory])

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

    return (
        <div className="reactstory-styled">

            {/* Container that renders individual stories */}
            <div className="story-render">
                {stories[currentStory].story}
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