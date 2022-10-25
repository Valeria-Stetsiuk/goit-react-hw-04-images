import { Component } from 'react';
import PropTypes from 'prop-types';
export class Modal extends Component {
 
 static propTypes = {
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.shape({
    src:PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
 }
  closeByEscape = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  closeByBackdrop = event => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEscape);
  }
  render() {
    const {
      image: { src, alt },
    } = this.props;
    return (
      <div className="overlay" onClick={this.closeByBackdrop}>
        <div className="modal">
          <img src={src} alt={alt} width="1000" height="600" />
        </div>
      </div>
    );
  }
}