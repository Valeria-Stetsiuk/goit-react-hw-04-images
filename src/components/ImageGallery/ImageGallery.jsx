import { useState, useEffect } from 'react';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import {  ToastContainer,toast } from 'react-toastify';

import { imageApi } from "../../services/ImageApi";
import { GalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import ThreeDots from '../Loader/Loader';

export const Gallery =({searchQuery }) => {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [currentImage, setCurrentImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const ref = useRef(null);
  const refPage = useRef(null);

  const notify = () => {
    toast.warn('Sorry, but we did not find anything! Please change the request');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        let pictureData;

        if (searchQuery !== '' && ref.current !== searchQuery) {
          pictureData = await imageApi(searchQuery);
          setPage(1);
          setGallery(pictureData);
          ref.current = searchQuery;
        }

        if (page !== 1 && page !== refPage.current) {
          const pictureDataNextPage = await imageApi(searchQuery, page);
          setGallery(prevgallery => [...prevgallery, ...pictureDataNextPage]);
          refPage.current = page;
        }
        if (pictureData?.length === 0) {
          notify();
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, searchQuery]);

  const pagination = e => {
    e.preventDefault();
    setPage(prevState => prevState + 1);
  };
  const updateCurrentImage = data => {
    setCurrentImage(data);
  };
  const closeModal = () => {
    setCurrentImage(null);
  };

  return (
    <>
      {error && (
        <span className="error">Oops! Something went wrong. {error}</span>
      )}
      {!isLoading && !error && gallery.length === 0 && <ToastContainer />}

      <ul className="imageGallery">
        {!!gallery.length &&
          gallery.map(item => (
            <GalleryItem
              {...item}
              key={item.id}
              openModal={updateCurrentImage}
            />
          ))}
      </ul>
      {isLoading && <ThreeDots />}
      {!!gallery.length && gallery.length >= page * 12 && (
        <Button pagination={pagination} />
      )}

      {currentImage && <Modal image={currentImage} closeModal={closeModal} />}
    </>
  );
};

Gallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};
    
