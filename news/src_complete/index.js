import React from 'react'
import {render} from 'react-dom'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import MediaQuery from 'react-responsive'
import App from './components/app'
import NewsContainer from './components/news_container'
import NewsDetail from './components/news_detail'
import UserCenter from './components/user_center'


render((
  <div>
    <MediaQuery query='(min-device-width: 1224px)'>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={NewsContainer}></IndexRoute>
          <Route path='/news_detail/:uniquekey/:type' component={NewsDetail}></Route>
          <Route path='/user_center' component={UserCenter}></Route>
        </Route>
      </Router>
    </MediaQuery>
    <MediaQuery query='(max-device-width: 1224px)'>
      <div>手机界面</div>
    </MediaQuery>
  </div>
), document.getElementById('root'))
