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
    date: string
    nodate: boolean
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
      tags: { date: '', nodate: false, money: 0 },
    }
  }

  onInput(e) {
    const inputValue = e.detail.value.trim(), tags = { ...this.state.tags }
    const datetime = matchDate(inputValue), money = machMoney(inputValue)
    if (datetime) tags.date = dateConvert(datetime, 'YYYY年MM月DD日 HH:mm')
    if (money) {
      tags.money = money
      debugger
    }
    this.setState({ inputValue, tags, })
  }

  maskHide(e) {
    if (e.target.id == 'mask') this.props.onHide()
  }

  render() {
    const { isShow, onSubmit } = this.props
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
            onConfirm={e => onSubmit(e.detail.value.trim())}
          ></Input>
          <View className='input-list'>
            {tags.date && <View className={tags.nodate ? '' : 'active'} onClick={() => this.setState({ tags: { ...tags, nodate: !tags.nodate } })}>{tags.date}</View>}
            {tags.money && <View>{tags.money}</View>}
          </View>
        </View>
      </View >
    )
  }
}