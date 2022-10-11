import React, { useEffect } from 'react';

const Friends = () => {
  useEffect(() => {
    document.title = 'Полезные ссылки - Quran Read';
  }, []);
  return (
    <div className="page">
      <div className="wrap">
        <div className="page__title">Полезные ссылки</div>
        <h3>Арабский алфавит</h3>
        <p>
          <a href="https://alphabet.quranacademy.org/" target="_blank">https://alphabet.quranacademy.org/</a>
        </p>
      </div>
    </div>
  );
};

export default Friends;
