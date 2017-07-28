import React, { Component } from 'react'

import BookShelfChanger from './BookShelfChanger'

class Book extends Component {

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={{ width: 128, height: 193, backgroundImage: `url(${this.props.imageLinks.smallThumbnail})` }}>
            </div>
            <BookShelfChanger
              onChangeShelf={this.props.onChangeShelf}
              bookReference={this.props} />
          </div>
          <div className="book-title">{this.props.title}</div>
          {this.props.authors && this.props.authors.map((author, index) => (
            <div key={index} className="book-authors">{author}</div>
          ))}
        </div>
      </li>
    )
  }
}

export default Book