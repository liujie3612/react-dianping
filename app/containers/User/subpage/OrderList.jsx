import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getOrderListData, postComment } from '../../../fetch/user/orderlist'

import OrderListComponent from '../../../components/OrderList'
import './style.less'

class OrderList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: []
    }
  }
  render() {
    return (
      <div className="order-list-container">
        <h2>您的订单</h2>
        {
          this.state.data.length ?
            <OrderListComponent data={this.state.data} submitComment={(id, value, callback) => this.submitComment(id, value, callback)} />
          : <div>{/* loading */}</div>
        }
      </div>
    )
  }
  componentDidMount() {
    // 获取订单数据
    const username = this.props.username
    if (username) {
      this.loadOrderList(username)
    }
  }

  loadOrderList(username) {
    const result = getOrderListData(username)
    result.then(res => {
      return res.json()
    }).then(json => {
      // console.log(json)
      this.setState({
        data: json
      })
    })
  }

  // 提交评价
  submitComment(id, value, callback) {
    console.log(id, value, callback)
    const result = postComment(id, value)
    result.then(res => {
      return res.json()
    }).then(json => {
      console.log(json)
      if (json.errno === 0) {
        // 已经评价，修改状态
        callback()
      }
    })
  }
}

export default OrderList
