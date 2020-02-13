import React, {useState, Component} from 'react';
import upIcon from '../../assets/icons/up_icon.png';
import downIcon from '../../assets/icons/down_icon.png';
import SwordsIcon from '../../assets/icons/swords3.png';
import FrenchIcon from '../../assets/icons/FrenchIcon.png';
import EspagnolIcon from '../../assets/icons/EspagnolIcon.png';
import OlmequesIcon from '../../assets/icons/OlmequesIcon.png';
import MayaIcon from '../../assets/icons/MayaIcon.png';
import Zone1 from '../../assets/Island1.png';
import Zone2 from '../../assets/Island2.png';
import Zone3 from '../../assets/Island3.png';
import Zone4 from '../../assets/Island4.png';
import Zone5 from '../../assets/Island5.png';

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
  Dimensions,
} from 'react-native';
import GameWebSocket from '../services/GameWebSocket';
import ZoneComponent from './zone';
import CountDown from 'react-native-countdown-component';

const {width, height} = Dimensions.get('window');

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
    if (this.state.betValue > this.props.pieces) {
      return alert('Mise trop haute : pas assez de pièces');
    }
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
    if (isNaN(parseInt(key)) || this.state.betValue.length > 2) {
      e.stopPropagation();
      return;
    }
    this.setState({betValue: this.state.betValue + key});
  }

  onMinusPress() {
    if (this.state.betValue <= 0) {
      return;
    }
    this.setState({betValue: parseInt(this.state.betValue) - 1});
  }

  onPlusPress() {
    if (this.state.betValue >= 999) {
      return;
    }
    this.setState({betValue: parseInt(this.state.betValue) + 1});
  }

  renderBetInput() {
    if (!this.state.hasBet) {
      return (
        <View style={{flex: 0.2, flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <TextInput
              style={{
                borderWidth: 3,
                borderColor: 'grey',
                alignSelf: 'center',
                padding: 5,
                minWidth: 50,
                height: 40,
                textAlign: 'center',
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
          <View style={{flex: 0.05}}></View>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              height: 30,
              width: 70,
              borderWidth: 2,
              backgroundColor: 'lightgreen',
            }}
            onPress={this.handleOnPress.bind(this)}>
            <Text style={{alignSelf: 'center'}}>Miser</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>
          Mise envoyée ! {'\n'} En attente de la fin du tour de guerres pour les
          résultats ...
        </Text>
      </View>
    );
  }

  getTerritoryFromId() {
    let imageSource;

    console.log(this.props.war);
    switch (this.props.war.zoneId) {
      case 0:
        imageSource = Zone1;
        break;
      case 1:
        imageSource = Zone2;
        break;
      case 2:
        imageSource = Zone3;
        break;
      case 3:
        imageSource = Zone4;
        break;
      case 4:
        imageSource = Zone5;
        break;
    }
    console.log('sakjd');

    console.log(imageSource);

    return (
      <Image
        style={{
          alignSelf: 'center',
          width: 190,
          height: 190,
          resizeMode: 'cover',
        }}
        source={imageSource}
      />
    );
  }
  getIconFromUnity(unity) {
    let icon;
    let backgroundColor;
    switch (unity) {
      case 'E0' || 'E1':
        icon = FrenchIcon;
        backgroundColor = 'green';
        break;
      case 'E2' || 'E3':
        icon = EspagnolIcon;
        backgroundColor = 'blue';
        break;
      case 'E4' || 'E5':
        icon = OlmequesIcon;
        backgroundColor = 'red';
        break;
      case 'E6' || 'E7':
        icon = MayaIcon;
        backgroundColor = 'yellow';

        break;
      default:
        icon = MayaIcon;
        backgroundColor = 'red';
    }

    let widthDivisor = 4.5;
    let heightDivisor = 10;

    if (this.props.war.players.length === 4) {
      widthDivisor += 0.5;
    }

    return (
      <Image
        style={{
          width: width / widthDivisor,
          height: height / heightDivisor,
          borderWidth: 2,
          borderRadius: 50,
          backgroundColor,
        }}
        source={icon}
      />
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 0.9,
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <View
            style={{
              width,
              flex: 0.4,
              borderWitdth: 2,
              borderColor: 'black',
              backgroundColor: 'lightblue',
              alignSelf: 'stretch',
            }}>
            {this.getTerritoryFromId()}
          </View>
          <View
            style={{
              flex: 0.3,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {this.props.war.players.map((player, index) => {
              if (index === this.props.war.players.length - 1) {
                return this.getIconFromUnity(player.username);
              }
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {this.getIconFromUnity(player.username)}
                  <Text style={{fontWeight: 'bold', fontSize: 15}}> VS </Text>
                </View>
              );
            })}
          </View>
          {this.renderBetInput()}
          <Image style={{width: 80, height: 80}} source={SwordsIcon} />
        </View>
        <CountDown
          until={20}
          // onFinish={() => {
          //   alert('Fin des guerres !');
          //   bet(wars[0].id, 0);
          // }}
          digitStyle={{backgroundColor: 'black'}}
          digitTxtStyle={{color: 'white'}}
          size={20}
          timeToShow={['M', 'S']}
          timeLabels={{m: 'Minutes', s: 'Secondes'}}
        />
      </View>
    );
  }
}

export default WarComponent;
