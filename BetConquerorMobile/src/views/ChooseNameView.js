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
    <View>
      <Text>Choisi un pseudo</Text>
      <TextInput
        style={{
          width: 100,
          borderWidth: 3,
          borderColor: 'grey',
          alignSelf: 'center',
          padding: 5,
        }}
        value={name}
        onChangeText={value => setName(value)}
      />
      <Button title="Valider" onPress={handleOnPress} />
    </View>
  );
};

export default ChooseNameView;
