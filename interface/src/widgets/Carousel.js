import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Carousel.css';
import InfoBox from "./InfoBox.js";

import { ConditionallyRender } from "react-util-kit";

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
// onClick={() => props.ActionProvider.setState((state) => ({ ...state, infoBox: "active" }))}

const Postings = ({payload, infoBox, setState}) => {

  const attachment = payload.attachment;

  const carouselMarkup = attachment.map((attachment, index) => (
    <div className='job title' onClick={() => setState((state) => ({ ...state, infoBox: index}))}key={index}>
      <h1>{attachment.title}</h1>
        <ul className='nobull'>
          <li className='title'>Company</li>
          <li className='info'>{attachment.company}</li>
        </ul>  
      </div>
    
  ))
     
  return (
    <div>
    <Carousel
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
        itemClass="carousel-item-padding-100-px"
    >
        {carouselMarkup}
    </Carousel>
    <ConditionallyRender
     ifTrue={infoBox !="inactive"}
     show={
      <InfoBox setState={setState} payload={payload} index={infoBox}></InfoBox> 
     }
    />
    </div>
  );
}

export default Postings
