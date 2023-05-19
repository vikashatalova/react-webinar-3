import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';

function Modal({ onCloseModal, item, onDelete }){

    return (
        <>
        <div className='Modal'>
            <div className='Modal-head'>
                <h1>Корзина</h1> 
                <button onClick={onCloseModal}>Закрыть</button>
            </div>
            <div className='Modal-body'>
                {item.length > 0 ? item.map((item, index) => (
                    <div key={item.code} className='Modal-item'>
                        <div className='Item'>
                            <div className='Item-code'>{index + 1}</div>
                            <div className='Item-title'>
                                <p>{item.title}</p>
                                <p>{item.price} ₽</p>
                            </div>
                            <div className='Item-number'>{item.count} шт</div>
                            <div className='Item-actions'>
                                <button onClick={onDelete}>Удалить</button>
                            </div>
                        </div>
                    </div>
                )): <h2>Ваша корзина пуста</h2>}
                <div className='Modal-footer'>
                    <p>Итого: {item.price}</p>
                </div>
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