import React, { useState } from 'react';
import s from './Verse.module.scss';
import { ReactComponent as IconPlay } from '../../assets/play.svg';
import { ReactComponent as IconPause } from '../../assets/pause.svg';

const Verse = ({
  verse,
  currentAudio,
  setCurrentAudio,
  wordAudio,
  setWordAudio,
  activeWord,
  setActiveWord
}) => {
  // console.log('verse', verse);
  const [play, setPlay] = useState(false);

  const wordPlayAudio = (wordAudio, id) => {
    if (wordAudio) {
      if (currentAudio) {
        currentAudio.pause();
        setActiveWord(null);
      }

      setActiveWord(id);
      const audio = new Audio(wordAudio);
      setCurrentAudio(audio);
      audio.play();
      audio.addEventListener('ended', () => {
        setCurrentAudio(null);
        setActiveWord(null);
      });
    }
  };

  const playVerse = () => {
    setPlay(!play);
  };

  const verseClasses = word =>
    `${word.class_name} ${word.char_type} ${s.word} ${activeWord === word.id ? s.activeWord : ''}`;

  return (
    <div className={s.container}>
      <div className={s.number}>{verse.verse_number}</div>
      <div className={s.arabic}>
        {verse.words.map(word => (
          <div
            key={word.id}
            className={verseClasses(word)}
            dangerouslySetInnerHTML={{ __html: word.code }}
            onClick={() => wordPlayAudio(word.audio.url, word.id)}
          />
        ))}
      </div>
      <div className={s.translation}>{verse.translations[0].text}</div>
      <div className={s.playAyat} onClick={() => playVerse()}>
        {!play ? <IconPlay /> : <IconPause />}
      </div>
    </div>
  );
};

export default Verse;
