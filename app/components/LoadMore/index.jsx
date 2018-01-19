import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadMore extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div className='load-more' ref='wrapper'>
        {
          this.props.isLoadingMore
            ? <span>加载中...</span>
            : <span onClick={() => this.loadMoreHandle()}>加载更多...</span>
        }
      </div>
    )
  }

  loadMoreHandle() {
    // 执行传输过来的
    this.props.loadMoreFn();
  }

  componentDidMount() {
    //函数节流
    let timeoutId
    const loadMoreFn = this.props.loadMoreFn
    const wrapper = this.refs.wrapper

    window.addEventListener('scroll', () => {
      if (this.props.isLoadingMore) {
        return
      }
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        //获取距离顶部的距离
        const top = wrapper.getBoundingClientRect().top
        // console.log(top)
        const windowHeight = window.screen.height
        //当wrapper被滚动到暴露在页面可视范围之内
        if (top && top < windowHeight) {
          loadMoreFn()
        }
      }, 50);
    }, false)
  }
}

export default LoadMore
