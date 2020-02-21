import React from 'react';
import {Image} from 'react-native';
import {HomeView} from './src/HomeView';
import {ScanView} from './src/views/ScanView';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from 'react-navigation-stack';
import {ChooseRaceView} from './src/views/ChooseRaceView';
import GameView from './src/views/GameView';
import ChooseNameView from './src/views/ChooseNameView';
import WaitingWarView from './src/views/WaitingWarView';
import MapView from './src/views/MapView';
import ZoneHistoryView from './src/views/ZoneHistoryView';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import SwordsIcon from './assets/icons/swords3.png';
import HistoryIcon from './assets/icons/history.png';

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

const LobbyNavigator = createStackNavigator({
  Home: {screen: HomeView},
  Scan: {screen: ScanView},
  ChooseRace: {screen: ChooseRaceView},
  Game: {screen: GameView},
  ChooseName: {screen: ChooseNameView},
});

const HistoryNavigator = createStackNavigator({
  MapView: {screen: MapView},
  ZoneHistory: {screen: ZoneHistoryView},
});

const WarNavigator = createSwitchNavigator(
  {
    WaitingWar: {screen: WaitingWarView},
    GameScreen: {screen: GameView},
  },
  {
    initialRouteName: 'WaitingWar',
  },
);

const GameNavigator = createBottomTabNavigator(
  {
    War: {
      screen: WarNavigator,
      navigationOptions: {
        tabBarLabel: 'Guerre',
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          return (
            <Image
              source={SwordsIcon}
              style={{tintColor, width: 30, height: 30}}
            />
          );
        },
      },
    },
    History: {
      screen: HistoryNavigator,
      navigationOptions: {
        tabBarLabel: 'Historique',
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          return (
            <Image
              source={HistoryIcon}
              style={{tintColor, width: 30, height: 30}}
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#42f44b',
      inactiveTintColor: 'gray',
    },
  },
);

//console.disableYellowBox = true;

const App = createAppContainer(
  createSwitchNavigator({
    Lobby: LobbyNavigator,
    Game: GameNavigator,
  }),
);

export default App;
