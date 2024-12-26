type TStory = {
  seeMore?: TSeeMoreStandard | TSeeMoreCustom;
  storyDuration?: number;
};

export type TSeeMoreStandard = {
  type: 'standard';
  action: () => void;
};

export type TSeeMoreCustom = {
  type: 'custom';
  content: React.ReactNode;
  action: () => void;
};

export type TStoryContent = (isMuted?: boolean, isPaused?: boolean) => React.ReactNode;

export type TStoryMedia = TStory & {
  type: 'image' | 'video';
  src: string;
};

export type TStoryCustom = TStory & {
  type: 'custom';
  story: TStoryContent;
};
