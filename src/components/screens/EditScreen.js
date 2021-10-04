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
    // console.log('EDIT SCREEN START');
    // console.log('customTeamKey ', customTeamKey);
    // console.log('teamState ', teamState);
    // console.log('teamState.teams ', teamState.teams);
    // console.log(
    //   'Edit Screen teamState players',
    //   teamState.teams[customTeamKey].players,
    // );
    // console.log('XXXXXX');
    // console.log(name, city, id);
    // console.log('EDIT SCREEN END');
    getPlayerCount();
  }, [city, customTeamKey, getPlayerCount, id, name, teamState]);

  const handleAddPlayer = () => {
    navigation.navigate('Team Selection', {
      customTeamId,
      customTeamKey,
    });
  };

  const getPlayerCount = useCallback(() => {
    console.log('getPlayerCount teamState ', teamState);
    console.log('teamState.teams.length', teamState.teams.length);
    if (
      teamState.teams[customTeamKey] &&
      teamState.teams[customTeamKey].length >= 1
    ) {
      console.log(
        'EEE teamState.teams[customTeamKey]: ',
        teamState.teams[customTeamKey],
        ' EEE',
      );
      console.log(
        'PLAYER COUNT  ',
        teamState.teams[customTeamKey].players.length,
      );
      let playerCount =
        teamState.teams && teamState.teams[customTeamKey].players.length;
      playerCount === 5
        ? setIsAddPlayerButtonDisabled(true)
        : setIsAddPlayerButtonDisabled(false);
      // if (playerCount === 5) {
      //   // disable add player button
      //   setIsAddPlayerButtonActive(false);
      // } else {
      //   setIsAddPlayerButtonActive(true);
      // }
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
