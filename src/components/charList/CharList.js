import { useState, useEffect, useRef } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import PropTypes from "prop-types";
import "./charList.scss";

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState(false);
  const [showCharList, setShowCharList] = useState(false);

  const {loading, error, getAllCharacters} = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset)
      .then(onCharListLoaded)
  };

  const onCharListLoaded = (newCharList) => {
    setCharList(charList => [...charList, ...newCharList]);
    setNewItemLoading(false);
    setOffset(offset => offset + 9);

    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    };
    setCharEnded(ended);
    setShowCharList(true);
  };
  
  const itemRefs = useRef([]);

  const focusCharListItem = (id) => {
    itemRefs.current.forEach((item) => {item.classList.remove("char__item_selected")});
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "contain" };
      }
      return (
        <CSSTransition
          key={item.id}
          timeout={500} 
          classNames="char__item"
        >
          <li
            className="char__item"
            tabIndex={0}
            ref={el => itemRefs.current[i] = el}
            onClick={() => {
              props.onCharSelected(item.id);
              focusCharListItem(i);
            }}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                props.onCharSelected(item.id);
                focusCharListItem(i);
              }
            }}
          >
            <img src={item.thumbnail} alt="abyss" style={imgStyle} />
            <div className="char__name">{item.name}</div>
          </li>
        </CSSTransition>
      );
    });
    return <ul className="char__grid">
            <TransitionGroup component={null}>
              {items}
            </TransitionGroup>
          </ul>;
  }

  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  // const content = !(loading || error) ? items : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        onClick={() => onRequest(offset)}
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
}

CharList.propsTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
