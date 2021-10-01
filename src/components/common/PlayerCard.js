import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PlayerCard = ({player, navigation}) => {
  console.log('Team card player: ', player);

  //TODO: get player image

  const handleSelectPlayer = selectedPlayer => {
    const fullName = `${selectedPlayer.firstName} ${selectedPlayer.lastName}`;
    console.log(
      'selectedPlayer is: ',
      selectedPlayer.firstName,
      ' ',
      selectedPlayer.lastName,
      ' - with personID: ',
      selectedPlayer.personId,
    );
    navigation.navigate('Edit Team', {
      selectedPlayerName: fullName,
      selectedPlayerId: selectedPlayer.personId,
      selectedPlayerImage: '',
    });
  };

  return (
    <Card style={styles.container} onPress={() => handleSelectPlayer(player)}>
      <View style={styles.viewContainer}>
        <Text>{JSON.stringify(player)}</Text>
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

export default PlayerCard;
