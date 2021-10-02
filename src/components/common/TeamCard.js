import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TeamCard = ({
  teamName,
  teamId,
  city = '',
  customTeamId = '',
  customTeamKey = '',
  navigation,
  screen = '',
}) => {
  const handleSelectTeam = selectedTeam => {
    navigation.navigate('Player Selection', {
      selectedTeamName: selectedTeam,
      selectedTeamId: teamId,
      customTeamId: customTeamId,
      customTeamKey: customTeamKey,
    });
  };

  return (
    <>
      {screen === 'Edit' ? (
        <Card style={styles.container}>
          <View style={styles.viewEditTeamContainer}>
            <Text style={styles.editTeamName}>{teamName}</Text>
            <Text style={styles.editTeamCity}>{city}</Text>
          </View>
        </Card>
      ) : (
        <Card
          style={styles.container}
          onPress={() => handleSelectTeam(teamName)}>
          <View style={styles.viewContainer}>
            <Text>{teamName}</Text>
            <MaterialIcons name="add" />
          </View>
        </Card>
      )}
    </>
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
  viewEditTeamContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editTeamName: {
    fontSize: 30,
    padding: 10,
  },
  editTeamCity: {
    fontSize: 16,
    padding: 10,
  },
});

export default TeamCard;
