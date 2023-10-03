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
    timeStarted: 0,
    finalTime: 0,
    tilesLeft: 0,
    minesLeft: 0,
    boardData: [
      [
        {
          id: 0.00, //id: necessary for finding squares
          number: 0, //number: <0=mine, 0=0, 1=1, 2=2...
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
      const numX = action.payload.numX; const numY = action.payload.numY; const numMines = action.payload.numMines;

      //generate an array to randomly select open spots from
      let openNums = [];
      for(let index = 0; index < numX * numY; index++) {
        openNums.push(index);
      }

      //Move randomly generated indexes from openNums to takenNums
      let takenNums = [];
      while(openNums.length > numX * numY - numMines) {
        const randomNum = Math.floor(Math.random() * openNums.length);
        takenNums.push(openNums.splice(randomNum, 1)[0]);
      }

      //Create board using mine indexes in takenNums
      let newBoard = Array(numX);
      for(let indexX = 0; indexX < numX; indexX++) {
        if(newBoard[indexX] === undefined) newBoard[indexX] = Array(numY);
        for(let indexY = 0; indexY < numY; indexY++) {
          //The expensive big boy algorithm: assigning numbers to tiles
          //Piece 1: Assigning mines and incrementing numbers of tiles surrounding a mine
          if(takenNums.includes(numY * indexX + indexY)) {
            newBoard[indexX][indexY] = { id: indexX + indexY / 100, number: -15, src: defaultSVG };
            //top left-middle-right, and middle-left: already instantiated
            if(indexX > 0) {
              if(indexY > 0) newBoard[indexX - 1][indexY - 1].number++;
              if(indexY < numY - 1) newBoard[indexX - 1][indexY + 1].number++;
              newBoard[indexX - 1][indexY].number++;
            }
            if(indexY > 0) newBoard[indexX][indexY - 1].number++;
            //bottom-right: uninstantiated, middle-right, bottom-left and bottom-middle: possibly uninstantiated
            if(indexY < numY - 1) {
              if(newBoard[indexX][indexY + 1] === undefined) newBoard[indexX][indexY + 1] = { id: indexX + (indexY + 1) / 100, number: 1, src: defaultSVG };
              else newBoard[indexX][indexY + 1].number++;
            }
            if(indexX < numX - 1) {
              if(newBoard[indexX + 1] === undefined) newBoard[indexX + 1] = Array(numY);
              if(indexY < numY - 1) newBoard[indexX + 1][indexY + 1] = { id: indexX + 1 + (indexY + 1) / 100, number: 1, src: defaultSVG };
              if(indexY > 0) {
                if(newBoard[indexX + 1][indexY - 1] === undefined) newBoard[indexX + 1][indexY - 1] = { id: indexX + 1 + (indexY - 1) / 100, number: 1, src: defaultSVG };
                else newBoard[indexX + 1][indexY - 1].number++;
              }
              if(newBoard[indexX + 1][indexY] === undefined) newBoard[indexX + 1][indexY] = { id: indexX + 1 + indexY / 100, number: 1, src: defaultSVG };
              else newBoard[indexX + 1][indexY].number++;
            }
          }
          //Piece 2: Assigning tiles uninstantiated by mines
          else if(newBoard[indexX][indexY] === undefined)
            newBoard[indexX][indexY] = { id: indexX + indexY / 100, number: 0, src: defaultSVG };
        }
      }
      state.boardData = newBoard;
      state.timeStarted = 0;
      state.minesLeft = numMines;
      state.tilesLeft = numX * numY - numMines;
    },
    flagTile: (state, action) => {
      if(state.finalTime === -1 && (action.payload.src === flagSVG || action.payload.src === defaultSVG)) {
        const row = state.boardData.at(Math.floor(action.payload.id));
        const tile = row[row.findIndex((tile) => tile.id === action.payload.id)];
        if(tile.src === defaultSVG && state.minesLeft > 0) { tile.src = flagSVG; state.minesLeft--}
        else if(tile.src === flagSVG) { tile.src = defaultSVG; state.minesLeft++}
      }
    },
    revealTile: (state, action) => {
      if(state.timeStarted === 0) {
        state.timeStarted = new Date().getTime();
        state.finalTime = -1;
      }
      if(state.finalTime === -1 && action.payload.src === defaultSVG) {
        const row = state.boardData.at(Math.floor(action.payload.id));
        const tile = row[row.findIndex((tile) => tile.id === action.payload.id)];
        if(tile.number === 0) {
          //Reveal all surrounding blank tiles
          let unchecked = [ tile ];
          let limitX = state.boardData.length - 1; let limitY = row.length - 1;
          while(unchecked.length !== 0) {
            let toCheck = unchecked.pop();
            if(toCheck.src === defaultSVG){
              let checkX = Math.floor(toCheck.id); let checkY = state.boardData.at(checkX).indexOf(toCheck);
              if(toCheck.number === 0) {
                toCheck.src = zeroSVG;
                if(checkX > 0) {
                  if(checkY > 0) unchecked.push(state.boardData.at(checkX - 1).at(checkY - 1));
                  if(checkY < limitY) unchecked.push(state.boardData.at(checkX - 1).at(checkY + 1));
                  unchecked.push(state.boardData.at(checkX - 1).at(checkY));
                }
                if(checkY > 0) unchecked.push(state.boardData.at(checkX).at(checkY - 1));
                if(checkY < limitY) unchecked.push(state.boardData.at(checkX).at(checkY + 1));
                if(checkX < limitX) {
                  if(checkY > 0) unchecked.push(state.boardData.at(checkX + 1).at(checkY - 1));
                  if(checkY < limitY) unchecked.push(state.boardData.at(checkX + 1).at(checkY + 1));
                  unchecked.push(state.boardData.at(checkX + 1).at(checkY));
                }
              }
              else if(toCheck.number < 0) toCheck.src = mineSVG;
              else if(toCheck.number === 1) toCheck.src = oneSVG;
              else if(toCheck.number === 2) toCheck.src = twoSVG;
              else if(toCheck.number === 3) toCheck.src = threeSVG;
              else if(toCheck.number === 4) toCheck.src = fourSVG;
              else if(toCheck.number === 5) toCheck.src = fiveSVG;
              else if(toCheck.number === 6) toCheck.src = sixSVG;
              else toCheck.src = sevenSVG;
              state.tilesLeft--;
            }
          }
        }
        else if(tile.number === 1) tile.src = oneSVG;
        else if(tile.number === 2) tile.src = twoSVG;
        else if(tile.number === 3) tile.src = threeSVG;
        else if(tile.number === 4) tile.src = fourSVG;
        else if(tile.number === 5) tile.src = fiveSVG;
        else if(tile.number === 6) tile.src = sixSVG;
        else if(tile.number === 7) tile.src = sevenSVG;
        else {
          tile.src = mineSVG;
          state.finalTime = new Date().getTime() - state.timeStarted;
        }
        if(tile.number > 0 ) state.tilesLeft--;
        if(state.tilesLeft === 0) {
          state.finalTime = new Date().getTime() - state.timeStarted;
          alert("swept in " + state.finalTime / 1000 + " seconds")
        }
      }
    },
  },
});

// Export your action creators (which match reducer names) here
export const { genBoard, flagTile, revealTile, } = boardSlice.actions;

export default boardSlice.reducer;