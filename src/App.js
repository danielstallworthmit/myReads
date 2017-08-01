import React from 'react'
import {Route} from 'react-router-dom'
import SearchBooks from './SearchBooks'
import MainPage from './MainPage'
import PageTitle from './PageTitle'
import OpenSearch from './OpenSearch'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    mainBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(mainBooks => {
      this.setState({mainBooks});
    })
  }

  bookSync = (searchBooks, mainBooks) => {
    return searchBooks.map(sb => {
      sb.shelf = 'none';
      mainBooks.map(b => {
        if (sb.id === b.id) {
          sb.shelf = b.shelf;
        }
      })
      return sb;
    })
  }

  searchBooks = (query, maxResults) => {
    BooksAPI.search(query, maxResults).then((searchedBooks) => {
      if (searchedBooks instanceof Array) {
        const searchedBooksShelved = this.bookSync(searchedBooks, this.state.mainBooks);
        this.setState({books: searchedBooksShelved});
      } else {
        this.setState({books: []});
      }
    })
  }

  // mapShelfFunc = (books, book, shelf)

  updateBooks = (book, shelf) => {
    BooksAPI.update(book, shelf).then(mainBook => {
      let stateCheck = 0;
      let searchedBooks = []
      const updatedMainBooks = this.state.mainBooks.map(b => {
        if (b.id === mainBook.id) {
          b.shelf = shelf;
          stateCheck = 1;
        }
        return b;
      })
      if (stateCheck === 1) {
        updatedMainBooks = updatedMainBooks.concat([book]);
      }
      if (this.state.books && this.state.books.length > 0) {
        searchedBooks = this.state.books.map(b => {
          if (b.id === mainBook.id) {
            b.shelf = shelf;
          }
          return b;
        })
      }
      this.setState({mainBooks: updatedMainBooks, books: searchedBooks});
    })
  }

  removeSearchedBooks = () => {
    this.setState({books: []})
  }

  render() {
    const {books, mainBooks} = this.state
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <searchBooks
            books={books}
            searchBooks={this.searchBooks}
            removeBooks={this.removeSearchedBooks}
            updateBooks={this.updateBooks} 
          />
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-content">
              <div>
                <PageTitle heading="MyReads" />
                <MainPage
                  updateBooks={this.updateBooks}
                  mainBooks={mainBooks}
                />
              </div>
            </div>
            <OpenSearch />
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
