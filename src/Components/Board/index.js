
import './style.scss';
import { useDispatch, useSelector } from "react-redux";
import { flagTile, revealTile } from "../../store/boardSlice";

const Board = ({ }) => {
  const board = useSelector((state) => [...state.board.boardData]);
  const dispatch = useDispatch();

  const Tile = ({ id, src }) => (
    <img className="board__row__tile" src={src} alt={"?"}
      onClick={()=>dispatch(revealTile({id: id, src: src}))}
      onContextMenu={()=>dispatch(flagTile({id: id, src: src}))} />
  );

  return (
    <div id="boardDiv" className="board" onContextMenu={(e)=> e.preventDefault()}>
      {board.map((row)=>(
        <div className="board__row">
          {row.map((tile)=>(
            <Tile id={tile.id} src={tile.src}/>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;