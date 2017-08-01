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
      this.setState({mainBooks})
    })
  }

  bookSync = (searchBooks, mainBooks) => {
    return searchBooks.map(sb => {
      sb.shelf = 'none'
      mainBooks.map(b => {
        if (sb.id === b.id) {
          sb.shelf = b.shelf
        }
      })
      return sb
    })
  }

  render() {
    return (
      <div className="app">
        
      </div>
    )
  }
}

export default BooksApp
