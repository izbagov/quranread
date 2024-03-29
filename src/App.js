import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import ChapterFull from './components/ChapterFull';
import Contacts from './components/Contacts';
import Credits from './components/Credits';
import Friends from './components/Friends';
import ShowVerse from './components/ShowVerse';
import ShowRangeVerse from './components/ShowRangeVerse';
import NoMatch from './components/NoMatch';
import Footer from './UI/Footer';
import Header from './UI/Header';
import './global.scss';

const App = () => {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:id(\d+)" component={ChapterFull} />
          <Route exact path="/:id(\d+)/:verse(\d+)" component={ShowVerse} />
          <Route
            exact
            path="/:id(\d+)/:verseFirst(\d+)-:verseSecond(\d+)"
            component={ShowRangeVerse}
          />
          <Route exact path="/contacts" component={Contacts} />
          <Route exact path="/credits" component={Credits} />
          <Route exact path="/links" component={Friends} />
          <Route exact path="*" component={NoMatch} />
        </Switch>
        <Footer />
      </>
    </Router>
  );
};

export default App;
