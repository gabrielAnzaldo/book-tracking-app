import React from 'react';
import PropTypes from 'prop-types';

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
        <div key={author.id} className="book-authors">{author}</div>
      ))}
    </div>
  </li>
);

Book.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageLinks: PropTypes.shape({
    smallThumbnail: PropTypes.string.isRequired,
  }).isRequired,
};

export default Book;
