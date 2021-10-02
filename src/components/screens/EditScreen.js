import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {startLoading, hasError} from '../../features/team/teamSlice';

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
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Edit Team Screen</Text>
      {/* <Text>
        {selectedPlayerName} {selectedPlayerId} {selectedPlayerImage}{' '}
        {selectedPlayerTeam} {customTeamId}
      </Text> */}
    </View>
  );
};

export default EditScreen;
