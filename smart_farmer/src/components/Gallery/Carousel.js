import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import "./Carousel.css"



function Example(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  // props.setcurimage(props.items[activeIndex]);


  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === props.items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
    props.setcurimage(props.items[nextIndex]);
    console.log(nextIndex)
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? props.items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
    props.setcurimage(props.items[nextIndex]);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
    props.setcurimage(props.items[newIndex]);
  };

  const slides = props.items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(false)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        {/* <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        /> */}
      </CarouselItem>
    );
  });

  return (
      <div>
        <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        {...props}
        interval={false}
      >
          <CarouselIndicators
            items={props.items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </Carousel>

      </div>
  );
}

export default Example;