import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shuffle } from 'lodash';
import Task from '../Task/Task';

function Column(props) {
  const { colIndex } = props;

  const [color, setColor] = useState(null);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const column = board.columns.find((col, idx) => idx === colIndex);

  useEffect(() => {
    const colors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-blue-500',
      'bg-purple-500',
      'bg-green-500',
      'bg-indigo-500',
      'bg-yellow-500',
      'bg-pink-500',
      'bg-sky-500',
    ];
    setColor(shuffle(colors).pop());
  }, [dispatch]);

  return (
    <div className="scrollbar-hide mx-5 pt-[90px] min-w-[280px]">
      <div className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[2em] text-centerText">
        <div className={`rounded-full w-4 h-4 ${color}`} />
        <p>
          {column.name} ({column.tasks.length})
        </p>
      </div>

      {column.tasks.map((task, index) => {
        return <Task key={index} taskIndex={index} colIndex={colIndex} />;
      })}
    </div>
  );
}

export default Column;

Column.propTypes = { colIndex: PropTypes.number.isRequired };
