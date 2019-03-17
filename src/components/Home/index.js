import React, { Fragment } from 'react';
import ChaptersData from '../../data/chapters';
import ChapterList from '../ChapterList';

const Home = () => (
  <Fragment>
    <ChapterList items={ChaptersData} />
  </Fragment>
);

export default Home;
