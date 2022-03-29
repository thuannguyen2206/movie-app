// @ts-nocheck
import React, { useEffect, useState } from "react";
import "./MovieGrid.scss";

import MovieCard from "../movie-card/MovieCard";
import { useParams } from "react-router-dom";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbClient";
import { OutlineButton } from "../button/Button";
import MovieSearch from "./MovieSearch";

function MovieGrid(props) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  const getList = async () => {
    let response = null;
    let params = {};
    if (keyword === undefined) {
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, {
            params,
          });
      }
    } else {
      params = {
        query: keyword,
      };
      response = await tmdbApi.search(props.category, { params });
    }

    setItems(response.results);
    setTotalPage(response.total_pages);
  };

  const onLoadMore = async () => {
    let response = null;
    let params = {};
    if (keyword === undefined) {
      params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, {
            params,
          });
      }
    } else {
      params = {
        query: keyword,
        page: page + 1,
      };
      response = await tmdbApi.search(props.category, { params });
    }

    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  useEffect(() => {
    getList();
  }, [props.category, keyword]);

  return (
    <>
    <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
    </div>
      <div className="movie-grid">
        {items &&
          items.map((item, i) => (
            <MovieCard key={i} category={props.category} item={item} />
          ))}
      </div>
      {page < totalPage && (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={onLoadMore}>
            Load more
          </OutlineButton>
        </div>
      )}
    </>
  );
}

export default MovieGrid;
