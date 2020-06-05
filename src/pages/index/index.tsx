import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'

import AccountList from '../../components/index/accountList/index'
import AddPopups from '../../components/index/addPopups/index'

export default class Index extends Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      isShowAddPopups: false,
      list: ['你好']
    }
  }

  componentWillMount() { }

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

  render() {
    const { isShowAddPopups, list } = this.state
    return (
      <View className='page'>
        {/* TODO 账目列表 */}
        <AccountList list={list}></AccountList>
        {/* TODO 一个浮动的添加按钮 */}
        <View className='bottom-fixed'>
          <Text className='icon-add' onClick={() => this.setState({ isShowAddPopups: !isShowAddPopups })}></Text>
        </View>
        {/* TODO 添加浮框 */}
        <AddPopups isShow={isShowAddPopups} hide={() => this.setState({ isShowAddPopups: false })} submit={e => this.setState({ list: [...list, e] })}></AddPopups>
      </View>
    )
  }
}
