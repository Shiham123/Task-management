import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoEllipsisVertical } from 'react-icons/io5';
import EllipsisMenu from '../Ellipsis/EllipsisMenu';
import Subtask from '../Subtask/Subtask';
import boardsSlice from '../../redux/boardsSlice';

function TaskModal(props) {
  const { colIndex, taskIndex, setIsTaskModalOpen } = props;

  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const columns = board.columns;
  const col = columns.find((column, index) => colIndex === index);
  const task = col.tasks.find((col, idx) => taskIndex === idx);
  const subtasks = task.subtasks;

  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) completed++;
  });

  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const [ellipsisMenuOpen, setEllipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function openEditModal() {
    // TODO: here write some function
  }

  function openDeleteModal() {
    // TODO: will write some code
  }

  function handleChange(e) {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  }

  function closeDeleteModal(e) {
    if (e.targe === !e.currentTarget) return;
    dispatch(boardsSlice.actions.setTaskStatus({ taskIndex, colIndex, newColIndex, status }));
  }

  return (
    <div
      onClick={(e) => closeDeleteModal(e)}
      className="fixed right-0 left-0 top-0 bottom-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 justify-center items-center flex bg-black/50"
    >
      {/* modal div */}

      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-customCharade text-black dark:text-white font-bold shadow-md shadow-customTurquoiseBlue max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <div className="relative flex justify-between w-full items-center">
          <h1 className="text-lg">{task.title}</h1>

          <IoEllipsisVertical onClick={() => setEllipsisMenuOpen((state) => !state)} className="cursor-pointer h-6" />

          {ellipsisMenuOpen && <EllipsisMenu openEditModal={openEditModal} openDeleteModal={openDeleteModal} type="Task" />}
        </div>

        <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">{task.description}</p>

        <p className="pt-6 text-gray-500 tracking-widest text-sm">
          Subtasks ({completed} of {subtasks.length})
        </p>

        <div className="mt-3 space-y-2">
          {subtasks.map((subtask, index) => {
            const { isCompleted, title } = subtask;
            return <Subtask key={index} index={index} taskIndex={taskIndex} colIndex={colIndex} />;
          })}
        </div>

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">Current status</label>
          <select
            className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-customBgBtn outline-none"
            value={status}
            onChange={(e) => handleChange(e)}
          >
            {columns.map((column, index) => {
              const { name } = column;
              return <option key={index}>{name}</option>;
            })}
          </select>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;

TaskModal.propTypes = {
  colIndex: PropTypes.number.isRequired,
  taskIndex: PropTypes.number.isRequired,
  setIsTaskModalOpen: PropTypes.func.isRequired,
};
