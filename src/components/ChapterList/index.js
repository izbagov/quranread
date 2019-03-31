import React from 'react';
import Chapter from '../Chapter';
import s from './ChapterList.module.scss';

const ChapterList = ({ items }) => {
  return (
    <div className={s.container}>
      {items.map(chapter => (
        <Chapter key={chapter.id} {...chapter} />
      ))}
    </div>
  );
};

export default ChapterList;
