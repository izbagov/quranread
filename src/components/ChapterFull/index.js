import React, { useEffect, useState } from 'react';
import ApiServices from '../../services/api';
import Chapters from '../../data/chapters';
import Verse from '../Verse';
import s from './ChapterFull.module.scss';

const Api = new ApiServices();

const ChapterFull = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [verses, setVerses] = useState([]);
  const chapterId = match.params.id;
  let isMounted = false;

  useEffect(() => {
    Api.getChapter(chapterId).then(({ verses }) => {
      if (isMounted) {
        setLoading(false);
        setVerses(verses);
      }
    });
    isMounted = true;

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div className="wrap">Загружаю информацию..</div>;

  return (
    <div className="wrap">
      <div className={s.title}>{Chapters[chapterId - 1].text.name}</div>
      {verses.map(verse => (
        <Verse key={verse.id} {...verse} />
      ))}
    </div>
  );
};

export default ChapterFull;
