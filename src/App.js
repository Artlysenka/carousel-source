import React from "react";
import Carousel from "./carousel/Carousel";
import './App.css'

const SlideContent = (props) => (
    <img src={props.src} alt="" style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: '0'
    }}/>
)

const App = () => {
  const src = [
    'https://i.ibb.co/c6sMq8q/www-nevseoboi-com-ua.jpg', 
    'https://i.ibb.co/KVVNJhG/8.jpg',
    'https://i.ibb.co/QkJ58zq/6.jpg',
    'https://i.ibb.co/dkwxc9c/7.jpg',
    'https://i.ibb.co/vVZBccY/4.jpg',
    'https://i.ibb.co/hZN9Q7x/5.jpg',
    'https://i.ibb.co/ccbs2Xv/3.jpg',
    'https://i.ibb.co/RCggKx2/1.jpg',
  ]

  let slides = src.map(src => <SlideContent src={src}/>)
  return (
    <div className='container'>
      <Carousel
        speed={400}
        visibleElems={1}
        slideSteps={1}
        autoplay={false}
        autoplayFrequensy={5000}
        loop={true}
        mouseEvents={true}
        slideOffset={0}
        desktopHeight={80}
        desktopWidth={60}
        mobileHeight={60}
        mobileWidth={100}
      >
        {
         slides 
        }
      </Carousel>
    </div>
  )
}

export default App;