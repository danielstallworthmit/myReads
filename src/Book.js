import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

export default class Book extends React.Component {
    static PropTypes = {
        bookTitle: PropTypes.string.isRequired,
        bookAuthor: PropTypes.array.isRequired,
        image: PropTypes.string.isRequired,
        bookShelf: PropTypes.string.isRequired,
        bookUpdate: PropTypes.func.isRequired,
        book: PropTypes.object.isRequired
    }

    render() {
        const {bookAuthor, bookTitle, image, bookShelf, bookUpdate, book} = this.props;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                            style={{width: 128, height: 193, backgroundImage: image}}></div>
                        <BookShelfChanger
                            book={book}
                            selectVal={bookShelf}
                            selectUpdate={bookUpdate}
                        />
                    </div>
                    <div className="book-title">{bookTitle}</div>
                    <div className="book-authors">{bookAuthor}</div>
                </div>
            </li>
        )
    }  // Each book has a BookShelfChanger to switch book shelves
} 