import React from 'react';
import PropTypes from 'prop-types';

const BookShelfChanger = props => (
  <div className="book-shelf-changer">
    <select
      value={props.bookReference.shelf}
      onChange={event => props.onChangeShelf(event.target.value, this.props)}
    >
      <option value="none" disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  </div>
);

BookShelfChanger.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  bookReference: PropTypes.shape({
    shelf: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookShelfChanger;
