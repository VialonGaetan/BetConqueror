import * as React from 'react';
import {View, StyleSheet, Dimensions, Text, Button, Image} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import WarComponent from '../components/war';
import GameWebSocket from '../services/GameWebSocket';
import CountDown from 'react-native-countdown-component';
import CoinIcon from '../../assets/icons/coin.png';

const FirstRoute = props => (
  <View style={[styles.view]}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props.color,
      }}>
      <Text style={[styles.pieces]}>{props.username}</Text>
    </View>

    <View style={[styles.scene]}>
      <WarComponent
        style={[styles.war]}
        war={props.war}
        pieces={props.pieces}
        jumpTo={props.jumpTo}
        route={props.route}
      />
    </View>
  </View>
);

const SecondRoute = props => (
  <View style={[styles.view]}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props.color,
      }}>
      <Text style={[styles.pieces]}>{props.username}</Text>
    </View>

    {console.log(props)}

    <View style={[styles.scene]}>
      <WarComponent
        style={[styles.war]}
        war={props.war}
        pieces={props.pieces}
        jumpTo={props.jumpTo}
        route={props.route}
      />
    </View>
  </View>
);

const initialLayout = {width: Dimensions.get('window').width};

function GameView(props) {
  const [pieces, setPieces] = React.useState(10);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Guerre 1'},
    {key: 'second', title: 'Guerre 2'},
  ]);

  const _client = GameWebSocket.getInstance();

  const {username, color} = _client;
  const wars = props.navigation.getParam('wars');

  const renderScene = SceneMap({
    first: ({jumpTo, route}) => (
      <FirstRoute
        username={username}
        pieces={pieces}
        setPieces={setPieces}
        war={wars[0]}
        handleOnPressRecap
        route={route}
        jumpTo={jumpTo}
        color={color}
      />
    ),
    second: ({jumpTo, route}) => (
      <SecondRoute
        username={username}
        pieces={pieces}
        setPieces={setPieces}
        war={wars[1]}
        handleOnPressRecap
        route={route}
        jumpTo={jumpTo}
        color={color}
      />
    ),
  });

  const bet = (warId, value) => {
    let request = {
      request: 'BET',
      userId: this._client.playerID,
      warId: warId,
      amount: value,
    };
    console.log(request);
    _client.sendMessage(request);
  };

  _client._client.onmessage = e => {
    //alert(JSON.stringify(e));
    console.log(e);
    if (e.data !== undefined) {
      const data = JSON.parse(e.data);
      if (data.response === 'BET') {
        wars.find(war => war.id === data.warId).hasBet = true;
        setPieces(pieces - data.amount);
      } else if (data.response === 'WAR_RESULT') {
        const warResults = data.result;
        props.navigation.navigate('WaitingWar', {
          pieces: warResults.money,
          warResults,
        });
      }
    }
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      renderLabel={({route, focused, color}) => (
        <Text
          style={{
            color: 'black',
            fontWeight: focused ? 'bold' : 'normal',
            margin: 8,
          }}>
          {route.title}
        </Text>
      )}
      indicatorStyle={{backgroundColor: 'black'}}
      style={{backgroundColor: 'lightgreen'}}
    />
  );

  switch (wars.length) {
    case 0: {
      return (
        <View style={[styles.view]}>
          <Text>Pas de guerre pour vous ce tour. Bien joué !</Text>
        </View>
      );
    }
    case 2:
      return (
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={props => renderScene(props)}
          onIndexChange={setIndex}
          initialLayout={initialLayout}></TabView>
      );

    case 1:
      return (
        <View style={[styles.view]}>
          <View style={{flex: 0.05}}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: color,
            }}>
            <Text style={[styles.pieces]}>{username}</Text>
          </View>

          <View style={[styles.scene]}>
            <View style={[styles.war]}>
              <WarComponent setPieces war={wars[0]} pieces={pieces} />
            </View>
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
    alignItems: 'center',
  },
  pieces: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  war: {},
});

GameView.navigationOptions = {
  title: 'War',
  headerLeft: () => null,
};

export default GameView;
