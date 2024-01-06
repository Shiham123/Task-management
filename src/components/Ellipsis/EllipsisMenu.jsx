import PropTypes from 'prop-types';

function EllipsisMenu(props) {
  // ! props all extracted here
  const { type, openEditModal, openDeleteModal } = props;

  return (
    <div className={type === 'Boards' ? 'absolute top-16 right-5' : 'absolute top-6 right-4'}>
      <div className="flex justify-end items-center">
        <div className="w-40 text-sm z-50 font-medium shadow-md shadow-customTurquoiseBlue bg-white dark:bg-darkBgColor space-y-4 py-5 px-4 rounded-lg h-auto pr-12">
          <p onClick={() => openEditModal(false)} className="cursor-pointer text-gray-700 dark:text-gray-400">
            Edit {type}
          </p>
          <p className="cursor-pointer text-red-500">Delete {type}</p>
        </div>
      </div>
    </div>
  );
}

export default EllipsisMenu;

EllipsisMenu.propTypes = {
  type: PropTypes.string.isRequired,
  openEditModal: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
};
