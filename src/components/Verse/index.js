import React, { useState } from 'react';
import s from './Verse.module.scss';

const Verse = verse => {
  const [clicked, setClicked] = useState(null);
  // const [wordActive, setClicked] = useState(null);
  const wordPlayAudio = (wordAudio, id) => {
    setClicked(id);
    if (wordAudio) {
      const audio = new Audio(wordAudio);
      audio.play();
      audio.addEventListener('ended', () => setClicked(null));
    }
  };

  return (
    <div className={s.container}>
      <div className={s.number}>{verse.verse_number}</div>
      <div className={s.arabic}>
        {verse.words.map(word => (
          <div
            key={word.id}
            className={`${word.class_name} ${word.char_type} ${s.word} ${clicked ? s.active : ''} ${
              clicked === word.id ? s.activeWord : ''
            }`}
            dangerouslySetInnerHTML={{ __html: word.code }}
            onClick={() => wordPlayAudio(word.audio.url, word.id)}
          />
        ))}
      </div>
      <div className={s.translation}>{verse.translations[0].text}</div>
    </div>
  );
};

export default Verse;
