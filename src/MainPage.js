import React from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

export default class MainPage extends React.Component {
    static PropTypes = {
        mainBooks: PropTypes.array.isRequired,
        updatedBooks: PropTypes.func.isRequired
    }
    render() {
        const {mainBooks, updatedBooks} = this.props
        return (
            <div>
                <BookShelf mainBooks={mainBooks} updatedBooks={updatedBooks} title="Currently Reading" bookShelf="currentlyReading" />
                <BookShelf mainBooks={mainBooks} updatedBooks={updatedBooks} title="Want to Read" bookShelf="wantToRead" />
                <BookShelf mainBooks={mainBooks} updatedBooks={updatedBooks} title="Read" bookShelf="read" />
            </div>
        )
    }
} 