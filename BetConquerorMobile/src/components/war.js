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
import FlatCoinIcon from '../../assets/icons/piece.png';
import FlatCoinIcon10 from '../../assets/icons/piece10.png';
import FlatCoinIcon5 from '../../assets/icons/piece5.png';

import CoinIcon from '../../assets/icons/coin.png';

import * as Animatable from 'react-native-animatable';
import Dialog from 'react-native-dialog';

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
  ImageBackground,
} from 'react-native';
import GameWebSocket from '../services/GameWebSocket';
import ZoneComponent from './zone';
import CountDown from 'react-native-countdown-component';

const {width, height} = Dimensions.get('window');

class WarComponent extends React.Component {
  constructor(props) {
    super(props);
    this._client = GameWebSocket.getInstance();
    this.animationRefsOnes = [];
    this.animationRefsFives = [];
    this.animationRefsTens = [];

    this.animationRefsOnesBetStack = [];
    this.animationRefsFivesBetStack = [];
    this.animationRefsTensBetStack = [];
  }

  state = {
    confirmationDialog: false,
    pieces: this.props.pieces,
  };

  handleOnPress() {
    this.setState({confirmationDialog: false});
    if (this.props.betValue > this.props.pieces) {
      return alert('Mise trop haute : pas assez de pièces');
    }

    if (this.props.betValue < 0) {
      return alert('Mise négative');
    }

    let request = {
      request: 'BET',
      userId: this._client.playerID,
      warId: this.props.war.id,
      amount: this.props.betValue,
    };
    console.log(request);
    this._client.sendMessage(request);
    this.props.setHasBet(true);

    if (this.props.jumpTo) {
      if (this.props.route.key === 'first') {
        return this.props.jumpTo('second');
      }
      this.props.jumpTo('first');
    }
  }

  // handleOnKeyPress(e) {
  //   const {key} = e.nativeEvent;
  //   if (key === 'Backspace') {
  //     const newValue = this.state.betValue.toString().slice(0, -1);
  //     this.setState({betValue: newValue});
  //     return;
  //   }
  //   if (isNaN(parseInt(key)) || this.state.betValue.length > 2) {
  //     e.stopPropagation();
  //     return;
  //   }
  //   this.setState({betValue: this.props.betValue + key});
  // }

  onMinusPress() {
    if (this.props.betValue <= 0) {
      return;
    }

    if (this.props.betValue % 5 != 0) {
      const offset = parseInt(this.props.betValue % 5) - 1;
      this.animationRefsOnesBetStack[this.animationRefsOnesBetStack.length - 1]
        .animate({
          from: {translateY: 0, translateX: 0},

          to: {translateY: -height / 3.9 + offset * 5, translateX: 0},

          duration: 100,

          iterationCount: 1,
        })
        .then(() => {
          this.props.setBetValue(parseInt(this.props.betValue) - 1);
        });
    } else {
      this.props.setBetValue(parseInt(this.props.betValue) - 1);
    }
    const newPieces = this.state.pieces + 1;
    this.setState({pieces: newPieces});
  }

  onMinusPressFive() {
    if (this.props.betValue <= 4) {
      return;
    }

    if (this.props.betValue % 5 != 0) {
      const offset = parseInt(this.props.betValue % 5) - 1;
      this.animationRefsFivesBetStack[
        this.animationRefsFivesBetStack.length - 1
      ]
        .animate({
          from: {translateY: 0, translateX: 0},

          to: {translateY: -height / 3.9 + offset * 5, translateX: 0},

          duration: 100,

          iterationCount: 1,
        })
        .then(() => {
          this.props.setBetValue(parseInt(this.props.betValue) - 5);
        });
    } else {
      this.props.setBetValue(parseInt(this.props.betValue) - 5);
    }
    const newPieces = this.state.pieces + 5;
    this.setState({pieces: newPieces});
  }

  onMinusPressTen() {
    if (this.props.betValue <= 9) {
      return;
    }

    if (this.props.betValue % 5 != 0) {
      const offset = parseInt(this.props.betValue % 5) - 1;
      this.animationRefsOnesBetStack[this.animationRefsTensBetStack.length - 1]
        .animate({
          from: {translateY: 0, translateX: 0},

          to: {translateY: -height / 3.9 + offset * 5, translateX: 0},

          duration: 100,

          iterationCount: 1,
        })
        .then(() => {
          this.props.setBetValue(parseInt(this.props.betValue) - 10);
        });
    } else {
      this.props.setBetValue(parseInt(this.props.betValue) - 10);
    }
    const newPieces = this.state.pieces + 10;
    this.setState({pieces: newPieces});
  }

  onPlusPress() {
    if (parseInt(this.props.betValue) >= this.props.pieces) {
      return;
    }

    if (this.state.pieces % 5 != 0) {
      const offset = parseInt(this.props.betValue % 5);
      this.animationRefsOnes[this.animationRefsOnes.length - 1]
        .animate({
          from: {translateY: 0, translateX: 0},

          to: {translateY: height / 3.9 - offset * 5, translateX: 0},

          duration: 100,
          iterationCount: 1,
        })
        .then(() => {
          const newPieces = this.state.pieces - 1;
          this.setState({pieces: newPieces});
        });
    } else {
      const newPieces = this.state.pieces - 1;
      this.setState({pieces: newPieces});
    }
    this.props.setBetValue(parseInt(this.props.betValue) + 1);
  }

