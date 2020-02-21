import React from 'react';
import {View, Dimensions, Text, Image, ImageBackground} from 'react-native';

class ZoneComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {width, height} = Dimensions.get('window');
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ImageBackground
          style={{
            width: width / 2.25,
            height: height / 4.5,
          }}
          source={this.props.imageSource}>
          {this.props.color ? (
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 30,
                alignSelf: 'flex-end',
                color: this.props.color,
              }}>
              X {this.props.numbersOwn}
            </Text>
          ) : (
            <View></View>
          )}
        </ImageBackground>
      </View>
    );
  }
}

export default ZoneComponent;
