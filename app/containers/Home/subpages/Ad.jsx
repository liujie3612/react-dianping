import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getAdData } from '../../../fetch/home/home.js'
import HomeAd from '../../../components/HomeAd/index'

class Ad extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: []
    }
  }
  render() {
    return (
      <div>
        {this.state.data.length ? <HomeAd data={this.state.data} /> : <div>loading</div> }
      </div>
    )
  }

  componentDidMount() {
    const result = getAdData()
    result.then((res) => {
      return res.json()
    }).then((json) => {
      if (json.length !== 0) {
        this.setState({
          data: json
        })
      }
    })
  }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export
export default Ad
// module.exports = NotFound
