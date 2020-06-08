import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import './index.scss'

interface Props {
  isShow: boolean
  hide: Function
  submit: Function
}
interface State {
}

export default class AddPopups extends Component<Props, State> {
  static defaultProps = {
    isShow: false
  }
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const { isShow, submit } = this.props
    return (
      <View className={`popups ${isShow ? 'show' : ''}`}>
        <Input
          placeholder='要记什么？'
          focus={isShow}
          onBlur={this.props.hide.bind(this)}
          onConfirm={e => submit(e.detail.value.trim())}
        ></Input>
        <View className='input-item'>

        </View>
      </View>
    )
  }
}