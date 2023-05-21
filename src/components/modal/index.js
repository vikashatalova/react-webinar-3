import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

function Modal({ onCloseModal, item, onDelete }){
    const filteredItems = [];
    const totalPrice = item.reduce((total, currentItem) => total + currentItem.price, 0);

    item.forEach((modalItem) => {
        const foundItem = filteredItems.find((item) => item.code === modalItem.code);
        if (foundItem) {
            foundItem.number += 1;
        } else {
            filteredItems.push({ ...modalItem, number: 1 });
        }
    });


    return (
        <>
        <div className='Modal'>
            <div className='Modal-head'>
                <h1>Корзина</h1> 
                <button onClick={onCloseModal}>Закрыть</button>
            </div>
            <div className='Modal-body'>
                {filteredItems.length > 0 ? filteredItems.map((modalItem, index) => (
                    <div key={modalItem.code} className='Modal-item'>
                        <div className='Item'>
                            <div className='Item-code'>{index + 1}</div>
                            <div className='Item-title'>
                                <p>{modalItem.title}</p>
                                <p>{modalItem.price} ₽</p>
                            </div>
                            <div className='Item-number'>
                                <p>{modalItem.number}<span>шт</span></p>
                            </div>
                            <div className='Item-actions'>
                                <button onClick={() => onDelete(modalItem.code)}>Удалить</button>
                            </div>
                        </div>
                    </div>
                )): <h2>Ваша корзина пуста</h2>}
                {filteredItems.length > 0 ? 
                    <div className='Modal-footer'>
                        <p>Итого: {totalPrice}</p>
                    </div> : ''
                }
            </div>
        </div>
        </>
    );
}
Modal.propTypes = {
    onCloseModal: PropTypes.func,
    onDelete: PropTypes.func,
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
}

export default React.memo(Modal);