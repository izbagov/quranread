import chapters from '../data/chapters';

export const playAudio = (wordAudio, currentAudio, setActiveAudio, setCurrentAudio, id) => {
  if (currentAudio) {
    currentAudio.pause();
    setActiveAudio(null);
  }

  setActiveAudio(id);
  const audio = new Audio(wordAudio);
  setCurrentAudio(audio);
  audio.play();
  audio.addEventListener('ended', () => {
    setCurrentAudio(null);
    setActiveAudio(null);
  });
};

export function getRandomSuraNumber() {
  return Math.ceil(0 + Math.random() * (114 - 0));
}

export function generateTitle(chapterId, first, last) {
  let title = '';

  if (first) {
    title = `${first} аят`;
  }

  if (last) {
    title = `с ${first} по ${last} аят`;
  }

  return `Сура ${chapters[chapterId - 1].text.translit} (${
    chapters[chapterId - 1].text.name
  }) ${title} - Quran Read`;
}

export default {
  playAudio,
  getRandomSuraNumber,
  generateTitle
};
