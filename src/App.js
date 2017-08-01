import React from 'react'
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
    return (
      <div className="app">

      </div>
    )
  }
}

export default BooksApp
