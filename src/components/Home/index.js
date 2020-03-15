import React, { Fragment, useEffect } from 'react';
import ChaptersData from '../../data/chapters';
import ChapterList from '../ChapterList';

const Home = () => {
  useEffect(() => {
    document.title = 'QuranRead - Читай Коран, повышай свой иман!';
  }, []);

  return (
    <Fragment>
      <ChapterList items={ChaptersData} />
    </Fragment>
  );
};

export default Home;
