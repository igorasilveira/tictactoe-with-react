import {
  KeyboardEvent, MouseEvent, useEffect, useState,
} from 'react';

type Container = number[]

type Dictionary<T> = { [key: string]: T };

interface GameContainers {
  rows: Container;
  columns: Container;
  diagonal: Container;
  inverseDiagonal: Container;
}

const INITIAL_SCORE = {
  'X': 0,
  'O': 0
}

export default function TicTacToe() {
  const [player, setPlayer] = useState<string>('X');
  const [status, setStatus] = useState<string>('');
  const [containers, setContainers] = useState<Dictionary<GameContainers>>();
  const [score, setScore] = useState<Dictionary<number>>(INITIAL_SCORE);
  const [board, setBoard] = useState<string[][]>([]);

  const resetGame = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);

    setContainers({
      'O': {
        columns: Array(3).fill(0),
        diagonal: Array(3).fill(0),
        inverseDiagonal: Array(3).fill(0),
        rows: Array(3).fill(0),
      },
      'X': {
        columns: Array(3).fill(0),
        diagonal: Array(3).fill(0),
        inverseDiagonal: Array(3).fill(0),
        rows: Array(3).fill(0),
      },
    })

    setStatus('');

    setPlayer('X');
  };

  useEffect(() => {
    resetGame();
  }, []);

  const checkDraw = () => board.every((row) => row.every((cell) => cell !== ''))

  const checkWinner = () => {
    const currentPlayerContainers = containers![player];

    // check for rows
    if (currentPlayerContainers.rows.some((value) => value === 3)) {
      return true;
    }

    // check for columns
    if (currentPlayerContainers.columns.some((value) => value === 3)) {
      return true;
    }

    // check for diagonal
    if (currentPlayerContainers.diagonal.every((value) => value === 1)) {
      return true;
    }

    // check for inverse diagonal
    if (currentPlayerContainers.inverseDiagonal.every((value) => value === 1)) {
      return true;
    }

    return false;
  }

  const updatePlayer = () => {
    setPlayer(player === 'O' ? 'X' : 'O');
  }

  const updateScore = () => {
    const newScore = { ...score };

    newScore[player] += 1;
    setScore(newScore);
  }

  const updateGame = () => {
    if (checkWinner()) {
      setStatus('won');

      updateScore();

      setTimeout(() => {
        resetGame();
      }, 2000);

      return;
    }

    if (checkDraw()) {
      setStatus('draw');

      setTimeout(() => {
        resetGame();
      }, 2000);
    }

    setPlayer(player === 'O' ? 'X' : 'O');
  };

  const handleCellClick = (evt: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => {
    const { currentTarget } = evt;
    const { id } = currentTarget;

    const [_, rowIndex, colIndex] = id.split('-');

    const newBoard = [...board];
    newBoard[+rowIndex][+colIndex] = player;

    setBoard(newBoard);

    const newContainers = { ...containers };

    newContainers[player].rows[+rowIndex] += 1;
    newContainers[player].columns[+colIndex] += 1;

    if (colIndex === rowIndex) {
      newContainers[player].diagonal[+colIndex] += 1;
    }
    
    if ((+rowIndex + +colIndex) === (3 - 1)) {
      newContainers[player].inverseDiagonal[+colIndex] += 1;
    }

    setContainers(newContainers);

    updateGame();
  };

  const renderStatusOverlay = () => {
    if (status === '') return;

    let message = '';

    if (status === 'draw') {
      message = 'Draw';
    }

    if (status === 'won') {
      message = `${player} Won`;
    }

    return (
      <div className="absolute inset-0 w-full h-full font-bold text-7xl flex items-center justify-center bg-alto-gray">
        <p className="w-11/12 break-words">{message}</p>
      </div>
    )
  }

  const renderBoard = () => (
    <div className="h-full w-full bg-white grid grid-cols-3 grid-rows-3">
      {
              board.map((row, rowIndex) => row.map((cell, colIndex) => {
                const identifier = `cell-${rowIndex}-${colIndex}`;

                return (
                  <div
                    className="border flex justify-center items-center"
                    key={identifier}
                    id={identifier}
                    onClick={handleCellClick}
                    onKeyDown={handleCellClick}
                    role="button"
                    tabIndex={3 * rowIndex * colIndex}
                  >
                    {cell !== '' && <img src={`/images/${cell}_dark.svg`} className="h-11/12 w-11/12" alt={`Cell ${identifier}`} />}
                  </div>
                );
              }))
          }
    </div>
  );

  const renderPlayerScore = (player: string) => (
    <>
      <p className="font-bold text-3xl mb-3">
        Player
        {' '}
        {player}
      </p>
      <p className="text-5xl md:text-7xl">{score[player]}</p>
    </>
  )

  return (
    <div>
      <section className="bg-porcelain-white py-16 text-center px-4 md:px-section h-screen flex flex-col justify-center">
        <h2 className="font-bold text-3xl mb-5">Tic tac toe games</h2>
        <p className="text-xl mb-6">Welcome to the best game in the world.</p>
        <div className="flex flex-row flex-wrap justify-between items-center w-full">
          <div className="hidden md:block">
            {renderPlayerScore('X')}
          </div>
          <div
            className="relative mx-0 md:mx-4 w-96 h-96 border border-alto-gray mb-10 md:mb-0"
            >
            {renderStatusOverlay()}
            {renderBoard()}
          </div>
          <div className="block md:hidden">
            {renderPlayerScore('X')}
          </div>
          <div>
            {renderPlayerScore('O')}
          </div>
        </div>
        <p className="mt-10 text-2xl md:text-3xl">Time here</p>
      </section>
    </div>
  );
}
