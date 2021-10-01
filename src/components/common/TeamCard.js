import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TeamCard = ({teamName, teamId, navigation}) => {
  // const [team, setTeam] = useState('');

  const handleSelectTeam = selectedTeam => {
    console.log('selectedTeam is: ', selectedTeam, ' - with teamID: ', teamId);
    // setTeam(selectedTeam);
    navigation.navigate('Player Selection', {
      selectedTeamName: selectedTeam,
      selectedTeamId: teamId,
    });
  };

  return (
    <Card style={styles.container} onPress={() => handleSelectTeam(teamName)}>
      <View style={styles.viewContainer}>
        <Text>{teamName}</Text>
        <MaterialIcons name="add" />
      </View>
    </Card>
  );
};
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
