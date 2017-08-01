import React from 'react'
import {Route} from 'react-router-dom'
import SearchBooks from './SearchBooks'
import MainPage from './MainPage'
import PageTitle from './PageTitle'
import OpenSearch from './OpenSearch'
import * as BooksAPI from './BooksAPI'
import './App.css'

// State and API Logic for the MyReads app

class BooksApp extends React.Component {
  state = {
    books: [],
    mainBooks: []
  } // Set state for books on main page and search page as 
    // search page books change frequently and main page books do not

  componentDidMount() {
    BooksAPI.getAll().then(mainBooks => {
      this.setState({mainBooks});
    })
  }  // Get books from API when page is refreshed and accessed

  bookSync = (searchBooks, mainBooks) => {
    return searchBooks.map(sb => {
      sb.shelf = 'none';
      mainBooks.map(b => {
        if (sb.id === b.id) {
          sb.shelf = b.shelf;
        }
        return b;
      })
      return sb;
    })
  }  // Searched books have wrong shelves when pulled from API, 
      // so have to make sure to sync shelf with main page book shelf
      // Used in searchBooks function below

  searchBooks = (query, maxResults) => {
    BooksAPI.search(query, maxResults).then((searchedBooks) => {
      if (searchedBooks instanceof Array) {
        const searchedBooksShelved = this.bookSync(searchedBooks, this.state.mainBooks);
        this.setState({books: searchedBooksShelved});
      } else {
        this.setState({books: []});
      }
    })
  }  // Get the books that match the query from the API and sync them with main page books 
      // to get the correct shelf
      // Only want to do sync if query actually returns something

  updateBooks = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      let stateCheck = 0;
      let searchedBooks = []
      let updatedMainBooks = this.state.mainBooks.map(b => {
        if (b.id === book.id) {
          b.shelf = shelf;
          stateCheck = 1;
        }
        return b;
      })
      if (stateCheck === 0) {
        updatedMainBooks = updatedMainBooks.concat([book]);
      }
      if (this.state.books && this.state.books.length > 0) {
        searchedBooks = this.state.books.map(b => {
          if (b.id === book.id) {
            b.shelf = shelf;
          }
          return b;
        })
      }
      this.setState({mainBooks: updatedMainBooks, books: searchedBooks});
    })
  }  // Update the API for a specific book when its shelf is changed, 
      // then update the state for main page books 
      // If the book is already in state, change that book's shelf
        // otherwise add the book to the main page books state
      // If searched books are returned change the shelf for the state accordingly

  removeSearchedBooks = () => {
    this.setState({books: []})
  }  // Remove searched books when go back to the main page

  render() {
    const {books, mainBooks} = this.state
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks
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
}  // Route to either main page or search page based on url
    // search renders SearchBooks component and / renders MainPage component

export default BooksApp
