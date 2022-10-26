import { useEffect  } from 'react';
import PropTypes from 'prop-types';
export const Modal = ({  closeModal , image:{src, alt}}) => {
 const closeByBackdrop = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  useEffect(() => {
    const closeByEscape = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };
    window.addEventListener('keydown', closeByEscape);
    return () => {
      window.removeEventListener('keydown', closeByEscape);
    };
  }, [closeModal]);


    return (
      <div className="overlay" onClick={closeByBackdrop}>
        <div className="modal">
          <img src={src} alt={alt} width="1000" height="600" />
        </div>
      </div>
    );
  }
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired
}

