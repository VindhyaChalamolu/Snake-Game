import React from 'react';

function Modal({score, startGame}) {
    return (
        <div className='modal-container'>
            <div className='modal-content'>
                <p>Game Over</p>
                <p>Your Score - {score}</p>
                <button onClick={startGame}>Ok</button>
            </div>      
        </div>
    )
}

export default Modal;