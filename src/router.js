import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import ChapterFull from './components/ChapterFull';
import Footer from './UI/Footer';
import Header from './UI/Header';

const Application = () => (
  <Router>
    <div>
      <Header />

      <Route exact path="/" component={Home} />
      <Route path="/:id" component={ChapterFull} />

      <Footer />
    </div>
  </Router>
);

export default Application;
