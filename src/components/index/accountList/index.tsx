import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class AccountList extends Component<any, any> {
  constructor(props) {
    super(props)
  }
  render() {
    return (<View className='list'>
      {/* 时间 内容 金额 */}
      <View className='list-title'>时间</View>
      {
        this.props.list.map((e, i) => (
          <View key={i} className='list-item'>
            <Text>{e}</Text>
            <Text>金额</Text>
          </View>
        ))
      }
    </View>)
  }
}