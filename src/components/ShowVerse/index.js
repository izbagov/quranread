import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiServices from '../../services/api';
import Verse from '../Verse';
import Alert from '../../UI/Alert';
import Chapters from '../../data/chapters';
import { generateTitle } from '../../helpers';
import RandomSura from '../RandomSura';

const ShowVerse = ({ match }) => {
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
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
    document.title = generateTitle(chapterId, verseId);
  }, [chapterId, verseId]);
  return (
    <div className="wrap">
      {!error && <div className="title">{Chapters[chapterId - 1].text.name}</div>}
      {verses.map((verse) => (
        <Verse
          key={verse.id}
          verse={verse}
          currentAudio={currentAudio}
          setCurrentAudio={setCurrentAudio}
          activeAudio={activeAudio}
          setActiveAudio={setActiveAudio}
        />
      ))}
      {error && (
        <Alert
          title="Вы перешли на аят который не существует!"
          text={
            <p>
              Перейдите на <Link to="/">главную страницу</Link> и выберите любую суру. Например{' '}
              <RandomSura />
            </p>
          }
        />
      )}
      {loading && <div>Загружаю информацию..</div>}
    </div>
  );
};

export default ShowVerse;
