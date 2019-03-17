import React from 'react';
import { Link } from 'react-router-dom';
import s from './Sura.module.scss';

const Sura = item => {
  const { name, translit } = item.text;
  return (
    <Link to={`/${item.id}`} className={s.container}>
      <div className={s.box}>
        <div className={s.number}>{item.id}</div>
        <div className={s.info}>
          <div className={s.name}>{name}</div>
          <div className={s.translit}>{translit}</div>
        </div>
        <div className={`icon-sura${item.id}`} />
      </div>
    </Link>
  );
};

export default Sura;
