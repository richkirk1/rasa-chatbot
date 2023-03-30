import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Carousel.css';

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
  const attachment = props.payload.attachment;

  const carouselMarkup = attachment.map((attachment, index) => (
    <div className='job title' key={index}>
      <h1>{attachment.title}</h1>
        <ul className='nobull'>
          <li className='title'>Company</li>
          <li className='info'>{attachment.company}</li>
        </ul>  
      </div>
    
  ))
     
  return (
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
  );
}

export default Postings
