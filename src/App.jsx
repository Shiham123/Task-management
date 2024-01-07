import { useState } from 'react';
import Header from './components/Header/Header';
import Center from './components/Center/Center';
import { useDispatch, useSelector } from 'react-redux';
import boardsSlice from './redux/boardsSlice';
import EmptyBoard from './components/EmptyBoard/EmptyBoard';

function App() {
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const activeBoards = boards.find((board) => board.isActive);

  if (!activeBoards && boards.length > 0) {
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  }

  const [boardModalOpen, setBoardModalOpen] = useState(false);
  return (
    <div className="overflow-hidden overflow-x-scroll">
      {boards.length > 0 ? (
        <>
          <Header boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen} />
          <Center boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen} />
        </>
      ) : (
        <>
          <EmptyBoard type="add" />
        </>
      )}
    </div>
  );
}

export default App;
