import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'


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

  render() {
    const { list } = this.props
    const keys = Object.keys(list)
    return (
      keys.map((key, i) => (
        <View key={i} className='list'>
          <View className='list-title' data-key={key} >
            <Text>{key}</Text>
          </View>
          <View className='list-content'>
            {
              list[key].map((e, j) => (
                <View key={j} className='list-item right'>
                  <View>{e.inputValue}</View>
                  <View className='money'>{e.money}元</View>
                </View>
              ))
            }
          </View>
        </View>
      ))
    )
  }
}