import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'

import AccountList from '../../components/index/accountList/index'
import AddPopups from '../../components/index/addPopups/index'
import { dateConvert } from '../../common/date'

interface State {
  isShowAddPopups: boolean
  list: List,
}
interface List {
  items: {}
  sCount: Number
  zCount: Number
}

export default class Index extends Component<any, State> {

  constructor(props) {
    super(props)
    this.state = {
      isShowAddPopups: false,
      list: {},
    }
  }

  componentWillMount() {
    const list = Taro.getStorageSync('list')
    this.setState({ list })
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '秒记账'
  }

  add(obj) {
    const { list } = this.state
    const monthKey = dateConvert(obj.datetime, 'YYYY/MM')
    const dayKey = dateConvert(obj.datetime, 'YYYY/MM/DD')
    // 计算月和日的支出收入
    if (!list[monthKey]) {
      list[monthKey] = { items: {}, sCount: 0, zCount: 0 }
    }
    Taro.showModal({ content: JSON.stringify(list) })
    if (!list[monthKey].items[dayKey]) {
      list[monthKey].items[dayKey] = { items: [], sCount: 0, zCount: 0 }
    }
    list[monthKey].items[dayKey].items.unshift(obj)
    if (obj.billType) {
      list[monthKey].sCount += obj.money
      list[monthKey].items[dayKey].sCount += obj.money
    } else {
      list[monthKey].zCount += obj.money
      list[monthKey].items[dayKey].zCount += obj.money
    }
    this.setState({ list }, () => Taro.setStorageSync('list', list))
  }

  render() {
    const { isShowAddPopups, list } = this.state
    return (
      <View className='page'>
        {/*  账目列表 */}
        <AccountList list={list}></AccountList>
        {/*  一个浮动的添加按钮 */}
        <View className='bottom-fixed'>
          <Text className='icon-add' onClick={() => this.setState({ isShowAddPopups: !isShowAddPopups })}></Text>
        </View>
        {/*  添加浮框 */}
        <AddPopups isShow={isShowAddPopups} onHide={() => this.setState({ isShowAddPopups: false })} onSubmit={this.add.bind(this)}></AddPopups>
      </View>
    )
  }
}
