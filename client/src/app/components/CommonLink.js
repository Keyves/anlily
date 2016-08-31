import React from 'react'
import { Link } from 'react-router'

//鼠标移上转换图片的链接

class CommonLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: this.props.imageData.imageURL1
        }

        this.handleLeave = this.handleLeave.bind(this);
        this.handleOver = this.handleOver.bind(this);
    }

    handleOver() {
        this.setState ({
            img: this.props.imageData.imageURL2
        });
    }

    handleLeave() {
        this.setState ({
            img: this.props.imageData.imageURL1
        });
    }

    render() {
        return (
            <Link to={this.props.imageData.path}><img src={this.state.img} alt="link" onMouseOver={this.handleOver} onMouseLeave={this.handleLeave}/></Link>
        )
    }
}

export default CommonLink;