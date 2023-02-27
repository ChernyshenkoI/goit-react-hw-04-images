import React, {useEffect}  from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Overlay, ModalStyled } from './Styled';
import { createPortal } from 'react-dom';

const portalContainer = document.querySelector('#portal');

  export function  Modal ({img, description, onClickCloseModal }) {

   
    useEffect(()=> {
      // const handleKeyPress = (e) => {
       
      //   if (e.key === 'Escape') {
      //     onClickCloseModal();
      //   }
      // };
      window.addEventListener('keydown', onClickCloseModal);
      return () => window.removeEventListener('keydown', onClickCloseModal);
    },[onClickCloseModal])

  

      return createPortal(
          <Overlay onClick={onClickCloseModal}>
          <ModalStyled>
            <img src={img} alt={description} />
          </ModalStyled>
        </Overlay>, portalContainer)
      }

    export default Modal
 

Modal.propTypes = {
  img: PropTypes.string,
  description: PropTypes.string,
  onClickCloseModal: PropTypes.func,
};

