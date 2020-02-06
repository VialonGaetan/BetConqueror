import React from 'react';
import {View, Dimensions, Text} from 'react-native';

class ZoneComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {width, height} = Dimensions.get('window');
    return (
      <View style={{width: width / 3, height: height / 15, borderWidth: 2}}>
        <Text>{this.props.zoneID}</Text>
      </View>
    );
  }
}

export default ZoneComponent;
