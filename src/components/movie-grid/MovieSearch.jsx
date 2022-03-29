// @ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import "./MovieGrid.scss";

import Input from "../input/Input";
import { useNavigate } from "react-router-dom";
import { category } from "../../api/tmdbClient";
import Button from "../button/Button";

function MovieSearch(props) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const gotoSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, props.category, navigate]);

  const enterEvent = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      gotoSearch();
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", enterEvent);

    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, gotoSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword to search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={gotoSearch}>
        Search
      </Button>
    </div>
  );
}

export default MovieSearch;
