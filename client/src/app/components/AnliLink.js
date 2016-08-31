import React from 'react'
import { Link } from 'react-router'

export default class AnliLink extends  React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <Link to={this.props.imageData.path}><img src={this.props.imageData.imageURL} alt="anli" /></Link>
            </div>
        )
    }
}
