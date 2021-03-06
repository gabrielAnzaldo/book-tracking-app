import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import BookAuthor from './BookAuthor';
import BookShelfChanger from './BookShelfChanger';

const Book = props => (
  <li>
    <div className="book">
      <div className="book-top">
        {props && props.imageLinks && <div
          className="book-cover"
          style={{ width: 128, height: 193, backgroundImage: `url(${props.imageLinks.smallThumbnail})` }}
        />}
        <BookShelfChanger
          onChangeShelf={props.onChangeShelf}
          bookReference={props}
        />
      </div>
      <div className="book-title">{props.title}</div>
      {props.authors && props.authors.map(author => (
        <BookAuthor key={uuidv4()} author={author} />
      ))}
    </div>
  </li>
);

Book.defaultProps = {
  authors: [],
};

Book.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  imageLinks: PropTypes.shape({
    smallThumbnail: PropTypes.string.isRequired,
  }).isRequired,
};

export default Book;
