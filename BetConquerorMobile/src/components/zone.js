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
          {this.props.colorOwner ? (
            <View
              style={{
                alignSelf: 'center',
                top: width / 5,
                width: width / 10,
                height: height / 20,
                borderRadius: 100 / 2,
                backgroundColor: this.props.colorOwner,
              }}></View>
          ) : (
            <View></View>
          )}
          {console.log('*********')}
          {console.log(this.props.playersSelected)}
          {this.props.playersSelected ? (
            this.props.playersSelected.map(player => {
              console.log('ALLOOO');
              return (
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 25,
                    alignSelf: 'flex-end',
                    color: player.color,
                  }}>
                  X {player.numbersOwn.zone0}
                </Text>
              );
            })
          ) : (
            <View></View>
          )}
        </ImageBackground>
      </View>
    );
  }
}

export default ZoneComponent;
