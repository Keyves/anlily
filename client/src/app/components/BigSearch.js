import React from 'react'
import '../styles/BigSearch.scss'

class BigSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <form action="" className="search-bg">
            <input type="text" className="form-control search-content" placeholder="搜索内容" />
            <button className="search-btn"><i className="fa fa-search fa-2x" ></i></button>
        </form>
        )
    }
}

export default BigSearch;