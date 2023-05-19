import React, { Children } from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onAdd, onOpenModal, children}){
  return (
    <div className='Controls'>
      {children}
      {/* <button onClick={() => onAdd()}>Добавить</button> */}
      <button onClick={onOpenModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  onOpenModal: PropTypes.func,
  children: PropTypes.node
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);
