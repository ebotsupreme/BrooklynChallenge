import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  teamOneIsActive: false,
  teamTwoIsActive: false,
  teamThreeIsActive: false,
  teams: [
    {
      teamOne: {
        id: '',
        name: '',
        city: '',
        players: [],
      },
    },
    {
      teamTwo: {
        id: '',
        name: '',
        city: '',
        players: [],
      },
    },
    {
      teamThree: {
        id: '',
        name: '',
        city: '',
        players: [],
      },
    },
  ],
};

/*
players: [
          {
            playerOne: {
              id: '',
              name: '',
              image: '',
            },
            playerTwo: {
              id: '',
              name: '',
              image: '',
            },
            playerThree: {
              id: '',
              name: '',
              image: '',
            },
            playerFour: {
              id: '',
              name: '',
              image: '',
            },
            playerFive: {
              id: '',
              name: '',
              image: '',
            },
          },
        ],
*/
