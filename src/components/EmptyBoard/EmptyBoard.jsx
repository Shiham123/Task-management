import PropTypes from 'prop-types';
import { useState } from 'react';
import AddEditBoardModal from '../modals/AddEditBoardModal';

function EmptyBoard(props) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const { type } = props;

  return (
    <div className="bg-white dark:bg-darkPrimary h-screen w-screen flex flex-col items-center justify-center">
      <h3 className="text-gray-500 font-bold">
        {type === 'edit' ? 'The board is empty. Create a new one.' : 'There are no boards available, create a new board to get started'}
      </h3>
      <button className="w-full items-center max-w-xs font-bold hover:opacity-70 dark:text-white dark:bg-customBgBtn mt-8 relative text-white bg-customBgBtn py-2 rounded-full">
        {type === 'edit' ? '+ Add new Column' : '+ Add New Board'}
      </button>

      {isBoardModalOpen && (
        <>
          <AddEditBoardModal type={type} setBoardModalOpen={setIsBoardModalOpen} />
        </>
      )}
    </div>
  );
}

export default EmptyBoard;

EmptyBoard.propTypes = { type: PropTypes.string.isRequired };
