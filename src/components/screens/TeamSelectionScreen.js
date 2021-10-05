import React, {useEffect, useState} from 'react';
import {Text, Dimensions, View, StyleSheet} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

import {useGetAllTeamsQuery} from '../../services/teams';

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
    // let filterOutUnwantedTeams = [];
    const westTeamsFiltered = [];
    const eastTeamsFiltered = [];

    if (dataToFilter.standard) {
      let result = dataToFilter.standard.filter(team => {
        //NOTE: filter out kd's team, lebrons team, and utah blue/white teams
        if (
          team.teamId === '1610616833' ||
          team.teamId === '1610616834' ||
          team.teamId === '1810612762' ||
          team.teamId === '1710612762'
        ) {
          return false;
        } else {
          return true;
        }
      });

      result.filter(team => {
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

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#58CCED'}}
      style={{backgroundColor: '#072F5F'}}
      activeColor={'#58CCED'}
      inactiveColor={'#1261A0'}
    />
  );

  return (
    <>
      {error ? (
        <Text>There was an error.</Text>
      ) : isLoading ? (
        <View style={styles.loadingViewContainer}>
          <Text
            style={{
              textAlign: 'center',
            }}>
            Loading...
          </Text>
        </View>
      ) : data ? (
        <>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
          />
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  loadingViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default TeamSelectionScreen;
