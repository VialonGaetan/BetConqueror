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
import GameWebSocket from '../services/GameWebSocket';

class WarComponent extends React.Component {
  constructor(props) {
    super(props);
    this._client = GameWebSocket.getInstance();
  }

  state = {
    betValue: 0,
    hasBet: this.props.war.hasBet,
  };

  handleOnPress() {
    let request = {
      request: 'BET',
      userId: this._client.playerID,
      warId: this.props.war.id,
      amount: this.state.betValue,
    };
    console.log(request);
    this._client.sendMessage(request);
    this.setState({hasBet: true});
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

  renderBetInput() {
    if (!this.state.hasBet) {
      return (
        <View>
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
        </View>
      );
    }
    return (
      <View>
        <Text>
          Mise envoyée ! En attente de la fin du tour de guerres pour les
          résultats ...
        </Text>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView>
        <Text style={{alignSelf: 'center'}}>
          War :{' '}
          {this.props.war.players.map((player, index) => {
            if (index === this.props.war.players.length - 1) {
              return player.username;
            }
            return player.username + ' VS ';
          })}
        </Text>
        {this.renderBetInput()}
      </SafeAreaView>
    );
  }
}

export default WarComponent;
