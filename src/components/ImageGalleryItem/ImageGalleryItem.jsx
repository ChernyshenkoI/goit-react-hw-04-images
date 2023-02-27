import React from 'react';
// import { memo } from 'react';
// import styled from 'styled-components';

import { ImageItemStyled, ImageStyled } from './Styled';


export const ImageGalleryItem = ({
  smallImg,
  largeImg,
  onModalClick,
  description,
}) => {
  return (
    <ImageItemStyled>
      <ImageStyled
        src={smallImg}
        alt={description}
        onClick={() => onModalClick(largeImg, description)}
      />
    </ImageItemStyled>
  );
};

// export default memo(ImageGalleryItem);