  onPlusPressFive() {
    if (parseInt(this.props.betValue) + 5 > this.props.pieces) {
      return;
    }

    if (this.state.pieces % 5 != 0) {
      const offset = parseInt(this.props.betValue % 5);
      this.animationRefsFives[this.animationRefsFives.length - 1]
        .animate({
          from: {translateY: 0, translateX: 0},

          to: {translateY: height / 3.9 - offset * 5, translateX: 0},

          duration: 100,
          iterationCount: 1,
        })
        .then(() => {
          const newPieces = this.state.pieces - 5;
          this.setState({pieces: newPieces});
        });
    } else {
      const newPieces = this.state.pieces - 5;
      this.setState({pieces: newPieces});
    }
    this.props.setBetValue(parseInt(this.props.betValue) + 5);
  }

  onPlusPressTen() {
    if (parseInt(this.props.betValue) + 10 > this.props.pieces) {
      return;
    }

    if (this.state.pieces % 5 != 0) {
      const offset = parseInt(this.props.betValue % 5);
      this.animationRefsTens[this.animationRefsTens.length - 1]
        .animate({
          from: {translateY: 0, translateX: 0},

          to: {translateY: height / 3.9 - offset * 5, translateX: 0},

          duration: 100,
          iterationCount: 1,
        })
        .then(() => {
          const newPieces = this.state.pieces - 10;
          this.setState({pieces: newPieces});
        });
    } else {
      const newPieces = this.state.pieces - 10;
      this.setState({pieces: newPieces});
    }
    this.props.setBetValue(parseInt(this.props.betValue) + 10);
  }

