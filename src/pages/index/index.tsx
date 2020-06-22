import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'

import AccountList from '../../components/index/accountList/index'
import AddPopups from '../../components/index/addPopups/index'
import { dateConvert } from '../../common/date'

interface State {
  isShowAddPopups: boolean
  list: {}
}

export default class Index extends Component<any, State> {

  constructor(props) {
    super(props)
    this.state = {
      isShowAddPopups: false,
      list: {}
    }
  }

  componentWillMount() {
    this.setState({
      list: Taro.getStorageSync('list')
    })
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
    navigationBarTitleText: '记账⑧'
  }

  add(obj) {
    const { list } = this.state
    const dateKey = dateConvert(obj.datetime, 'YYYY/MM/DD')
    if (!list[dateKey]) {
      list[dateKey] = { items: [], sCount: 0, zCount: 0 }
    }
    list[dateKey].items.unshift(obj)
    if (obj.billType)
      list[dateKey].sCount += obj.money
    else
      list[dateKey].zCount += obj.money
    this.setState({ list: { ...list } }, () => Taro.setStorageSync('list', this.state.list))
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
