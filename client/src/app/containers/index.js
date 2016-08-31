import React from 'react'
import { render } from 'react-dom'

import { Router, Route, browserHistory, IndexRoute } from 'react-router'

//导航列表
import App from './src/App'
//首页
import Home from './src/Home'
//恶童安利
import Etong from './src/Etong'
//发现页
import Find from './src/Find'
//专题页
import Topic from './src/Topic'
//专题页中的第二个专题
import TopicTwo from './src/TopicTwo'
//第二个专题中大家的推荐
import OtherRecommend from './src/OtherRecommend'
//登录页
import Login from './src/Login'
//卖安利页
import Sellanli from './src/Sellanli'

//主样式
import './src/styles/main.css'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/find" component={Find} />
        <Route path="/topic" component={Topic} />
        <Route path='/topic/topic2' component={TopicTwo}/>
        <Route path='/topic/other' component={OtherRecommend} />
        <Route path="/login" component={Login} />
        <Route path="/sellanli" component={Sellanli} />
    </Route>
  </Router>
), document.getElementById('app'));

