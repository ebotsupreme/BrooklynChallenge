import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PlayerCard = ({player, teamName, customTeamId, navigation}) => {
  const [playerImage, setPlayerImage] = useState('');
  const [playerId, setPlayerId] = useState('');

  const {
    firstName,
    lastName,
    personId,
    heightFeet,
    heightInches,
    jersey,
    pos,
    nbaDebutYear,
  } = player;

  const handleSelectPlayer = selectedPlayer => {
    const fullName = `${selectedPlayer.firstName} ${selectedPlayer.lastName}`;
    console.log(
      'selectedPlayer is: ',
      selectedPlayer.firstName,
      ' ',
      selectedPlayer.lastName,
      ' - with personID: ',
      selectedPlayer.personId,
      ' - teamName: ',
      teamName,
      ' - customTeamId: ',
      customTeamId,
    );
    //TODO: Navigate to edit teams with paylod OR
    // save player to GLOBAL TEAM STATE
    navigation.navigate('Edit Team', {
      selectedPlayerName: fullName,
      selectedPlayerId: selectedPlayer.personId,
      selectedPlayerImage: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`,
      selectedPlayerTeam: teamName,
      customTeamId: customTeamId,
    });

    // OR save player here to state
  };

  return (
    <Card style={styles.container} onPress={() => handleSelectPlayer(player)}>
      <View style={styles.viewContainer}>
        <View style={styles.imageContainer}>
          {/* TODO: uri will need to be env variable along with query calls in all reducers */}
          <Image
            source={{
              uri: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`,
            }}
            style={{width: 200, height: 200}}
          />
          <View style={styles.jersyContainer}>
            <Text style={styles.jersey}>{jersey}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
          <View style={styles.bottom}>
            <Text style={styles.titleStat}>
              <Text style={styles.statName}>Height:</Text>{' '}
              <Text style={styles.titleStat}>
                {heightFeet}ft. {heightInches}"
              </Text>
            </Text>
            <Text style={styles.titleStat}>
              <Text style={styles.statName}>Position:</Text> {pos}
            </Text>
            <Text style={styles.titleStat}>
              <Text style={styles.statName}>Class of:</Text> {nbaDebutYear}
            </Text>
          </View>
        </View>
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
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  jersyContainer: {
    position: 'absolute',
    top: 10,
    left: 5,
    right: 0,
    bottom: 0,
    alignItems: 'flex-start',
  },
  jersey: {
    fontSize: 40,
    // backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    minWidth: 50,
    padding: 2,
    textAlign: 'center',
  },
  infoContainer: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'flex-start',
    padding: 5,
    fontWeight: '600',
  },
  statName: {
    fontWeight: '700',
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 5,
  },
  titleStat: {
    fontSize: 16,
  },
  stat: {
    fontSize: 14,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
});

export default PlayerCard;
