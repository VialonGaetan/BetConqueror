import React from 'react';
import {View, Dimensions, Text, Image} from 'react-native';

class ZoneComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {width, height} = Dimensions.get('window');
    return (
      <View>
        <Image
          style={{width: 200, height: 200}}
          source={this.props.imageSource}
        />
      </View>
    );
  }
}

export default ZoneComponent;
