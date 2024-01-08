import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import TaskModal from './TaskModal';

function Task(props) {
  const { taskIndex, colIndex } = props;

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const columns = board.columns;
  const col = columns.find((col, idx) => idx === colIndex);
  const task = col.tasks.find((task, idx) => idx === taskIndex);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  let completed = 0;
  let subtasks = task.subtasks;

  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const { title } = task;
  return (
    <div
      onClick={() => setIsTaskModalOpen(true)}
      className="w-[280px] first:my-5 rounded-lg bg-white dark:bg-customCharade shadow-customTurquoiseBlue/50 py-6 px-3 shadow-lg hover:text-customBgBtn dark:text-white dark:hover:text-customBgBtn cursor-pointer my-8"
    >
      <p className="font-bold tracking-wide">{title}</p>
      <p className="font-bold text-xs tracking-tighter mt-2 text-green-500">
        {completed} of {subtasks.length} completed tasks
      </p>

      {isTaskModalOpen && <TaskModal colIndex={colIndex} taskIndex={taskIndex} setIsTaskModalOpen={setIsTaskModalOpen} />}
    </div>
  );
}

export default Task;

Task.propTypes = { taskIndex: PropTypes.number.isRequired, colIndex: PropTypes.number.isRequired };
