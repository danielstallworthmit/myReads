import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

export default class BookShelf extends React.Component {
    static PropTypes = {
        mainBooks: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        bookShelf: PropTypes.string.isRequired,
        updateBooks: PropTypes.func.isRequired
    }

    render() {
        const {mainBooks, title, bookShelf, updateBooks} = this.props
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{title}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {mainBooks
                                .filter(book => book.shelf === bookShelf)
                                .map((book, index) => (
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
                                        bookShelf={bookShelf}
                                    />
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }  // Each BookShelf contains Books that have a shelf property which match that bookshelf
}