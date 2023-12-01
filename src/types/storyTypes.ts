type TStory = {
    seeMore?: TSeeMore,
    storyDuration?: number,
};

type TSeeMore = {
    type: 'standard',
    action: () => void
} | {
    type: 'custom',
    content: React.ReactNode | Element,
    action: () => void
};

export type TStoryContent = (
    isMuted?: boolean,
    isPaused?: boolean,
) =>
    React.ReactNode | Element;

export type TStoryMedia = TStory & {
    type: 'image' | 'video',
    src: string
};

export type TStoryCustom = TStory & {
    type: 'custom',
    story: TStoryContent
};