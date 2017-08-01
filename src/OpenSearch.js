import React from 'react'
import {Link} from 'react-router-dom'

export default class OpenSearch extends React.Component {
    render() {
        return (
            <div className="open-search">
                <Link to='/search'>Add a Book</Link>
            </div>
        )
    }
} 