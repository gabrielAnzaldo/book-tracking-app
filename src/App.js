import React from 'react'
import { Route, Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import Book from './Book'
import SearchPage from './SearchPage'
import './App.css'

class BooksApp extends React.Component {

  state = {
    currentlyReading: {
      shelfTitle: 'Currently Reading',
      shelfBooks: []
    },
    wantToRead: {
      shelfTitle: 'Want to Read',
      shelfBooks: []
    },
    read: {
      shelfTitle: 'Read',
      shelfBooks: []
    }
  }

  onChangeShelf = (targetShelfName, book) => {
    const originShelfName = book.bookReference.currentBookShelf
    if (originShelfName !== targetShelfName && targetShelfName !== 'none') {
      let originShelf = Object.assign({}, this.state[originShelfName])
      originShelf.shelfBooks = originShelf.shelfBooks.filter(bookItem => bookItem.id !== book.bookReference.id)
      let targetShelf = this.state[targetShelfName]
      targetShelf.shelfBooks.push(Object.assign({}, book.bookReference, { shelf: targetShelfName }))

      this.setState({
        [originShelfName]: originShelf,
        [targetShelfName]: targetShelf
      })

      BooksAPI.update(book.bookReference, targetShelfName)
        .then(() => console.log("Book's shelf updated"))
    }
  }

  updateShelfState = (data, shelfName) => {
    this.setState({
      [shelfName]: Object.assign({}, this.state[shelfName], { shelfBooks: data })
    })
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(allBooks => {
        if (allBooks && allBooks.length) {
          let tempCurrentlyReading = [], tempWantToRead = [], tempRead = []
          allBooks.forEach((item) => {
            switch (item.shelf) {
              case 'currentlyReading':
                tempCurrentlyReading.push(item)
                break
              case 'wantToRead':
                tempWantToRead.push(item)
                break
              case 'read':
                tempRead.push(item)
                break
              default:
                console.log('none')
            }
          })
          this.updateShelfState(tempCurrentlyReading, 'currentlyReading')
          this.updateShelfState(tempWantToRead, 'wantToRead')
          this.updateShelfState(tempRead, 'read')
        }
      })
  }

  updateSelectedBooks = selectedBooks => {
    Object.keys(selectedBooks).forEach(property => {
      selectedBooks[property].forEach(newBook => {
        BooksAPI.update(newBook, property)
          .then(() => console.log("Book's shelf updated"))
      })
      this.updateShelfState(selectedBooks[property].concat(this.state[property].shelfBooks), property)
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={({ history }) => (
          <SearchPage onAddBooksShelfs={newBooks => {
            this.updateSelectedBooks(newBooks)
            history.push('/')
          }} />
        )} />

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {Object.keys(this.state).map((shelf, index) => (
                  <div className="bookshelf" key={index}>
                    <h2 className="bookshelf-title">{this.state[shelf].shelfTitle}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state[shelf].shelfBooks.map((singleBook, index) => (
                          <Book key={index}
                            {...singleBook}
                            onChangeShelf={this.onChangeShelf}
                            currentBookShelf={shelf} />
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
