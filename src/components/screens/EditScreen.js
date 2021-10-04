import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeAllPlayers} from '../../features/team/teamSlice';
import {Button} from 'react-native-paper';
import TeamCard from '../common/TeamCard';
import PlayerCard from '../common/PlayerCard';

const EditScreen = ({route, navigation}) => {
  const [isAddPlayerButtonDisabled, setIsAddPlayerButtonDisabled] =
    useState(false);
  const teamState = useSelector(state => state.team);
  const {customTeamId, customTeamKey} = route.params;
  const {name, city, id} =
    teamState.teams.length && teamState.teams[customTeamKey];
  const dispatch = useDispatch();

  useEffect(() => {
    getPlayerCount();
  }, [getPlayerCount, teamState]);

  const handleAddPlayer = () => {
    navigation.navigate('Team Selection', {
      customTeamId,
      customTeamKey,
    });
  };

  const getPlayerCount = useCallback(() => {
    if (teamState.teams[customTeamKey]) {
      let playerCount =
        teamState.teams && teamState.teams[customTeamKey].players.length;
      playerCount === 5
        ? setIsAddPlayerButtonDisabled(true)
        : setIsAddPlayerButtonDisabled(false);
    }
  }, [customTeamKey, teamState]);

  const handleClearAll = () => {
    console.log('Clear all');
    dispatch(
      removeAllPlayers({
        players: [],
        customTeamId,
        customTeamKey,
      }),
    );
  };

  const renderItem = ({item}) => {
    return (
      <PlayerCard
        player={item}
        teamName={teamState && teamState.teams[customTeamKey].name}
        navigation={navigation}
        customTeamId={customTeamId}
        customTeamKey={customTeamKey}
        screen={'Edit'}
      />
    );
  };

  return (
    <View style={styles.container}>
      {teamState.teams.length >= 1 && (
        <>
          <TeamCard
            teamName={name}
            teamId={id}
            city={city}
            navigation={navigation}
            screen={'Edit'}
          />
          <View style={styles.buttonContainer}>
            {/* TODO: Could be resuable component - also used in Edit Screen */}
            <Button
              style={[
                styles.newTeam,
                isAddPlayerButtonDisabled && {backgroundColor: '#D3D3D3'},
              ]}
              labelStyle={{fontSize: 14}}
              icon="account"
              mode="contained"
              onPress={handleAddPlayer}
              disabled={isAddPlayerButtonDisabled}>
              Add Player
            </Button>
            <Button
              style={styles.clear}
              labelStyle={{fontSize: 14}}
              icon="axe"
              mode="contained"
              onPress={handleClearAll}>
              Clear All
            </Button>
          </View>
        </>
      )}
      {teamState.error ? (
        <Text>There was an error.</Text>
      ) : teamState.isLoading ? (
        <Text>Loading...</Text>
      ) : teamState ? (
        <View style={{flex: 1}}>
          {teamState.teams[customTeamKey] && (
            <FlatList
              data={teamState.teams[customTeamKey].players}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={{paddingVertical: 10}}
            />
          )}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: 'blue',
    paddingTop: 15,
    paddingBottom: 25,
  },
  newTeam: {
    backgroundColor: 'green',
  },
  clear: {
    backgroundColor: 'red',
  },
});

export default EditScreen;
