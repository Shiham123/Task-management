import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Sidebar from '../Sidebar/Sidebar';
import Column from '../Column/Column';

function Center(props) {
  const { setBoardModalOpen, boardModalOpen } = props;

  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  const [isSidebarOpen, setIsSideBarOpen] = useState(true);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  useEffect(() => {
    const handleWindowResize = () => setWindowSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <div
      className={
        window[0] >= 768 && isSidebarOpen
          ? 'bg-bgSidebar scroll-hide h-screen flex dark:bg-darkBgColor overflow-x-scroll gap-6 ml-[261px]'
          : 'bg-bgSidebar scroll-hide h-screen flex dark:bg-darkBgColor overflow-x-scroll gap-6'
      }
    >
      {window[0] >= 768 && <Sidebar />}

      {columns.map((col, index) => {
        return <Column key={index} colIndex={index} />;
      })}
    </div>
  );
}

export default Center;

Center.propTypes = { setBoardModalOpen: PropTypes.func.isRequired, boardModalOpen: PropTypes.bool.isRequired };
