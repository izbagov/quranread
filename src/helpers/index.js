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

export default {
  playAudio,
  getRandomSuraNumber
};
