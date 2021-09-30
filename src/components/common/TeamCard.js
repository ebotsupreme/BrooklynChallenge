import * as React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const selectTeam = teamName => {
  console.log('team pressed: ', teamName);
};

const TeamCard = ({teamName, teamId}) => (
  <Card
    key={teamId + 1}
    style={styles.container}
    onPress={() => selectTeam(teamName)}>
    <View style={styles.viewContainer}>
      <Text key={teamId + 2}>{teamName}</Text>
      <MaterialIcons name="add" />
    </View>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default TeamCard;
