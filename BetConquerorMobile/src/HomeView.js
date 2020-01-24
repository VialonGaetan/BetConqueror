/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    View,
    Text,
    StatusBar,
    TextInput,
    Button,
    TouchableOpacity,
    ImageBackground
} from 'react-native';


export class HomeView extends React.Component {

    static navigationOptions = {
        headerShown: false,
    };

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

        return (
            <ImageBackground style={{ width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center' }} source={require('./../assets/fond3.jpg')} >
                <Text style={{ color: 'white', fontSize: 46, marginBottom: '50%', marginTop: '10%' }}>
                    Bet Conqueror
                </Text>
                <Text style={{ color: 'white', fontSize: 26, marginBottom: '20%', textAlign: 'center' }}>
                    Pour rejoindre une partie scanner le QRcode de la table
                </Text>
                <Button title="Rejoindre une partie" onPress={() => this.props.navigation.navigate("Scan")} />

            </ImageBackground>

        );

    }

};
