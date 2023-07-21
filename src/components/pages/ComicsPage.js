import {Helmet} from "react-helmet";

import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Страница с комиксами"
        />
        <title>Комиксы</title>
      </Helmet>
      <AppBanner />
      <ErrorBoundary>
        <ComicsList />
      </ErrorBoundary>
    </>
  );
};

export default ComicsPage;
