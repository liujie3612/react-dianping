import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class CityList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      cityList: ['北京', '上海', '杭州', '广州', '苏州', '深圳', '南京', '天津', '重庆', '厦门', '武汉', '西安']
    };
  }

  render() {
    var cityList = this.state.cityList;
    return (
      <div className="city-list-container">
        <h3>城市列表</h3>
        <ul className="clear-fix">
          {
            cityList.map((ele, i) => {
              return <li key={i}>
                <span onClick={() => this.clickHandle(ele)}>{ele}</span>
              </li>
            })
          }
        </ul>
      </div>
    )
  }
  clickHandle(value) {
    const changeFn = this.props.changeFn
    changeFn(value)
  }
}

export default CityList
