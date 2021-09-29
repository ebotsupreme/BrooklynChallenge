import React from 'react';
import {View, Text} from 'react-native';
import {useGetAllTeamsQuery} from '../../services/teams';

const TeamSelectionScreen = () => {
  const {data, isLoading, error} = useGetAllTeamsQuery();

  if (data && data.league) {
    console.log('data.league.standard: ', data.league.standard);
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Team Selection Screen</Text>
      {error ? (
        <Text>There was an error.</Text>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <Text>data loaded!</Text>
      ) : null}
    </View>
  );
};

export default TeamSelectionScreen;
