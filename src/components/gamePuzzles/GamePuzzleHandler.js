import { useDispatch, useSelector } from 'react-redux';
import styles from './GamePuzzleHandler.module.css';
import Bookshelf from './bookshelf/Bookshelf';
import { setPuzzleInProgress } from '@/features/gameState/gameStateSlice';

const GamePuzzleHandler = () => {

  const puzzleInProgress = useSelector(state => state.gameState.puzzleInProgress);
  const dispatch = useDispatch();


  const getPuzzleComponent = () => {
    switch(puzzleInProgress) {
      case "bookshelf": {
        return <Bookshelf />
      }
  
      default:
        return <Bookshelf />; // TODO chnage back to returning null;
    }
  }


  return (
    <div className={styles.container}>
      {getPuzzleComponent()}
      <button onClick={() =>  dispatch(setPuzzleInProgress(false))}>Close</button>
    </div>
  )
}

export default GamePuzzleHandler;



// This will be responsible for displaying the various game puzzles, is merely a container
// But how will the puzzles be loaded? using a switch based on the gameState.puzzleInProgress prop?
// how will the ui close via some state or similar??? TODO