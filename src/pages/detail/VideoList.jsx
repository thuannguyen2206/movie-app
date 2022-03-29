// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.scss";

import tmdbApi from "../../api/tmdbClient";

function VideoList(props) {
  const { category } = useParams();
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    const response = await tmdbApi.getVideos(category, props.id);
    setVideos(response.results.slice(0, 5));
  };

  useEffect(() => {
    getVideos();
  }, [category, props.id]);

  return (
    <div>
      {videos && videos.map((item, i) => <Video key={i} item={item} />)}
    </div>
  );
}

const Video = (props) => {
  const item = props.item;
  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};

export default VideoList;
