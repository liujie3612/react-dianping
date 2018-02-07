import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import * as storeActionsFromFile from '../../../actions/store'
import BuyAndStore from '../../../components/BuyAndStore'

class Buy extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      isStore: false
    }
  }

  render() {
    return (
      <div>
        <BuyAndStore
          isStore={this.state.isStore}
          buyHandle={() => this.buyHandle()}
          storeHandle={() => this.storeHandle()} />
      </div>
    )
  }

  componentDidMount() {
    console.log(this.props)
    // console.log(this.props.store)
    // console.log(this.props.storeActions)
    this.checkStoreState()
  }

  checkStoreState() {
    const id = this.props.id
    const store = this.props.store
    console.log(store)
    store.some(item => {
      if (item.id == id) {
        this.setState({
          isStore: true
        })
        // 跳出循环
        return true
      }
    })
  }

  buyHandle() {
    // 验证登录，未登录则retur
    const loginFlag = this.loginCheck()

    if (!loginFlag) {
      return
    }
    // 此过程为模拟购买，因此可省去复杂的购买过程

    // 跳转到用户主页
    this.props.history.push('/User')
  }

  storeHandle() {
    const loginFlag = this.loginCheck()
    if (!loginFlag) {
      return
    }
    const id = this.props.id
    const storeActions = this.props.storeActions
    if (this.state.isStore) {
      //取消收藏
      storeActions.rm({ id: id })
    } else {
      //点击收藏
      storeActions.add({ id: id })
    }

    //修改状态
    this.setState({
      isStore: !this.state.isStore
    })
  }

  // 检查登录状态
  loginCheck() {
    const id = this.props.id
    const userinfo = this.props.userinfo
    // 跳转到登录页面的时候，要传入目标router，以便登录完了可以自己跳转回来
    if (!userinfo.username) {
      this.props.history.push('/Login/' + encodeURIComponent('/detail/' + id))
      return false
    }
    return true
  }
}

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo,
    store: state.store
  }
}

function mapDispatchToProps(dispatch) {
  return {
    storeActions: bindActionCreators(storeActionsFromFile, dispatch)
  }
}
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Buy))
