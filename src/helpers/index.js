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

export default {
  playAudio
};
