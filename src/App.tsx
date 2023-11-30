import { ReactStory } from '.';
import './global.scss';

function App() {
  
  return (
    <>
      <main>
        <section>
          <ReactStory
            loop={true}
            stories={[
            {
                type: 'custom',
                seeMore: <p>Custom see more component →</p>,
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
                seeMore: true,
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
                seeMore: <p>Custom see more component →</p>,
                src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F25%2Ff2%2F99%2F25f2995b7b58b3fff8a1288bd93b3f69.jpg&f=1&nofb=1&ipt=355ed0aa1d669d7317e2ddd8fc416366195c1ed20e43374fc3f9748e9a69ae4b&ipo=images"
              }
            ]}
          />
        </section>
        <section>
          <h1>React Stories</h1>
          <p>Simple and dynamic Meta (Instagram, Facebook, Whatsapp) inspired story component in React!</p>
          
          <div className="shield-container">
            <img className="shield" alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Casm101/react-stories" />
            <img className="shield" alt="npm" src="https://img.shields.io/npm/v/%40casm101%2Freact-stories" />
          </div>

          <p>Get started now!</p>
          <code>
            npm i --save react-stories
          </code>

          <p>Prepaired for both mobile and desktop</p>
          <div className='block'>
            <p>Click / Tap left for previous</p>
            <p>Click / Tap right for next</p>
            <p>Click / Tap and hold to pause</p>
            <br />
            <p>Arrows on keyboard also work</p>
          </div>
        </section>
      </main>
    </>
  )
}

export default App;
