import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

import { dateConvert } from '../../../common/date'


export default class AccountList extends Component<any, any> {
  static defaultProps = {
    list: {}
  }
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() { }

  shortDate(str: string): string {
    if (dateConvert(str, 'yyyy') == dateConvert(Date.now(), 'yyyy')) return dateConvert(str, 'MM月dd日 w')
    return dateConvert(str, 'yyyy年MM月dd日 w')
  }

  render() {
    const { list } = this.props
    const keys = Object.keys(list).reverse()
    return (
      keys.map(key => (
        <View key={key} className='list'>
          <View className='list-title' data-key={key} >
            <Text>{this.shortDate(key)}</Text>
            <Text>{list[key].count}</Text>
          </View>
          <View className='list-content'>
            {
              list[key].items.map((e, j) => (
                <View key={j} className='list-item right'>
                  <View>{e.inputValue}</View>
                  <View className='money'>{e.money}</View>
                </View>
              ))
            }
          </View>
        </View>
      ))
    )
  }
}