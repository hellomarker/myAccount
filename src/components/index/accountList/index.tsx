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
      showState: {}
    }
  }

  componentWillMount() {
    const keys = Object.keys(this.props.list)
    const showState = {}
    keys.forEach(e => showState[e] = { title: true })
    this.setState({ showState })
  }

  onChangeTitle(e) {
    const { showState } = this.state
    console.log(e.target.dataset)
    showState[e.target.dataset.key].title = !showState[e.target.dataset.key].title
    this.setState({ showState: { ...showState, } })
  }

  render() {
    const { list } = this.props
    const { showState } = this.state
    const keys = Object.keys(list)
    return (
      keys.map((key, i) => (
        <View key={i} className='list'>
          <View className='list-title' data-key={key} onClick={this.onChangeTitle.bind(this)}>
            <Text>{key}</Text>
            <Text>{list[key].length}<Text className={`${showState[key].title ? 'down' : ''} iconfont icon-jiantoushang`}></Text></Text>
          </View>
          <View className='list-content'>
            {
              list[key].map((e, j) => (
                <View key={j} className='list-item'>
                  <Text>{e.inputValue}</Text>
                  <Text>{e.money}</Text>
                </View>
              ))
            }
          </View>
        </View>
      ))
    )
  }
}