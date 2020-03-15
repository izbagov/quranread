import React from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';
import 'intersection-observer';
import App from './App';

render(<App />, document.getElementById('root'));

// SEO

// const rootElement = document.getElementById('root');
// if (rootElement.hasChildNodes()) {
//   hydrate(<Application />, rootElement);
// } else {
//   render(<Application />, rootElement);
// }
