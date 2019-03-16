import React from 'react';
import s from './Sura.module.scss';

const Sura = item => {
  const { name, translit } = item.text;
  return (
    <div className={s.container} onClick={() => alert('not implemented')}>
      <div className={s.box}>
        <div className={s.number}>{item.id}</div>
        <div className={s.info}>
          <div className={s.name}>{name}</div>
          <div className={s.translit}>{translit}</div>
        </div>
        <div className={`icon-sura${item.id}`} />
      </div>
    </div>
  );
};

export default Sura;
