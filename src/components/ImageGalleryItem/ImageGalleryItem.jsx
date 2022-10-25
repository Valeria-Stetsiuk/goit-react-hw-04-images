import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export const GalleryItem = ({ id,
  webformatURL,
  tags,
  largeImageURL, openModal }) => {
  return (
    <>
        <li key={id} className={s.itemGallery}>
          <a href="##" onClick={() => {
            openModal({ src: largeImageURL, alt: tags });
          }}
            rel="noreferrer">
            <img className={s.image} src={webformatURL} alt={tags} width="350"  />
          </a>
        </li>
    
    </>
  );
};

GalleryItem.propTypes={
  gallery: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
}