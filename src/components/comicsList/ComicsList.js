import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./comicsList.scss";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(0);
  const [comicsLoading, setComicsLoading] = useState(false);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset);
  }, []);

  const onRequest = (offset) => {
    setComicsLoading(true);
    getAllComics(offset)
        .then(onComicsListLoaded);
  };

  const onComicsListLoaded = (newComics) => {
    setComics((comics) => [...comics, ...newComics]);
    setOffset((offset) => offset + 8);
    setComicsLoading(false);

    if (newComics.length < 8) {
        setComicsEnded(true);
    }
  };

  function renderComics(arr) {
    const items = arr.map((item) => {
      let imgStyle = { objectFit: "cover" };
      if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyle = { objectFit: "contain" };
      }
      return (
        <li key={item.id} className="comics__item">
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
              style={imgStyle}
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });
    return <ul className="comics__grid">{items}</ul>;
  }

  const items = renderComics(comics);

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        onClick={() => onRequest(offset)}
        disabled={comicsLoading}
        style={{display: comicsEnded ? 'none' : 'block'}}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
