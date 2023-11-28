import { ReactStory } from '.';
import './global.scss'

function Mobile() {

    return (
        <div className='mobile'>
            <ReactStory
                loop={true}
                height='100dvh'
                width='100dvw'
                stories={[
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
                    storyDuration: 30000,
                    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                },
                {
                    type: 'image',
                    seeMore: <p>Custom see more component →</p>,
                    src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F25%2Ff2%2F99%2F25f2995b7b58b3fff8a1288bd93b3f69.jpg&f=1&nofb=1&ipt=355ed0aa1d669d7317e2ddd8fc416366195c1ed20e43374fc3f9748e9a69ae4b&ipo=images"
                }
            ]}
          />
        </div>
    );
}

export default Mobile;