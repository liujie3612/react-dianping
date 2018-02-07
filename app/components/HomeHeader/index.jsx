import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router-dom'
import SearchInput from '../SearchInput'

import './style.less'

class HomeHeader extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div id="home-header" className="clear-fix">
        <div className="home-header-left float-left">
          {/* 监听的哈希的变化，不会改变真正url，改变相应的ui */}
          <Link to='/city'>
            <span>{this.props.cityName}</span>&nbsp;
            <i className="icon-angle-down"></i>
          </Link>
        </div>
        <div className="home-header-right float-right">
          <Link to='/Login'>
            <i className="icon-user"></i>
          </Link>
        </div>

        <div className="home-header-middle">
          <div className="search-container">
            <i className="icon-search"></i>
            &nbsp;
            <SearchInput value="" enterHandle={(value) => this.enterHandle(value)} />
          </div>
        </div>
      </div>
    )
  }

  enterHandle(value) {
    this.props.history.push('/search/all/' + encodeURIComponent(value))
    // console.log(value)
  }

}

export default HomeHeader
