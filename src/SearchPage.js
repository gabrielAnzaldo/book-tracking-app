import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resultingBooks: []
    }
  }

  onChangeSearchQuery = event => {
    const query = event.target.value
    if (query) {
      BooksAPI.search(query, 20)
        .then(response => {
          if (response && response.length) {
            this.setState({ resultingBooks: response })
          } else {
            this.setState({ resultingBooks: [] })
          }
        })
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search"></Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"
              value={this.state.value}
              onKeyUp={event => this.onChangeSearchQuery(event)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.resultingBooks.map((singleBook, index) => (
              <Book key={index} {...singleBook} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage