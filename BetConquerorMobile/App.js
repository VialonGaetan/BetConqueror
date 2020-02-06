import {HomeView} from './src/HomeView';
import {ScanView} from './src/views/ScanView';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {ChooseRaceView} from './src/views/ChooseRaceView';
import GameView from './src/views/GameView';
import ChooseNameView from './src/views/ChooseNameView';
import WaitingWarView from './src/views/WaitingWarView';
import MapView from './src/views/MapView';
import ZoneHistoryView from './src/views/ZoneHistoryView';
import RecapView from './src/views/RecapView';

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

const GameNavigator = createStackNavigator({
  WaitingWar: {screen: WaitingWarView},
  GameScreen: {screen: GameView},
  Recap: {screen: RecapView},
  MapView: {screen: MapView},
  ZoneHistory: {screen: ZoneHistoryView},
});

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
