import React, {Component} from 'react'
import {Text, View} from 'react-native'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    const { items } = this.props
    
    const Items = items.map(i => <Text>{i}</Text>)
    return (
      <View>
        <Text>HELLLLLO</Text>
        <Items />
      </View>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    items: state.items,
  }
}

export default connect(mapStateToProps)(App);