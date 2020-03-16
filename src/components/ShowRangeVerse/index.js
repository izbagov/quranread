import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import ApiServices from '../../services/api';
import Chapters from '../../data/chapters';
import Verse from '../Verse';
import Alert from '../../UI/Alert';
import { generateTitle } from '../../helpers';
import RandomSura from '../RandomSura';

const ShowRangeVerse = ({ match }) => {
  const [verses, setVerses] = useState([]);
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [error, setError] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [wordAudio, setWordAudio] = useState(null);
  const [activeAudio, setActiveAudio] = useState(null);
  const Api = new ApiServices();
  const { verseFirst, verseSecond, id } = match.params;
  const limit = verseSecond - verseFirst + 1;
  let history = useHistory();

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
          setError(true);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (totalPages === currentPage || loading) return;
    if (inView) {
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
    if (verseFirst === verseSecond) {
      history.push(`/${id}/${verseFirst}`);
    }

    fetchVersesRange();
    document.title = generateTitle(id, verseFirst, verseSecond);
  }, [verseFirst, verseSecond, id]);
  return (
    <div className="wrap">
      {!error && <div className="title">{Chapters[id - 1].text.name}</div>}
      {verses.map((verse, idx) => (
        <Verse
          key={verse.id}
          verse={verse}
          currentAudio={currentAudio}
          setCurrentAudio={setCurrentAudio}
          wordAudio={wordAudio}
          setWordAudio={setWordAudio}
          activeAudio={activeAudio}
          setActiveAudio={setActiveAudio}
          ref={verses.length - 1 === idx ? ref : null}
        />
      ))}
      {loading && <div>Загружаю суру..</div>}
      {error && (
        <Alert
          title="Неверный диапазон аятов"
          text={
            <p>
              В суре {Chapters[id - 1].text.translit} нет такого диапазона от {verseFirst} до{' '}
              {verseSecond} аята. Перейдите на <Link to="/">главную страницу</Link> и выберите любую
              суру. Например <RandomSura />
            </p>
          }
        />
      )}
    </div>
  );
};

export default ShowRangeVerse;
