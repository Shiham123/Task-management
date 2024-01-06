// ! other cdn import file
import PropTypes from 'prop-types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IoMdClose } from 'react-icons/io';

// ! redux import file
import { useDispatch, useSelector } from 'react-redux';
import boardsSlice from '../../redux/boardsSlice';

function AddEditTaskModal(props) {
  const { type, device, taskIndex, setOpenAddEditTask, perColIndex = 0 } = props; // !all props are extracted here

  // ! some state declared here
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subTasks, setSubTasks] = useState([{ title: '', isCompleted: false, id: uuidv4() }]);
  const [isValid, setIsValid] = useState(true);

  const dispatch = useDispatch(boardsSlice);

  const board = useSelector((state)  => state.boards).find((board) => board.isActive);

  const columns = board.columns;
  const col = columns.find((col, index) => index === perColIndex);

  const [status, setStatus] = useState(columns[perColIndex].name);
  const [newColIndex, setNewColIndex] = useState(perColIndex);

  function handleDelete(id) {
    setSubTasks((prevTask) => prevTask.filter((el) => el.id !== id));
  }

  function handleChange(id, value) {
    setSubTasks((prevState) => {
      const newState = [...prevState];
      const subtasks = newState.find((perTask) => perTask.id === id);
      subtasks.title = value;
      return newState;
    });
  }

  function validate() {
    setIsValid(false);
    if (!title.trim()) return false;
    for (let i = 0; i < subTasks.length; i++) {
      if (!subTasks[i].title.trim()) return false;
    }

    setIsValid(true);
    return true;
  }

  function handleSubmit(type) {
    if (type === 'add') {
      dispatch(boardsSlice.actions.addTask({ title, description, subTasks, status, newColIndex }));
    } else {
      dispatch(boardsSlice.actions.editTask({ title, description, subTasks, status, taskIndex, perColIndex, newColIndex }));
    }
  }

  // status handle function
  function handleStatus(e) {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  }

  return (
    <div
      className={`${
        device === 'mobile'
          ? 'py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 bg-black/50'
          : 'py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-0 top-0 bg-black/50'
      }`}
    >
      {/* Modal section */}
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-customCharade dark:text-white font-bold shadow-md shadow-customTurquoiseBlue max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className="text-lg">{type === 'edit' ? 'Edit' : 'Add New'} Task</h3>
        {/* Task name */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">Task Name</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-sm text-sm border border-gray-600 focus:outline-customBgBtn ring-0"
            placeholder="e.g task coffee break"
          />
        </div>

        {/* description */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">Task Name</label>
          <textarea
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="bg-transparent px-4 py-2 outline-none focus:border-0 min-h-[200px] rounded-sm text-sm border border-gray-600 focus:outline-customBgBtn ring-0"
            placeholder="e.g it always good to take a break. this 15 minute break will recharge the batteries a little"
          />
        </div>

        {/* sub task section */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">Subtasks</label>
          {subTasks.map((subTask, index) => {
            const { title, id } = subTask;
            return (
              <div key={index} className="flex items-center w-full">
                <input
                  onChange={(e) => {
                    handleChange(id, e.target.value);
                  }}
                  type="text"
                  value={title}
                  className="bg-transparent outline-none border focus:border-0 flex-grow px-4 py-2 rounded-lg text-sm border-gray-600 focus:outline-customBgBtn"
                  placeholder="e.g take coffee break"
                />
                <IoMdClose onClick={() => handleDelete(id)} className="ml-3 cursor-pointer" size={25} />
              </div>
            );
          })}
        </div>

        {/* add sub task button */}
        <button
          onClick={() => {
            setSubTasks((state) => [...state, { title: '', isCompleted: false, id: uuidv4() }]);
          }}
          className="w-full my-4 items-center dark:text-customBgBtn dark:bg-white text-white bg-customBgBtn py-2 rounded-full "
        >
          + Add New SubTask
        </button>

        {/* current status section */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">Current status</label>
          <select
            value={status}
            onChange={(e) => handleStatus(e)}
            className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-customBgBtn outline-none"
          >
            {board?.columns?.map((item, index) => {
              const { name } = item;
              return (
                <option className="dark:bg-customCharade" value={name} key={index}>
                  {name}
                </option>
              );
            })}
          </select>

          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                handleSubmit(type);
                setOpenAddEditTask(false);
              }
            }}
            className="w-full items-center text-white bg-customBgBtn py-2 rounded-full"
          >
            {type === 'edit' ? 'save edit' : 'Create task'}
          </button>
        </div>

        {/* close button */}
        <button
          className="button mt-10"
          onClick={(event) => {
            if (event.target !== event.currentTarget) return;
            setOpenAddEditTask(false);
          }}
        >
          Close form
        </button>
      </div>
    </div>
  );
}

export default AddEditTaskModal;

AddEditTaskModal.propTypes = {
  device: PropTypes.string.isRequired,
  setOpenAddEditTask: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};
