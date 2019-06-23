import React, { useState } from 'react';
import s from './Verse.module.scss';
import { ReactComponent as IconPlay } from '../../assets/play.svg';
import { ReactComponent as IconPause } from '../../assets/pause.svg';

const Verse = verse => {
  const [clickedWord, setClickedWord] = useState(null);
  const [play, setPlay] = useState(false);

  const wordPlayAudio = (wordAudio, id) => {
    if (wordAudio && !clickedWord) {
      setClickedWord(id);
      const audio = new Audio(wordAudio);
      audio.play();
      audio.addEventListener('ended', () => setClickedWord(null));
    }
  };

  const playVerse = () => {
    setPlay(!play);
  };

  console.log(verse);

  return (
    <div className={s.container}>
      <div className={s.number}>{verse.verse_number}</div>
      <div className={s.arabic}>
        {verse.words.map(word => (
          <div
            key={word.id}
            className={`${word.class_name} ${word.char_type} ${s.word} ${
              clickedWord ? s.active : ''
            } ${clickedWord === word.id ? s.activeWord : ''}`}
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
