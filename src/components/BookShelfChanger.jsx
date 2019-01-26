import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookShelfChanger extends Component {
  onChangeHandler = (event) => {
    this.props.onChangeShelf(event.target.value, this.props);
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select
          value={this.props.bookReference.shelf}
          onChange={this.onChangeHandler}
        >
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

BookShelfChanger.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  bookReference: PropTypes.shape({
    shelf: PropTypes.string,
  }).isRequired,
};

export default BookShelfChanger;
