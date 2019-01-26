import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import BooksApp from './components/BooksApp';

ReactDOM.render(
  <BrowserRouter basename="/"><BooksApp /></BrowserRouter>,
  document.getElementById('root'),
);
