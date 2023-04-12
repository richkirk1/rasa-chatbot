import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Carousel.css';

import {useState} from 'react';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
};



const Postings = (props) => {
  const [isShown, setIsShown] = useState(true);

  const handleClick = event => {
    setIsShown(current => !current);
    console.log("event triggered!");
  }
  const attachment = props.payload.attachment;

  const carouselMarkup = attachment.map((attachment, index) => (
    <div onClick={handleClick} className='job title' key={index}>
      <h1>{attachment.title}</h1>
          <p className='company'>{attachment.company}</p>
      </div>
    
  ))

  const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;
    // onMove means if dragging or swiping in progress.
    return <button className="right-arrow"onClick={() => onClick()} />;
  };

  const CustomLeftArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;
    // onMove means if dragging or swiping in progress.
    return <button className="left-arrow" onClick={() => onClick()} />;
  };


     
  return (
    <div className='arrow-container'>
    <Carousel
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
  
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true} 
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
    >
        {carouselMarkup}
    </Carousel>
    </div>

  );
}

export default Postings
