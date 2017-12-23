import React from 'react';
import PropTypes from 'prop-types';

import BooksList from './BooksList';

const Shelf = ({ keyShelf, shelfData, onChangeShelf }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{shelfData.shelfTitle}</h2>
    <div className="bookshelf-books">
      <BooksList
        shelfName={keyShelf}
        shelfBooks={shelfData.shelfBooks}
        onChangeShelf={onChangeShelf}
      />
    </div>
  </div>
);

Shelf.propTypes = {
  keyShelf: PropTypes.string.isRequired,
  shelfData: PropTypes.shape({
    shelfTitle: PropTypes.string,
    shelfBooks: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default Shelf;
