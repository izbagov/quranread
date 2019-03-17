import React from 'react';
import Sura from '../Sura';
import s from './SurasList.module.scss';

const SurasList = ({ items }) => {
  return (
    <div>
      <div className={s.container}>
        {items.map(sura => (
          <Sura key={sura.id} {...sura} />
        ))}
      </div>
    </div>
  );
};

export default SurasList;
