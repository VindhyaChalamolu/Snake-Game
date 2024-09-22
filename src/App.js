import React, {useEffect, useRef, useState} from 'react';
import './App.css';

function App() {
  const [temp, setTemp] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const food = useRef({});
  const intervalID = useRef(0);
  const snakeLength = useRef(1);
  const direction = useRef("ArrowRight");
  const head = useRef({headI:0, headJ:0});
  const snakeCoordinates = useRef([{i:0, j:0}])
  let speed = 150;

  useEffect(()=>{
    document.addEventListener('keydown',handleKeyPress);
  })
  
  useEffect(()=>{
    let d = [...snakeCoordinates.current];
    d.push({});
    snakeCoordinates.current = [...d];
  }, [score])

  const startGame = () => {
    setScore(0);
    getFood();
    snakeLength.current = 1;
    direction.current = 'ArrowRight';
    head.current = {headI:0, headJ:0};
    snakeCoordinates.current = [{i:0, j:0}];
    intervalID.current = setInterval(moveSnake, speed);
    setGameStarted(true);
  }

  const moveSnake = () => {
    setTemp(t => t + 1);
    let d = [...snakeCoordinates.current];
    for(let i=d.length-1; i>0; i--) {
      d[i] =  {...d[i-1]};
    }
    d[0] = {i: head.current.headI, j: head.current.headJ};
    snakeCoordinates.current = [...d];

    if(score >= 2) {
      speed = 100;
    } else if(score >= 10) {
      speed = 50;
    }
    switch(direction.current) {
      case "ArrowDown":
        head.current.headI = head.current.headI + 1;
        break;
      case "ArrowRight":
        head.current.headJ = head.current.headJ + 1;
        break;
      case "ArrowUp":
        head.current.headI = head.current.headI - 1;
        break;
      case "ArrowLeft":
        head.current.headJ = head.current.headJ - 1;
        break;
      default:
        head.current.headJ = head.current.headJ + 1;
        break;
    }

    if(head.current.headI === food.current.row && head.current.headJ === food.current.column ) {
      getFood();
      setScore(score => score + 1);
      snakeLength.current += 1;
    }

    if(head.current.headI  === -2 || head.current.headI  === 32 || 
      head.current.headJ === -2 || head.current.headJ === 39 
    ) {
      setGameStarted(false);
      setIsGameOver(true);
      clearInterval(intervalID.current);
      alert("Game Over!!");
    }
  }

  const getFood = () => {
    const foodRow = Math.floor(Math.random() * 29);
    const foodColumn = Math.floor(Math.random() * 38);
    food.current = {row: foodRow, column: foodColumn};
  }

  const handleKeyPress = (e) => {
    if(!(direction.current === "ArrowDown" && e.key === "ArrowUp") &&
     !(direction.current === "ArrowUp" && e.key === "ArrowDown") &&
     !(direction.current === "ArrowRight" && e.key === "ArrowLeft") &&
     !(direction.current === "ArrowLeft" && e.key === "ArrowRight")
    ) {
      direction.current = e.key;
    }
  }

  const boardLayout = () => {
    const rows = 30;
    const columns = 38;
    let cells = [];
    for(let i=0; i < rows; i++) {
      for(let j=0; j < columns; j++) {
        let className = '';
        if(i === food.current.row && j === food.current.column){
          className = 'food';
        }

        if(i===head.current.headI && j === head.current.headJ) {
          className = 'snake-head'; 
        }

        for(let k = 0; k <= snakeCoordinates.current.length; k++) {
          if(snakeCoordinates.current[k]?.i === i && snakeCoordinates.current[k]?.j === j){
              className = 'snake-body'; 
          }
        }
        cells.push(<div className={`board-box ${className}`} key={`${i}-${j}`}></div>);
      }
    }
    return cells;
  }


  return (
    <div className="App">
      {!gameStarted ? 
        <>
          <img src='https://snake-game.io/data/image/snakelogo.png' alt='sanke'/>
          <button className='button' onClick={startGame}>Start Game</button> 
        </>:
        <>
          <div className='score'>Score : {score}</div>
          <div className='board'>
            {boardLayout()}
          </div>
        </>
     }
    </div>
  );
}

export default App;

