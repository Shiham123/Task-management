import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import boardsSlice from '../../redux/boardsSlice';

function Subtask(props) {
  const { colIndex, taskIndex, index } = props;

  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards),
    board = boards.find((board) => board.isActive),
    columns = board.columns,
    col = columns.find((column, idx) => colIndex === idx),
    task = col.tasks.find((col, idx) => taskIndex === idx),
    subtask = task.subtasks.find((task, idx) => idx === index),
    checked = subtask.isCompleted;

  const { title, isCompleted } = subtask;

  function handleChange() {
    dispatch(boardsSlice.actions.setSubtaskCompleted({ index, taskIndex, colIndex }));
  }

  return (
    <div className="w-full flex hover:bg-customBgBtn/50 dark:hover:bg-customBgBtn rounded-md relative items-center justify-center dark:bg-customCharadeTwo p-3 gap-4 bg-bgSidebar">
      <input type="checkbox" className="w-4 h-4 accent-customBgBtn cursor-pointer" checked={checked} onChange={handleChange} />
      <p className={checked && 'line-through opacity-30'}>{title}</p>
    </div>
  );
}

export default Subtask;

Subtask.propTypes = {
  colIndex: PropTypes.number.isRequired,
  taskIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
