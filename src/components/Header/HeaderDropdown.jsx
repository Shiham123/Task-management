import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { GrTask } from 'react-icons/gr';
import { CiDark, CiLight } from 'react-icons/ci';
import { Switch } from '@headlessui/react';
import useDarkMode from '../../Hooks/useDarkMode';
import { useState } from 'react';
import boardsSlice from '../../redux/boardsSlice';

const HeaderDropdown = (props) => {
  const dispatch = useDispatch();

  const { setOpenDropDown, setBoardModalOpen } = props;

  const boards = useSelector((state) => state.boards);
  const [colorTheme, setTheme] = useDarkMode();

  const [dark, setDark] = useState(colorTheme === 'light' ? true : false);

  function toggleDarkMode(checked) {
    setTheme(colorTheme);
    setDark(checked);
  }

  function closeDropdown() {
    setOpenDropDown(false);
  }

  return (
    <div className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-customBlack/30">
      {/* Dropdown modal */}
      <div className="bg-customWhite dark:bg-customCharade shadow-md shadow-customTurquoiseBlue/60 w-full py-4 rounded-xl">
        <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">All Boards ({boards?.length})</h3>

        {/* boards map */}
        <div>
          {boards.map((board, index) => {
            const { name, isActive, columns } = board;
            return (
              <div
                className={`flex items-baseline dark:text-white space-x-2 px-5 py-4 mx-3 ${
                  isActive && 'bg-customBgBtn rounded-full text-white mr-8'
                }`}
                key={index}
                onClick={() => dispatch(boardsSlice.actions.setBoardActive({ index }))}
              >
                <GrTask />
                <p>{name}</p>
              </div>
            );
          })}

          <div
            onClick={() => {
              setBoardModalOpen(true);
              setOpenDropDown(false);
            }}
            className="flex items-center space-x-2 text-customBgBtn px-5 py-4 mx-3"
          >
            <GrTask />
            <p className="capitalize cursor-pointer">Create new Board</p>
          </div>

          <div className="mx-2 p-4 space-x-2 bg-slate-100 dark:bg-customCharadeTwo flex justify-center items-center rounded-lg ">
            {/* Switch */}
            <Switch
              checked={dark}
              onChange={toggleDarkMode}
              className={`${dark ? 'bg-customBgBtn' : 'bg-gray-200'} relative inline-flex h-10 w-16 items-center rounded-full`}
            >
              <span
                className={`${
                  dark ? 'translate-x-10' : 'translate-x-1'
                } flex justify-center items-center h-5 w-5 transform rounded-full bg-white transition-all`}
              >
                {dark ? <CiDark size={20} /> : <CiLight size={20} />}
              </span>
            </Switch>
          </div>
        </div>

        {/* button close */}
        <button className="button mx-5 my-5" onClick={closeDropdown}>
          Close
        </button>
      </div>
    </div>
  );
};

export default HeaderDropdown;

HeaderDropdown.propTypes = {
  setOpenDropDown: PropTypes.func.isRequired,
  setBoardModalOpen: PropTypes.func.isRequired,
};
