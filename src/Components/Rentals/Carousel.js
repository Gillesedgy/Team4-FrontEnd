import React from "react";
import { useRef } from "react";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";

export default function Carousel({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slider = useRef();

  return (
    <div className="carousel">
      <Slider ref={slider} {...settings}>
        {images.map((image) => {
          return (
            <div className="div_carousel">
              <img src={image} alt={image} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
