import { useEffect, useState } from 'react';

// Style imports
import './styles.scss';

// Progress bar props interface declaration
interface ProgressBarProps {
    isCompleted?: boolean;
    isActive?: boolean;
    isPaused?: boolean;
    skipCallback: () => void;
    duration: number;
    customDuration?: number;
}


// Progress bar component declaration
export const ProgressBar = ({
    isCompleted,
    isActive,
    isPaused,
    skipCallback,
    duration,
    customDuration
}: ProgressBarProps) => {

    // Declaration of local states
    const [progress, setProgress] = useState(0);
    const finalDuration = customDuration || duration;

    // Variable style classes
    const completedClass = isCompleted ? 'completed' : null;
    let activeClass: string | null = null;
    if (isActive) setTimeout(() => {
        activeClass = isActive ? 'active' : null;
    }, 50);


    // Manage timer functionality
    useEffect(() => {

        let interval: number;

        // Run if active and not paused
        if (isActive && !isPaused) {
            interval = setInterval(() => {
                setProgress(oldProgress => {
                    const newProgress = oldProgress + (50 / finalDuration) * 100;
                    if (newProgress >= 100) {
                        skipCallback();
                    }
                    return newProgress;
                });
            }, 50);
        }

        // Dissable if not active
        if (!isActive) setProgress(0);

        return () => clearInterval(interval);
    }, [isActive, duration, isPaused, progress, skipCallback, finalDuration]);

    return (
        <div className="progressbar-styled">
            <div
                style={{ width: `${progress}%` }}
                className={["progressbar-current", completedClass, activeClass].join(' ')}
            />
        </div>
    );
};