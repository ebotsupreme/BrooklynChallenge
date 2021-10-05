import React, {useEffect, useState} from 'react';
import {Text, Dimensions} from 'react-native';
import {useGetAllTeamsQuery} from '../../services/teams';
import {TabView} from 'react-native-tab-view';
import West from './West';
import East from './East';

const TeamSelectionScreen = ({route, navigation}) => {
  const [westTeams, setWestTeams] = useState(null);
  const [eastTeams, setEastTeams] = useState(null);
  const {customTeamId, customTeamKey} = route.params;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'west', title: 'West'},
    {key: 'east', title: 'East'},
  ]);
  const {data, isLoading, error} = useGetAllTeamsQuery();
  const initialLayout = {width: Dimensions.get('window').width};

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
            customTeamKey={customTeamKey}
            navigation={navigation}
          />
        );
      case 'east':
        return (
          <East
            data={eastTeams}
            customTeamId={customTeamId}
            customTeamKey={customTeamKey}
            navigation={navigation}
          />
        );
      default:
        return null;
    }
  };

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
          />
        </>
      ) : null}
    </>
  );
};

export default TeamSelectionScreen;
