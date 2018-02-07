import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import HomeHeader from '../../components/HomeHeader'
import Category from '../../components/Category'
import Ad from './subpages/Ad'
import List from './subpages/List'

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div>
        <HomeHeader cityName={this.props.userinfo.cityName} history={this.props.history} />
        <Category></Category>
        <div style={{ height: '15px' }}></div>
        <Ad />
        <List cityName={this.props.userinfo.cityName} />
      </div>
    )
  }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home))
