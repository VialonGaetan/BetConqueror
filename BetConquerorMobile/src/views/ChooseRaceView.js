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
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import GameWebSocket from '../services/GameWebSocket';
import {StackActions, NavigationActions} from 'react-navigation';
import FrenchIcon from '../../assets/icons/FrenchIcon.png';
import EspagnolIcon from '../../assets/icons/EspagnolIcon.png';
import OlmequesIcon from '../../assets/icons/OlmequesIcon.png';
import MayaIcon from '../../assets/icons/MayaIcon.png';
import Race from '../models/race';
import War from '../models/war';

export class ChooseRaceView extends React.Component {
  static navigationOptions = {
    title: 'Choix de la classe',
    headerLeft: () => null,
  };

  state = {
    races: this.props.navigation.getParam('races'),
    yourRace: undefined,
    showModal: false,
  };

  constructor(props) {
    super(props);
    this._client = GameWebSocket.getInstance();
    this._defineOnMessage();
  }

  _defineOnMessage() {
    this._client._client.onmessage = e => {
      //alert(JSON.stringify(e));
      console.log(e);
      if (e.data !== undefined) {
        const data = JSON.parse(e.data);
        if (data.response === 'OK') {
          this.setState({showModal: true});
        } else if (data.response === 'RACE_SELECTED') {
          let newRaces = this.state.races;
          console.log(this._client.playerID);
          data.races.forEach((raceResponse, index) => {
            newRaces.find(race => race.name === raceResponse.name).available =
              raceResponse.available;

            if (raceResponse.playerID === this._client.playerID) {
              newRaces.find(
                race => race.name === raceResponse.name,
              ).isMine = true;
            } else {
              newRaces.find(
                race => race.name === raceResponse.name,
              ).isMine = false;
            }
          });
          this.setState({races: newRaces});
        } else if (data.response === 'GAME_START') {
          this.props.navigation.navigate('WaitingWar');
        } else if (data.response === 'KO') {
          if (data.reason === 'FULL') {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'Home'})],
            });
            this.props.navigation.dispatch(resetAction);
            //this.props.navigation.navigate("Home")
          }
        }

        //alert(JSON.stringify(this.state.races))
      }
    };
  }

  renderRace(race, index) {
    let borderColor = 'green';
    if (!race.available) {
      borderColor = 'red';
    }
    if (race.isMine) {
      borderColor = 'blue';
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '2%',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            const request = {
              request: 'CHOOSE_ROLE',
              race: race.name,
              username: this._client.username,
            };
            race.available = !race.available;
            this._client.sendMessage(request);
          }}>
          <Image
            source={this.getIconFromRaceName(race.name)}
            style={{
              width: 100,
              height: 100,
              borderWidth: 2,
              borderColor: borderColor,
              borderRadius: 50,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  //TODO set image path directly from server
  getIconFromRaceName(raceName) {
    switch (raceName) {
      case 'Francais':
        return FrenchIcon;
      case 'Espagnol':
        return EspagnolIcon;
      case 'Olmeques':
        return OlmequesIcon;
      case 'Maya':
        return MayaIcon;
      default:
        return FrenchIcon;
    }
  }

  renderNumberOfReady() {
    return this.state.races.filter(race => race.available == false).length;
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View
          style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 30}}>
            Veuillez choisir votre classe
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 30}}>
            {this._client.username}
          </Text>
        </View>

        <View style={{flex: 0.8}}>
          <FlatList
            style={{flex: 0.7}}
            data={this.state.races}
            renderItem={({item, index}) => this.renderRace(item, index)}
            keyExtractor={item => item.name}
          />
          <Text
            style={{
              flex: 0.3,
              fontWeight: 'bold',
              alignSelf: 'center',
              fontSize: 30,
            }}>
            {this.renderNumberOfReady()}/4
          </Text>
        </View>
      </View>
    );
  }
}
