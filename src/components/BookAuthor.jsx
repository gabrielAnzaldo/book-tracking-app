import React from 'react';
import PropTypes from 'prop-types';

const BookAuthor = ({ author }) => (
  <div className="book-authors">
    {author}
  </div>
);

BookAuthor.propTypes = {
  author: PropTypes.string.isRequired,
};

export default BookAuthor;
