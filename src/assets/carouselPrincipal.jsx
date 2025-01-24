import React from "react";
import '../Style/carouselPrincipal.css'

const Carousel = () => {
  return (
    <div id="carouselPrincipal" className="carousel slide" data-bs-ride="carousel">
      {/* Indicadores */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselPrincipal"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselPrincipal"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselPrincipal"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <a href="http://localhost:5173/jogo/6785ec76eeabeeca07e97126">
            <img src="/imagem/cs2.jpg" className="d-block w-100" alt="Slide 1" />
          </a>
        </div>
        <div className="carousel-item">
          <a href="http://localhost:5173/jogo/abcd1234">
            <img src="/imagem/the_last_of_us_carousel.jpg" className="d-block w-100" alt="Slide 2" />
          </a>
        </div>
        <div className="carousel-item">
          <a href="http://localhost:5173/jogo/9876zyxw">
            <img src="/imagem/the_witcher.jpg" className="d-block w-100" alt="Slide 3" />
          </a>
        </div>
      </div>

      {/* Controles */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselPrincipal"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselPrincipal"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
