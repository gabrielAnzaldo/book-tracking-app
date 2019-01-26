import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

const BooksList = ({ shelfName, shelfBooks, onChangeShelf }) => (
  <ol className="books-grid">
    {shelfBooks.map(singleBook => (
      <Book
        key={singleBook.id}
        {...singleBook}
        onChangeShelf={onChangeShelf}
        currentBookShelf={shelfName}
      />
    ))}
  </ol>
);

BooksList.propTypes = {
  shelfName: PropTypes.string.isRequired,
  shelfBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default BooksList;
