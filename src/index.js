import React from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';
import Application from './router';

import './global.scss';

ReactDOM.render(<Application />, document.getElementById('root'));

// SEO

// const rootElement = document.getElementById('root');
// if (rootElement.hasChildNodes()) {
//   hydrate(<Application />, rootElement);
// } else {
//   render(<Application />, rootElement);
// }
