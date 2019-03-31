import React from 'react';
import s from './Verse.module.scss';

const Verse = verse => {
  const wordPlayAudio = wordAudio => {
    if (wordAudio) {
      const audio = new Audio(wordAudio);
      audio.play();
    }
  };

  return (
    <div className={s.container}>
      <div className={s.number}>{verse.verse_number}</div>
      <div className={s.arabic}>
        {verse.words.map(word => (
          <div
            key={word.id}
            className={`${word.class_name} ${word.char_type} ${s.word} `}
            dangerouslySetInnerHTML={{ __html: word.code }}
            onClick={() => wordPlayAudio(word.audio.url)}
          />
        ))}
      </div>
      <div className={s.translation}>{verse.translations[0].text}</div>
    </div>
  );
};

export default Verse;
