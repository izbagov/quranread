import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import ChapterFull from './components/ChapterFull';
import Contacts from './components/Contacts';
import Credits from './components/Credits';
import ShowVerse from './components/ShowVerse';
import Footer from './UI/Footer';
import Header from './UI/Header';

const Application = () => (
  <Router>
    <>
      <Header />

      <Route exact path="/" component={Home} />
      <Route exact path="/:id(\d+)" component={ChapterFull} />
      <Route exact path="/:id(\d+)/:verse(\d+)" component={ShowVerse} />
      <Route exact path="/contacts" component={Contacts} />
      <Route exact path="/credits" component={Credits} />

      <Footer />
    </>
  </Router>
);

export default Application;
