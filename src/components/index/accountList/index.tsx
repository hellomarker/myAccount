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
    const monthkeys = Object.keys(list).reverse()
    return (
      monthkeys.map(month => {
        const dayKeys = Object.keys(list[month].items).reverse()
        return (
          <View key={month} className='list'>
            <View className='list-month-title' data-key={month} >
              <Text>{dateConvert(month, "M")}月</Text>
              <Text>
                {list[month].sCount && <Text>收入: {list[month].sCount}&#12288;</Text>}
                {list[month].zCount && <Text>支出: {list[month].zCount}</Text>}
              </Text>
            </View>
            {
              dayKeys.map(day => (
                <View key={day}>
                  <View className='list-day-title' data-key={day} >
                    <Text>{this.shortDate(day)}</Text>
                    <Text>
                      {list[month].items[day].sCount && <Text>收入: {list[month].items[day].sCount}&#12288;</Text>}
                      {list[month].items[day].zCount && <Text> 支出: {list[month].items[day].zCount}</Text>}
                    </Text>
                  </View>
                  <View className='list-content'>
                    {
                      list[month].items[day].items.map((e, j) => (
                        <View key={j} className='list-item'>
                          <View className='left'>
                            <Text className='content'>{e.content}</Text>
                            <Text className='money'>{(e.billType ? '+' : '-') + e.money}</Text>
                          </View>
                          {/* <Text className='icon'>{e.billType ? '收' : '支'}</Text> */}
                        </View>
                      ))
                    }
                  </View>
                </View>
              ))
            }
          </View>
        )
      })
    )
  }
}