import React from 'react';
import GameWebSocket from '../services/GameWebSocket';
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Col,
} from 'react-native-table-component';

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
  Dimensions,
  Vibration,
  Animated,
  Easing,
} from 'react-native';
import War from '../models/war';
import hourglassIcon from '../../assets/hourglass.png';
import Zone1 from '../../assets/Island1.png';
import Zone2 from '../../assets/Island2.png';
import Zone3 from '../../assets/Island3.png';
import Zone4 from '../../assets/Island4.png';
import Zone5 from '../../assets/Island5.png';
import CoinIcon from '../../assets/icons/coin.png';
import FrenchIcon from '../../assets/icons/FrenchIcon.png';
import EspagnolIcon from '../../assets/icons/EspagnolIcon.png';
import OlmequesIcon from '../../assets/icons/OlmequesIcon.png';
import MayaIcon from '../../assets/icons/MayaIcon.png';

const {width, height} = Dimensions.get('window');

const WaitingWarView = props => {
  const _client = GameWebSocket.getInstance();

  const pieces = parseInt(props.navigation.getParam('pieces'));

  _client._client.onmessage = e => {
    //alert(JSON.stringify(e));
    console.log(e);
    if (e.data !== undefined) {
      const data = JSON.parse(e.data);
      if (data.response === 'START_WARS') {
        console.log(data.wars);
        const wars = data.wars.map(war => {
          return new War(war.warId, war.players, war.territoryId);
        });
        console.log(wars);
        props.navigation.navigate('GameScreen', {
          wars,
          pieces: 10,
        });
      } else if (data.response === 'MOVE') {
        Vibration.vibrate(1000);
        alert("C'est à votre tour");
      }
    }
  };

  const warResults = props.navigation.getParam('warResults');

  const getWarVsRow = unities => {
    return getIconsVS(unities);
  };

  const getTerritoryFromId = territoryId => {
    let imageSource;

    switch (territoryId) {
      case 0:
        imageSource = Zone4;
        break;
      case 1:
        imageSource = Zone3;
        break;
      case 2:
        imageSource = Zone1;
        break;
      case 3:
        imageSource = Zone2;
        break;
      case 4:
        imageSource = Zone5;
        break;
    }
    return imageSource;
  };

  const getIconsVS = unities => {
    switch (unities.length) {
      case 2:
        return (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {unities.map((unity, index) => {
              if (index === unities.length - 1) {
                return getIconFromUnity(unity.username, unities.length);
              }
              return (
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {getIconFromUnity(unity.username, unities.length)}
                  <Text>VS </Text>
                </View>
              );
            })}
          </View>
        );
      case 3:
        return (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              {getIconFromUnity(unities[0].username, 2)}
              <View style={{flex: 0.2}}></View>
              {getIconFromUnity(unities[1].username, 2)}
            </View>
            <Text>VS</Text>
            {getIconFromUnity(unities[2].username, 2)}
          </View>
        );

      case 4:
        return (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              {getIconFromUnity(unities[0].username, 2)}
              <View style={{flex: 0.2}}></View>
              {getIconFromUnity(unities[1].username, 2)}
            </View>
            <Text>VS</Text>
            <View style={{flexDirection: 'row'}}>
              {getIconFromUnity(unities[2].username, 2)}
              <View style={{flex: 0.2}}></View>
              {getIconFromUnity(unities[3].username, 2)}
            </View>
          </View>
        );

      default:
        return <View></View>;
    }
  };

  const getIconFromUnity = (unity, number) => {
    let icon;
    let backgroundColor;
    console.log(unity);

    switch (unity) {
      case 'E0':
      case 'E1':
        icon = FrenchIcon;
        backgroundColor = 'red';
        break;
      case 'E6':
      case 'E7':
        icon = EspagnolIcon;
        backgroundColor = 'blue';
        break;
      case 'E2':
      case 'E3':
        icon = OlmequesIcon;
        backgroundColor = 'green';
        break;
      case 'E4':
      case 'E5':
        icon = MayaIcon;
        backgroundColor = 'yellow';

        break;
      default:
        icon = MayaIcon;
        backgroundColor = 'green';
    }

    let widthDivisor = 9;
    let heightDivisor = 20;

    switch (number) {
      case 1:
        widthDivisor = 5;
        heightDivisor = 9;
        break;
      case 2:
        widthDivisor = 10;
        heightDivisor = 18;
        break;
      default:
        widthDivisor = 9;
        heightDivisor = 18;
    }

    return (
      <Image
        style={{
          margin: 2,
          width: width / widthDivisor,
          height: height / heightDivisor,
          borderWidth: 2,
          borderRadius: 50,
          backgroundColor,
        }}
        source={icon}
      />
    );
  };

  const renderWarResults = () => {
    if (warResults) {
      const results = Object.assign([], warResults);
      const tableHead = ['Territoire', 'Guerre', 'Vainqueur', 'Mises'];

      const tableData = results.map(war => {
        let stringMises = '';
        let stringVS = '';

        war.players.forEach((player, index) => {
          if (index === war.players.length - 1) {
            stringVS += player.username;
            return (stringMises += player.amount > 0 ? player.amount : 0);
          }
          stringMises +=
            player.amount > 0 ? player.amount + ' VS ' : 0 + ' VS ';
          stringVS += player.username + ' VS ';
        });

        return [
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{width: width / 5, height: height / 9}}
              source={getTerritoryFromId(war.territoryId)}
            />
          </View>,
          getWarVsRow(war.players),
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {war.winner.unity ? (
              getIconFromUnity(war.winner.unity, 1)
            ) : (
              <View></View>
            )}
          </View>,
          stringMises,
        ];
      });

      return (
        <View style={{flex: 0}}>
          <Text
            style={{
              flex: 0,
              alignSelf: 'center',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Résultat de vos dernières guerres
          </Text>
          <Table style={{margin: 10}} borderStyle={{borderWidth: 1}}>
            <Row
              data={tableHead}
              flexArr={[1.1, 1, 1.1]}
              style={styles.head}
              textStyle={styles.text}
            />
            {tableData.map((rowData, index) => {
              let backgroundColor = '#ff726f';
              if (!warResults[index].winner.username) {
                backgroundColor = 'transparent';
              }
              if (warResults[index].winner.username == _client.username) {
                backgroundColor = 'lightgreen';
              }
              return (
                <Row
                  key={index}
                  data={rowData}
                  style={([styles.row], {backgroundColor})}
                  textStyle={styles.text}
                  flexArr={[1.1, 1, 1.1]}
                />
              );
            })}
          </Table>
        </View>
      );
    }
  };
  const animatedValue = new Animated.Value(0);

  const handleAnimation = () => {
    // A loop is needed for continuous animation
    Animated.loop(
      // Animation consists of a sequence of steps
      Animated.sequence([
        // start rotation in one direction (only half the time is needed)
        Animated.timing(animatedValue, {
          toValue: 1.0,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // rotate in other direction, to minimum value (= twice the duration of above)
        Animated.timing(animatedValue, {
          toValue: -1.0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // return to begin position
        Animated.timing(animatedValue, {
          toValue: 0.0,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.04}}></View>
      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: _client.color,
        }}>
        <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold'}}>
          {_client.username}
        </Text>
      </View>
      <View style={{flex: 0}}>
        <View style={{flexDirection: 'row', marginTop: 40}}>
          <Animated.Image
            source={hourglassIcon}
            resizeMode="contain"
            style={{
              width: width / 3,
              height: height / 6,

              transform: [
                {
                  rotate: animatedValue.interpolate({
                    inputRange: [-1, 1],
                    outputRange: ['-0.1rad', '0.1rad'],
                  }),
                },
              ],
            }}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              margin: 10,
              alignSelf: 'center',
            }}>
            Phase de déplacement
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 0.2,
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 14, fontWeight: 'bold'}}>
          Pièces pour les guerres à venir :{' '}
        </Text>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{pieces} </Text>
        <Image source={CoinIcon} />
      </View>

      <View style={{flex: 0.5}}>{renderWarResults()}</View>
      {handleAnimation()}
    </View>
  );
};

const styles = StyleSheet.create({
  head: {height: width / 8, backgroundColor: '#f1f8ff'},
  wrapper: {flexDirection: 'row'},
  title: {flex: 2},
  row: {height: 50},
  text: {textAlign: 'center'},
  textOwn: {fontSize: 20, fontWeight: 'bold', margin: 20},
});

WaitingWarView.navigationOptions = {
  title: 'War',
  headerLeft: () => null,
};

export default WaitingWarView;
