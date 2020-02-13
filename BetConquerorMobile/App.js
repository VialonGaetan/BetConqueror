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
import RecapView from './src/views/RecapView';
import {createBottomTabNavigator} from 'react-navigation-tabs';

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

const WarNavigator = createStackNavigator({
  WaitingWar: {screen: WaitingWarView},
  GameScreen: {screen: GameView},
});

const GameNavigator = createBottomTabNavigator(
  {
    War: {screen: WarNavigator},
    History: {screen: HistoryNavigator},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      // tabBarIcon: ({focused, horizontal, tintColor}) => {
      //   const {routeName} = navigation.state;
      //   let IconComponent = Ionicons;
      //   let iconName;
      //   if (routeName === 'Lobby') {
      //     iconName = `ios-information-circle${focused ? '' : '-outline'}`;
      //   } else if (routeName === 'Game') {
      //     iconName = `ios-checkmark-circle${focused ? '' : '-outline'}`;
      //   }
      //   return (
      //     <View>
      //       <Text>ojidj</Text>
      //     </View>
      //   );
      // },
    }),
    tabBarOptions: {
      activeTintColor: '#42f44b',
      inactiveTintColor: 'gray',
    },
  },
);

const App = createAppContainer(
  createSwitchNavigator(
    {
      Lobby: LobbyNavigator,
      Game: GameNavigator,
    },
    {
      initialRouteName: 'Lobby',
    },
  ),
);

export default App;
