type TStory = {
    seeMore?: React.ReactNode | Element | boolean,
    storyDuration?: number,
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