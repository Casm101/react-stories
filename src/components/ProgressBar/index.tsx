import { useEffect, useState } from 'react';
import './styles.scss';

interface ProgressBarProps {
    isCompleted?: boolean;
    isActive?: boolean;
    duration?: number;
}

export const ProgressBar = ({
    isCompleted,
    isActive,
    duration = 5000
}: ProgressBarProps) => {

    const [progress, setProgress] = useState(0);

    // Variable style classes
    const completedClass = isCompleted ? 'completed' : null;

    useEffect(() => {

        let interval: number;
        if (isActive) {
            interval = setInterval(() => {
                setProgress(oldProgress => {
                    const newProgress = oldProgress + (100 / duration) * 100;
                    if (newProgress >= 100) {
                        return 100;
                    }
                    return newProgress;
                });
            }, 100);
        }

        return () => clearInterval(interval);
    }, [isActive, duration])

    return (
        <div className="progressbar-styled">
            <div
                style={{ width: `${progress}%` }}
                className={["progressbar-current", completedClass].join(' ')}
            />
        </div>
    );
};