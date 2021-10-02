import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
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
  const {name, city, id} = teamState.teams[customTeamKey];

  useEffect(() => {
    // console.log('Edit Screen teamState', teamState);
    // console.log('Edit Screen teamState teams', teamState.teams);
    // if (teamState.teams.players) {
    //   console.log('yes ');
    // }
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
  }, [customTeamKey, teamState]);

  // console.log(
  //   'Edit Screen: ',
  //   selectedPlayerName,
  //   ' ',
  //   selectedPlayerId,
  //   ' ',
  //   selectedPlayerImage,
  //   ' ',
  //   selectedPlayerTeam,
  //   ' ',
  //   customTeamId,
  // );

  const renderItem = ({item}) => {
    console.log('!!!!!!! RI item: ', item);

    return (
      <PlayerCard
        player={item}
        teamName={teamState && teamState.teams[customTeamKey].name}
        navigation={navigation}
        customTeamId={customTeamId}
        customTeamKey={customTeamKey}
        // playerNumber={jersey}
        // position={pos}
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
        // style={{margin: 20}}
      />
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
      {/* <Text>
        {selectedPlayerName} {selectedPlayerId} {selectedPlayerImage}{' '}
        {selectedPlayerTeam} {customTeamId}
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});

export default EditScreen;
