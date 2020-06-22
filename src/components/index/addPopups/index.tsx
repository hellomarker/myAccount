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
    moneyMatch: string
    billType: boolean
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
      tags: { datetime: 0, money: 0, match: '', moneyMatch: '', billType: false },
    }
  }

  onInput(e) {
    let inputValue: string = e.detail.value.trim(), tags = { ...this.state.tags }
    const matchObj = matchDate(inputValue), moneyObj = machMoney(inputValue)
    tags = { ...tags, ...matchObj }
    if (moneyObj) tags = { ...tags, ...moneyObj }
    else tags.money = 0
    this.setState({ inputValue, tags, })
  }
  onConfirm() {
    let { tags, inputValue } = this.state
    inputValue = inputValue.replace(tags.match, '')
    inputValue = inputValue.replace(tags.moneyMatch, '')
    if (!tags.datetime) tags.datetime = Date.now()
    this.props.onSubmit({ inputValue, ...tags })
    this.setState({ inputValue: '', tags: { datetime: 0, money: 0, match: '', moneyMatch: '', billType: false } })
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