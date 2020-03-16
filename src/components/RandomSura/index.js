import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRandomSuraNumber } from '../../helpers';
import Chapters from '../../data/chapters';

const RandomSura = () => {
  const [num, setNum] = useState(null);

  useEffect(() => {
    const random = getRandomSuraNumber(114);
    setNum(random);
  }, []);
  return num && <Link to={`/${num}/`}>сура {Chapters[num - 1].text.translit}</Link>;
};

export default RandomSura;
