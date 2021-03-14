import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import ApiServices from '../../services/api';
import Chapters from '../../data/chapters';
import Verse from '../Verse';
import Alert from '../../UI/Alert';
import { generateTitle } from '../../helpers';
import RandomSura from '../RandomSura';

function correctRangeVerses(start, total) {
  return Number(start) < total;
}

const ShowRangeVerse = ({ match }) => {
  const [verses, setVerses] = useState([]);
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [activeAudio, setActiveAudio] = useState(null);

  const [meta, setMeta] = useState({
    current_page: null,
    next_page: null,
    prev_page: null,
    total_pages: null,
    total_count: null,
    offset: 10,
    lastVerseNumber: null,
  });

  const Api = new ApiServices();
  const { verseFirst, verseSecond, id } = match.params;
  const limit = verseSecond - verseFirst + 1;
  let history = useHistory();

  const fetchVersesRange = async () => {
    setLoading(true);
    await Api.getVersesRange(id, verseFirst, limit)
      .then(({ meta, verses }) => {
        if (correctRangeVerses(verseFirst, meta.total_count)) {
          setVerses(verses);

          setMeta((prevMeta) => ({
            ...prevMeta,
            ...meta,
            offset: Number(verseSecond) + prevMeta.offset,
          }));
        } else {
          setError(true);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (meta.lastVerseNumber >= meta.total_count || loading) return;
    if (inView) {
      setLoading(true);
      Api.getChapterWithOffset(id, meta.offset).then(({ meta, verses }) => {
        setMeta((prevMeta) => ({
          ...prevMeta,
          ...meta,
          offset: prevMeta.offset + 10,
          lastVerseNumber: verses[verses.length - 1].verse_number,
        }));
        setVerses((prevVerses) => [...prevVerses, ...verses]);
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
