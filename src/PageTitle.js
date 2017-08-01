import React from 'react'
import PropTypes from 'prop-types'

export default class PageTitle extends React.Component {
    static PropTypes = {
        title: PropTypes.string.isRequired
    }
    render() {
        return (
            <div className="list-books-title">
                <h1>{this.props.heading}</h1>
            </div>
        )
    }
} 