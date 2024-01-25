/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactStory } from '.';
import './global.scss';

function App() {

  if (window.screen.width < 456) return (
    <main>
      <ReactStory
        loop={true}
        height='100dvh'
        width='100dvw'
        watermark={{
          image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fgithub%2Fgithub_PNG80.png&f=1&nofb=1&ipt=7b2e28bc05267cd350f52030c5acc05e0892fd3899074eb70b9f4fe0f1c29b2e&ipo=images',
          position: 'bottom-right'
        }}
        stories={[
          {
            type: 'custom',
            seeMore: {
              type: 'custom',
              content: <p>Custom see more component →</p>,
              action: () => alert('This is a custom see more action')
            },
            story: () => (
              <div className='custom-story'>
                <p className="emoji">🔥</p>
                <p className='subtitle'>We support it all!</p>
                <p className='title'>Stories to your heart's desire, from images and videos, to fully blown React components.</p>
              </div>
            )
          },
          {
            type: 'image',
            seeMore: {
              type: 'standard',
              action: () => console.log('This is a standard see more action')
            },
            src: 'https://i.pinimg.com/originals/70/c6/24/70c624afe5720a3a4a14b3e143cca4ba.jpg'
          },
          {
            type: 'image',
            src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic-cse.canva.com%2Fimage%2F129252%2FSelfPortraitsTechniques2.jpg&f=1&nofb=1&ipt=2b179d39ef2022ef0a8c39d948296aa08e159804dfaabca6cd07bc751d2dc979&ipo=images"
          },
          {
            type: 'video',
            storyDuration: 15000,
            src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          },
          {
            type: 'image',
            seeMore: {
              type: 'custom',
              content: <p>Custom see more component →</p>,
              action: () => console.log('This is a custom see more action')
            },
            src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F25%2Ff2%2F99%2F25f2995b7b58b3fff8a1288bd93b3f69.jpg&f=1&nofb=1&ipt=355ed0aa1d669d7317e2ddd8fc416366195c1ed20e43374fc3f9748e9a69ae4b&ipo=images"
          },
          {
            type: 'custom',
            seeMore: {
              type: 'standard',
              action: () => console.log('This is a standard see more action')
            },
            story: (isMuted?: boolean, isPaused?: boolean) => (
              <div className='custom-story interactive'>
                <p className='states'>{isPaused ? '> Paused' : '> Playing'}</p>
                <p className='states'>{isMuted ? '> Muted' : '> Playing Sound'}</p>
                <p className='title'>Full access to paused and muted states for your custom components.</p>
              </div>
            )
          },
        ]}
      />
    </main>
  );


  return (
    <>
      <main>
        <section>
          <ReactStory
            loop={true}
            watermark={{
              image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fgithub%2Fgithub_PNG80.png&f=1&nofb=1&ipt=7b2e28bc05267cd350f52030c5acc05e0892fd3899074eb70b9f4fe0f1c29b2e&ipo=images',
              position: 'bottom-right'
            }}
            stories={[
              {
                type: 'custom',
                seeMore: {
                  type: 'custom',
                  content: <p>Custom see more component →</p>,
                  action: () => console.log('This is a custom see more action')
                },
                story: () => (
                  <div className='custom-story'>
                    <p className="emoji">🔥</p>
                    <p className='subtitle'>We support it all!</p>
                    <p className='title'>Stories to your heart's desire, from images and videos, to fully blown React components.</p>
                  </div>
                )
              },
              {
                type: 'image',
                seeMore: {
                  type: 'standard',
                  action: () => console.log('This is a standard see more action')
                },
                src: 'https://i.pinimg.com/originals/70/c6/24/70c624afe5720a3a4a14b3e143cca4ba.jpg'
              },
              {
                type: 'image',
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic-cse.canva.com%2Fimage%2F129252%2FSelfPortraitsTechniques2.jpg&f=1&nofb=1&ipt=2b179d39ef2022ef0a8c39d948296aa08e159804dfaabca6cd07bc751d2dc979&ipo=images"
              },
              {
                type: 'video',
                storyDuration: 15000,
                src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              },
              {
                type: 'image',
                seeMore: {
                  type: 'custom',
                  content: <p>Custom see more component →</p>,
                  action: () => console.log('This is a custom see more action')
                },
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F25%2Ff2%2F99%2F25f2995b7b58b3fff8a1288bd93b3f69.jpg&f=1&nofb=1&ipt=355ed0aa1d669d7317e2ddd8fc416366195c1ed20e43374fc3f9748e9a69ae4b&ipo=images"
              },
              {
                type: 'custom',
                seeMore: {
                  type: 'standard',
                  action: () => console.log('This is a standard see more action')
                },
                story: (isMuted?: boolean, isPaused?: boolean) => (
                  <div className='custom-story interactive'>
                    <p className='states'>{isPaused ? '> Paused' : '> Playing'}</p>
                    <p className='states'>{isMuted ? '> Muted' : '> Playing Sound'}</p>
                    <p className='title'>Full access to paused and muted states for your custom components.</p>
                  </div>
                )
              },
            ]}
          />
        </section>
        <section>
          <h1>React Stories</h1>
          <p>Simple and dynamic Meta (Instagram, Facebook, Whatsapp) inspired story component in React!</p>

          <div className="shield-container">
            <a href="https://github.com/Casm101/react-stories" target='_blank'>
              <img className="shield" alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Casm101/react-stories" />
            </a>
            <a href="https://www.npmjs.com/package/@casm101/react-stories" target='_blank'>
              <img className="shield" alt="npm" src="https://img.shields.io/npm/v/%40casm101%2Freact-stories" />
            </a>
          </div>

          <p>Get started now!</p>
          <code>
            npm i --save @casm101/react-stories
          </code>

          <div style={{ display: 'flex', gap: '4rem' }}>
            <div>
              <p style={{ marginBottom: '1rem' }}>Prepaired for both mobile and desktop</p>
              <div className='block'>
                <p>Click / Tap left for previous</p>
                <p>Click / Tap right for next</p>
                <p>Click / Tap and hold to pause</p>
                <br />
                <p>Arrows on keyboard also work</p>
                <p>Space to toggle pause</p>
                <p>M to toggle mute</p>
              </div>
            </div>

            <div>
              <p style={{ marginBottom: '1rem' }}>Scan to test on mobile</p>
              <div>
                <img src="./qr-code.svg" alt="QRCode linking to github pages" style={{ width: '200px', borderRadius: '.5rem' }} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App;
