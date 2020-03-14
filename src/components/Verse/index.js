import React, { useState } from 'react';
import s from './Verse.module.scss';
import { ReactComponent as IconPlay } from '../../assets/play.svg';
import { ReactComponent as IconPause } from '../../assets/pause.svg';
import { AUDIO_FILE_URL } from '../../constants';
import { playAudio } from '../../helpers';

const Verse = ({
  verse,
  currentAudio,
  setCurrentAudio,
  wordAudio,
  setWordAudio,
  activeAudio,
  setActiveAudio
}) => {
  console.log('verse', verse);

  const wordPlayAudio = (wordAudio, id) => {
    if (wordAudio) {
      playAudio(wordAudio, currentAudio, setActiveAudio, setCurrentAudio, id);
    }
  };

  const playVerse = verse => {
    if (verse.verse_key === activeAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
      setActiveAudio(null);
    } else {
      const chapterNum = String(verse.chapter_id).padStart(3, 0);
      const verseNum = String(verse.verse_number).padStart(3, 0);
      playAudio(
        `${AUDIO_FILE_URL}/${chapterNum}${verseNum}.mp3`,
        currentAudio,
        setActiveAudio,
        setCurrentAudio,
        verse.verse_key
      );
    }
  };

  const verseClasses = word =>
    `${word.class_name} ${word.char_type} ${s.word} ${activeAudio === word.id ? s.activeWord : ''}`;

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
      <div className={s.playAyat} onClick={() => playVerse(verse)}>
        {verse.verse_key !== activeAudio ? <IconPlay /> : <IconPause />}
      </div>
    </div>
  );
};

export default Verse;
