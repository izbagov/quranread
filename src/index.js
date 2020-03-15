import React from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';
import App from './App';
// import AppProduction from './AppProduction';

render(<App />, document.getElementById('root'));

// SEO

// const rootElement = document.getElementById('root');
// if (rootElement.hasChildNodes()) {
//   hydrate(<Application />, rootElement);
// } else {
//   render(<Application />, rootElement);
// }
