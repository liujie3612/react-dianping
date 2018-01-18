import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getListData } from '../../../fetch/home/home.js'

import ListComponent from '../../../components/List'
import './style.less'

class List extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: [], //存储列表数据
      hasMore: false, //是否还有更多的数据
      page : 1 //首页为0，记录下一页的页码
    }
  }
  render() {
    return (
      <div>
        <h2 className='home-list-title'>猜你喜欢</h2>
        {
          this.state.data.length ? <ListComponent data={this.state.data} /> : <div>加载中...</div>
        }
      </div>
    )
  }
  componentDidMount() {
    this.loadFirstPageData()
  }

  //获取首屏数据
  loadFirstPageData() {
    const cityName = this.props.cityName
    const result = getListData(cityName, 0)
    // console.log(result)
    this.resultHandle(result)
  }

  //数据处理
  resultHandle(result) {
    result.then((res) => {
      return res.json()
    }).then((json) => {
      if (json.length !== 0) {
        const hasMore = json.hasMore
        const data = json.data
        this.setState({
          hasMore: hasMore,
          data: data
        })
      }
    })
  }

}

export default List
