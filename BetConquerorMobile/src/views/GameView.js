import * as React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import WarComponent from '../components/war';

const FirstRoute = props => (
  <View style={[styles.view]}>
    <Text style={[styles.pieces]}>
      {props.username} - {props.pieces} pièces
    </Text>

    <View style={[styles.scene]}>
      <WarComponent war={props.war} />
    </View>
  </View>
);

const SecondRoute = props => (
  <View style={[styles.view]}>
    <Text style={[styles.pieces]}>
      {props.username} - {props.pieces} pièces
    </Text>

    <View style={[styles.scene]}>
      <WarComponent style={[styles.war]} war={props.war} />
    </View>
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

  const username = props.navigation.getParam('username');
  const wars = props.navigation.getParam('wars');
  const renderScene = SceneMap({
    first: () => (
      <FirstRoute
        username={username}
        pieces={pieces}
        setPieces={setPieces}
        war={wars[0]}
      />
    ),
    second: () => (
      <SecondRoute
        username={username}
        pieces={pieces}
        setPieces={setPieces}
        war={wars[0]}
      />
    ),
  });

  switch (wars.length) {
    case 0: {
      return (
        <View style={[styles.view]}>
          <Text>Pas de guerre pour vous ce tour. Bien joué !</Text>
        </View>
      );
    }
    case 1:
      return (
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      );

    case 2:
      return (
        <View style={[styles.view]}>
          <Text style={[styles.pieces]}>
            {props.username} - {props.pieces} pièces
          </Text>

          <View style={[styles.scene]}>
            <WarComponent style={[styles.war]} war={wars[0]} />
          </View>
        </View>
      );

    default:
      return (
        <View style={[styles.view]}>
          <Text>Cas pas traité</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieces: {
    alignSelf: 'flex-end',
  },
  war: {alignItems: 'stretch'},
});

GameView.navigationOptions = {
  title: 'War',
  headerLeft: () => null,
};

export default GameView;
