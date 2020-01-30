import * as React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import WarComponent from '../components/war';

const FirstRoute = props => (
  <View style={[styles.scene]}>
    <Text>
      {props.username} - {props.pieces} pièces
    </Text>
    <WarComponent />
  </View>
);

const SecondRoute = props => (
  <View style={[styles.scene]}>
    <Text>
      {props.username} - {props.pieces} pièces
    </Text>
    <WarComponent />
  </View>
);

const initialLayout = {width: Dimensions.get('window').width};

function GameView(props) {
  const [pieces, setPieces] = React.useState(10);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  const renderScene = SceneMap({
    first: () => (
      <FirstRoute
        username={props.navigation.getParam('username')}
        pieces={pieces}
        setPieces={setPieces}
      />
    ),
    second: () => (
      <SecondRoute
        username={props.navigation.getParam('username')}
        pieces={pieces}
        setPieces={setPieces}
      />
    ),
  });

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

GameView.navigationOptions = {
  title: 'Game',
  headerLeft: () => null,
};

export default GameView;
