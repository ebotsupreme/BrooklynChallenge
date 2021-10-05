import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeAllPlayers, editTeam} from '../../features/team/teamSlice';
import {
  Button,
  IconButton,
  Colors,
  Portal,
  Modal,
  TextInput,
  Provider,
} from 'react-native-paper';
import TeamCard from '../common/TeamCard';
import PlayerCard from '../common/PlayerCard';

const EditScreen = ({route, navigation}) => {
  const [isAddPlayerButtonDisabled, setIsAddPlayerButtonDisabled] =
    useState(false);
  const [visible, setVisible] = useState(false);
  const [editTeamName, setEditTeamName] = useState('');
  const [editTeamCity, setEditTeamCity] = useState('');
  const teamState = useSelector(state => state.team);
  const {customTeamId, customTeamKey} = route.params;

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  console.log(
    'teamState.teams.length && customTeamKey && teamState.teams[customTeamKey]',
    teamState.teams[customTeamKey],
  );
  if (teamState.teams[customTeamKey] !== undefined) {
    var {name, city, id} = teamState && teamState.teams[customTeamKey];
  } else {
    var {name, city, id} = '';
  }
  // const {name, city, id} = teamState && teamState.teams[customTeamKey];
  // const {name, city, id} =
  //   teamState.teams.length && teamState.teams[customTeamKey];
  // const {name, city, id} = customTeamKey && teamState.teams[customTeamKey];
  const dispatch = useDispatch();

  useEffect(() => {
    getPlayerCount();
    console.log('EDIT customTeamKey', customTeamKey);
    console.log('EDIT teams ', teamState.teams);
    console.log('EDIT teams [customTeamKey]', teamState.teams[customTeamKey]);
    // console.log('Edit name ', name);
    // console.log('Edit city ', city);
    // console.log('Edit id ', id);
    // console.log('showEditModal ', showEditModal);
  }, [customTeamKey, getPlayerCount, teamState]);

  const handleAddPlayer = () => {
    navigation.navigate('Team Selection', {
      customTeamId,
      customTeamKey,
    });
  };

  const getPlayerCount = useCallback(() => {
    if (teamState.teams[customTeamKey]) {
      let playerCount =
        teamState.teams && teamState.teams[customTeamKey].players.length;
      playerCount === 5
        ? setIsAddPlayerButtonDisabled(true)
        : setIsAddPlayerButtonDisabled(false);
    }
  }, [customTeamKey, teamState]);

  const handleClearAll = () => {
    console.log('Clear all');
    dispatch(
      removeAllPlayers({
        players: [],
        customTeamId,
        customTeamKey,
      }),
    );
  };

  const handleEditTeamModal = () => {
    console.log('handleEditTeamModal');
    // dispatch edit team here
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
    console.log('handleCloseModal');
    setEditTeamName('');
    setEditTeamCity('');
    hideModal();
  };

  const renderItem = ({item}) => {
    return (
      <PlayerCard
        player={item}
        teamName={teamState && teamState.teams[customTeamKey].name}
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
              {/* TODO: Add validation - no empty strings, max char */}
              <TextInput
                label="Team Name"
                value={editTeamName}
                onChangeText={value => setEditTeamName(value)}
                style={styles.modalInput}
                maxLength={20}
              />
              <TextInput
                label="City Name"
                value={editTeamCity}
                onChangeText={value => setEditTeamCity(value)}
                style={styles.modalInput}
                maxLength={20}
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
          {teamState.teams.length >= 1 && teamState.teams[customTeamKey] && (
            <>
              {/* TODO: possible idea - pass teamState.teams[customTeamKey].name isntead of name to TeamCard */}
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
              {teamState.teams[customTeamKey] && (
                <FlatList
                  data={teamState.teams[customTeamKey].players}
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
    // backgroundColor: 'blue',
    paddingTop: 15,
    paddingBottom: 25,
  },
  newTeam: {
    backgroundColor: 'green',
  },
  clear: {
    backgroundColor: 'red',
  },
  // MODAL Same css as HOMESCREEN
  modalContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
    margin: 40,
    marginTop: 190,
    marginBottom: 190,
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
  // buttonContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-evenly',
  // },
  modalNewTeam: {
    backgroundColor: 'green',
  },
  modalClear: {
    backgroundColor: 'red',
  },
});

export default EditScreen;
