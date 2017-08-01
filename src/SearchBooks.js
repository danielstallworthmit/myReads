import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

export default class SearchBooks extends React.Component {
    static PropTypes = {
        books: PropTypes.array.isRequired,
        searchBooks: PropTypes.func.isRequired,
        removeBooks: PropTypes.func.isRequired,
        updateBooks: PropTypes.func.isRequired
    }

    state = {
        query: '',
        maxResults: 20
    }

    updateQuery = (query) => {
        this.props.searchBooks(query.trim(), this.state.maxResults);
    }  // Trim search results and send them to API search function

    render() {
        const {books, removeBooks, updateBooks} = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' onClick={() => removeBooks()} className='close-search'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            onChange={(event) => this.updateQuery(event.target.value)}
                            placeholder="Search by title or author"
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books && books.map((book, index) => (
                            <Book
                                key={book.id + index}
                                bookAuthor={book.authors}
                                bookTitle={book.title}
                                image={
                                    book.imageLinks ?
                                        `url("${book.imageLinks.smallThumbnail}")`
                                        :
                                        ''
                                }
                                bookUpdate={updateBooks}
                                book={book}
                                bookShelf={book.shelf}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }  // Call removeBooks when go back to main page, call updateQuery when searching,
        // Render list of matching books when the search returns an array of books
        // Search returns some duplicates, so added the index to make unique keys
}