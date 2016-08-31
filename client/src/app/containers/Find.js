import React from 'react'
import BigSearch from './components/BigSearch'
import './styles/find.scss'

class Find extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrapper">
                <div className="find-banner">
                    <BigSearch />
                </div>
            </div>
        )
    }
}

export default Find;