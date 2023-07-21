import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {

  return (
    <div>
      <ErrorMessage />
      <div style={{ textAlign: "center" }}>
        <p>Страницы не существует</p>
        <br />
        <Link to="/">
          <h2>Вернуться на главную</h2>
        </Link>
      </div>
    </div>
  );
};

export default Page404;
