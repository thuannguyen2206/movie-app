// @ts-nocheck
import React, { useState, useEffect } from "react";
import "./Detail.scss";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbClient";
import apiConfig from "../../api/apiConfig";

function CastList(props) {
  const { category } = useParams();
  const [casts, setCasts] = useState([]);

  const getCredits = async () => {
    const response = await tmdbApi.creadits(category, props.id);
    setCasts(response.cast.slice(0, 5));
  };

  useEffect(() => {
    getCredits();
  }, [category, props.id]);

  return (
    <div className="casts">
      {casts &&
        casts.map((item, i) => (
          <div className="casts__item" key={i}>
            <div
              className="casts__item__img"
              style={{
                backgroundImage: `url(${apiConfig.w500Image(
                  item.profile_path
                )})`,
              }}
            ></div>
            <p className="casts__item__name">{item.name}</p>
          </div>
        ))}
    </div>
  );
}

export default CastList;
