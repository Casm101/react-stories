# React Stories

`react-stories` is a lightweight, customizable storybook component for React applications. Inspired by popular social media features, it allows developers to integrate story functionality into their web apps seamlessly.

Check out the live demo here: [React Stories Component](https://casm101.github.io/react-stories/)

## Features

- **Easy Integration**: Effortlessly add stories to your React app with minimal setup.
- **Customizable**: Style and tailor the story viewer to match your app's theme and branding.
- **Responsive**: Optimized for a seamless user experience across all devices.
- **Interactive**: Engage users with clickable stories that support images, videos, and more.

## Getting Started

### Installation

To add `react-stories` to your project, run:

```bash
npm install @casm101/react-stories
``````

or if your using yarn:

```bash
yarn add @casm101/react-stories
```

## Usage

Here's how you can use the react-stories component in your React app:

```typescript
import React from 'react';
import { StoryViewer } from '@casm101/react-stories';

const stories = [
  {
    url: 'path/to/image.jpg',
    type: 'image',
    duration: 5000
  },
  {
    url: 'path/to/video.mp4',
    type: 'video'
  }
  // ...more stories
];

const MyComponent = () => (
  <ReactStories stories={stories} />
);

export default MyComponent;
```

## Development

To run this project locally for development:

1. Clone the repository:
    ```bash
    git clone https://github.com/Casm101/react-stories.git
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the example app which uses the story component:
    ```bash
    npm run dev
    ```

4. Open http://localhost:3000 to view it in your browser.

## Contributing

Contributions are always welcome! If you have any ideas or issues you've found, please feel free to fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

Thanks to all the contributors who have helped to shape react-stories.
Special thanks to everyone who has provided feedback and feature requests to make this project even better.