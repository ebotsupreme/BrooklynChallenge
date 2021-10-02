import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from 'react-native-paper';
import {startLoading, hasError} from '../../features/team/teamSlice';
import TeamCard from '../common/TeamCard';
import PlayerCard from '../common/PlayerCard';

const EditScreen = ({route, navigation}) => {
  const teamState = useSelector(state => state.team);
  const dispatch = useDispatch();
  const {
    // selectedPlayerName,
    // selectedPlayerId,
    // selectedPlayerImage,
    // selectedPlayerTeam,
    customTeamId,
    customTeamKey,
    // jersey,
    // pos,
  } = route.params;
  const {name, city, id} = teamState && teamState.teams[customTeamKey];

  useEffect(() => {
    console.log('EDIT SCREEN START');
    console.log('customTeamKey ', customTeamKey);
    console.log('teamState ', teamState);
    console.log('teamState.teams ', teamState.teams);
    console.log(
      'Edit Screen teamState players',
      teamState.teams[customTeamKey].players,
    );
    console.log('XXXXXX');
    console.log(name, city, id);
    console.log('EDIT SCREEN END');
  }, [city, customTeamKey, id, name, teamState]);

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
          style={styles.newTeam}
          labelStyle={{fontSize: 14}}
          icon="account"
          mode="contained"
          onPress={() => console.log('add player Pressed')}>
          Add Player
        </Button>
        <Button
          style={styles.clear}
          labelStyle={{fontSize: 14}}
          icon="axe"
          mode="contained"
          onPress={() => console.log('clear all Pressed')}>
          Clear All
        </Button>
      </View>
      {teamState.error ? (
        <Text>There was an error.</Text>
      ) : teamState.isLoading ? (
        <Text>Loading...</Text>
      ) : teamState ? (
        <View>
          {teamState.teams[customTeamKey] && (
            <FlatList
              data={teamState && teamState.teams[customTeamKey].players}
              renderItem={renderItem}
              keyExtractor={item => item.id}
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
