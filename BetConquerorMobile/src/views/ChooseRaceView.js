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
    Button,
    FlatList,
    CheckBox
} from 'react-native';
import GameWebSocket from '../services/GameWebSocket';
import { StackActions, NavigationActions } from 'react-navigation';

export class ChooseRaceView extends React.Component {

    state = {
        races: [],
        selected: [false, false, false, false],
        yourRace: undefined,
        showModal: false
    }



    constructor(props) {
        super(props);
        this._client = GameWebSocket.getInstance();

    }

    _getRaceAvailable() {
        console.log("getRACE")
        let request = { request: "JOIN_GAME" }
        this._client.sendMessage(request);
        this._defineOnMessage();

    }

    _defineOnMessage() {
        this._client._client.onmessage = (e) => {
            //alert(JSON.stringify(e));
            if (e.data !== undefined) {
                if (JSON.parse(e.data).response === "JOIN_GAME") {
                    this.setState({ races: JSON.parse(e.data).races });
                    this.state.selected.map((element, index) => {
                        if (element) {
                            if (!this.state.races[index].available) {
                                this.setState({ selected: [false, false, false, false] })
                            }
                        }
                    })
                } else if (JSON.parse(e.data).response === "OK") {
                    clearInterval(this.interval);
                    this.setState({ showModal: true })
                    this._defineOnMessage();
                } else if (JSON.parse(e.data).response === "GAME_START") {
                    this.props.navigation.navigate("Game")
                } else if (JSON.parse(e.data).response === "KO") {
                    if (JSON.parse(e.data).reason === "FULL") {
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Home' })],
                        });
                        this.props.navigation.dispatch(resetAction);
                        //this.props.navigation.navigate("Home")
                    }
                }


                //alert(JSON.stringify(this.state.races))
            }
        };
    }


    componentDidMount() {
        this._defineOnMessage();
        this._getRaceAvailable();
        this.interval = setInterval(() => this._getRaceAvailable(), 5000);

    }


    componentWillUnmount() {
        clearInterval(this.interval)
    }


    renderRace(race, index) {
        return (
            <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: '2%' }}>
                <Text style={{ marginLeft: '10%' }}>{race.name}</Text>
                <CheckBox style={{ marginRight: '10%' }} disabled={!race.available} value={this.state.selected[index]}
                    onValueChange={() => {
                        let tempSelected = [false, false, false, false];
                        tempSelected[index] = true
                        this.setState({ selected: tempSelected });
                    }} />

            </View>
        )
    }

    validRace() {
        let race = this.state.races[this.state.selected.findIndex(el => el)];
        let request = {
            request: "CHOOSE_ROLE",
            race: race.name.toUpperCase(),
        }
        this._client.sendMessage(request);
        this._defineOnMessage();

    }

    renderModal() {

    }


    render() {

        return (
            <View>
                {this.renderModal()}
                <Text>Veuillez choisir votre classe</Text>

                <FlatList
                    style={{}}
                    data={this.state.races}
                    renderItem={({ item, index }) => this.renderRace(item, index)}
                    keyExtractor={item => item.name}
                />
                <Button
                    title='Valider'
                    onPress={this.validRace.bind(this)}

                />

            </View>

        );

    }

};
