import React from 'react';
import ZoneComponent from '../components/zone';
import {View, StyleSheet, Dimensions, Text, Image} from 'react-native';
import Zone from '../models/zone';
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Col,
} from 'react-native-table-component';
import Zone1 from '../../assets/Island1.png';
import Zone2 from '../../assets/Island2.png';
import Zone3 from '../../assets/Island3.png';
import Zone4 from '../../assets/Island4.png';
import Zone5 from '../../assets/Island5.png';
const {width, height} = Dimensions.get('window');

const ZoneHistoryView = props => {
  const zone = new Zone(props.navigation.getParam('zone'));
  const tableHead = ['', 'Guerre', 'Vainqueur', 'Mise du vainqueur'];
  const tableTitles = zone.wars.map((war, index) => {
    return index;
  });

  const tableData = zone.wars.map(war => {
    let stringVS = '';
    war.players.forEach((player, index) => {
      if (index === war.players.length - 1) {
        return (stringVS += player.username);
      }
      stringVS += player.username + ' VS ';
    });
    return [stringVS, war.winner.username, 10];
  });

  console.log(zone.getOwner());

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

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <View style={{flex: 0, alignSelf: 'center'}}>
        <ZoneComponent style={{}} imageSource={getTerritoryFromId(zone.id)} />
      </View>
      <View style={{flex: 0.1}}></View>
      <View style={{flex: 0, alignSelf: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.textOwn}>Occupant actuel :</Text>
          <Image
            style={{
              margin: 2,
              width: width / 6,
              height: height / 12,
              borderWidth: 2,
              borderRadius: 50,
              backgroundColor: zone.getOwner().color,
            }}
            source={zone.getOwner().icon}
          />
        </View>
        <View style={{flex: 0.1}}></View>

        {zone.getWonTwice().length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.textOwn}>En possède 2 :</Text>
            {zone.getWonTwice().map(player => {
              return (
                <Image
                  style={{
                    margin: 2,
                    width: width / 6,
                    height: height / 12,
                    borderWidth: 2,
                    borderRadius: 50,
                    backgroundColor: player.color,
                  }}
                  source={player.icon}
                />
              );
            })}
          </View>
        ) : (
          <View></View>
        )}
        {zone.getWonOnce().length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.textOwn}>En possède 1 :</Text>
            {zone.getWonOnce().map(player => {
              return (
                <Image
                  style={{
                    margin: 2,
                    width: width / 6,
                    height: height / 12,
                    borderWidth: 2,
                    borderRadius: 50,
                    backgroundColor: player.color,
                  }}
                  source={player.icon}
                />
              );
            })}
          </View>
        ) : (
          <View></View>
        )}
      </View>

      <View style={{flex: 0, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.textOwn}>Historique des guerres</Text>
      </View>
      <View style={{flex: 0}}></View>

      <View style={{flex: 0}}>
        <Table borderStyle={{borderWidth: 1}}>
          <Row
            data={tableHead}
            flexArr={[0.495, 2, 1, 1]}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={styles.wrapper}>
            <Col
              data={tableTitles}
              style={styles.title}
              heightArr={[28, 28]}
              textStyle={styles.text}
            />
            <Rows
              data={tableData}
              flexArr={[2, 1, 1]}
              style={styles.row}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  head: {height: 40, backgroundColor: '#f1f8ff'},
  wrapper: {flexDirection: 'row'},
  title: {flex: 0.5},
  row: {height: 28},
  text: {textAlign: 'center'},
  textOwn: {fontSize: 20, fontWeight: 'bold'},
});

export default ZoneHistoryView;
