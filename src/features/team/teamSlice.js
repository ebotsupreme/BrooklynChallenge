import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isLoaded: false,
  error: false,
  teamCount: 0,
  teamKeyCount: 0,
  teamIdCount: 0,
  teams: [],
};

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    startLoading: state => {
      state.isLoading = true;
      state.isLoaded = false;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isLoaded = false;
    },
    addTeam: (state, action) => {
      console.log('Add Team state, ', state, ' Action ', 'action');
      console.log('add team state.teams.length ', state.teams.length);

      state.teams = [...state.teams, action.payload];
      state.teamCount += 1;
      state.teamKeyCount += 1;
      state.teamIdCount = action.payload.id;
      // state.teamIdCount += 1;
      state.isLoading = false;
      state.isLoaded = true;
    },
    removeTeam: (state, action) => {
      if (state.teams.length === 1) {
        console.log('REMOVE TEAM length is equal to 1');
        state.teams = action.payload.team;
      } else {
        console.log('REMOVE TEAM length greater than 1, start filter ');
        // state.teams[action.payload.customTeamKey] = state.teams[
        //   action.payload.customTeamKey
        // ].length = 0;
        state.teams = state.teams.filter(
          team => team.id !== action.payload.customTeamId,
        );
      }
      // state.teams[action.payload.customTeamKey] = action.payload.team;
      state.teamCount -= 1;
      state.isLoading = false;
      state.isLoaded = true;
      console.log('state', state);
    },
    removeAllTeams: (state, action) => {
      state.teams = action.payload.teams;
      state.teamCount = 0;
      state.isLoading = false;
      state.isLoaded = true;
    },
    editTeam: (state, action) => {
      console.log('EDIT TEAM SLICE START');
      state.teams.map(team => {
        console.log('team loop for EDIT TEAM slice', team);
        if (team.id === action.payload.customTeamId) {
          console.log('MATCH teamId: ', team.id);
          console.log('team.name ', team.name);
          console.log('team.city ', team.city);

          team.name = action.payload.name;
          team.city = action.payload.city;
          return team;
        }
      });

      // state.teams[action.payload.customTeamKey].name = action.payload.name;
      // state.teams[action.payload.customTeamKey].city = action.payload.city;
      state.isLoading = false;
      state.isLoaded = true;
    },
    addPlayer: (state, action) => {
      console.log('ADD PLAYER SLICE ');
      console.log('APS payload customTeamKey ', action.payload.customTeamKey);
      // console.log(
      //   'APS state.teams[action.payload.customTeamKey]: ',
      //   state.teams[action.payload.customTeamKey],
      // );
      // console.log(
      //   'APS state.teams[action.payload.customTeamKey].players ',
      //   state.teams[action.payload.customTeamKey].players,
      // );
      // loop through teams, find match
      state.teams.map(team => {
        console.log('team loop ', team);
        if (team.id === action.payload.customTeamId) {
          console.log('MATCH teamId: ', team.id);
          return (team.players = [...team.players, action.payload]);
        }
      });
      console.log('APS updated state ', state);
      console.log('APS updated state teams', state.teams);
      console.log('APS updated state[0].players ', state.teams[0].players);

      // state.teams[action.payload.customTeamKey].players = [
      //   ...state.teams[action.payload.customTeamKey].players,
      //   action.payload,
      // ];
      state.isLoading = false;
      state.isLoaded = true;
    },
    removePlayer: (state, action) => {
      state.teams.map(team => {
        console.log('team loop for remove player slice', team);
        if (team.id === action.payload.customTeamId) {
          console.log('MATCH teamId: ', team.id);
          console.log('team.players ', team.players);
          // return (team.players = [...team.players, action.payload]);
          return (team.players = team.players.filter(
            player => player.id !== action.payload.id,
          ));
        }
      });

      console.log('remove player slice after state.teams ', state.teams);
      // console.log(
      //   'remove player slice after state players ',
      //   state.teams[2].players,
      // );

      // state.teams[action.payload.customTeamKey].players = state.teams[
      //   action.payload.customTeamKey
      // ].players.filter(player => player.id !== action.payload.id);

      state.isLoading = false;
      state.isLoaded = true;
    },
    removeAllPlayers: (state, action) => {
      state.teams.map(team => {
        console.log('team loop for remove ALL player slice', team);
        if (team.id === action.payload.customTeamId) {
          console.log('MATCH teamId: ', team.id);
          console.log('team.players ', team.players);
          // return (team.players = [...team.players, action.payload]);
          return (team.players = action.payload.players);
        }
      });

      // state.teams[action.payload.customTeamKey].players =
      //   action.payload.players;
      state.isLoading = false;
      state.isLoaded = true;
    },
  },
});

export const {
  startLoading,
  hasError,
  updateTeamOne,
  updateTeamTwo,
  updateTeamThree,
  addTeam,
  removeTeam,
  addPlayer,
  removePlayer,
  removeAllPlayers,
  editTeam,
  removeAllTeams,
} = teamSlice.actions;

export default teamSlice.reducer;
