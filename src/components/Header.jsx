import { useState } from 'react';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';

import logoTwo from '../../src/assets/logoTwo.jpg';

function Header() {
  const [openDropDown, setOpenDropDown] = useState(false);
  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-darkPrimary z-0 right-5">
      <header className="flex justify-between dark:text-customWhite items-center">
        {/* left side */}

        <div className="flex items-center space-x-2 md:space-x-4">
          <img src={logoTwo} alt="" className="h-6 w-6" />
          <h3 className="hidden md:inline-block font-bold font-sans md:text-4xl">Shiham task management</h3>

          <div className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
            <h3>board Name</h3>
          </div>
          {openDropDown ? <IoIosArrowDropdown /> : <IoIosArrowDropup />}
        </div>
        {/* right side */}
      </header>
    </div>
  );
}

export default Header;
