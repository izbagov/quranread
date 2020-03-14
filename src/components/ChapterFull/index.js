import React, { useEffect, useState } from 'react';
import ApiServices from '../../services/api';
import Chapters from '../../data/chapters';
import Verse from '../Verse';
import Bismillah from '../../UI/Bismillah';
import WindowHelper from './window.helper';
import s from './ChapterFull.module.scss';

const Api = new ApiServices();

const ChapterFull = props => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [wordAudio, setWordAudio] = useState(null);
  const [activeWord, setActiveWord] = useState(null);

  let mounted;
  const chapterId = props.match.params.id;

  const handleScroll = () => {
    if (totalPages === currentPage || loading) return;
    if (WindowHelper.pageHeight() <= WindowHelper.windowHeight() + WindowHelper.scrollPosition()) {
      setLoading(true);

      Api.getChapterWithOffset(chapterId, offset).then(({ meta, verses }) => {
        setLoading(false);
        setCurrentPage(meta.current_page);
        setOffset(offset => offset + 10);
        setItems(items => [...items, ...verses]);
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, false);
    mounted = true;
    setLoading(true);
    Api.getChapter(chapterId).then(({ meta, verses }) => {
      if (mounted) {
        setLoading(false);
        setCurrentPage(meta.current_page);
        setTotalPages(meta.total_pages);
        setItems(verses);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll, false);
      mounted = false;
    };
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
          activeWord={activeWord}
          setActiveWord={setActiveWord}
        />
      ))}
      {loading && <div>Загружаю информацию..</div>}
    </div>
  );
};

export default ChapterFull;
