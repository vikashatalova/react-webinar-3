import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

function Modal({ onCloseModal, item, onDelete }){

    return (
        <>
        <div className='Modal'>
            <div className='Modal-head'>
                <h1>{"Корзина"}</h1> 
                <button onClick={onCloseModal}>Закрыть</button>
            </div>
            <div className='Modal-body'>
                <h2>Текущий товар:</h2>
                <p>{item.title}</p>
                {/* Другие свойства товара */}
            </div>
            <button onClick={onDelete}>Удалить из корзины</button>
        </div>
        </>
    );
}
Modal.propTypes = {
    onCloseModal: PropTypes.func,
    onDelete: PropTypes.func,
    item: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        selected: PropTypes.bool,
        count: PropTypes.number
    }).isRequired
}

export default React.memo(Modal);