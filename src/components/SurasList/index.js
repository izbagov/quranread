import React, { useEffect, useState } from 'react';
import Sura from '../Sura';
import s from './SurasList.module.scss';

const SurasList = ({ items }) => {
  const [loading, setLoading] = useState(true);
  const [suras, setSuras] = useState([]);

  useEffect(() => {
    items.then(data => {
      setLoading(false);
      setSuras(data);
    });
  });

  if (loading) return <div className="wrap">... загружается список сур</div>;

  return (
    <div>
      <div className={s.container}>
        {suras.map(sura => (
          <Sura key={sura.id} {...sura} />
        ))}
      </div>
    </div>
  );
};

export default SurasList;
