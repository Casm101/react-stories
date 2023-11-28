import { useEffect, useState } from 'react';
import './styles.scss';

interface ProgressBarProps {
    isCompleted?: boolean;
    isActive?: boolean;
    isPaused?: boolean;
    duration?: number;
}

export const ProgressBar = ({
    isCompleted,
    isActive,
    isPaused,
    duration = 5000
}: ProgressBarProps) => {

    const [progress, setProgress] = useState(0);

    // Variable style classes
    const completedClass = isCompleted ? 'completed' : null;
    let activeClass: string | null = null;
    if (isActive) setTimeout(() => {
        activeClass = isActive ? 'active' : null;
    }, 50);

    useEffect(() => {

        let interval: number;
        if (isActive && !isPaused) {
            interval = setInterval(() => {
                setProgress(oldProgress => {
                    const newProgress = oldProgress + (50 / duration) * 100;
                    if (newProgress >= 100) {
                        return 100;
                    }
                    return newProgress;
                });
            }, 50);
        }

        if (!isActive) setProgress(0);

        return () => clearInterval(interval);
    }, [isActive, duration, isPaused])

    return (
        <div className="progressbar-styled">
            <div
                style={{ width: `${progress}%` }}
                className={["progressbar-current", completedClass, activeClass].join(' ')}
            />
        </div>
    );
};