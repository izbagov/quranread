import React, { useEffect, useState } from 'react';
import ApiServices from '../../services/api';
import Chapters from '../../data/chapters';
import Verse from '../Verse';
import s from './ChapterFull.module.scss';

const Api = new ApiServices();

const ChapterFull = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [versesState, setVerses] = useState([]);
  const [offset, setOffset] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPages] = useState(null);
  const chapterId = match.params.id;
  let isMounted = false;

  const onScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setLoading(true);

      Api.getChapterWithOffset(chapterId, offset).then(({ meta, verses }) => {
        setLoading(false);
        setOffset(prevOffset => prevOffset + 10);
        setVerses(prevVerses => [...prevVerses, ...verses]);
        setCurrentPages(meta.current_page);
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll, false);

    setLoading(true);
    Api.getChapter(chapterId).then(({ meta, verses }) => {
      if (isMounted) {
        setTotalPages(meta.total_pages);
        setCurrentPages(meta.current_page);
        setVerses(verses);
        setLoading(false);
      }
    });

    isMounted = true;

    return () => {
      window.removeEventListener('scroll', onScroll, false);
      isMounted = false;
    };
  }, []);

  return (
    <div className="wrap">
      <div className={s.title}>{Chapters[chapterId - 1].text.name}</div>
      {versesState.map(verse => (
        <Verse key={verse.id} {...verse} />
      ))}
      {loading && <div>Загружаю информацию..</div>}
    </div>
  );
};

export default ChapterFull;
