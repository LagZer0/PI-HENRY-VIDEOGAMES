import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetail, clear } from "../../redux/actions";

import './details.styles.css'

export default function Details(props) {
  const dispatch = useDispatch();
  const {id} = useParams();
  const videogame = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(clear());
    };
  }, [dispatch, id]);
  return (
    <div className="general">
      <div key={videogame.id}>
        <h1 className="nombre">{videogame.name}</h1>
        <img className="image"
          src={videogame.background_image? videogame.background_image : videogame.image}
          alt={videogame.name}
          width="400px"
          height="250px"
        />
        <div  className="h4">
          <h4>🎯ID: {videogame.id}</h4>
          <h4>🌟 Rating: {videogame.rating} </h4>
          <h4>📆 Released: {videogame.released}</h4>

          <h4>
            🎮 Platforms:{" "}
            {videogame.platforms
              ? videogame.platforms + ","
              : videogame.platforms?.map((pl, i) => (
                  <li key={i}>{pl.name}</li>
                ))}
          </h4>
          <h4>
            🧩 Genres:
            {videogame.genres?.map((genre, i) => (
              <li key={i}>{genre.name}</li>
            ))}
          </h4>
          <h4 > 📜 Description:</h4> <p className="description"> <div dangerouslySetInnerHTML={{__html: videogame.description}}>
            </div></p>
        </div>
        <Link to="/home">
          <button className="botondetail">Go Home</button>
        </Link>
      </div>
    </div>
  );
}