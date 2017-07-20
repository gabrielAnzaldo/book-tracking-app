import React, { Component } from 'react'

class BookShelfChanger extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'none'
    }
  }
  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.value}
          onChange={(event) => this.props.onChangeShelf(event.target.value, this.props)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookShelfChanger