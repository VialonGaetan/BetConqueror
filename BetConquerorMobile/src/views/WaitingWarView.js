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

const WaitingWarView = props => {
  const _client = GameWebSocket.getInstance();

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
        });
      }
    }
  };
  const pieces = props.navigation.getParam('pieces')
    ? props.navigation.getParam('pieces')
    : 0;
  const warResults = props.navigation.getParam('warResults');

  const {width, height} = Dimensions.get('window');

  const getWarVsRow = unities => {
    return getIconsVS(unities);
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
    switch (unity) {
      case 'E0' || 'E1':
        icon = FrenchIcon;
        backgroundColor = 'green';
        break;
      case 'E2' || 'E3':
        icon = EspagnolIcon;
        backgroundColor = 'blue';
        break;
      case 'E4' || 'E5':
        icon = OlmequesIcon;
        backgroundColor = 'red';
        break;
      case 'E6' || 'E7':
        icon = MayaIcon;
        backgroundColor = 'yellow';

        break;
      default:
        icon = MayaIcon;
        backgroundColor = 'red';
    }

    let widthDivisor = 9;
    let heightDivisor = 20;

    switch (number) {
      case 1:
        widthDivisor = 5;
        heightDivisor = 10;
        break;
      case 2:
        widthDivisor = 10;
        heightDivisor = 22;
        break;
      default:
        widthDivisor = 9;
        heightDivisor = 20;
    }

    return (
      <Image
        style={{
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
            return (stringMises += player.amount);
          }
          stringMises += player.amount + ' VS ';
          stringVS += player.username + ' VS ';
        });

        return [
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width: 100, height: 100}} source={Zone1} />
          </View>,
          getWarVsRow(war.players),
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {getIconFromUnity(war.winner.unity, 1)}
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
              if (warResults[index].winner.username === _client.username) {
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

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.5}}>
        <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold'}}>
          Tour x
        </Text>
        <View style={{flexDirection: 'row', marginTop: 40}}>
          <Image source={hourglassIcon} style={{width: 200, height: 200}} />
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
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{pieces + 10} </Text>
        <Image source={CoinIcon} />
      </View>

      <View style={{flex: 0.5}}>{renderWarResults()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  head: {height: 40, backgroundColor: '#f1f8ff'},
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
