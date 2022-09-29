import { useState, Fragment } from 'react';
import { useDispatch } from "react-redux";
import { genBoard } from "../store/boardSlice";

import Option from './Option';
import Board from '../components/Board';
import Leaderboards from '../components/Leaderboards';

import './style.scss';
import backSVG from '../assets/back.svg';
import settingsSVG from '../assets/settings.svg';
import pauseSVG from '../assets/pause.svg';
import resetSVG from '../assets/reset.svg';
import leaderboardsSVG from '../assets/leaderboards.svg';

const Menu = () => {
  const [gameState, setGameState] = useState(0);
  const [modalState, setModalState] = useState(0);

  const dispatch = useDispatch();

  const Button = ({ icon, onClick }) => (
    <img className="menu__buttons__button" src={icon} onClick={()=>onClick()} alt={"?"} /> 
  );
  
  return (
    <Fragment> {
      gameState === 0 ? (
        <div className="menu">
          <div className="menu__buttons">
            <Button icon={backSVG} onClick={()=>setGameState(1)} />
            <Button icon={settingsSVG} />
            <Button icon={pauseSVG} />
            <Button icon={resetSVG} onClick={()=>dispatch(genBoard({numX: 16, numY: 30, numMines: 99}))}/>
            <Button icon={leaderboardsSVG} onClick={()=>setGameState(2)}/>
          </div>
          <div className="menu__content">
            <Board />
          </div>
        </div>
      ) :
      gameState === 1 ? (
        <div className="menu">
          <div className="buttons">
            <Button icon={settingsSVG} />
            <Button icon={leaderboardsSVG} onClick={()=>setGameState(2)} />
          </div>
          <div className="menu__content">
            <Option />
          </div>
        </div>
      ) : (
      <div className="menu">
        <div className="buttons">
          <Button icon={backSVG} onClick={()=>setGameState(1)} />
          <Button icon={settingsSVG} />
        </div>
        <div className="menu__content">
          <Leaderboards />
        </div>
      </div>
      )}</Fragment>
  );
}

export default Menu;
