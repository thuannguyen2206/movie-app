// @ts-nocheck
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./MovieList.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbApi, { category } from "../../api/tmdbClient";
import MovieCard from "../movie-card/MovieCard";

function MovieList(props) {
  const [items, setItems] = useState([]);

  const getList = async () => {
    let response = null;
    const params = {};
    if (props.type !== "similar") {
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(props.type, { params });
          break;
        default:
          response = await tmdbApi.getTvList(props.type, { params });
          break;
      }
    } else {
      response = await tmdbApi.similar(props.category, props.id);
    }
    setItems(response.results);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {items &&
          items.map((item, i) => (
            <SwiperSlide key={i}>
              <MovieCard item={item} category={props.category} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;