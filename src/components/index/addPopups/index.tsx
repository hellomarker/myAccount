import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input, Switch } from '@tarojs/components'
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
  content: string
  tags: {
    datetime: number
    matchDate: string
    money: Number
    matchMoney: string
    billType: boolean
    reason: boolean
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
      content: "",
      tags: { datetime: 0, money: 0, matchDate: '', matchMoney: '', billType: false, reason: true },
    }
  }

  componentDidMount() {
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
    let { tags, inputValue, content } = this.state
    content = inputValue.replace(tags.matchDate, '')
    content = content.replace(tags.matchMoney, '')
    if (!tags.datetime) tags.datetime = Date.now()
    this.props.onSubmit({ inputValue, content, ...tags })
    this.setState({ inputValue: '', content: '', tags: { ...tags, datetime: 0, money: 0, matchDate: '', matchMoney: '', billType: false } })
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
          {
            isShow &&
            <Input
              placeholder='要记什么？'
              focus={isShow}
              value={inputValue}
              onInput={this.onInput}
              onConfirm={this.onConfirm}
            ></Input>
          }
          <View className='input-list'>
            <View className={tags.matchDate ? '' : 'gray'}><Text className='iconfont icon-rili'></Text>{tags.matchDate}</View>
            <View className={tags.money ? '' : 'gray'}><Text className='iconfont icon-jine'></Text>{tags.money ? tags.money : ''}</View>
            <Switch className={`Switch ${tags.reason ? '' : 'red'}`} onChange={() => this.setState({ tags: { ...tags, reason: !tags.reason } })} checked={tags.reason}>{tags.reason ? '理性消费' : '非理性消费'}</Switch>
          </View>
        </View>
      </View >
    )
  }
}