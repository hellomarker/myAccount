import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, MovableArea, MovableView } from '@tarojs/components'
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
    if (dateConvert(str, 'YYYY') == dateConvert(Date.now(), 'YYYY')) return dateConvert(str, 'MM月DD日 w')
    return dateConvert(str, 'YYYY年MM月DD日 w')
  }

  x = 0
  onTouchStart(e) {
    this.x = e.changedTouches[0].pageX
  }
  onTouchEnd(e, month, day, j) {
    const { list } = this.state
    if (this.x > e.changedTouches[0].pageX + 5) list[month].items[day].items[j].x = 0
    else list[month].items[day].items[j].x = 100
    if (this.x < e.changedTouches[0].pageX - 5) list[month].items[day].items[j].x = 100
    else list[month].items[day].items[j].x = 0
    this.setState({ list })
  }

  onDelete(month, day, j) {
    const { list } = this.state
    const item = list[month].items[day].items[j]
    if (item.billType) {
      list[month].sCount -= item.money
      list[month].items[day].sCount -= item.money
    } else {
      list[month].zCount -= item.money
      list[month].items[day].zCount -= item.money
    }
    list[month].items[day].items.splice(j, j + 1)
    this.setState({ list }, () => Taro.setStorageSync('list', list))
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
              <View>
                {list[month].sCount != undefined && <Text>收入: {list[month].sCount}&#12288;</Text>}
                {list[month].zCount != undefined && <Text>支出: {list[month].zCount}</Text>}
              </View>
            </View>
            {
              dayKeys.map(day => (
                <View key={day}>
                  <View className='list-day-title' data-key={day} >
                    <Text>{this.shortDate(day)}</Text>
                    <Text>
                      {list[month].items[day].sCount && <Text>收入: {list[month].items[day].sCount}&#12288;</Text>}
                      {list[month].items[day].zCount && <Text>支出: {list[month].items[day].zCount}</Text>}
                    </Text>
                  </View>
                  <MovableArea className='list-content'>
                    {
                      list[month].items[day].items.map((item, j) => (
                        <MovableView className='list-item' direction='horizontal' inertia outOfBounds damping={50} x={item.x ? item.x : 100} key={item}
                          onTouchStart={(e) => this.onTouchStart(e)}
                          onTouchEnd={(e) => this.onTouchEnd(e, month, day, j)}
                        >
                          <Text className='content'>{item.content}</Text>
                          <Text className='money'>{(item.billType ? '+' : '-') + item.money}</Text>
                          <View className='absolute'>
                            <Text className='cancel' onClick={(e) => this.onDelete(month, day, j)}>删除</Text>
                          </View>
                        </MovableView>
                      ))
                    }
                  </MovableArea>
                </View>
              ))
            }
          </View>
        )
      })
    )
  }
}