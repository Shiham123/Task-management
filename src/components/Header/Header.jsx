import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoIosArrowDropdown, IoIosArrowDropup, IoIosSettings } from 'react-icons/io';

import logoTwo from '../../assets/logoTwo.jpg';
import HeaderDropdown from './HeaderDropdown';
import AddEditBoardModal from '../modals/AddEditBoardModal';
import { useDispatch, useSelector } from 'react-redux';
import AddEditTaskModal from '../modals/AddEditTaskModal';

function Header(props) {
  const dispatch = useDispatch();

  const { boardModalOpen, setBoardModalOpen } = props;

  const [openDropDown, setOpenDropDown] = useState(false);
  const [boardType, setBoardType] = useState('add');
  const [openAddEditTask, setOpenAddEditTask] = useState(false);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  function handleDropDown() {
    setOpenDropDown(!openDropDown);
  }

  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-darkPrimary z-0 right-5">
      <header className="flex justify-between dark:text-customWhite items-center">
        {/* left side */}

        <div className="flex items-center space-x-2 md:space-x-4">
          <img src={logoTwo} alt="" className="h-10 w-10 border-[2px] border-black rounded-full p-[1px]" />
          <h3 className="hidden md:inline-block font-bold font-sans md:text-4xl">Shiham task management</h3>

          <div className="flex item-center">
            <div className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
              <h3>{board?.name}</h3>
            </div>
            {openDropDown ? (
              <IoIosArrowDropdown size={30} className="md:hidden cursor-pointer" onClick={handleDropDown} />
            ) : (
              <IoIosArrowDropup size={30} className="md:hidden cursor-pointer" onClick={handleDropDown} />
            )}
          </div>
        </div>

        {/* right side */}
        <div className="flex space-x-4 items-center md:space-x-6">
          <button className="hidden md:block button">+ add New task</button>
        </div>

        <button onClick={() => setOpenAddEditTask((state) => !state)} className="button py-1 px-3 md:hidden">
          +
        </button>

        <IoIosSettings size={50} className="cursor-pointer h-10" />

        {/*  */}
      </header>
      {openDropDown && <HeaderDropdown setBoardModalOpen={setBoardModalOpen} setOpenDropDown={setOpenDropDown} />}

      {/* modal */}
      {boardModalOpen && <AddEditBoardModal type={boardType} setBoardModalOpen={setBoardModalOpen} />}

      {/* add open edit task */}
      {openAddEditTask && <AddEditTaskModal setOpenAddEditTask={setOpenAddEditTask} device="mobile" type="add" />}
    </div>
  );
}

export default Header;

Header.propTypes = {
  boardModalOpen: PropTypes.bool.isRequired,
  setBoardModalOpen: PropTypes.func.isRequired,
};
