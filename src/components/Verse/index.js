import React from 'react';
import s from './Verse.module.scss';

const Verse = verse => {
  return (
    <div className={s.container}>
      <div className={s.number}>{verse.verse_number}</div>
      <div className={s.arabic}>{verse.text_madani}</div>
      <div className={s.translation}>{verse.translations[0].text}</div>
    </div>
  );
};

export default Verse;
