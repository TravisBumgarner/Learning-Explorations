/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, View, Button} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  state = {
    placeName: ''
  }

  handleChange = placeName => {
    this.setState({placeName})
  }

  handleSubmit = () => {
    const {placeName} = this.state
    alert(placeName)
    this.setState({placeName: ''})
  }



  render() {
    return (
      <View style={styles.container}>
        <TextInput style={{width: 300, borderColor: "black", borderWidth: 1}} placeholder="Hi!" value={this.state.placeName} onChangeText={this.handleChange}/>
        <Button
          onPress={this.handleSubmit}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
      />  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
