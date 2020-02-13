import React, {useState} from 'react';
import ZoneComponent from '../components/zone';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import War from '../models/war';
import Zone from '../models/zone';

import Zone1 from '../../assets/Island1.png';
import Zone2 from '../../assets/Island2.png';
import Zone3 from '../../assets/Island3.png';
import Zone4 from '../../assets/Island4.png';
import Zone5 from '../../assets/Island5.png';

const MapView = props => {
  const war = new War(
    '1',
    [{username: 'player 1'}, {username: 'player2'}],
    'nom de la zone',
  );
  war.tour = 1;
  war.winner = {username: 'player 1'};
  war.winningBet = 10;

  const war2 = new War(
    '2',
    [{username: 'player 3'}, {username: 'player4'}],
    'nom de la zone',
  );
  war2.tour = 1;
  war2.winner = {username: 'player 1'};
  war2.winningBet = 5;
  const wars = [war, war2];
  const onZonePressed = zoneID => {
    props.navigation.navigate('ZoneHistory', {
      zone: {id: zoneID, name: 'nom de la zone', wars},
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'lightblue'}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
          top: 50,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity onPress={() => onZonePressed(1)}>
            <ZoneComponent imageSource={Zone4} zoneID={0} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onZonePressed(2)}>
            <ZoneComponent imageSource={Zone3} zoneID={2} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => onZonePressed(3)}>
            <ZoneComponent imageSource={Zone1} zoneID={4} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity onPress={() => onZonePressed(4)}>
            <ZoneComponent imageSource={Zone2} zoneID={1} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onZonePressed(5)}>
            <ZoneComponent imageSource={Zone5} zoneID={3} />
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
