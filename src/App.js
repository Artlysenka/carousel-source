import React from "react";
import Carousel from "./carousel/Carousel";
import './App.css'
//Import Components

const App = () => (
  <div className='container'>
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
  </div>
);

export default App;