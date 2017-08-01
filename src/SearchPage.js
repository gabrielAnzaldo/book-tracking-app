import React, { Component } from 'react'

import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resultingBooks: []
    }
  }

  selectedBooks = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    this.inputSearch.focus();
  }

  onChangeSearchQuery = event => {
    const query = event.target.value
    const allExistingBooks = this.props.existingBooks['currentlyReading'].shelfBooks
      .concat(this.props.existingBooks['wantToRead'].shelfBooks)
      .concat(this.props.existingBooks['read'].shelfBooks)

    if (query) {
      BooksAPI.search(query, 20)
        .then(response => {
          if (response && response.length) {
            this.setState({
              resultingBooks: response.map(item => {
                const bookIndex = allExistingBooks.findIndex(bookItem => bookItem.id === item.id)
                if (bookIndex >= 0) {
                  return Object.assign({}, item, { shelf: allExistingBooks[bookIndex].shelf })
                } else {
                  return item
                }
              })
            })
          }
        })
    } else {
      this.setState({ resultingBooks: [] })
    }
  }

  onChangeShelf = (targetShelfName, book) => {
    if (targetShelfName !== 'none') {
      let tempShelfBooks = this.selectedBooks[targetShelfName]
      const bookIndex = tempShelfBooks.findIndex(item => item.id === book.bookReference.id)
      if (bookIndex < 0) {
        tempShelfBooks.push(Object.assign({}, book.bookReference, { shelf: targetShelfName }))
      } else {
        tempShelfBooks[bookIndex].shelf = targetShelfName
      }
      this.selectedBooks[targetShelfName] = tempShelfBooks
    }
  }

  onChangeRoute = () => {
    this.props.onAddBooksShelfs(this.selectedBooks)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" style={{ cursor: 'pointer' }} onClick={this.onChangeRoute}>
            Back home
          </a>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"
              value={this.state.value}
              onKeyUp={event => this.onChangeSearchQuery(event)}
              ref={(input) => { this.inputSearch = input; }} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.resultingBooks.map((singleBook, index) => (
              <Book key={index} {...singleBook} onChangeShelf={this.onChangeShelf} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage