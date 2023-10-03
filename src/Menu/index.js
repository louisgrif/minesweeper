import { useState, Fragment } from 'react';
import { useDispatch, useSelector  } from "react-redux";
import { genBoard } from "../store/boardSlice";

import Option from './Option';
import Board from '../components/Board';
import Leaderboards from '../components/Leaderboards';

import './style.scss';
import backSVG from '../assets/back.svg';
import settingsSVG from '../assets/settings.svg';
import resetSVG from '../assets/reset.svg';
import leaderboardsSVG from '../assets/leaderboards.svg';

const Menu = () => {
  const [modalState, setModalState] = useState(0);
  const [boardState, setboardState] = useState([16, 30, 99]);
  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();

  const Button = ({ icon, onClick, hidden }) => (
    <img className="menu__buttons__button" hidden={hidden} src={icon} onClick={()=>onClick()} alt={"?"} /> 
  );
  
  return (
    <Fragment> {
      modalState === 0 ? (
        <div className="menu">
          <div className="menu__buttons">
            <Button hidden={true} icon={settingsSVG} onClick={()=>setModalState(1)} />
            <Button hidden={false} icon={resetSVG} onClick={()=>dispatch(genBoard({numX: boardState[0], numY: boardState[1], numMines: boardState[2]}))}/>
            <Button hidden={true} icon={leaderboardsSVG} onClick={()=>setModalState(2)}/>
            <label>{board.minesLeft}</label>
          </div>
          <div className="menu__content">
            <Board />
          </div>
        </div>
      ) :
      modalState === 1 ? (
        <div className="menu">
          <div className="buttons">
            <Button icon={backSVG} onClick={()=>setModalState(0)} />
            <Button icon={leaderboardsSVG} onClick={()=>setModalState(2)} />
          </div>
          <div className="menu__content">
            <Option />
          </div>
        </div>
      ) : (
      <div className="menu">
        <div className="buttons">
          <Button icon={backSVG} onClick={()=>setModalState(0)} />
          <Button icon={settingsSVG} onClick={()=>setModalState(1)} />
        </div>
        <div className="menu__content">
          <Leaderboards />
        </div>
      </div>
      )}</Fragment>
  );
}

export default Menu;
