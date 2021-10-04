import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Card, Paragraph, IconButton, Colors} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {removeTeam} from '../../features/team/teamSlice';

const TeamCard = ({
  teamName,
  teamId = '',
  city = '',
  customTeamId = '',
  customTeamKey = '',
  navigation,
  screen = '',
}) => {
  const dispatch = useDispatch();
  const route = useRoute();

  useEffect(() => {
    console.log('TCCCCC TCCCCC STARTTTT: ');
    console.log('TCCCCC TCCCCC screen: ', screen);
    console.log('NAVIGATION ROUTE ', route.name);
    console.log('TCCCCC TCCCCC teamName: ', teamName);
    console.log('TCCCCC TCCCCC teamId: ', teamId);
    console.log('TCCCCC TCCCCC city: ', city);
    console.log('TCCCCC TCCCCC customTeamId: ', customTeamId);
    console.log('TCCCCC TCCCCC screen: ', screen);
    console.log('TCCCCC TCCCCC ENDDDD: ');
  }, [city, customTeamId, route.name, screen, teamId, teamName]);

  const handleSelectTeam = selectedTeam => {
    navigation.navigate('Player Selection', {
      selectedTeamName: selectedTeam,
      selectedTeamId: teamId,
      customTeamId,
      customTeamKey,
    });
  };

  const handleRemoveTeam = () => {
    console.log('handleRemoveTeam');
    dispatch(
      removeTeam({
        name: teamName,
        team: {},
        customTeamId,
        customTeamKey,
      }),
    );
  };

  const handleHomeRoute = () => {
    console.log('handleHomeRoute');
    navigation.navigate('Home', {
      screen: 'Home',
    });
  };

  return (
    <>
      {/* {screen && (
        <>
          <Text>{`!!! ${screen} !!!!`}</Text>
        </>
      )} */}
      {screen === 'Edit' && (
        <>
          <Card style={styles.container}>
            <View style={styles.viewEditTeamContainer}>
              <Text style={styles.editTeamName}>{teamName}</Text>
              <Text style={styles.editTeamCity}>{city}</Text>
            </View>
          </Card>
          {/* <View style={styles.homeRouteButtonContainer}>
            <IconButton
              icon="home"
              color={Colors.red500}
              size={26}
              onPress={handleHomeRoute}
            />
          </View> */}
          {/* <Text>EDIT HOME</Text>
          <Card style={styles.container}>
            <View style={styles.viewHomeTeamContainer}>
              <Text style={styles.editTeamName}>{teamName}</Text>
              <Text style={styles.editTeamCity}>{city}</Text>
            </View>
          </Card>
          <View style={styles.removeTeamContainer}>
            <IconButton
              icon="account-multiple-remove"
              color={Colors.red500}
              size={30}
              onPress={handleRemoveTeam}
            />
          </View> */}
        </>
      )}
      {screen === 'Home' && (
        <>
          <Card style={styles.container}>
            <View style={styles.viewHomeTeamContainer}>
              <Text style={styles.editTeamName}>{teamName}</Text>
              <Text style={styles.editTeamCity}>{city}</Text>
            </View>
          </Card>
          <View style={styles.removeTeamContainer}>
            <IconButton
              icon="account-multiple-remove"
              color={Colors.red500}
              size={30}
              onPress={handleRemoveTeam}
            />
          </View>
        </>
      )}
      {screen === 'SelectTeam' && (
        <>
          <Card
            style={styles.container}
            onPress={() => handleSelectTeam(teamName)}>
            <View style={styles.viewContainer}>
              <Text>{teamName}</Text>
              <MaterialIcons name="add" />
            </View>
          </Card>
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    // backgroundColor: 'grey',
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewEditTeamContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editTeamName: {
    fontSize: 30,
    padding: 10,
    backgroundColor: 'yellow',
  },
  editTeamCity: {
    fontSize: 16,
    padding: 10,
    backgroundColor: 'blue',
  },
  viewHomeTeamContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'brown',
  },
  removeTeamContainer: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 15,
    bottom: 0,
    alignItems: 'flex-end',
    // backgroundColor: 'grey',
  },
  homeRouteButtonContainer: {
    position: 'absolute',
    top: 65,
    left: 0,
    right: 20,
    bottom: 0,
    alignItems: 'flex-end',
    // backgroundColor: 'grey',
  },
});

export default TeamCard;
