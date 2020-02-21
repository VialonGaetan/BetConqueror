import React, {useState} from 'react';
import ZoneComponent from '../components/zone';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import War from '../models/war';
import Zone from '../models/zone';

import Zone1 from '../../assets/Island1.png';
import Zone2 from '../../assets/Island2.png';
import Zone3 from '../../assets/Island3.png';
import Zone4 from '../../assets/Island4.png';
import Zone5 from '../../assets/Island5.png';
import FrenchIcon from '../../assets/icons/FrenchIcon.png';
import EspagnolIcon from '../../assets/icons/EspagnolIcon.png';
import OlmequesIcon from '../../assets/icons/OlmequesIcon.png';
import MayaIcon from '../../assets/icons/MayaIcon.png';

const {width, height} = Dimensions.get('window');

const MapView = props => {
  const war = new War(
    '1',
    [
      {username: 'Français', icon: FrenchIcon, color: 'red'},
      {username: 'Espagnol', icon: EspagnolIcon, color: 'blue'},
    ],
    'nom de la zone',
  );
  war.tour = 1;
  war.winner = {username: 'Français', icon: FrenchIcon, color: 'red'};
  war.winningBet = 10;

  const war2 = new War(
    '2',
    [
      {username: 'Maya', icon: MayaIcon, color: 'yellow'},
      {username: 'Olmeque', icon: OlmequesIcon, color: 'green'},
    ],
    'nom de la zone',
  );
  war2.tour = 1;
  war2.winner = {username: 'Maya', icon: MayaIcon, color: 'yellow'};
  war2.winningBet = 5;
  const wars = [war, war2];
  const onZonePressed = zoneID => {
    props.navigation.navigate('ZoneHistory', {
      zone: {id: zoneID, name: 'nom de la zone', wars},
    });
  };
  const numbersOwn1 = {zone0: 1, zone1: 2, zone2: 3, zone3: 1, zone4: 1};
  const numbersOwn2 = {zone0: 0, zone1: 3, zone2: 0, zone3: 3, zone4: 0};
  const numbersOwn3 = {zone0: 2, zone1: 0, zone2: 1, zone3: 2, zone4: 2};
  const numbersOwn4 = {zone0: 3, zone1: 1, zone2: 2, zone3: 0, zone4: 1};

  var players = [
    {icon: FrenchIcon, color: 'red', numbersOwn: numbersOwn1, key: 0},
    {icon: MayaIcon, color: 'yellow', numbersOwn: numbersOwn2, key: 1},
    {icon: OlmequesIcon, color: 'green', numbersOwn: numbersOwn3, key: 2},
    {icon: EspagnolIcon, color: 'blue', numbersOwn: numbersOwn4, key: 3},
  ];

  const [playerSelected, selectPlayer] = useState(players[0]);
  return (
    <View style={{flex: 1, backgroundColor: 'lightblue'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        {players.map(player => {
          console.log(playerSelected.key);
          console.log(player.key);
          return (
            <View
              key={player.key}
              style={{
                borderWidth: 2,
                backgroundColor:
                  playerSelected.key === player.key ? 'grey' : 'lightblue',
              }}>
              <TouchableOpacity onPress={() => selectPlayer(player)}>
                <Image
                  style={{
                    margin: 2,
                    width: width / 6,
                    height: height / 12,
                    borderWidth: 2,
                    borderRadius: 50,
                    backgroundColor: player.color,
                  }}
                  source={player.icon}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
          top: 50,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity onPress={() => onZonePressed(0)}>
            <ZoneComponent
              numbersOwn={playerSelected.numbersOwn.zone0}
              imageSource={Zone4}
              zoneID={0}
              color={playerSelected.color}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onZonePressed(1)}>
            <ZoneComponent
              numbersOwn={playerSelected.numbersOwn.zone1}
              imageSource={Zone3}
              zoneID={2}
              color={playerSelected.color}
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => onZonePressed(2)}>
            <ZoneComponent
              numbersOwn={playerSelected.numbersOwn.zone2}
              imageSource={Zone1}
              zoneID={4}
              color={playerSelected.color}
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity onPress={() => onZonePressed(3)}>
            <ZoneComponent
              numbersOwn={playerSelected.numbersOwn.zone3}
              imageSource={Zone2}
              zoneID={1}
              color={playerSelected.color}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onZonePressed(4)}>
            <ZoneComponent
              numbersOwn={playerSelected.numbersOwn.zone4}
              imageSource={Zone5}
              zoneID={3}
              color={playerSelected.color}
            />
          </TouchableOpacity>
        </View>
        <View></View>
        <View></View>
        <View></View>
      </View>
    </View>
  );
};

export default MapView;
