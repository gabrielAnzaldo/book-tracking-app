import React from 'react';

import BookShelfChanger from './BookShelfChanger';

const Book = () => (
  <li>
    <div className="book">
      <div className="book-top">
        {this.props && this.props.imageLinks && <div
          className="book-cover"
          style={{ width: 128, height: 193, backgroundImage: `url(${this.props.imageLinks.smallThumbnail})` }}
        />}
        <BookShelfChanger
          onChangeShelf={this.props.onChangeShelf}
          bookReference={this.props}
        />
      </div>
      <div className="book-title">{this.props.title}</div>
      {this.props.authors && this.props.authors.map(author => (
        <div key={author.id} className="book-authors">{author}</div>
      ))}
    </div>
  </li>
);

export default Book;
