import React from 'react'
import { Link } from 'react-router'
import CommonLink from './components/CommonLink'
//导航栏样式
import './styles/nav.scss'

/*组件结构
* -App
*  -Logo
*  -SearchBar
*  -NavLink
*/

//logo
class Logo extends React.Component {
    render() {
        return (
            <div className="logo-wrapper">
                <Link to="/" onlyActiveOnIndex className="main-logo pull-left">Home</Link>
                <span className="pull-right">推我所爱，寻你所想</span>
            </div>
        )
    }
}

//搜索栏
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className="form-inline">
                <button type="button" className="my-search-btn">t</button>
                <div className="select-area">
                    <select name="" id="" className="select-list">
                        <option value="">作品</option>
                        <option vale="">发布者</option>
                        <option value="">类型</option>
                        <option value="">专题</option>
                        <option value="">超冷门</option>
                    </select>
                    <input type="text" className="search-input" placeholder="搜索"/>
                </div>
            </form>
        )
    }
}

//导航链接
class NavLink extends React.Component {
    render() {
        return (
            <ul className="main-nav">
                <li><Link to="/find" className="link link-find"></Link></li>
                <li><Link to="/topic" className="link link-topic"></Link></li>
                <li><Link to="/login" className="link link-login"></Link></li>
                <li><Link to="/sellanli" className="link link-sellanli"></Link></li>
            </ul>
        )
    }
}


class App extends React.Component {
    render() {
        return (
                <div>
                    <div className="app-container">
                        <Logo/>
                        <SearchBar className="searchBar"/>
                        <NavLink/>
                    </div>

                    {this.props.children}
                </div>
        )
    }
}

export default App;