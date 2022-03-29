import React from "react";
import "./MovieCard.scss";
import apiConfig from "../../api/apiConfig";
import { category } from "../../api/tmdbClient.js";
import { Link } from "react-router-dom";
import Button from "../button/Button";

function MovieCard(props) {
  const item = props.item;
  const link = `/${category[props.category]}/${item.id}`;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <>
      <Link to={link}>
        <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
          <Button>
            <i className="bx bx-play"></i>
          </Button>
        </div>
        <h3 style={{textAlign:"center"}}>{item.name || item.title}</h3>
      </Link>
    </>
  );
}

export default MovieCard;
