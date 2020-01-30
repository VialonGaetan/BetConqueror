/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import GameWebSocket from './services/GameWebSocket';

import {
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

export class HomeView extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    input: '',
    response: '',
  };

  constructor(props) {
    super(props);
  }

  _sendMessage() {
    this._client.send(this.state.input);
  }

  _changeText(text) {
    this.setState({input: text});
  }

  render() {
    return (
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        source={require('./../assets/fond3.jpg')}>
        <Text
          style={{
            color: 'white',
            fontSize: 46,
            marginBottom: '50%',
            marginTop: '10%',
          }}>
          Bet Conqueror
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 26,
            marginBottom: '20%',
            textAlign: 'center',
          }}>
          Pour rejoindre une partie scanner le QRcode de la table
        </Text>
        <Button
          title="Rejoindre une partie"
          onPress={() => this.props.navigation.navigate('Scan')}
        />

        <Button
          title="Skip scan"
          onPress={async () => {
            let socket = GameWebSocket.getInstance();
            await socket.start('ws://localhost:8080/game');
            if (socket.isConnected) {
              this.props.navigation.navigate('ChooseName');
            } else {
            }
          }}
        />
      </ImageBackground>
    );
  }
}
