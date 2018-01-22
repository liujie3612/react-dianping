import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import CityHeader from "../../components/CityHeader";
import CurrentCity from "../../components/CurrentCity";
import CityList from "../../components/CityList";

import * as userInfoActionsFromOtherFile from '../../actions/userinfo'

import localStore from '../../util/localStore'
import { CITYNAME } from '../../config/localStoreKey'
import './style.less'


class City extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div>
        <CityHeader title='选择城市' />
        <CurrentCity cityName={this.props.userinfo.cityName} />
        <CityList changeFn={(newCity) => this.changeCity(newCity)} />
      </div>
    )
  }

  changeCity(newCity) {
    if (newCity == null) {
      return
    }
    // 修改redux
    const userinfo = this.props.userinfo
    userinfo.cityName = newCity
    this.props.userInfoActions.update(userinfo)

    //修改localstorage
    localStore.setItem(CITYNAME, newCity)

    // 跳转页面
    hashHistory.push('/')

  }

  // componentDidMount() {
  //   console.log(this.props.userinfo)
  //   console.log(this.props.userInfoActions)
  // }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(City)
