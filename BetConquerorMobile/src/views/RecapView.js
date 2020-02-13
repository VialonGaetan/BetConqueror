import React from 'react';
import {View, Button, Text} from 'react-native';

const RecapView = props => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.8}}>
        <Text>Mes territoires</Text>

        <Button
          title={'Récapilatif des territoires'}
          onPress={() => props.navigation.navigate('MapView')}
        />
      </View>
      <View style={{flex: 0.2}}></View>
    </View>
  );
};

export default RecapView;
