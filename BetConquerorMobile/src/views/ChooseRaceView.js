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

export class ChooseRaceView extends React.Component {
  state = {
    races: [],
    selected: [false, false, false, false],
    yourRace: undefined,
    showModal: false,
  };

  constructor(props) {
    super(props);
    this._client = GameWebSocket.getInstance();
  }

  _getRaceAvailable() {
    console.log('getRACE');
    let request = {request: 'JOIN_GAME'};
    this._client.sendMessage(request);
  }

  _defineOnMessage() {
    this._client._client.onmessage = e => {
      //alert(JSON.stringify(e));
      console.log(e);
      if (e.data !== undefined) {
        const data = JSON.parse(e.data);
        if (data.response === 'JOIN_GAME') {
          let newRaces = [];
          data.races.forEach(race =>
            newRaces.push(new Race(race.available, race.name, race.color)),
          );
          this.setState({races: newRaces});
          this.state.selected.map((element, index) => {
            if (element) {
              if (!this.state.races[index].available) {
                this.setState({selected: [false, false, false, false]});
              }
            }
          });
        } else if (data.response === 'OK') {
          this.setState({showModal: true});
        } else if (data.response === 'RACE_SELECTED') {
          let newRaces = this.state.races;
          newRaces.find(race => data.name === race.name).changeAvailable();
          this.setState({races: newRaces});
        } else if (data.response === 'GAME_START') {
          this.props.navigation.navigate('Game');
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

  componentWillMount() {
    this._defineOnMessage();
    this._getRaceAvailable();
  }

  renderCheckBox(race, index) {
    if (race.available) {
      return (
        <CheckBox
          style={{marginLeft: '10%', marginTop: '10%'}}
          disabled={!race.available}
          onClick={() => {
            var tempsSelected = this.state.selected;
            tempsSelected[index] = !tempsSelected[index];
            this.setState({selected: tempsSelected});
            let request = {request: 'CHOOSE_ROLE', race: race.name};
            this._client.sendMessage(request);
          }}
          isChecked={this.state.selected[index]}
        />
      );
    }
  }

  renderRace(race, index) {
    let borderColor = 'green';
    if (!race.available) {
      borderColor = 'red';
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '2%',
          alignSelf: 'center',
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
        {this.renderCheckBox(race, index)}
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

  validRace() {
    let race = this.state.races[this.state.selected.findIndex(el => el)];
    let request = {
      request: 'CHOOSE_ROLE',
      race: race.name.toUpperCase(),
    };
    this._client.sendMessage(request);
    this._defineOnMessage();
  }

  renderModal() {}

  render() {
    return (
      <View>
        {this.renderModal()}
        <Text>Veuillez choisir votre classe</Text>

        <FlatList
          style={{}}
          data={this.state.races}
          renderItem={({item, index}) => this.renderRace(item, index)}
          keyExtractor={item => item.name}
        />
        <Button title="Valider" onPress={this.validRace.bind(this)} />
      </View>
    );
  }
}
