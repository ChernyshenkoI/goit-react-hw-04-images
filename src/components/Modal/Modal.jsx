import React, {Component} from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Overlay, ModalStyled } from './Styled';
import { createPortal } from 'react-dom';

const portalContainer = document.querySelector('#portal');

  export function  Modal ({img, description, onClickCloseModal }) {
   
    const  componentDidMount =() =>{
      window.addEventListener('keydown', handleKeyPress);
    }
  const  componentWillUnmount= () =>{
      window.removeEventListener('keydown', handleKeyPress);
    }

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      onClickCloseModal();
    }
  };

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

