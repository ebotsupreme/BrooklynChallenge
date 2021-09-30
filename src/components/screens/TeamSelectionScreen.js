import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet, StatusBar} from 'react-native';
import {useGetAllTeamsQuery} from '../../services/teams';
import {TabView, SceneMap} from 'react-native-tab-view';
import West from './West';
import East from './East';

// const renderScene = SceneMap({
//   west: West,
//   east: East,
// });

const TeamSelectionScreen = () => {
  const [westTeams, setWestTeams] = useState(null);
  const [eastTeams, setEastTeams] = useState(null);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'west', title: 'West'},
    {key: 'east', title: 'East'},
  ]);
  const {data, isLoading, error} = useGetAllTeamsQuery();
  const initialLayout = {width: Dimensions.get('window').width};

  // if (data && data.league) {
  //   console.log('data.league.standard: ', data.league.standard);
  // }

  useEffect(() => {
    if (data && data.league) {
      filterData(data.league);
    }
  }, [data]);

  const filterData = data => {
    const westTeamsFiltered = [];
    const eastTeamsFiltered = [];

    if (data.standard) {
      data.standard.filter(team => {
        // console.log('filter team: ', team);
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
        return <West data={westTeams} />;
      case 'east':
        return <East data={eastTeams} />;
      default:
        return null;
    }
  };

  console.log('WEST TEAMS: ', westTeams);
  console.log('EAST TEAMS: ', eastTeams);

  return (
    <>
      {/* <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
       <Text>Team Selection Screen</Text> */}

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
      {/* </View> */}
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
