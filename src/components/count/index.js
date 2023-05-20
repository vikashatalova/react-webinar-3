import React from 'react';
import './style.css';

function Count ({ count, sum }) {
    return (
        <>
        {count > 0 ? 
            <div className='Count'>
                <h4>В корзине:</h4>
                <p>{count} /</p>  
                <p>{sum} ₽</p>
            </div> : 
            <h4 className='Count-empty'>В корзине: пусто</h4>
        }
        </>
    )
}

export default Count;