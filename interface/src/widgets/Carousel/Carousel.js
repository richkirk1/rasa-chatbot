import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Carousel.css';

import InfoBox from "../InfoBox.js";

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



const Postings = ({payload, setState, infoBox}) => {

  const attachment = payload.attachment;

  const carouselMarkup = attachment.map((attachment, index) => (
    <div onClick={() => setState((state) => ({ ...state, infoBox: index}))} className='job-title-carousel' key={index}>
      <h1 className='title-carousel'>{attachment.title.split('-')[0]}</h1>
      <p className='company-carousel'>{attachment.company}</p>
      </div>
    
  ))

  const ButtonGroup = ({ next, previous, ...rest }) => {
    return (
      <div className="carousel-arrow-group"> 
        <button className='left-arrow' onClick={() => previous()}>&laquo;</button>
        <button className='right-arrow' onClick={() => next()}>&raquo;</button>
      </div>
    );
  };;
     
  return (
    <div className='arrow-container'>
    <Carousel
        arrows={false}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup/>}
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
    <ConditionallyRender
     ifTrue={infoBox !=="inactive"}
     show={
      <InfoBox setState={setState} payload={payload} index={infoBox}></InfoBox> 
     }
    />
    </div>

  );
}

export default Postings
