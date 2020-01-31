import React from 'react';
import GameWebSocket from '../services/GameWebSocket';

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
  FlatList,
  Image,
} from 'react-native';
import War from '../models/war';

const WaitingWarView = props => {
  const _client = GameWebSocket.getInstance();

  _client._client.onmessage = e => {
    //alert(JSON.stringify(e));
    console.log(e);
    if (e.data !== undefined) {
      const data = JSON.parse(e.data);
      if (data.response === 'START_WARS') {
        console.log(data.wars);
        const wars = data.wars.map(war => {
          return new War(war.warId, war.players, war.territoryId);
        });
        console.log(wars);
        props.navigation.navigate('GameScreen', {
          wars,
        });
      }
    }
  };
  const pieces = props.navigation.getParam('pieces')
    ? props.navigation.getParam('pieces')
    : 0;
  return (
    <View>
      <Text>
        Ça se passe sur la table ! C'est l'étape des déplacements des pions.
        Lorsque c'est votre tour, déplacez le pion concerné puis appuyez sur le
        bouton Fin du tour. Si vous ne souhaitez pas le bouger, appuyez
        direcement sur le bouton Fin du tour.
      </Text>
      <Text>
        Vous aurez {pieces + 10} pièces pour le prochain tour des guerres
      </Text>
    </View>
  );
};

WaitingWarView.navigationOptions = {
  title: 'War',
  headerLeft: () => null,
};

export default WaitingWarView;