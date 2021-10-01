import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet, StatusBar} from 'react-native';
import {useGetAllTeamsQuery} from '../../services/teams';
import {TabView, SceneMap} from 'react-native-tab-view';
import West from './West';
import East from './East';

const TeamSelectionScreen = ({route, navigation}) => {
  const [westTeams, setWestTeams] = useState(null);
  const [eastTeams, setEastTeams] = useState(null);
  const {customTeamId} = route.params;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'west', title: 'West'},
    {key: 'east', title: 'East'},
  ]);
  const {data, isLoading, error} = useGetAllTeamsQuery();
  const initialLayout = {width: Dimensions.get('window').width};

  // if (data && data.league) {
  //   console.log('data.league.standard: ', data.league.standard);
  // } else {
  //   console.log('error', error);
  // }
  console.log('TeamSelectionScreen customTeamId param ', customTeamId);

  useEffect(() => {
    if (data && data.league) {
      filterData(data.league);
    }
  }, [data]);

  // TODO: Make common component
  const filterData = dataToFilter => {
    const westTeamsFiltered = [];
    const eastTeamsFiltered = [];

    if (dataToFilter.standard) {
      dataToFilter.standard.filter(team => {
        if (team.confName === 'West') {
          westTeamsFiltered.push(team);
        } else if (team.confName === 'East') {
          eastTeamsFiltered.push(team);
        }
      });
      setWestTeams(westTeamsFiltered);
      setEastTeams(eastTeamsFiltered);
    }
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'west':
        return (
          <West
            data={westTeams}
            customTeamId={customTeamId}
            navigation={navigation}
          />
        );
      case 'east':
        return (
          <East
            data={eastTeams}
            customTeamId={customTeamId}
            navigation={navigation}
          />
        );
      default:
        return null;
    }
  };

  // console.log('WEST TEAMS: ', westTeams);
  // console.log('EAST TEAMS: ', eastTeams);
  // console.log('teamSelectionScreen NAV', navigation);

  return (
    <>
      {error ? (
        <Text>There was an error.</Text>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            style={styles.container}
          />
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
});

export default TeamSelectionScreen;
