import React from 'react';
import { Link } from 'react-router-dom';
import chapters from '../../data/chapters';
import s from './ChapterList.module.scss';

const ChapterListSimple = props => {
  console.log(props);

  return (
    <div className={s.simple}>
      {chapters.map(chapter => (
        <Link to={`/${chapter.id}`} className={s.containerSmall} key={chapter.id}>
          <div className={s.simpleId}>{chapter.id}</div>
          <div className={s.simpleNameContainer}>
            <div className={s.simpleName}>{chapter.text.name}</div>
            <div className={s.simpleTranslit}>{chapter.text.translit}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ChapterListSimple;
