import React from 'react'
import PropTypes from 'prop-types'

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
    }  // onChange sends the target value to App.js to call the update function 
        // and change the book shelf to the correct value
        // selectVal prop comes from the shelf property of the book
} 