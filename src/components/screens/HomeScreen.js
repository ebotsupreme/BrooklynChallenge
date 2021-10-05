import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, Platform} from 'react-native';
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

  // console.log('HOME teamState', teamState);
  // console.log('HOME teamState.teams', teamState.teams);
  // console.log('HOME teamState.teams.length', teamState.teams.length);

  const handleAddTeam = () => {
    let customTeamId = '';
    let customTeamKey = '';

    if (teamState.teamCount === 3) {
      console.log('three', teamState.teamCount);
      // TODO: modal is still open here. need to resolve.
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

    // TODO: may have to refactor to loop teams
    // check for active teams
    // set team state
    // switch (teamState.teamCount) {
    //   case 0:
    //     dispatch(
    //       addTeam({
    //         key: 0,
    //         id: 1,
    //         name: teamName,
    //         city: cityName,
    //         players: [],
    //       }),
    //     );
    //     customTeamId = 1;
    //     customTeamKey = 0;
    //     break;
    //   case 1:
    //     dispatch(
    //       addTeam({
    //         key: 1,
    //         id: 2,
    //         name: teamName,
    //         city: cityName,
    //         players: [],
    //       }),
    //     );
    //     customTeamId = 2;
    //     customTeamKey = 1;
    //     break;
    //   case 2:
    //     dispatch(
    //       addTeam({
    //         key: 2,
    //         id: 3,
    //         name: teamName,
    //         city: cityName,
    //         players: [],
    //       }),
    //     );
    //     customTeamId = 3;
    //     customTeamKey = 2;
    //     break;
    //   default:
    //     break;
    // }

    setTeamName('');
    setCityName('');
    hideModal();

    navigation.navigate('Team Selection', {
      customTeamId,
      customTeamKey,
    });
  };

  const handleClearTeam = () => {
    console.log('HANDLE CLEAR TEAM');
    dispatch(
      removeAllTeams({
        teams: [],
      }),
    );
  };

  const handleCloseModal = () => {
    console.log('handleCloseModal');
    setTeamName('');
    setCityName('');
    hideModal();
  };

  const getTeamCount = useCallback(() => {
    let teamCount = teamState.teams && teamState.teams.length;
    console.log('GETTEAMCOUNT ', teamCount);
    teamCount === 3
      ? setIsAddNewTeamButtonDisabled(true)
      : setIsAddNewTeamButtonDisabled(false);
  }, [teamState]);

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
              {/* TODO: Add validation - no empty strings, max char */}
              <TextInput
                label="Team Name"
                value={teamName}
                onChangeText={value => setTeamName(value)}
                style={styles.modalInput}
                maxLength={20}
              />
              <TextInput
                label="City Name"
                value={cityName}
                onChangeText={value => setCityName(value)}
                style={styles.modalInput}
                maxLength={20}
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
            Add New Team
          </Button>
          <Button
            style={styles.clear}
            icon="axe"
            mode="contained"
            onPress={handleClearTeam}>
            Clear
          </Button>
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
    // marginTop: 190,
    // marginBottom: 190,
    width: 300,
    height: 300,
    justifyContent: 'center',
    // alignItems: 'center',

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
    backgroundColor: 'green',
  },
  clear: {
    backgroundColor: 'red',
  },
  teamCardsContainer: {
    margin: 10,
    paddingTop: 10,
  },
});

export default HomeScreen;
