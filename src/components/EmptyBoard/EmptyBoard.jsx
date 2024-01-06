import PropTypes from 'prop-types';

function EmptyBoard(props) {
  const { type } = props;
  return <div>empty board {type}</div>;
}

export default EmptyBoard;

EmptyBoard.propTypes = { type: PropTypes.string.isRequired };
