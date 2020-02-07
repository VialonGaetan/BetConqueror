import React, {useState} from 'react';
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
import GameWebSocket from '../services/GameWebSocket';
import Race from '../models/race';

const ChooseNameView = props => {
  [name, setName] = useState('');

  const _client = GameWebSocket.getInstance();

  const handleOnPress = () => {
    if (name === '') {
      return alert("Vous n'avez pas rentré de pseudo");
    }
    let request = {request: 'CHOOSE_NAME', username: name};
    _client.username = name;
    _client.sendMessage(request);
  };

  _client._client.onmessage = e => {
    //alert(JSON.stringify(e));
    console.log(e);
    if (e.data !== undefined) {
      const data = JSON.parse(e.data);
      if (data.response === 'JOIN_GAME') {
        _client.setID(data.playerID);
        let races = [];
        data.races.forEach(race =>
          races.push(new Race(race.available, race.name, race.color)),
        );
        props.navigation.navigate('ChooseRace', {races});
      }
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 30}}>
          Choisis un pseudo
        </Text>
      </View>
      <View style={{flex: 0.6, flexDirection: 'column'}}>
        <TextInput
          style={{
            flex: 0,
            width: 200,
            borderWidth: 3,
            borderColor: 'grey',
            alignSelf: 'center',
            padding: 5,
          }}
          value={name}
          onChangeText={value => setName(value)}
        />
        <View style={{flex: 0.3}}></View>
        <Button style={{flex: 0.7}} title="Valider" onPress={handleOnPress} />
      </View>
    </View>
  );
};

export default ChooseNameView;
