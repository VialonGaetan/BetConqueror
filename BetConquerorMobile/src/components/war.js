import React, {useState, Component} from 'react';
import upIcon from '../../assets/icons/up_icon.png';
import downIcon from '../../assets/icons/down_icon.png';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';

class WarComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    betValue: 0,
  };

  handleOnPress() {
    console.log(betValue);
  }

  handleOnKeyPress(e) {
    const {key} = e.nativeEvent;
    if (key === 'Backspace') {
      const newValue = this.state.betValue.toString().slice(0, -1);
      this.setState({betValue: newValue});
      return;
    }
    if (isNaN(parseInt(key))) {
      return;
    }
    this.setState({betValue: this.state.betValue + parseInt(key)});
  }

  onMinusPress() {
    if (this.state.betValue <= 0) {
      return;
    }
    this.setState({betValue: this.state.betValue - 1});
  }

  onPlusPress() {
    this.setState({betValue: this.state.betValue + 1});
  }

  render() {
    return (
      <SafeAreaView>
        <Text>Play Component</Text>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <TextInput
            style={{
              borderWidth: 3,
              borderColor: 'grey',
              alignSelf: 'center',
              padding: 5,
            }}
            keyboardType={'numeric'}
            value={'' + this.state.betValue}
            onKeyPress={this.handleOnKeyPress.bind(this)}
          />
          <View style={{flexDirection: 'column', padding: 10}}>
            <TouchableOpacity onPress={this.onPlusPress.bind(this)}>
              <Image source={upIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onMinusPress.bind(this)}>
              <Image source={downIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={this.handleOnPress.bind(this)}>
          <Text>Miser</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default WarComponent;
