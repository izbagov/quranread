import React from 'react';
import SurasListData from './data/suras';
import SurasList from './components/SurasList';

const App = () => {
  return (
    <div className="app">
      <SurasList items={SurasListData} />
    </div>
  );
};

export default App;
