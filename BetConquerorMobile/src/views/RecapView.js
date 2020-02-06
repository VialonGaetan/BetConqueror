import React from 'react';
import {View, Button, Text} from 'react-native';
const RecapView = props => {
  return (
    <View>
      <Text>Mes territoires</Text>

      <Button
        title={'Récapilatif des territoires'}
        onPress={() => props.navigation.navigate('MapView')}
      />
    </View>
  );
};

export default RecapView;
