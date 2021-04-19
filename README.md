# responsive-carousel

Carousel component consists of 'Carousel.js' and 'Carousel.css' files that are in 'src/carousel' folder. 
To use the carousel in your application you need to download 'Carousel.jsx', 'Carousel.css' files and put them into silngle separate folder. After that you 
can import the component and use it wherever you want. 

For example: 
```html
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
```
Slides must be put in the component as props.children

Carousel component has several options:
---
**speed**(number): speed of moving slides (ms)
***
**visibleElems**(number): the amount of images that will be visible on the screen at a time (not less than 1)
***
**slideSteps**(number): the amount of images that will be swiped at a time (not less than 1 and not more than '**visibleElems**')
***
**autoplay**(boolean): turns on/off the carousel self-moving
***
**autoplayFrequensy**(number): if autoplay is 'true', how often to move carousel (ms)
***
**loop**(boolean): if 'true', the carousel is looped
***
**mouseEvents**(boolean): enabels/disables the mouse events on the carousel
***
**slideOffset**(number): sets the left and right margin to the slide content(px)
***
**desktopHeight**(number): sets the height of the whole carousel for screens bigger than 992 px (vh)
***
**desktopWidth**(number) : sets the width of the whole carousel for screens bigger than 992 px (vw)
***
**mobileHeight**(number): sets the height of the whole carousel for screens less than 992 px (vh)
***
**mobileWidth**(number): sets the width of the whole carousel for screens less than 992 px (vw)

working example: https://artlysenka.github.io/carousel/

