import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from "yup";

import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

import "./charSearchForm.scss";

const CharSearchForm = () => {
  const [char, setChar] = useState(null);
  const { loading, error, clearError, getCharacterByName } = useMarvelService();

  const updateChar = (name) => {
    clearError();

    getCharacterByName(name)
        .then(onCharLoaded);
  };
  
  const onCharLoaded = (char) => {
    setChar(char);
}

  const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage/></div> : null;
  const result = !char ? null : char.length > 0 
    ? <div className="char__search-wrapper">
        <div className="char__search-success">
            {char[0].name} найден. Перейти:
        </div>
        <Link to={`characters/${char[0].id}`} className="button button__secondary">
            <div className="inner">To page</div>
        </Link>
    </div> 
    : <div className="char__search-error">Персонаж не найден</div> 
  return (
    <div className="char__search-form">
      <Formik
        initialValues={{
          charName: "",
        }}
        validationSchema={Yup.object({
          charName: Yup.string().required("Напишите имя персонажа"),
        })}
        onSubmit={ ({charName}) => updateChar(charName) }
      >
        <Form>
          <label className="char__search-label" htmlFor="charName">
            Or find a character by name:
          </label>
          <div className="char__search-wrapper">
            <Field
              id="charName"
              name="charName"
              type="text"
              placeholder="Enter name"
            />
            <button type="submit" className="button button__main" disabled={loading}>
              <div className="inner">find</div>
            </button>
          </div>
          <FormikErrorMessage
            name="charName"
            className="char__search-error"
            component="div"
          />
        </Form>
      </Formik>
        {result}
        {errorMessage}
    </div>
  );
};

export default CharSearchForm;
