import React, {useState} from 'react';
import upIcon from '../icons/up_icon.png';
import downIcon from '../icons/down_icon.png';

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
  Image,
} from 'react-native';

const PlayComponent = props => {
  [betValue, setBetValue] = useState(0);

  const handleOnPress = () => {
    console.log(betValue);
  };

  const handleOnKeyPress = e => {
    const {key} = e.nativeEvent;
    if (key === 'Backspace') {
      const newValue = betValue.toString().slice(0, -1);
      setBetValue(newValue);
      return;
    }
    if (isNaN(parseInt(key))) {
      return;
    }
    setBetValue(parseInt(betValue + key));
  };

  const onMinusPress = () => {
    if (betValue <= 0) {
      return;
    }
    setBetValue(betValue - 1);
  };

  const onPlusPress = () => {
    setBetValue(betValue + 1);
  };

  return (
    <SafeAreaView>
      <Text>Play Component</Text>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <TextInput
          style={{
            borderWidth: 3,
            borderColor: 'grey',
            alignSelf: 'center',
            padding: 5,
          }}
          keyboardType={'numeric'}
          value={'' + betValue}
          onKeyPress={handleOnKeyPress}
        />
        <View style={{flexDirection: 'column', padding: 10}}>
          <TouchableOpacity onPress={onPlusPress}>
            <Image source={upIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onMinusPress}>
            <Image source={downIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={{alignSelf: 'center'}} onPress={handleOnPress}>
        <Text>Miser</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PlayComponent;
