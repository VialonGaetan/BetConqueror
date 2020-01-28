import React, {useState} from 'react';

import {
  SafeAreaView,
  Text,
  Image,
  Dimensions,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import MapImage from '../map.png';

import Map from '../models/map';

const MapComponent = () => {
  [zoneSelected, setZoneSelected] = useState({});
  const handleOnPress = e => {
    const {locationX, locationY} = e.nativeEvent;
    const zonePressed = Map.zones.find(zone =>
      zone.isInTheZone(locationX, locationY),
    );

    if (zonePressed === undefined || zonePressed === zoneSelected) {
      return setZoneSelected({});
    }
    console.log(zonePressed.name);
    setZoneSelected(zonePressed);
  };
  const renderSelectedView = () => {
    if (zoneSelected.name === undefined) {
      return;
    }
    return (
      <View
        style={{
          position: 'absolute',
          top: zoneSelected.coordinates.yUp,
          left: zoneSelected.coordinates.xLeft,
          right:
            Dimensions.get('window').width - zoneSelected.coordinates.xRight,
          bottom:
            Dimensions.get('window').height - zoneSelected.coordinates.yDown,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 4,
          borderColor: 'red',
        }}>
        <Text>{zoneSelected.name}</Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1, height: undefined, width: undefined}}>
      <TouchableWithoutFeedback
        style={{flex: 1, height: undefined, width: undefined}}
        onPress={handleOnPress}>
        <ImageBackground
          style={{
            flex: 1,
            height: undefined,
            width: undefined,
          }}
          resizeMode={'cover'}
          source={MapImage}
          onPress={handleOnPress}
        />
      </TouchableWithoutFeedback>
      {renderSelectedView()}
    </View>
  );
};

export default MapComponent;
