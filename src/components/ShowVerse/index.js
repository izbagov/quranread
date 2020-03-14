import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiServices from '../../services/api';
import Verse from '../Verse';
import s from './ShowVerse.module.scss';

const ShowVerse = ({ match }) => {
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [wordAudio, setWordAudio] = useState(null);
  const [activeAudio, setActiveAudio] = useState(null);
  const chapterId = match.params.id;
  const verseId = match.params.verse;
  const Api = new ApiServices();

  const fetchChapterVerse = async (chapterId, verseId) => {
    setLoading(true);
    await Api.getChapterVerse(chapterId, verseId)
      .then(({ verses }) => {
        if (verses.length) {
          setVerses(verses);
        } else {
          setError(true);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchChapterVerse(chapterId, verseId);
  }, [chapterId, verseId]);
  return (
    <div className="wrap">
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
      {error && (
        <div className={s.alert}>
          <div className={s.icon}>
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              class=""
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
          <h3 className={s.title}>Вы перешли на аят который не существует!</h3>
          <p className={s.text}>
            Перейдите на <Link to="/">главную страницу</Link> и выберите любую суру. Например{' '}
            <Link to="/1/">сура Аль-Фатиха</Link>
          </p>
        </div>
      )}
      {loading && <div>Загружаю информацию..</div>}
    </div>
  );
};

export default ShowVerse;
