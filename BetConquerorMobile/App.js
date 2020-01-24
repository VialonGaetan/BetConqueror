import { HomeView } from "./src/HomeView";
import { ScanView } from "./src/views/ScanView";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ChooseRaceView } from "./src/views/ChooseRaceView";
import { GameView } from "./src/views/GameView";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
const MainNavigator = createStackNavigator({
  Home: { screen: HomeView },
  Scan: { screen: ScanView },
  ChooseRace: { screen: ChooseRaceView },
  Game: { screen: GameView }
});

const App = createAppContainer(MainNavigator);

export default App;
