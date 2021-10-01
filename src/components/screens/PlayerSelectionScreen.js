import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useGetAllPlayersQuery} from '../../services/players';
import PlayerCard from '../common/PlayerCard';
import {useGetPlayerImageQuery} from '../../services/playerImage';

const PlayerSelectionScreen = ({route, navigation}) => {
  const [players, setPlayers] = useState(null);
  const {selectedTeamName, selectedTeamId} = route.params;
  const {data, isLoading, error} = useGetAllPlayersQuery(selectedTeamName);
  // const {playerImageData, imageIsLoading, imageError} =
  //   useGetPlayerImageQuery();
  // console.log(
  //   'player selection screen teamName: ',
  //   selectedTeamName,
  //   ' teamID: ',
  //   selectedTeamId,
  // );
  // if (data && data.league) {
  //   // console.log('data.league.standard: ', data.league.standard);
  //   console.log('player list: ', players);
  // } else {
  //   console.log('error', error);
  // }

  // console.log('playerImageData', playerImageData);

  useEffect(() => {
    if (data && data.league) {
      filterData(data.league);
    }
    // if (playerImageData) {
    //   console.log(playerImageData);
    // }
  }, [data, filterData]);

  // TODO: Make common component
  const filterData = useCallback(
    dataToFilter => {
      const filteredPlayers = [];

      if (dataToFilter.standard) {
        dataToFilter.standard.filter(player => {
          // console.log('player to filter: ', player);
          if (player.teamId === selectedTeamId && player.nbaDebutYear) {
            filteredPlayers.push(player);
          }
        });
        setPlayers(filteredPlayers);
      }
    },
    [selectedTeamId],
  );

  const renderItem = ({item}) => (
    <PlayerCard player={item} navigation={navigation} />
  );

  return (
    <>
      {error ? (
        <Text>There was an error.</Text>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <View style={styles.container}>
          {players && (
            <FlatList
              data={players}
              renderItem={renderItem}
              keyExtractor={item => item.personId}
            />
          )}
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});

export default PlayerSelectionScreen;
