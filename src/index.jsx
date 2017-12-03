import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import BooksApp from './BooksApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter><BooksApp /></BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
