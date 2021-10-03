import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useGetAllPlayersQuery} from '../../services/players';
import PlayerCard from '../common/PlayerCard';
// import {useGetPlayerImageQuery} from '../../services/playerImage';

const PlayerSelectionScreen = ({route, navigation}) => {
  const [players, setPlayers] = useState(null);
  const {selectedTeamName, selectedTeamId, customTeamId, customTeamKey} =
    route.params;
  const {data, isLoading, error} = useGetAllPlayersQuery(selectedTeamName);
  const teamState = useSelector(state => state.team);

  useEffect(() => {
    if (data && data.league) {
      filterData(data.league);
    }

    console.log('PLAYER SELECTION SCREEN TEAMSTATE TEAM', teamState.teams);
    console.log(
      'PLAYER SELECTION SCREEN TEAMSTATE PLAYERS',
      teamState.teams[0].players,
    );
  }, [data, filterData, teamState]);

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
    <PlayerCard
      player={item}
      teamName={selectedTeamName}
      navigation={navigation}
      customTeamId={customTeamId}
      customTeamKey={customTeamKey}
    />
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
