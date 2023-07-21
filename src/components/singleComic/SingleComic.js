import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./singleComic.scss";

const SingleComic = () => {
  const [comic, setComic] = useState(null);
  const { comicId } = useParams();
  const { loading, error, getComic, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const updateComic = () => {
    clearError();
    getComic(comicId).then(onComicLoaded);
  };

  const onComicLoaded = (id) => {
    setComic(id);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = loading || error || !comic ? null : <View comic={comic} />;

  return (
    <div style={loading || error ? {textAlign: 'center'} : null}>
      {spinner}
      {errorMessage}
      {content}
    </div>
  );
};

const View = ({ comic }) => {
  const { title, description, pageCount, language, price, thumbnail } = comic;

  function goBack() {
    window.history.back();
  }

  const navigate = useNavigate ();

  return (
    <div className="single-comic">
      <img src={thumbnail} alt="title" className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link onClick={() => navigate(-1)} className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComic;
