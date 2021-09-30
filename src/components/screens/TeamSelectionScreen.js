import React from 'react';
import {View, Text, Dimensions, StyleSheet, StatusBar} from 'react-native';
import {useGetAllTeamsQuery} from '../../services/teams';
import {TabView, SceneMap} from 'react-native-tab-view';
import West from './West';
import East from './East';

const renderScene = SceneMap({
  west: West,
  east: East,
});

const TeamSelectionScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'west', title: 'West'},
    {key: 'east', title: 'East'},
  ]);
  const {data, isLoading, error} = useGetAllTeamsQuery();

  if (data && data.league) {
    console.log('data.league.standard: ', data.league.standard);
  }

  const initialLayout = {width: Dimensions.get('window').width};

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
            tabBarPosition="top"
          />
        </>
      ) : null}
      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
});

export default TeamSelectionScreen;
