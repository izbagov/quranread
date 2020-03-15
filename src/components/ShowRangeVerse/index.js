import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import ApiServices from '../../services/api';
import Chapters from '../../data/chapters';
import Verse from '../Verse';
import { getRandomSuraNumber } from '../../helpers';

const ShowRangeVerse = ({ match }) => {
  const [verses, setVerses] = useState([]);
  const [ref, inView, entry] = useInView({ rootMargin: '500px' });
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [error, setError] = useState(false);
  const [randomSuraNumber, setRandomSuraNumber] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [wordAudio, setWordAudio] = useState(null);
  const [activeAudio, setActiveAudio] = useState(null);
  const Api = new ApiServices();
  const { verseFirst, verseSecond, id } = match.params;
  const limit = verseSecond - verseFirst + 1;

  const fetchVersesRange = async () => {
    setLoading(true);
    await Api.getVersesRange(id, verseFirst, limit)
      .then(({ meta, verses }) => {
        if (verses.length) {
          setVerses(verses);
          const versesLength = verses.length - 1;
          setOffset(+verseFirst + versesLength);
          setCurrentPage(meta.current_page);
          setTotalPages(meta.total_pages);
        } else {
          setRandomSuraNumber(getRandomSuraNumber(114));
          setError(true);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (totalPages === currentPage || loading) return;
    if (inView && entry.boundingClientRect.top > 500) {
      setLoading(true);
      Api.getChapterWithOffset(id, offset).then(({ meta, verses }) => {
        setCurrentPage(meta.current_page);
        setOffset(offset => offset + 10);
        setVerses(prevVerses => [...prevVerses, ...verses]);
        setLoading(false);
      });
    }
  }, [inView]);

  useEffect(() => {
    fetchVersesRange();
  }, [verseFirst, verseSecond, id]);
  return (
    <div className="wrap">
      {!error && <div className="title">{Chapters[id - 1].text.name}</div>}
      {verses.map(verse => (
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
      {error && (
        <div className="alert">
          <div className="alert__icon">
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="info-circle"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
              <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
            </svg>
          </div>
          <h3 className="alert__title">Неверный диапазон аятов</h3>
          <p className="alert__text">
            В суре {Chapters[id - 1].text.translit} нет такого диапазона от {verseFirst} до{' '}
            {verseSecond} аята. Перейдите на <Link to="/">главную страницу</Link> и выберите любую
            суру. Например{' '}
            <Link to={`/${randomSuraNumber}/`}>
              сура {Chapters[randomSuraNumber - 1].text.translit}
            </Link>
          </p>
        </div>
      )}
      <div ref={ref} className="loadmore" />
    </div>
  );
};

export default ShowRangeVerse;
