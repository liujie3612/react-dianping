import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../containers/Home'
import Login from '../containers/Login'
import City from '../containers/City'
import Search from '../containers/Search'
import Detail from '../containers/Detail'
import User from '../containers/User'
import NotFound from '../containers/404'

export default class SubRouter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Switch>
        {/* 准确命中 */}
        <Route exact path="/" component={Home} />
        <Route path="/city" component={City} />
        <Route path="/login/:router?" component={Login} />
        <Route path="/user" component={User} />
        <Route path="/search/:category/:keyword?" component={Search} />
        <Route path="/detail/:id" component={Detail} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}
