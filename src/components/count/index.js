import React from 'react';
import './style.css';

function Count ({count, sum}) {
    return (
        <div className='Count'>
            <h4>В корзине:</h4>
            <p>{count} /</p>  
            <p>{sum} ₽</p>
        </div>
    )
}

export default Count;