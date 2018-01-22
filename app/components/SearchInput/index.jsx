import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class SearchInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      value: ''
    }
  }
  render() {
    const data = this.props.data
    return (
      <input
        type="text"
        placeholder="请输入关键字"
        value={this.state.value}
        onChange={(e) => this.ChangeHandle(e)}
        onKeyUp={(e) => this.KeyUpHandle(e)}/>
    )
  }

  componentDidMount() {
    // 默认值
    this.setState({
      value: this.props.value || ''
    })
  }

  ChangeHandle(e) {
    // 监控变化
    this.setState({
      value: e.target.value
    })
  }

  KeyUpHandle(e) {
    // 监控 enter 事件
    if (e.keyCode !== 13) {
      return
    }
    // console.log(this.state.value)
    this.props.enterHandle(this.state.value)
  }
}

export default SearchInput
