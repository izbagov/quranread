import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ApiServices from '../../services/api';
import Chapters from '../../data/chapters';
import Verse from '../Verse';
import Bismillah from '../../UI/Bismillah';
import s from './ChapterFull.module.scss';

const Api = new ApiServices();

const ChapterFull = props => {
  const [loading, setLoading] = useState(false);
  const [ref, inView, entry] = useInView({ rootMargin: '500px' });
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [wordAudio, setWordAudio] = useState(null);
  const [activeAudio, setActiveAudio] = useState(null);

  const chapterId = props.match.params.id;

  useEffect(() => {
    if (totalPages === currentPage || loading) return;
    if (inView && entry.boundingClientRect.top > 500) {
      console.log('load');
      setLoading(true);
      Api.getChapterWithOffset(chapterId, offset).then(({ meta, verses }) => {
        setLoading(false);
        setCurrentPage(meta.current_page);
        setOffset(offset => offset + 10);
        setItems(items => [...items, ...verses]);
      });
    }
  }, [inView]);

  useEffect(() => {
    setLoading(true);
    Api.getChapter(chapterId).then(({ meta, verses }) => {
      setLoading(false);
      setCurrentPage(meta.current_page);
      setTotalPages(meta.total_pages);
      setItems(verses);
    });
  }, []);

  return (
    <div className="wrap">
      <div className={s.title}>{Chapters[chapterId - 1].text.name}</div>
      <Bismillah chapter={chapterId} />
      {items.map(verse => (
        <Verse
          key={verse.id}
          verse={verse}
          currentAudio={currentAudio}
          setCurrentAudio={setCurrentAudio}
          wordAudio={wordAudio}
          setWordAudio={setWordAudio}
          activeAudio={activeAudio}
          setActiveAudio={setActiveAudio}
        />
      ))}
      {loading && <div>Загружаю суру..</div>}
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
};

export default ChapterFull;
