import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList, Platform, Share} from 'react-native';
import {Button, Modal, Portal, TextInput, Provider} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';

import {
  startLoading,
  hasError,
  addTeam,
  removeAllTeams,
} from '../../features/team/teamSlice';

import TeamCard from '../common/TeamCard';

const HomeScreen = ({route, navigation}) => {
  const [visible, setVisible] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [cityName, setCityName] = useState('');
  const [isAddNewTeamButtonDisabled, setIsAddNewTeamButtonDisabled] =
    useState(false);
  const teamState = useSelector(state => state.team);
  const dispatch = useDispatch();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    getTeamCount();
  }, [getTeamCount, teamState]);

  const handleAddTeam = () => {
    let customTeamId = '';
    let customTeamKey = '';

    if (teamState.teamCount === 3) {
      return;
    }

    dispatch(
      addTeam({
        key: teamState.teamKeyCount,
        id: teamState.teamIdCount + 1,
        name: teamName,
        city: cityName,
        players: [],
      }),
    );
    customTeamKey = teamState.teamKeyCount;
    customTeamId = teamState.teamIdCount + 1;

    setTeamName('');
    setCityName('');
    hideModal();

    navigation.navigate('Team Selection', {
      customTeamId,
      customTeamKey,
    });
  };

  const handleClearTeam = () => {
    dispatch(
      removeAllTeams({
        teams: [],
      }),
    );
  };

  const handleCloseModal = () => {
    setTeamName('');
    setCityName('');
    hideModal();
  };

  const getTeamCount = useCallback(() => {
    let teamCount = teamState.teams && teamState.teams.length;
    teamCount === 3
      ? setIsAddNewTeamButtonDisabled(true)
      : setIsAddNewTeamButtonDisabled(false);
  }, [teamState]);

  // TODO: This can be refactored to a common component. currently using this in Header.js
  const handleShareButton = () => {
    let shareTeamPlayers = [];

    teamState.teams.map(team => {
      shareTeamPlayers.push(` Team: ${team.name} - Players:`);
      team.players.map(player => {
        shareTeamPlayers.push(` ${player.name}`);
      });
    });
    shareMessage(shareTeamPlayers);
  };

  // TODO: This can be refactored to a common component. currently using this in Header.js
  const shareMessage = payload => {
    const payloadString = payload.join(' ');
    console.log('payloadString ', payloadString);
    // setMessage(payloadString);
    Share.share({
      message: payloadString,
    })
      // TODO: Add result or error message to Snackbar
      .then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg));
  };

  const renderItem = ({item}) => (
    <TeamCard
      teamName={item.name}
      city={item.city}
      navigation={navigation}
      customTeamId={item.id}
      customTeamKey={item.key}
      screen={'Home'}
    />
  );

  return (
    <Provider>
      <View style={styles.container}>
        {/* TODO: Modal may need to be a common component, also used in TeamCard Home */}
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
                value={teamName}
                onChangeText={value => setTeamName(value)}
                style={styles.modalInput}
                maxLength={20}
                mode="outlined"
              />
              <TextInput
                theme={{colors: {primary: '#072F5F'}}}
                label="City Name"
                value={cityName}
                onChangeText={value => setCityName(value)}
                style={styles.modalInput}
                maxLength={20}
                mode="outlined"
              />
              <View style={styles.modalButtonContainer}>
                <Button
                  style={styles.newTeam}
                  icon="account-group"
                  mode="contained"
                  onPress={handleAddTeam}>
                  Add
                </Button>
                <Button
                  style={styles.clear}
                  icon="axe"
                  mode="contained"
                  onPress={handleCloseModal}>
                  Cancel
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>

        <View style={styles.buttonContainer}>
          {/* TODO: Could be resuable component - also used in Edit Screen */}
          <Button
            style={[
              styles.newTeam,
              isAddNewTeamButtonDisabled && {backgroundColor: '#D3D3D3'},
            ]}
            icon="account-group"
            mode="contained"
            onPress={showModal}
            disabled={isAddNewTeamButtonDisabled}>
            Add Team
          </Button>
          <Button
            style={styles.clear}
            icon="axe"
            mode="contained"
            onPress={handleClearTeam}>
            Clear
          </Button>
          {/* NOTE: share button wasn't working in the header. Temporary work around */}
          {Platform.OS === 'android' && (
            <Button
              icon="share-variant"
              color="#072F5F"
              mode="contained"
              onPress={handleShareButton}
              style={{paddingLeft: 10, width: 50}}
            />
          )}
        </View>
        <View style={styles.teamCardsContainer}>
          {teamState.teams && (
            <>
              <FlatList
                data={teamState.teams && teamState.teams}
                renderItem={renderItem}
                keyExtractor={item => item.key}
              />
            </>
          )}
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  newTeam: {
    backgroundColor: '#3895D3',
  },
  clear: {
    backgroundColor: '#1261A0',
  },
  teamCardsContainer: {
    margin: 10,
    paddingTop: 10,
  },
});

export default HomeScreen;
