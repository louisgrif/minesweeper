import { createSlice } from "@reduxjs/toolkit";

import defaultSVG from '../assets/default.svg';
import mineSVG from '../assets/mine.svg';
import flagSVG from '../assets/flag.svg';
import zeroSVG from '../assets/zero.svg';
import oneSVG from '../assets/one.svg';
import twoSVG from '../assets/two.svg';
import threeSVG from '../assets/three.svg';
import fourSVG from '../assets/four.svg';
import fiveSVG from '../assets/five.svg';
import sixSVG from '../assets/six.svg';
import sevenSVG from '../assets/seven.svg';

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    timePaused: 0,
    boardData: [
      [
        {
          id: 0.00, //id: decides square placement
          number: 0, //number: -1=mine, 0=0, 1=1, 2=2...
          src: zeroSVG, //src: self-explanatory
        },
        {
          id: 0.01,
          number: -1,
          src: mineSVG,
        },
        {
          id: 0.02,
          number: 1,
          src: oneSVG,
        },
        {
          id: 0.03,
          number: 2,
          src: twoSVG,
        },
        {
          id: 0.04,
          number: 3,
          src: threeSVG,
        },
        {
          id: 0.05,
          number: 4,
          src: fourSVG,
        },
        {
          id: 0.06,
          number: 5,
          src: fiveSVG,
        },
        {
          id: 0.07,
          number: 6,
          src: sixSVG,
        },
        {
          id: 0.08,
          number: 7,
          src: sevenSVG,
        },
      ],
      [
        {
          id: 1.00,
          number: 0,
          src: defaultSVG,
        },
        {
          id: 1.01,
          number: -1,
          src: defaultSVG,
        }
      ],
    ]
  },
  reducers: {
    genBoard: (state, action) => {
      
    },
    flagTile: (state, action) => {
      if(action.payload.src === flagSVG || action.payload.src === defaultSVG) {
        const row = state.boardData.at(Math.floor(action.payload.id));
        const tile = row[row.findIndex((tile) => tile.id === action.payload.id)];
        if(tile.src === defaultSVG) tile.src = flagSVG;
        else if(tile.src === flagSVG) tile.src = defaultSVG;
      }
    },
    revealTile: (state, action) => {
      if(action.payload.src === defaultSVG) {
        const row = state.boardData.at(Math.floor(action.payload.id));
        const tile = row[row.findIndex((tile) => tile.id === action.payload.id)];
        if(tile.number === 0) tile.src = zeroSVG;
        else if(tile.number === -1) tile.src = mineSVG;
        else if(tile.number === 1) tile.src = oneSVG;
        else if(tile.number === 2) tile.src = twoSVG;
        else if(tile.number === 3) tile.src = threeSVG;
        else if(tile.number === 4) tile.src = fourSVG;
        else if(tile.number === 5) tile.src = fiveSVG;
        else if(tile.number === 6) tile.src = sixSVG;
        else tile.src = sevenSVG;
      }
    },
    pauseTime: (state, action) => {

    },
  },
});

// Export your action creators (which match reducer names) here
export const { genBoard, flagTile, revealTile, pauseTime, } = boardSlice.actions;

export default boardSlice.reducer;