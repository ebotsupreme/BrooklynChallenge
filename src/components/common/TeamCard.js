import React from 'react';
import {Text, StyleSheet, View, Platform} from 'react-native';
import {Card, IconButton, Colors} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {removeTeam} from '../../features/team/teamSlice';

const TeamCard = ({
  teamName,
  teamId = '',
  city = '',
  customTeamId = '',
  customTeamKey = '',
  navigation,
  screen = '',
  showModal = () => {},
}) => {
  const dispatch = useDispatch();

  const handleEditTeamModal = () => {
    navigation.navigate('Edit Team', {
      name: teamName,
      city: city,
      id: teamId,
      customTeamId,
      customTeamKey,
    });
  };

  const handleSelectTeam = selectedTeam => {
    navigation.navigate('Player Selection', {
      selectedTeamName: selectedTeam,
      selectedTeamId: teamId,
      customTeamId,
      customTeamKey,
    });
  };

  const handleRemoveTeam = () => {
    dispatch(
      removeTeam({
        name: teamName,
        team: [],
        customTeamId,
        customTeamKey,
      }),
    );
    navigation.navigate('Home', {
      customTeamId,
      customTeamKey,
    });
  };

  const handleEditTeam = () => {
    showModal();
  };

  return (
    <>
      {screen === 'Edit' && (
        <>
          <Card style={styles.container}>
            <View style={styles.viewEditTeamContainer}>
              <Text style={styles.teamName}>{teamName}</Text>
              <Text style={styles.teamCity}>{city}</Text>
            </View>
            {Platform.OS === 'android' && (
              <View style={styles.editTeamButtonContainer}>
                <IconButton
                  icon="account-edit"
                  color={Colors.red500}
                  size={30}
                  onPress={handleEditTeam}
                />
              </View>
            )}
          </Card>
          {Platform.OS === 'ios' && (
            <View style={styles.editTeamButtonContainer}>
              <IconButton
                icon="account-edit"
                color={Colors.red500}
                size={30}
                onPress={handleEditTeam}
              />
            </View>
          )}
        </>
      )}
      {screen === 'Home' && (
        <>
          <View style={{position: 'relative'}}>
            <Card style={styles.container}>
              <View style={styles.viewHomeTeamContainer}>
                <Text style={styles.teamName}>{teamName}</Text>
                <Text style={styles.teamCity}>{city}</Text>
              </View>
              {Platform.OS === 'android' && (
                <>
                  <View style={styles.homeEditTeamButtonContainer}>
                    <IconButton
                      icon="account-edit"
                      color={Colors.red500}
                      size={30}
                      onPress={handleEditTeamModal}
                    />
                  </View>
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
            </Card>
            {Platform.OS === 'ios' && (
              <>
                <View style={styles.homeEditTeamButtonContainer}>
                  <IconButton
                    icon="account-edit"
                    color={Colors.red500}
                    size={30}
                    onPress={handleEditTeamModal}
                  />
                </View>
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
  teamName: {
    fontSize: 22,
    padding: 10,
    backgroundColor: 'yellow',
  },
  teamCity: {
    fontSize: 14,
    padding: 10,
    backgroundColor: 'blue',
  },
  viewHomeTeamContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'purple',
  },
  homeEditTeamButtonContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 53 : 40,
    right: Platform.OS === 'ios' ? 80 : 70,
    bottom: 10,
    alignItems: 'flex-end',
    width: 50,
    backgroundColor: 'grey',
  },
  removeTeamContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 53 : 40,
    right: Platform.OS === 'ios' ? 15 : 5,
    bottom: 10,
    alignItems: 'flex-end',
    width: 50,
    backgroundColor: 'blue',
  },
  editTeamButtonContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 53 : 45,
    right: 15,
    bottom: Platform.OS === 'android' ? 10 : 0,
    alignItems: 'flex-end',
    width: 50,
    backgroundColor: 'yellow',
  },
});

export default TeamCard;
