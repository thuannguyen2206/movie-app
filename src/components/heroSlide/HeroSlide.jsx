// @ts-nocheck
import React, { useEffect, useState } from "react";
import "./HeroSlide.scss";
import tmdbApi, { movieType } from "../../api/tmdbClient";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import HeroSlideItem from "./HeroSlideItem";
import TrailerModal from "./TrailerModal";

function HeroSlide(props) {
  SwiperCore.use([Autoplay]);
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const res = await tmdbApi.getMoviesList(movieType.popular, { params });
        setMovieItems(res.results.slice(0, 4));
      } catch (e) {
        console.log("error: ", e);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {movieItems.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems &&
        movieItems.map((item, i) => <TrailerModal key={i} item={item} />)}
    </div>
  );
}

export default HeroSlide;
