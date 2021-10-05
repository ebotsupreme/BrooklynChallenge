import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Portal, Modal, TextInput, Provider} from 'react-native-paper';

import {removeAllPlayers, editTeam} from '../../features/team/teamSlice';

import TeamCard from '../common/TeamCard';
import PlayerCard from '../common/PlayerCard';

const EditScreen = ({route, navigation}) => {
  const [isAddPlayerButtonDisabled, setIsAddPlayerButtonDisabled] =
    useState(false);
  const [visible, setVisible] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const teamState = useSelector(state => state.team);
  const {customTeamId, customTeamKey} = route.params;

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  if (currentTeam !== undefined) {
    if (!currentTeam) {
    }
    var {name, city, id} =
      teamState && currentTeam ? currentTeam : teamState.teams[customTeamKey];
  } else {
    var {name, city, id} = '';
  }

  const [editTeamName, setEditTeamName] = useState(name);
  const [editTeamCity, setEditTeamCity] = useState(city);

  const dispatch = useDispatch();

  useEffect(() => {
    getPlayerCount();
    getCurrentTeam();
  }, [currentTeam, customTeamKey, getCurrentTeam, getPlayerCount, teamState]);

  const getCurrentTeam = useCallback(() => {
    if (teamState.teams) {
      teamState.teams.map(team => {
        if (team.id === customTeamId) {
          setCurrentTeam(team);
        }
      });
    }
  }, [customTeamId, teamState.teams]);

  const handleAddPlayer = () => {
    navigation.navigate('Team Selection', {
      customTeamId,
      customTeamKey,
    });
  };

  const getPlayerCount = useCallback(() => {
    if (currentTeam) {
      let playerCount = teamState.teams && currentTeam.players.length;
      playerCount === 5
        ? setIsAddPlayerButtonDisabled(true)
        : setIsAddPlayerButtonDisabled(false);
    }
  }, [currentTeam, teamState.teams]);

  const handleClearAll = () => {
    dispatch(
      removeAllPlayers({
        players: [],
        customTeamId,
        customTeamKey,
      }),
    );
  };

  const handleEditTeamModal = () => {
    dispatch(
      editTeam({
        name: editTeamName,
        city: editTeamCity,
        customTeamId,
        customTeamKey,
      }),
    );
    setEditTeamName('');
    setEditTeamCity('');
    hideModal();
  };

  const handleCloseModal = () => {
    setEditTeamName('');
    setEditTeamCity('');
    hideModal();
  };

  const renderItem = ({item}) => {
    return (
      <PlayerCard
        player={item}
        teamName={teamState && currentTeam.name}
        navigation={navigation}
        customTeamId={customTeamId}
        customTeamKey={customTeamKey}
        screen={'Edit'}
      />
    );
  };

  return (
    <>
      {/* TODO: Modal may need to be a common component, also used in HomeScreen */}
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            style={styles.modalContainer}
            contentContainerStyle={styles.modalContent}>
            <View>
              {/* TODO: Add validation - no empty strings */}
              <TextInput
                theme={{colors: {primary: '#072F5F'}}}
                label="Team Name"
                value={editTeamName}
                onChangeText={value => setEditTeamName(value)}
                style={styles.modalInput}
                maxLength={20}
                mode="outlined"
              />
              <TextInput
                theme={{colors: {primary: '#072F5F'}}}
                label="City Name"
                value={editTeamCity}
                onChangeText={value => setEditTeamCity(value)}
                style={styles.modalInput}
                maxLength={20}
                mode="outlined"
              />
              <View style={styles.modalButtonContainer}>
                <Button
                  style={styles.modalNewTeam}
                  icon="account-group"
                  mode="contained"
                  onPress={handleEditTeamModal}>
                  Update
                </Button>
                <Button
                  style={styles.modalClear}
                  icon="axe"
                  mode="contained"
                  onPress={handleCloseModal}>
                  Cancel
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>

        <View style={styles.container}>
          {teamState.teams.length >= 1 && currentTeam && (
            <>
              <TeamCard
                teamName={name}
                teamId={id}
                city={city}
                navigation={navigation}
                screen={'Edit'}
                showModal={showModal}
              />
              <View style={styles.buttonContainer}>
                {/* TODO: Could be resuable component - also used in Edit Screen */}
                <Button
                  style={[
                    styles.newTeam,
                    isAddPlayerButtonDisabled && {
                      backgroundColor: '#D3D3D3',
                    },
                  ]}
                  labelStyle={{fontSize: 14}}
                  icon="account"
                  mode="contained"
                  onPress={handleAddPlayer}
                  disabled={isAddPlayerButtonDisabled}>
                  Add Player
                </Button>
                <Button
                  style={styles.clear}
                  labelStyle={{fontSize: 14}}
                  icon="axe"
                  mode="contained"
                  onPress={handleClearAll}>
                  Clear All
                </Button>
              </View>
            </>
          )}
          {teamState.error ? (
            <Text>There was an error.</Text>
          ) : teamState.isLoading ? (
            <Text>Loading...</Text>
          ) : teamState ? (
            <View style={{flex: 1}}>
              {currentTeam && (
                <FlatList
                  data={currentTeam.players}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  contentContainerStyle={{paddingVertical: 10}}
                />
              )}
            </View>
          ) : null}
        </View>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  newTeam: {
    backgroundColor: '#3895D3',
  },
  clear: {
    backgroundColor: '#1261A0',
  },
  // MODAL Same css as HOMESCREEN
  modalContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
    margin: Platform.OS === 'ios' ? 45 : 30,
    width: 300,
    height: 300,
    justifyContent: 'center',
    borderRadius: 10,
  },
  modalContent: {
    padding: 10,
  },
  modalInput: {
    margin: 5,
    marginBottom: 15,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 20,
  },
  modalNewTeam: {
    backgroundColor: '#3895D3',
  },
  modalClear: {
    backgroundColor: '#1261A0',
  },
});

export default EditScreen;
