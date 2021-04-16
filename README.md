# carousel-source

Carousel component consists of 'Carousel.jsx' and 'Carousel.css' files that are in 'carousel' folder. 
To use the carousel in your application you need to download 'Carousel.jsx', 'Carousel.css' files and put them in a separate folder. After that you 
can import the component and use it wherever you want. 

For example: 
import Carousel from "./carousel/Carousel";

const App = () => (
    <Carousel 
    speed={400} 
    visibleElems={1} 
    slideSteps={1}
    autoplay={false}
    autoplayFrequensy={5000}
    >
      <img src='https://i.ibb.co/c6sMq8q/www-nevseoboi-com-ua.jpg' alt="" />
      <img src='https://i.ibb.co/KVVNJhG/8.jpg' alt="" />
      <img src='https://i.ibb.co/QkJ58zq/6.jpg' alt="" />
      <img src='https://i.ibb.co/dkwxc9c/7.jpg' alt="" />
      <img src='https://i.ibb.co/vVZBccY/4.jpg' alt="" />
      <img src='https://i.ibb.co/hZN9Q7x/5.jpg' alt="" />
      <img src='https://i.ibb.co/ccbs2Xv/3.jpg' alt="" />
      <img src='https://i.ibb.co/RCggKx2/1.jpg' alt="" />
    </Carousel>
 
);

Images must be put in the component as props.children

Carousel component has several options:
speed(number): speed of moving slides (ms)
visibleElems(number): the amount of images that will be visible on the screen at a time (not less than 1)
slideSteps(number): the amount of images that will be swiped at a time (not less than 1 and not more than 'visibleElems')
autoplay(boolean): turns on/off the carousel self-moving
autoplayFrequensy(number): if autoplay is 'true', how often to move carousel (ms)

