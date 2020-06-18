import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input, Label } from '@tarojs/components'
import './index.scss'

import { dateConvert, matchDate } from '../../../common/date'
import { machMoney } from '../../../common/money'

interface Props {
  isShow: boolean
  onHide: Function
  onSubmit: Function
}
interface State {
  inputValue: string
  tags: {
    datetime: number
    match: string
    money: Number
  }
}

export default class AddPopups extends Component<Props, State> {
  static defaultProps = {
    isShow: false
  }
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      tags: { datetime: 0, money: 0, match: '' },
    }
  }

  onInput(e) {
    let inputValue = e.detail.value.trim(), tags = { ...this.state.tags }
    const matchObj = matchDate(inputValue), money = machMoney(inputValue)
    tags = { ...tags, ...matchObj }
    if (money) tags.money = money
    else tags.money = 0
    this.setState({ inputValue, tags, })
  }
  onConfirm() {
    const { tags, inputValue } = this.state
    if (!tags.datetime) tags.datetime = Date.now()
    this.props.onSubmit({ inputValue, ...tags })
  }

  maskHide(e) {
    if (e.target.id == 'mask') this.props.onHide()
  }

  render() {
    const { isShow } = this.props
    const { tags, inputValue } = this.state
    return (
      <View id='mask' className={`mask ${isShow ? 'show' : ''}`} onClick={this.maskHide}>
        <View className={`popups `} >
          <Input
            placeholder='要记什么？'
            focus={isShow}
            value={inputValue}
            // onBlur={this.props.hide.bind(this)}
            onInput={this.onInput}
            onConfirm={this.onConfirm}
          ></Input>
          <View className='input-list'>
            <View className={tags.match ? '' : 'gray'}><Text className='iconfont icon-rili'></Text>{tags.match}</View>
            <View className={tags.money ? '' : 'gray'}><Text className='iconfont icon-jine'></Text>{tags.money ? tags.money : ''}</View>
          </View>
        </View>
      </View >
    )
  }
}