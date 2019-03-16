import React from 'react';
import ApiServices from './services/api';
import Logo from './UI/Logo';
import SurasList from './components/SurasList';
import Footer from './components/Footer';

const App = () => {
  const Api = new ApiServices();

  return (
    <div className="app">
      <Logo />
      <SurasList items={Api.getSurahList()} />
      <Footer />
    </div>
  );
};

export default App;
