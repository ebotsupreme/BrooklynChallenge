import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isLoaded: false,
  error: false,
  teamCount: 0,
  activeTeams: [],
  teamOneIsActive: false,
  teamTwoIsActive: false,
  teamThreeIsActive: false,
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
      state.isLoading = false;
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
      console.log('state', state);
    },
    editTeam: (state, action) => {
      state.teams[action.payload.customTeamKey].name = action.payload.name;
      state.teams[action.payload.customTeamKey].city = action.payload.city;
      state.isLoading = false;
    },
    addPlayer: (state, action) => {
      state.teams[action.payload.customTeamKey].players = [
        ...state.teams[action.payload.customTeamKey].players,
        action.payload,
      ];
      state.isLoading = false;
    },
    removePlayer: (state, action) => {
      state.teams[action.payload.customTeamKey].players = state.teams[
        action.payload.customTeamKey
      ].players.filter(player => player.id !== action.payload.id);
      state.isLoading = false;
    },
    removeAllPlayers: (state, action) => {
      state.teams[action.payload.customTeamKey].players =
        action.payload.players;
      state.isLoading = false;
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
} = teamSlice.actions;

export default teamSlice.reducer;
