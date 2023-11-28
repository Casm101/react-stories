import { useEffect, useState } from 'react';
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
    
    const [hidden, setHidden] = useState(false);
    const [storyTimers, setStoryTimers] = useState<React.ReactNode[]>([]);
    const numStories = stories?.length;

    const [currentStory, setCurrrentStory] = useState<number>(0);
    useEffect(() => {
        setStoryTimers(
            Array.from({ length: numStories }).map((_, index) => (
                <ProgressBar
                    isCompleted={currentStory > index}
                    isActive={currentStory === index}
                    key={index}
                />
            ))
        );
    }, [currentStory, numStories, stories])

    // Function to fetch previous story
    const prevStory = () => {
        setCurrrentStory(
            currentStory - 1 > 0 ?
            currentStory - 1 :
            0    
        );
    };

    // Function to fetch next story
    const nextStory = () => {
        setCurrrentStory(
            currentStory + 1 < numStories ?
            currentStory + 1 :
            0 
        );
    };

    // Function to toggle overlay visibility
    // const toggleOverlayVisibility = () => {
    //     setTimeout(() => {
    //         setHidden(!hidden)
    //     }, 200);
    // };

    return (
        <div className="reactstory-styled">

            {/* Container that renders individual stories */}
            <div className="story-render">
                {stories[currentStory].story}
            </div>

            {/* Story header container */}
            <div className={["story-header", hidden ? 'hidden' : null].join(' ')}>
                
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
                    onClick={prevStory}
                    // onTouchStart={toggleOverlayVisibility}
                    // onMouseDown={toggleOverlayVisibility}
                    // onMouseUp={toggleOverlayVisibility}
                />
                <div className="next-story" onClick={nextStory} />
            </div>
        </div>
    );
}