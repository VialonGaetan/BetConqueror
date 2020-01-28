/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Text, ActivityIndicator, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import GameWebSocket from '../services/GameWebSocket';

export class ScanView extends React.Component {
  static navigationOptions = {
    title: 'Scannez le QRCode',
  };

  state = {
    ready: true,
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onBarCodeRead={async e => {
            if (
              this.state.ready &&
              e.data !== undefined &&
              RegExp('ws://(S*)').test(e.data)
            ) {
              this.setState({ready: false});
              console.log(e.data);
              let socket = GameWebSocket.getInstance();
              await socket.start(e.data);
              if (socket.isConnected) {
                this.props.navigation.navigate('ChooseRace');
                this.setState({ready: true});
              } else {
                this.setState({ready: true});
              }
            }
          }}>
          <View
            style={{
              backgroundColor: this.state.ready ? 'transparent' : 'white',
              height: '13%',
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <ActivityIndicator
              animating={!this.state.ready}
              size="large"
              color="#0000ff"
            />
          </View>
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
