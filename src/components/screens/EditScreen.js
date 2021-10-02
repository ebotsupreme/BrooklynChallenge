import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {startLoading, hasError} from '../../features/team/teamSlice';
import TeamCard from '../common/TeamCard';

const EditScreen = ({route, navigation}) => {
  const teamState = useSelector(state => state.team);
  const dispatch = useDispatch();
  const {
    // selectedPlayerName,
    // selectedPlayerId,
    // selectedPlayerImage,
    // selectedPlayerTeam,
    // customTeamId,
    customTeamKey,
  } = route.params;
  const {name, city, id} = teamState.teams[customTeamKey];

  useEffect(() => {
    // console.log('Edit Screen teamState', teamState);
    // console.log('Edit Screen teamState teams', teamState.teams);
    // if (teamState.teams.players) {
    //   console.log('yes ');
    // }
    console.log(
      'Edit Screen teamState players',
      teamState.teams[customTeamKey].players,
    );
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

  return (
    <View style={styles.container}>
      <TeamCard
        teamName={name}
        teamId={id}
        city={city}
        navigation={navigation}
        screen={'Edit'}
      />
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
