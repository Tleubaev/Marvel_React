import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const { loading, error, getComic, getCharacter, clearError } =
    useMarvelService();

  useEffect(() => {
    updateChar();
  }, [id]);

  const updateChar = () => {
    clearError();

    switch (dataType) {
      case "comic":
        getComic(id).then(onDataLoaded);
        break;
      case "character":
        getCharacter(id).then(onDataLoaded);
        break;
      default:
        console.log(`SinglePage dataType error`);
    }
  };

  const onDataLoaded = (id) => {
    setData(id);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = loading || error || !data ? null : <Component data={data} />;

  return (
    <>
      <AppBanner />
      {spinner}
      {errorMessage}
      {content}
    </>
  );
};

export default SinglePage;
