import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useGetPlayersImageQuery} from '../../services/playerImage';

const PlayerCard = ({player, navigation}) => {
  const [playerImage, setPlayerImage] = useState('');
  const [playerId, setPlayerId] = useState('');
  const {data, isLoading, error, isFetching, isSuccess, isError} =
    useGetPlayersImageQuery(player.personId);

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

  useEffect(() => {
    // if (player) {
    //   console.log('useEffect player: ', player);
    //   useGetPlayerImageQuery(player.personId);
    // }

    console.log(
      firstName,
      lastName,
      personId,
      heightFeet,
      heightInches,
      jersey,
      pos,
    );
  }, [data, error, isError, isFetching, isSuccess]);

  // console.log('Team card player: ', player);
  // if (data !== undefined) {
  //   if (data.length) {
  // console.log('PlayerCard IMAGE: ', data);
  //   }
  // }

  //TODO: get player image
  // if (player) {
  //   console.log('player id', player.personId);
  //   setPlayerImage(player.personId);
  // }

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
    //TODO: Navigate to edit teams with paylod OR
    // save player to GLOBAL TEAM STATE
    navigation.navigate('Edit Team', {
      selectedPlayerName: fullName,
      selectedPlayerId: selectedPlayer.personId,
      selectedPlayerImage: '',
    });
  };

  return (
    <Card style={styles.container} onPress={() => handleSelectPlayer(player)}>
      <View style={styles.viewContainer}>
        {/* <Text>{JSON.stringify(player)}</Text> */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`,
            }}
            style={{width: 200, height: 200}}
          />
          <View
            style={{
              position: 'absolute',
              top: 10,
              left: 5,
              right: 0,
              bottom: 0,
              // justifyContent: 'center',
              alignItems: 'flex-start',

              // backgroundColor: 'purple',
            }}>
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
          {/* <MaterialIcons name="add" /> */}
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
    // flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
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
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignSelf: 'center',
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
