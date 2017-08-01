import React from 'react'
import PropTypes from 'react-router-dom'

export default class BookShelfChanger extends React.Component {
    static PropTypes = {
        selectVal: PropTypes.string.isRequired,
        selectUpdate: PropTypes.func.isRequired
    }

    handleChange = (event) => {
        this.props.selectUpdate(this.props.book, event.target.value);
    }

    render() {
        let {selectVal} = this.props;
        selectVal = selectVal ? selectVal : 'none';
        return (
            <div className="book-shelf-changer">
                <select value={selectVal} onChange={this.handleChange}>
                    <option value="none" disabled>Move To...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
} 