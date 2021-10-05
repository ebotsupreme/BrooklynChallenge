import React, {useState} from 'react';
import {Text, StyleSheet, View, Image, Platform} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
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
  const [isImageFailed, setIsImageFailed] = useState(false);
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
    dispatch(
      removePlayer({
        id,
        name,
        customTeamId,
        customTeamKey,
      }),
    );
  };

  const onErrorLoadingImage = () => {
    setIsImageFailed(true);
  };

  return (
    <>
      {screen === 'Edit' && teamState ? (
        <Card style={styles.container}>
          <View style={styles.viewContainer}>
            <View style={styles.imageContainer}>
              {/* TODO: uri will need to be env variable along with query calls in all reducers */}
              {!isImageFailed ? (
                <Image
                  source={{
                    uri: image,
                  }}
                  style={{width: 100, height: 100}}
                  onError={onErrorLoadingImage}
                />
              ) : (
                <Text>No Image Available</Text>
              )}

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
                <Text style={[styles.titleStat, {fontSize: 13}]}>
                  {nbaTeam}
                </Text>
              </View>
              <View style={styles.removePlayerButtonContainer}>
                <IconButton
                  icon="account-remove"
                  color={'#072F5F'}
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
              {!isImageFailed ? (
                <Image
                  source={{
                    uri: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`,
                  }}
                  style={{width: 200, height: 200}}
                  onError={onErrorLoadingImage}
                />
              ) : (
                <Text>No Image Available</Text>
              )}
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
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#072F5F',
    borderRadius: 5,
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
    fontSize: 28,
    borderWidth: 2,
    borderColor: '#072F5F',
    borderRadius: 15,
    minWidth: 50,
    padding: 2,
    textAlign: 'center',
  },
  infoContainer: {
    flex: 1,
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
    marginTop: 15,
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
    marginBottom: 20,
  },
  nameEditMode: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 5,
    paddingHorizontal: 15,
  },
  bottomEditMode: {
    justifyContent: 'flex-end',
    marginBottom: 5,
    position: 'absolute',
    bottom: 0,
    paddingVertical: 5,
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
    borderWidth: 2,
    borderColor: '#072F5F',
    borderRadius: 5,
    width: 22,
    padding: 2,
    textAlign: 'center',
  },
  removePlayerButtonContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 53 : 55,
    left: 0,
    right: Platform.OS === 'ios' ? -6 : -6,
    bottom: 0,
    alignItems: 'flex-end',
  },
});

export default PlayerCard;
