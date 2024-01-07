import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoEllipsisVertical } from 'react-icons/io5';
import EllipsisMenu from '../Ellipsis/EllipsisMenu';

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

  const [status, setStatue] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const [ellipsisMenuOpen, setEllipsisMenuOpen] = useState(false);

  function openEditModal() {
    // TODO: here write some function
  }

  function openDeleteModal() {
    // TODO: will write some code
  }

  return (
    <div className="fixed right-0 left-0 top-0 bottom-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 justify-center items-center flex bg-black/50">
      {/* modal div */}

      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-customCharade text-black dark:text-white font-bold shadow-md shadow-customTurquoiseBlue max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <div className="relative flex justify-between w-full items-center">
          <h1 className="text-lg">{task.title}</h1>

          <IoEllipsisVertical onClick={() => setEllipsisMenuOpen((state) => !state)} className="cursor-pointer h-6" />

          {ellipsisMenuOpen && <EllipsisMenu openEditModal={openEditModal} openDeleteModal={openDeleteModal} type="Task" />}
        </div>

        <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">{task.description}</p>
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
