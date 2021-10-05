import React from 'react';
import {Text, StyleSheet, View, Platform} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
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
              <Text style={styles.teamCity}>- {city} -</Text>
            </View>
            {Platform.OS === 'android' && (
              <View style={styles.editTeamButtonContainer}>
                <IconButton
                  icon="account-edit"
                  color={'#072F5F'}
                  size={26}
                  onPress={handleEditTeam}
                />
              </View>
            )}
          </Card>
          {Platform.OS === 'ios' && (
            <View style={styles.editTeamButtonContainer}>
              <IconButton
                icon="account-edit"
                color={'#072F5F'}
                size={26}
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
                      color={'#072F5F'}
                      size={26}
                      onPress={handleEditTeamModal}
                    />
                  </View>
                  <View style={styles.removeTeamContainer}>
                    <IconButton
                      icon="account-multiple-remove"
                      color={'#072F5F'}
                      size={26}
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
                    color={'#072F5F'}
                    size={26}
                    onPress={handleEditTeamModal}
                  />
                </View>
                <View style={styles.removeTeamContainer}>
                  <IconButton
                    icon="account-multiple-remove"
                    color={'#072F5F'}
                    size={26}
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
              <MaterialIcons name="sports-basketball" size={20} />
              <Text style={{paddingHorizontal: 40}}>{teamName}</Text>
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
    justifyContent: 'flex-start',
  },
  viewEditTeamContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#072F5F',
    borderRadius: 5,
  },
  teamName: {
    fontSize: 22,
    padding: 10,
    fontWeight: '700',
  },
  teamCity: {
    fontSize: 16,
    padding: 10,
    paddingTop: 0,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  viewHomeTeamContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#072F5F',
    borderRadius: 5,
  },
  homeEditTeamButtonContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 53 : 38,
    right: Platform.OS === 'ios' ? 80 : 60,
    bottom: 10,
    alignItems: 'flex-end',
    width: 50,
  },
  removeTeamContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 53 : 38,
    right: Platform.OS === 'ios' ? 15 : -2,
    bottom: 10,
    alignItems: 'flex-end',
    width: 50,
  },
  editTeamButtonContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 53 : 35,
    right: -5,
    bottom: Platform.OS === 'android' ? 10 : 0,
    alignItems: 'flex-end',
    width: 50,
  },
});

export default TeamCard;
