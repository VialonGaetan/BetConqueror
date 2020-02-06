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
    <View>
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <ZoneComponent style={{}} zoneID={zone.id} />
        </View>
        <Text>Occupant actuel : {zone.getOwner().username}</Text>
        <Text>
          En possède 2 :
          {zone.getWonTwice().map(player => {
            return player.username;
          })}
        </Text>
        <Text>
          En possède 1 :
          {zone.getWonOnce().map(player => {
            return ' ' + player.username + ', ';
          })}
        </Text>

        <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  head: {height: 40, backgroundColor: '#f1f8ff'},
  wrapper: {flexDirection: 'row'},
  title: {flex: 0.5},
  row: {height: 28},
  text: {textAlign: 'center'},
});

export default ZoneHistoryView;
