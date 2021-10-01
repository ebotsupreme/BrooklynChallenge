import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useGetAllPlayersQuery} from '../../services/players';
import PlayerCard from '../common/PlayerCard';

const PlayerSelectionScreen = ({route, navigation}) => {
  const [players, setPlayers] = useState(null);
  const {selectedTeamName, selectedTeamId} = route.params;
  const {data, isLoading, error} = useGetAllPlayersQuery(selectedTeamName);

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

  useEffect(() => {
    if (data && data.league) {
      filterData(data.league);
    }
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
    <View style={styles.container}>
      {players && (
        <FlatList
          data={players}
          renderItem={renderItem}
          keyExtractor={item => item.personId}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});

export default PlayerSelectionScreen;
