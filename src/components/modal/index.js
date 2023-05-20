import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';

function Modal({ onCloseModal, item, onDelete }){
    console.log(item);
    const callbacks = {
        onDelete: (code) => {
          onDelete(code);
        }
    }
    const totalPrice = item.reduce((total, currentItem) => total + currentItem.price, 0);

    return (
        <>
        <div className='Modal'>
            <div className='Modal-head'>
                <h1>Корзина</h1> 
                <button onClick={onCloseModal}>Закрыть</button>
            </div>
            <div className='Modal-body'>
                {item.length > 0 ? item.map((modalItem, index) => (
                    <div key={modalItem.code} className='Modal-item'>
                        <div className='Item'>
                            <div className='Item-code'>{index + 1}</div>
                            <div className='Item-title'>
                                <p>{modalItem.title}</p>
                                <p>{modalItem.price} ₽</p>
                            </div>
                            <div className='Item-number'>{modalItem.code} шт</div>
                            <div className='Item-actions'>
                                <button onClick={() => console.log(modalItem.code)}>Удалить</button>
                            </div>
                        </div>
                    </div>
                )): <h2>Ваша корзина пуста</h2>}
                {item && 
                    <div className='Modal-footer'>
                        <p>Итого: {totalPrice}</p>
                    </div>
                }
            </div>
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