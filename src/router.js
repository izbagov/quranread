import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './App';
import SuraFull from './components/SuraFull';
import Footer from './UI/Footer';
import Header from './UI/Header';

const Application = () => (
  <Router>
    <div>
      <Header />

      <Route exact path="/" component={Home} />
      <Route path="/:id" component={SuraFull} />

      <Footer />
    </div>
  </Router>
);

export default Application;
