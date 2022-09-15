import { useState, Fragment } from 'react';

import './style.scss';
import Option from './Option';
import Button from './Button';
import Board from '../Components/Board';
import Leaderboards from '../Components/Leaderboards';

import backSVG from './Assets/back.svg';
import settingsSVG from './Assets/settings.svg';
import pauseSVG from './Assets/pause.svg';
import resetSVG from './Assets/reset.svg';
import leaderboardsSVG from './Assets/leaderboards.svg';

const Menu = () => {
  const [gameState, setGameState] = useState(0);
  const [modalState, setModalState] = useState(0);

  return (
    <Fragment> {
      gameState === 0 ? (
        <div className="menu">
          <div className="menu__buttons">
            <Button icon={backSVG} onClick={()=>setGameState(1)} />
            <Button icon={settingsSVG} />
            <Button icon={pauseSVG} />
            <Button icon={resetSVG} onClick={()=>setGameState(0)}/>
            <Button icon={leaderboardsSVG} onClick={()=>setGameState(2)}/>
          </div>
          <div className="menu__content">
            <Board />
          </div>
        </div>
      ) :
      gameState === 1 ? (
        <div className="menu">
          <div className="menu__buttons">
            <Button icon={settingsSVG} />
            <Button icon={leaderboardsSVG} onClick={()=>setGameState(2)} />
          </div>
          <div className="menu__content">
            <Option />
          </div>
        </div>
      ) : (
      <div className="menu">
        <div className="menu__buttons">
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
