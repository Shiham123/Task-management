import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { GrTask } from 'react-icons/gr';

const HeaderDropdown = (props) => {
  const boards = useSelector((state) => state.boards);

  const { setOpenDropDown } = props;

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
                className={`flex items-baseline space-x-2 px-5 py-4 mx-3 ${isActive && 'bg-customBgBtn rounded-full text-white mr-8'}`}
                key={index}
              >
                <GrTask />
                <p>{name}</p>
              </div>
            );
          })}

          <div className="flex items-center space-x-2 text-customBgBtn px-5 py-4 mx-3">
            <GrTask />
            <p className="capitalize">Create new Board</p>
          </div>
        </div>

        {/* button close */}
        <button className="button mx-5" onClick={closeDropdown}>
          Close
        </button>
      </div>
    </div>
  );
};

export default HeaderDropdown;

HeaderDropdown.propTypes = { setOpenDropDown: PropTypes.func.isRequired };
