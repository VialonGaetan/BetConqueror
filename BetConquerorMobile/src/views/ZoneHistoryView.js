import React from 'react';
import ZoneComponent from '../components/zone';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import Zone from '../models/zone';
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Col,
} from 'react-native-table-component';

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
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <View style={{flex: 0.2, alignSelf: 'center'}}>
        <ZoneComponent style={{}} zoneID={zone.id} />
      </View>
      <View style={{flex: 0.3, alignSelf: 'center'}}>
        <Text style={styles.textOwn}>
          Occupant actuel : {zone.getOwner().username}
        </Text>
        <Text style={styles.textOwn}>
          En possède 2 :
          {zone.getWonTwice().map(player => {
            return ' ' + player.username + ',';
          })}
        </Text>
        <Text style={styles.textOwn}>
          En possède 1 :
          {zone.getWonOnce().map(player => {
            return ' ' + player.username + ', ';
          })}
        </Text>
      </View>
      <View style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.textOwn}>Historique des guerres</Text>
      </View>
      <View style={{flex: 0.4}}>
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
  textOwn: {fontSize: 20, fontWeight: 'bold', margin: 20},
});

export default ZoneHistoryView;
