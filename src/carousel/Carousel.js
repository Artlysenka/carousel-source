import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './Carousel.css'
import arrowRight from '../../assets/arrow-right.png'
import arrowLeft from '../../assets/arrow-left.png'

const Carousel = (props) => {

  const {
    visibleElems,
    slideSteps,
    children,
    autoplay,
    autoplayFrequensy,
    speed,
    loop,
    desktopHeight,
    desktopWidth,
    mobileHeight,
    mobileWidth,
    slideOffset
  } = props
  let position = 0 // initial margin
  let slideContent = [] // Array of elements that are in 'props.children'
  let stepLeft // the index of slide/slides that will appear on the left after we swipe to the right
  let stepRight // the index of slide/slides that will appear on the right after we swipe to the left
  let autoplaySlider
  let windowWidth = window.innerWidth
  children.length - visibleElems === 1
    ? stepRight = 0
    : stepRight = visibleElems + slideSteps + (slideSteps - 1)

  let viewport = 0 //initial width of the each slide
  let initialCoords = {
    x: 0
  } 
  let currentCoords = {
    x: 0
  } 
  let fingerInitialCoords = {
    x: 0
  } 
  let currentFingerCoords = {
    x: 0
  } 

  let initialTime // time when we touch/click on the slide
  let finaleTime // time when we move out the finger/coursor off the element

  let mouseClickedOnTheElenent = false
  let slideLeftPermission = true
  let slideRightPermission = true

  useEffect(() => {
    let container = document.getElementById("viewport")
    if (windowWidth > 1100) {
      container.style.height = desktopHeight + 'vh'
      container.style.width = desktopWidth + 'vw'
    }
    else {
      container.style.height = mobileHeight + 'vh'
      container.style.width = mobileWidth + 'vw'
    }
    viewport = container.offsetWidth / visibleElems
    stepLeft = slideContent.length
    for (let i = 0; i < children.length; i++) {
      let newElement = React.createElement('div', null, children[i])
      slideContent[i] = newElement
    }

    if (autoplay) {
      autoplaySlider = setInterval(slideLeft, autoplayFrequensy)
    }
    if (loop) {
      if (visibleElems + slideSteps >= children.length) {
        for (let i = 0; i < children.length; i++) {
          draw(i, i - 1, viewport, true)
        }
        draw(0, children.length - 1, viewport, true)
      }
      else if (slideSteps === 1) {
        for (let i = 0; i < (2 + visibleElems); i++) {
          draw(i, i - 1, viewport, true)
        }
      }
      else {
        for (let i = 0; i < (2 + visibleElems) + (2 * (slideSteps - 1)); i++) {
          draw(i, i - slideSteps, viewport, true)
        }
      }
    }
    else {
      for (let i = 0; i < children.length; i++) {
        draw(i, i, viewport, true)
      }
    }
  })

  const draw = (position, offset, viewport, place) => { // draws new slide 
    let slideContainer = document.createElement("div");
    slideContainer.style.marginRight = slideOffset + 'px'
    ReactDOM.render(slideContent[position], slideContainer)
    let slide = document.createElement("div")
    slide.classList.add("slide")
    slide.style.transition = speed + 'ms'
    slide.style.width = (100 / visibleElems) + '%' 
    slide.style.left = offset * viewport + "px"
    slide.append(slideContainer)
    if (place) {
      document.querySelector(".slider").append(slide)
    }
    else {
      document.querySelector(".slider").prepend(slide)
    }
  }

  const onMouseDown = (event) => { // handles the mouseUp/touchEnd events
    event.preventDefault()
    event.stopPropagation()
    let clickTime = new Date
    initialTime = clickTime.getTime()
    mouseClickedOnTheElenent = true
    if (loop) {
      let currentSlides = document.querySelectorAll(".slide")
      for (let i = 0; i < currentSlides.length; i++) {
        currentSlides[i].style.transition = 0 + 'ms'
      }
    }
    else {
      let slider = document.getElementById('slider')
      slider.style.transition = 0 + 'ms'
    }
    initialCoords.x = event.pageX
    fingerInitialCoords.x = event.changedTouches[0].pageX
  }

  const moveFingerElem = (event) => { // handles the touchMove event
    event.preventDefault()
    event.stopPropagation()
    currentFingerCoords.x = event.changedTouches[0].clientX - fingerInitialCoords.x
    if (loop) {
      let currentSlides = document.querySelectorAll(".slide")
      let offset = -1 * slideSteps

      for (let i = 0; i < currentSlides.length; i++) {
        currentSlides[i].style.left = (offset * viewport) + currentFingerCoords.x
        offset++
      }
    }
    else {
      let slider = document.getElementById('slider')
      slider.style.marginLeft = position + currentFingerCoords.x + 'px'
    }
  }

  const moveElem = (event) => { // handles the mouseMove event
    event.preventDefault()
    event.stopPropagation()
    if (mouseClickedOnTheElenent) {
      currentCoords.x = event.pageX - initialCoords.x
      if (loop) {
        let currentSlides = document.querySelectorAll(".slide")
        let offset = -1 * slideSteps
        for (let i = 0; i < currentSlides.length; i++) {
          currentSlides[i].style.left = (offset * viewport) + currentCoords.x + 'px'
          offset++
        }
      }
      else {
        let slider = document.getElementById('slider')
        slider.style.marginLeft = position + currentCoords.x + 'px'
      }
    }
    else {
      return null
    }
  }

  const onMouseUp = (event) => { // handles the mouseUp/touchEnd events
    event.preventDefault()
    event.stopPropagation()
    let mouseUpTime = new Date
    finaleTime = mouseUpTime.getTime()
    mouseClickedOnTheElenent = false
    let currentSlides = document.querySelectorAll(".slide")
    for (let i = 0; i < currentSlides.length; i++) {
      currentSlides[i].style.transition = speed + 'ms'
    }
    let slider = document.getElementById('slider')
    slider.style.transition = speed + 'ms'

    if (currentFingerCoords.x > 0 || currentCoords.x > 0) {
      if (finaleTime - initialTime > 250 && currentCoords.x + currentFingerCoords.x < windowWidth / 2) {
        if (loop) {
          let offset = -1 * slideSteps
          for (let i = 0; i < currentSlides.length; i++) {
            currentSlides[i].style.left = offset * viewport + 'px'
            offset++
          }
        }
        else {
          slider.style.marginLeft = position + 'px'
        }
      }
      else {
        return slideRight()
      }
    }
    else {
      if (finaleTime - initialTime > 250 && currentCoords.x + currentFingerCoords.x > -windowWidth / 2) {
        if (loop) {
          let offset = -1 * slideSteps
          for (let i = 0; i < currentSlides.length; i++) {
            currentSlides[i].style.left = offset * viewport + 'px'
            offset++
          }
        }
        else {
          slider.style.marginLeft = position + 'px'
        }
      }
      else {
        return slideLeft()
      }
    }
  }

  

  const setStepLeft = () => { // changes the index of the slide that will appear on the left after we slide to the right
    if (stepRight + 1 == slideContent.length) {
      stepRight = 0
      if (stepLeft + 1 > slideContent.length) {
        stepLeft = 1
      }
      else {
        stepLeft++
      }
    } else {
      if (stepLeft + 1 > slideContent.length) {
        stepLeft = 1
      }
      else {
        stepLeft++
      }
      stepRight++
    }
  }

  const setStepRight = () => {  // changes the index of the slide that will appear on the right after we slide to the left 
    if (stepLeft === 0) {
      stepLeft = slideContent.length - 1;
      if (slideSteps > 1) {
        stepRight = visibleElems + slideSteps + (slideSteps - 2)
      }
      else {
        stepRight = visibleElems
      }
    } else {
      if (stepRight === -1) {
        stepRight = slideContent.length - 2
      }
      else {
        stepRight--
      }
      stepLeft--
    }
  }

  const slideLeft = () => { // moves slides to the left and draws new slide/slides on the right
    if (slideLeftPermission) {
      if (loop) {
        clearInterval(autoplaySlider)
        slideLeftPermission = false
        let currentSlides = document.querySelectorAll(".slide")
        let offset = -1 * slideSteps;
        for (let i = 0; i < currentSlides.length; i++) {
          currentSlides[i].style.left = (offset * viewport) - (viewport * slideSteps) + "px"
          offset++;
        }
        setTimeout(function () {
          if (autoplay) {
            autoplaySlider = setInterval(slideLeft, autoplayFrequensy)
          }
          slideLeftPermission = true
          for (let i = 0; i < slideSteps; i++) {
            setStepLeft()
            currentSlides[i].remove()
            draw(stepRight, visibleElems + i, viewport, true)
          }
        }, speed)
      }
      else {
        let slider = document.getElementById('slider')
        slider.style.transition = speed + 'ms'
        let container = document.getElementById("viewport")
        let viewport = (container.offsetWidth / visibleElems) 
        position -= viewport * slideSteps
        position = Math.max(position, -viewport * (children.length - slideSteps))
        slider.style.marginLeft = position + 'px'
      }
    }
    else {
      return null
    }
  }

  const slideRight = () => { // moves slides to the right and draws new slide/slides on the left
    if (slideRightPermission) {
      if (loop) {
        clearInterval(autoplaySlider)
        slideRightPermission = false
        let currentSlides = document.querySelectorAll(".slide")
        let offset = -1;
        for (let i = 0; i < currentSlides.length; i++) {
          currentSlides[i].style.left = offset * viewport + viewport + "px"
          offset++;
        }
        setTimeout(function () {
          if (autoplay) {
            autoplaySlider = setInterval(slideLeft, autoplayFrequensy)
          }
          slideRightPermission = true
          for (let i = 0; i < slideSteps; i++) {
            currentSlides[i + visibleElems + slideSteps].remove()
            setStepRight()
            draw(stepLeft, -1 - i, viewport, false)
          }
        }, speed)
      }
      else {
        let slider = document.getElementById('slider')
        slider.style.transition = speed + 'ms'
        let container = document.getElementById("viewport")
        let viewport = container.offsetWidth / visibleElems
        position += viewport * slideSteps
        position = Math.min(position, 0)
        slider.style.marginLeft = position + 'px'
      }
    }
    else {
      return null
    }
  }

  return (
    <>
      <div id='container'>
        <img
          src={arrowRight}
          alt='slide to the left'
          class="next"
          id='next'
          onClick={slideLeft} />
        <img
          src={arrowLeft}
          alt='slide to the right'
          class="prev"
          id='prev'
          onClick={slideRight} />

        <div id='viewport' className='viewport'>
          <div
            id='slider'
            className='slider'
            onMouseMove={moveElem}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchStart={onMouseDown}
            onTouchMove={moveFingerElem}
            onTouchEnd={onMouseUp}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Carousel