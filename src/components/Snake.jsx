import React, { useState } from 'react';

const SnakePart = () => {
    return(
        <div className='box'></div>
    )
}

const Snake = () => {
    const [snakeLength, setSnakeLength] = useState(2);
    return <div className='snake'>
        <SnakePart />
    </div>;
}

export default Snake;