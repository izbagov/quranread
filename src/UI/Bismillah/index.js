import React from 'react';

const Bismillah = ({ chapter }) => {
  if (+chapter === 1 || +chapter === 9) return null;

  return (
    <div
      id="bismillah"
      className="bismillah text-center word-font"
      style={{ textAlign: 'center' }}
      title="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
    >
      ﷽
    </div>
  );
};

export default Bismillah;
