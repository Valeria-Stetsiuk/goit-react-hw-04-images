import PropTypes from 'prop-types';

export const Button = ({ pagination }) => {
  return (
    <div className="container">
      <button type="button" className="btn" onClick={pagination}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
pagination: PropTypes.func.isRequired,
}