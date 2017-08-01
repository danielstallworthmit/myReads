import React from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

export default class MainPage extends React.Component {
    static PropTypes = {
        mainBooks: PropTypes.array.isRequired,
        updateBooks: PropTypes.func.isRequired
    }
    render() {
        const {mainBooks, updateBooks} = this.props
        return (
            <div>
                <BookShelf mainBooks={mainBooks} updateBooks={updateBooks} title="Currently Reading" bookShelf="currentlyReading" />
                <BookShelf mainBooks={mainBooks} updateBooks={updateBooks} title="Want to Read" bookShelf="wantToRead" />
                <BookShelf mainBooks={mainBooks} updateBooks={updateBooks} title="Read" bookShelf="read" />
            </div>
        )
    }  // MainPage creates 3 BookShelves with corresponding titles and maps to value on BookShelfChanger
}