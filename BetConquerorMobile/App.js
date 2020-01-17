/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends React.Component {

  state = {
    input: '',
    response: '',
  }

  constructor(props) {
    super(props)
  }

  _sendMessage() {
    this._client.send(this.state.input);
  }

  _changeText(text) {
    this.setState({ input: text });
  }

  componentDidMount() {
    this._client = new WebSocket('ws://10.212.120.221:8080/ping')
    this._client.onopen = () => {
      console.log("IS connected to server")
      this.ready = true
    };

    this._client.onmessage = (e) => {
      this.setState({ response: e.data })
      console.log("New message from serveur" + e.data);
    };

    this._client.onerror = (e) => {
      // an error occurred
      console.log(e.message);
    };

    this._client.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason);
    };
  }


  render() {
    const msg = this.state.input;

    return (
      <View>
        <Text>Test Web socket</Text>
        <View style={{ flexDirection: 'row', width: window.width, margin: 10, padding: 4, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#888', borderRadius: 10, backgroundColor: "#fff" }}>
          <View style={{ flex: 4 }} >
            <TextInput
              onChangeText={this._changeText.bind(this)}
              style={{ backgroundColor: 'transparent' }}
            />
          </ View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={this._sendMessage.bind(this)}
              style={this.props.style} >
              <Text>Envoyer</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text>Reponse WEB socket : {this.state.response}</Text>
      </View>

    );

  }

};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
