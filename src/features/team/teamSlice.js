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
      state.teams = [...state.teams, action.payload];
      state.teamCount += 1;
      state.teamKeyCount += 1;
      state.teamIdCount = action.payload.id;
      state.isLoading = false;
      state.isLoaded = true;
    },
    removeTeam: (state, action) => {
      if (state.teams.length === 1) {
        state.teams = action.payload.team;
      } else {
        state.teams = state.teams.filter(
          team => team.id !== action.payload.customTeamId,
        );
      }
      state.teamCount -= 1;
      state.isLoading = false;
      state.isLoaded = true;
    },
    removeAllTeams: (state, action) => {
      state.teams = action.payload.teams;
      state.teamCount = 0;
      state.isLoading = false;
      state.isLoaded = true;
    },
    editTeam: (state, action) => {
      state.teams.map(team => {
        if (team.id === action.payload.customTeamId) {
          team.name = action.payload.name;
          team.city = action.payload.city;
          return team;
        }
      });
      state.isLoading = false;
      state.isLoaded = true;
    },
    addPlayer: (state, action) => {
      state.teams.map(team => {
        if (team.id === action.payload.customTeamId) {
          return (team.players = [...team.players, action.payload]);
        }
      });
      state.isLoading = false;
      state.isLoaded = true;
    },
    removePlayer: (state, action) => {
      state.teams.map(team => {
        if (team.id === action.payload.customTeamId) {
          return (team.players = team.players.filter(
            player => player.id !== action.payload.id,
          ));
        }
      });
      state.isLoading = false;
      state.isLoaded = true;
    },
    removeAllPlayers: (state, action) => {
      state.teams.map(team => {
        if (team.id === action.payload.customTeamId) {
          return (team.players = action.payload.players);
        }
      });
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
