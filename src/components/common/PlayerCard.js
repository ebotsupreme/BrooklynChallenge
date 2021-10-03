import React, {useState} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {Card, IconButton, Colors} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {
  startLoading,
  hasError,
  addPlayer,
  removePlayer,
} from '../../features/team/teamSlice';

const PlayerCard = ({
  player,
  teamName,
  customTeamId,
  customTeamKey,
  navigation,
  screen = '',
}) => {
  const teamState = useSelector(state => state.team);
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    personId,
    heightFeet,
    heightInches,
    jersey,
    pos,
    nbaDebutYear,
    id,
    image,
    name,
    nbaTeam,
    position,
  } = player;

  const handleSelectPlayer = selectedPlayer => {
    const fullName = `${selectedPlayer.firstName} ${selectedPlayer.lastName}`;
    //TODO: Navigate to edit teams with paylod OR
    // save player to GLOBAL TEAM STATE
    // navigation.navigate('Edit Team', {
    //   selectedPlayerName: fullName,
    //   selectedPlayerId: personId,
    //   selectedPlayerImage: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`,
    //   selectedPlayerTeam: teamName,
    //   customTeamId,
    // });

    // OR save player here to state
    dispatch(
      addPlayer({
        id: personId,
        name: fullName,
        image: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`,
        nbaTeam: teamName,
        customTeamId,
        customTeamKey,
        jersey,
        position: pos,
      }),
    );
    navigation.navigate('Edit Team', {
      customTeamId,
      customTeamKey,
    });
  };

  const handleRemovePlayer = () => {
    console.log(
      'handleRemovePlayer - customTeamId, playerId, playerName: ',
      customTeamId,
      id,
      name,
    );
    dispatch(
      removePlayer({
        id,
        name,
        customTeamId,
        customTeamKey,
      }),
    );
  };

  return (
    <>
      {screen === 'Edit' && teamState ? (
        <Card style={styles.container}>
          <View style={styles.viewContainer}>
            <View style={styles.imageContainer}>
              {/* TODO: uri will need to be env variable along with query calls in all reducers */}
              <Image
                source={{
                  uri: image,
                }}
                style={{width: 100, height: 100}}
              />
              <View style={styles.jersyContainerEditMode}>
                <Text style={styles.jerseyEditMode}>{jersey}</Text>
              </View>
            </View>
            <View
              style={[
                styles.infoContainer,
                {paddingVertical: 5, paddingHorizontal: 0},
              ]}>
              <Text style={styles.nameEditMode}>{name}</Text>
              <View style={styles.bottomEditMode}>
                <Text style={styles.titleStat}>
                  <Text style={styles.statName}>Position:</Text> {position}
                </Text>
                <Text style={[styles.titleStat, {fontSize: 14}]}>
                  {nbaTeam}
                </Text>
              </View>
              <View style={styles.removePlayerButtonContainer}>
                <IconButton
                  icon="account-remove"
                  color={Colors.red500}
                  size={26}
                  onPress={handleRemovePlayer}
                />
              </View>
            </View>
          </View>
        </Card>
      ) : (
        <Card
          style={styles.container}
          onPress={() => handleSelectPlayer(player)}>
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
  nameEditMode: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 5,
    // backgroundColor: 'green',
    paddingHorizontal: 15,
  },
  bottomEditMode: {
    justifyContent: 'flex-end',
    marginBottom: 5,
    position: 'absolute',
    bottom: 0,
    paddingVertical: 5,
    // backgroundColor: 'green',
    paddingHorizontal: 15,
  },
  jersyContainerEditMode: {
    position: 'absolute',
    top: 5,
    left: 4,
    right: 0,
    bottom: 0,
    alignItems: 'flex-start',
  },
  jerseyEditMode: {
    fontSize: 18,
    fontWeight: '600',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    width: 22,
    padding: 2,
    textAlign: 'center',
  },
  removePlayerButtonContainer: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 2,
    bottom: 0,
    alignItems: 'flex-end',
    // backgroundColor: 'grey',
  },
});

export default PlayerCard;
