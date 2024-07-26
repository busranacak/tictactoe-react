import { useState } from 'react';
import './App.css';
import { winningCombinations } from './wc';

const isGameOver = (values) => {
  let gameOver = false;
  let winner = "";

  winningCombinations.forEach((wc) => {
    let current = values[wc[0]];
    let counter = 0;

    wc.forEach((wcIndex) => {
      if (values[wcIndex] !== "" && values[wcIndex] === current) {
        counter++;
      }

      if (counter === 3) {
        gameOver = true;
        winner = current;
        return;
      }
    });

    if (gameOver) {
      return;
    }
  });

  return { winner, gameOver };
}

const Game = () => {
  return (
    <div className="game">
      <Board />
    </div>
  );
};

const Board = () => {
  const ResetBoard = () => {
    return Array(9).fill("");
  }

  const [values, setValues] = useState(ResetBoard());
  const [current, setCurrent] = useState("O");

  const setSpecificValue = (index, value) => {
    values[index] = value;
    setValues([...values]);
    const { winner, gameOver } = isGameOver(values);
    if (gameOver) {
      alert(`${winner} kazandı`);
    } else {
      console.log("oyun devam ediyor");
    }
  };

  return (
    <div>
      <div className='board'>
        {values.map((item, i) => (
          <Box key={i} index={i} value={item} current={current} setCurrent={setCurrent} setSpecificValue={setSpecificValue} />
        ))}
      </div>
      <button className='resetButton' onClick={() => setValues(ResetBoard())}>Yeniden Başlat</button>
    </div>
  );
}

const Box = ({ index, value, current, setCurrent, setSpecificValue }) => {
  const changeCurrent = () => {
    if (current === "O") setCurrent("X");
    else setCurrent("O");
  }

  return (
    <div className='box' onClick={() => {
      if (value === "") {
        setSpecificValue(index, current);
        changeCurrent();
      }
    }}>{value}
    </div>
  );
}

function App() {
  return (
    <>
      <Game />
    </>
  );
}

export default App;