  renderBetInput() {
    if (!this.props.hasBet) {
      return (
        <View style={{flex: 0, flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View style={{flexDirection: 'column', padding: 10}}>
              <TouchableOpacity onPress={this.onPlusPress.bind(this)}>
                <Image source={upIcon} />
              </TouchableOpacity>
              <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>1</Text>
              <TouchableOpacity onPress={this.onMinusPress.bind(this)}>
                <Image source={downIcon} />
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'column', padding: 10}}>
              <TouchableOpacity onPress={this.onPlusPressFive.bind(this)}>
                <Image source={upIcon} />
              </TouchableOpacity>
              <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>5</Text>
              <TouchableOpacity onPress={this.onMinusPressFive.bind(this)}>
                <Image source={downIcon} />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'column', padding: 10}}>
              <TouchableOpacity onPress={this.onPlusPressTen.bind(this)}>
                <Image source={upIcon} />
              </TouchableOpacity>
              <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>10</Text>
              <TouchableOpacity onPress={this.onMinusPressTen.bind(this)}>
                <Image source={downIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 0.05}}></View>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              height: height / 20,
              width: width / 6,
              borderWidth: 2,
              backgroundColor: 'lightgreen',
            }}
            onPress={() => this.setState({confirmationDialog: true})}>
            <Text style={{alignSelf: 'center'}}>Miser</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          Mise envoyée ! {'\n'} En attente de la fin du tour de guerres pour les
          résultats ...
        </Text>
      </View>
    );
  }

  getTerritoryFromId() {
    let imageSource;

    switch (this.props.war.zoneId) {
      case 0:
        imageSource = Zone4;
        break;
      case 1:
        imageSource = Zone3;
        break;
      case 2:
        imageSource = Zone1;
        break;
      case 3:
        imageSource = Zone2;
        break;
      case 4:
        imageSource = Zone5;
        break;
    }

    return (
      <Image
        style={{
          alignSelf: 'center',
          width: width / 3,
          height: height / 5.5,
        }}
        source={imageSource}
      />
    );
  }
  getIconFromUnity(unity) {
    let icon;
    let backgroundColor;

    switch (unity) {
      case 'E0':
      case 'E1':
        icon = FrenchIcon;
        backgroundColor = 'red';
        break;
      case 'E6':
      case 'E7':
        icon = EspagnolIcon;
        backgroundColor = 'blue';
        break;
      case 'E2':
      case 'E3':
        icon = OlmequesIcon;
        backgroundColor = 'green';
        break;
      case 'E4':
      case 'E5':
        icon = MayaIcon;
        backgroundColor = 'yellow';

        break;
      default:
        icon = MayaIcon;
        backgroundColor = 'green';
    }
    let widthDivisor = 5;
    let heightDivisor = 9;

    if (this.props.war.players.length === 4) {
      widthDivisor += 0.5;
      heightDivisor += 0.5;
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

  renderCoinStackTens(number, bet) {
    let stack = [];
    for (var i = 0; i < number; i++) {
      stack.push(
        <Animatable.View
          ref={ref => {
            bet
              ? this.animationRefsTensBetStack.push(ref)
              : this.animationRefsTens.push(ref);
          }}>
          <Image
            style={{
              width: 70,
              height: 70,
              position: 'absolute',
              top: i > 0 ? -10 * i - 25 : -25,
              left: width / 1.7,
            }}
            source={FlatCoinIcon10}
          />
        </Animatable.View>,
      );
    }
    return (
      <View>
        {stack.map(coin => {
          return coin;
        })}
      </View>
    );
  }

  renderCoinStackFives(number, bet) {
    let stack = [];
    for (var i = 0; i < number; i++) {
      stack.push(
        <Animatable.View
          ref={ref => {
            bet
              ? this.animationRefsFivesBetStack.push(ref)
              : this.animationRefsFives.push(ref);
          }}>
          <Image
            style={{
              width: 45,
              height: 45,
              position: 'absolute',
              top: i > 0 ? -8 * i - 8 : -8,
              left: width / 2.25,
            }}
            source={FlatCoinIcon5}
          />
        </Animatable.View>,
      );
    }
    return (
      <View>
        {stack.map(coin => {
          return coin;
        })}
      </View>
    );
  }

  renderCoinStackOnes(number, bet) {
    let stack = [];
    for (var i = 0; i < number; i++) {
      stack.push(
        <Animatable.View
          ref={ref =>
            bet
              ? this.animationRefsOnesBetStack.push(ref)
              : this.animationRefsOnes.push(ref)
          }>
          <Image
            style={{
              position: 'absolute',
              top: i > 0 ? -5 * i : 0,
              left: width / 3,
            }}
            source={FlatCoinIcon}
          />
        </Animatable.View>,
      );
    }
    if (bet) {
      //this.animationRefsOnesBetStack.reverse();
    }
    return (
      <View>
        {stack.map(coin => {
          return coin;
        })}
      </View>
    );
  }

  renderStack(pieces, bet) {
    if (pieces < 5) {
      return this.renderCoinStackOnes(pieces, bet);
    } else if (pieces > 4 && pieces < 10) {
      return (
        <View>
          {this.renderCoinStackOnes(pieces - 5, bet)}
          {this.renderCoinStackFives(1, bet)}
        </View>
      );
    } else if (pieces > 9 && pieces < 25) {
      return (
        <View>
          {this.renderCoinStackOnes(pieces % 5, bet)}
          {this.renderCoinStackFives(Math.trunc(pieces / 5, bet))}
        </View>
      );
    } else if (pieces > 25) {
      let tens = Math.trunc(pieces / 10);
      let fives = Math.trunc((pieces - tens * 10) / 5);

      if (fives == 0 && tens > 1) {
        tens--;
        fives += 2;
      }

      if (fives == 1 && tens > 1) {
        tens--;
        fives += 2;
      }

      if (fives == 2 && tens > 1) {
        tens--;
        fives += 2;
      }

      return (
        <View>
          {this.renderCoinStackOnes(pieces % 5, bet)}
          {this.renderCoinStackFives(fives, bet)}
          {this.renderCoinStackTens(tens, bet)}
        </View>
      );
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Dialog.Container visible={this.state.confirmationDialog}>
          <Dialog.Title>Confirmation</Dialog.Title>
          <Dialog.Description>Miser {this.props.betValue} ?</Dialog.Description>
          <Dialog.Button
            onPress={() => {
              this.setState({confirmationDialog: false});
            }}
            label="Annuler"
          />
          <Dialog.Button onPress={this.handleOnPress.bind(this)} label="OK" />
        </Dialog.Container>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width,
            flex: 0.3,
            borderWitdth: 2,
            borderColor: 'black',
            backgroundColor: 'lightblue',
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
        <View
          style={{
            flex: 0,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            right: 55,
          }}>
          <Text style={{fontSize: 20}}>Mes pièces {'   '}</Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              borderWidth: 3,
              borderColor: 'grey',
              padding: 5,
              minWidth: width / 7,
              height: height / 18,
              textAlign: 'center',
              color: 'black',
            }}>
            {this.state.pieces}
          </Text>
        </View>
        <View style={{flex: 0.1}}></View>
        <View style={{flex: 0, flexDirection: 'row'}}>
          {this.renderStack(this.state.pieces)}
        </View>

        <View style={{flex: 0.1}}></View>

        <View style={{flex: 0, alignItems: 'center'}}>
          {this.renderBetInput()}
        </View>

        <View
          style={{
            top: this.props.hasBet ? 20 : 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            right: 45,
          }}>
          <Text style={{fontSize: 20}}>Ma mise {'   '}</Text>
          <TextInput
            editable={false}
            style={{
              borderWidth: 3,
              borderColor: 'grey',
              alignSelf: 'center',
              padding: 5,
              minWidth: width / 7,
              height: height / 18,
              textAlign: 'center',
              color: 'black',
              fontSize: 20,
              fontWeight: 'bold',
            }}
            keyboardType={'numeric'}
            value={'' + this.props.betValue}
          />
        </View>
        <View style={{flex: 0.1}}></View>
        <View style={{flex: 0, flexDirection: 'row'}}>
          {this.renderStack(this.props.betValue, true)}
        </View>
      </View>
    );
  }
}

export default WarComponent;
