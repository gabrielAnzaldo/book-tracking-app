import React from 'react';
import { Route, Link } from 'react-router-dom';
import uuidv4 from 'uuid/v4';

import * as BooksAPI from '../services/api/BooksAPI';
import Shelf from './Shelf';
import SearchPage from './SearchPage';
import '../components/styles/index.css';

class BooksApp extends React.Component {
  state = {
    currentlyReading: {
      shelfTitle: 'Currently Reading',
      shelfBooks: [],
      id: 0,
    },
    wantToRead: {
      shelfTitle: 'Want to Read',
      shelfBooks: [],
      id: 1,
    },
    read: {
      shelfTitle: 'Read',
      shelfBooks: [],
      id: 2,
    },
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((allBooks) => {
        if (allBooks && allBooks.length) {
          const tempCurrentlyReading = [];
          const tempWantToRead = [];
          const tempRead = [];
          allBooks.forEach((item) => {
            switch (item.shelf) {
              case 'currentlyReading':
                tempCurrentlyReading.push(item);
                break;
              case 'wantToRead':
                tempWantToRead.push(item);
                break;
              case 'read':
                tempRead.push(item);
                break;
              default:
                console.log('none');
            }
          });
          this.updateShelfState(tempCurrentlyReading, 'currentlyReading');
          this.updateShelfState(tempWantToRead, 'wantToRead');
          this.updateShelfState(tempRead, 'read');
        }
      });
  }

  onChangeShelf = (targetShelfName, book) => {
    const originShelfName = book.bookReference.currentBookShelf;
    if (originShelfName !== targetShelfName && targetShelfName !== 'none') {
      const originShelf = Object.assign({}, this.state[originShelfName]);
      originShelf.shelfBooks = originShelf.shelfBooks
        .filter(bookItem => bookItem.id !== book.bookReference.id);
      const targetShelf = this.state[targetShelfName];
      targetShelf.shelfBooks
        .push(Object.assign({}, book.bookReference, { shelf: targetShelfName }));

      this.setState({
        [originShelfName]: originShelf,
        [targetShelfName]: targetShelf,
      });

      BooksAPI.update(book.bookReference, targetShelfName)
        .then(() => console.log("Book's shelf updated"));
    }
  }

  updateShelfState = (data, shelfName) => {
    this.setState({
      [shelfName]: Object.assign({}, this.state[shelfName], { shelfBooks: data }),
    });
  }

  updateSelectedBooks = (selectedBooks) => {
    Object.keys(selectedBooks).forEach((property) => {
      selectedBooks[property].forEach((newBook) => {
        BooksAPI.update(newBook, property)
          .then(() => console.log("Book's shelf updated"));
      });
      this.updateShelfState(selectedBooks[property]
        .concat(this.state[property].shelfBooks), property);
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={({ history }) => (
            <SearchPage
              onAddBooksShelfs={(newBooks) => {
                this.updateSelectedBooks(newBooks);
                history.push('/');
              }}
              existingBooks={this.state}
            />
          )}
        />

        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {Object.keys(this.state).map(shelf => (
                    <Shelf
                      key={uuidv4()}
                      keyShelf={shelf}
                      shelfData={this.state[shelf]}
                      onChangeShelf={this.onChangeShelf}
                    />
                  ))}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search" href>Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
