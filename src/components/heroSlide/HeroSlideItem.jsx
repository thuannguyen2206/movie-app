// @ts-nocheck
import React from "react";
import Button, { OutlineButton } from "../button/Button";
import apiConfig from "../../api/apiConfig";
import { useNavigate } from "react-router-dom";
import "./HeroSlide.scss";
import tmdbApi, { category } from "../../api/tmdbClient";

function HeroSlideItem(props) {
  const navigate = useNavigate();
  const item = props.item;
  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);
    const videos = await tmdbApi.getVideos(category.movie, item.id);

    if (videos.results.length > 0) {
      const src = "https://www.youtube.com/embed/" + videos.results[0].key;
      modal.querySelector(".modal__content > iframe").setAttribute("src", src);
    } else {
      modal.querySelector(".modal__content").innerHTML = "No Trailer";
    }

    modal.classList.toggle("active");
  };

  return (
    <div
      className={`hero-slide__item ${props.className ?? ""}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <div className="title">{item.title}</div>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => navigate(`/movie/${item.id}`)}>
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="poster" />
        </div>
      </div>
    </div>
  );
}

export default HeroSlideItem;
