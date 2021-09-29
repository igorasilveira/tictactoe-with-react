import {
  KeyboardEvent, MouseEvent, useEffect, useState,
} from 'react';

import useTimer from '../hooks/useTimer';

import styles from '../styles/components/TicTacToe.module.css';

enum BoardCell {
    X = 'X',
    O = 'O',
    EMPTY = ''
}

enum GameStatus {
    DRAW = 'draw',
    WIN = 'win',
    NONE = 'none',
    END = 'end'
}

interface Score {
    [BoardCell.O]: number;
    [BoardCell.X]: number;
}

interface AlongContainers {
    rows: number[];
    columns: number[];
    diagonal: number[];
    oppositeDiagonal: number[];
}

interface PlayerContainers {
    [BoardCell.O]: AlongContainers;
    [BoardCell.X]: AlongContainers;
}

interface Cell {
    row: number
    column: number;
}

const MAX_MATCHES = 9;
const DEFAULT_SIZE = 3;
const CELL_ID_DELIMITOR = '-';
const DEFAULT_PLAYER = BoardCell.X;
const TOKEN_DARK = 'dark';
const TOKEN_BRIGHT = 'bright';
const DEFAULT_SCORE: Score = {
  [BoardCell.O]: 0,
  [BoardCell.X]: 0,
};

const PLAYERS = {
  [BoardCell.X]: 1,
  [BoardCell.O]: 2,
};

export default function TicTacToe() {
  const {
    formattedTime, resetTimer, stopTimer,
  } = useTimer();

  const [status, setStatus] = useState<GameStatus>(GameStatus.NONE);
  const [history, setHistory] = useState<string[]>([]);
  const [score, setScore] = useState<Score>(DEFAULT_SCORE);
  const [player, setPlayer] = useState<string>(DEFAULT_PLAYER);
  const [size, setSize] = useState<number>(DEFAULT_SIZE);
  const [containers, setContainers] = useState<PlayerContainers>(null);
  const [winningCells, setWinningCells] = useState<Cell[]>([]);
  const [board, setBoard] = useState<string[][]>([]);

  const resetGame = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setBoard(Array(size).fill(null).map((_) => Array(size).fill(BoardCell.EMPTY)));

    setContainers({
      O: {
        columns: Array(size).fill(0),
        diagonal: Array(size).fill(0),
        oppositeDiagonal: Array(size).fill(0),
        rows: Array(size).fill(0),
      },
      X: {
        columns: Array(size).fill(0),
        diagonal: Array(size).fill(0),
        oppositeDiagonal: Array(size).fill(0),
        rows: Array(size).fill(0),
      },
    });

    setWinningCells([]);
    setStatus(GameStatus.NONE);
    resetTimer();
  };

  useEffect(() => {
    resetGame();
  }, []);

  const checkDraw = () => board.every((row) => row.every((cell) => cell !== BoardCell.EMPTY));

  const checkWinner = () => {
    const currentPlayerContainers: AlongContainers = containers[player];

    const winningRow = currentPlayerContainers.rows.findIndex((row) => row === size);
    if (winningRow > -1) {
      setWinningCells(
        Array(size).fill(Number).map((_, index) => ({ row: winningRow, column: index })),
      );

      return true;
    }

    const winningCol = currentPlayerContainers.columns.findIndex((row) => row === size);
    if (winningCol > -1) {
      setWinningCells(
        Array(size).fill(Number).map((_, index) => ({ row: index, column: winningCol })),
      );

      return true;
    }

    if (currentPlayerContainers.diagonal.every((cell) => cell >= 1)) {
      setWinningCells(
        Array(size).fill(Number).map((_, index) => ({
          row: index, column: index,
        })),
      );

      return true;
    }

    if (currentPlayerContainers.oppositeDiagonal.every((cell) => cell >= 1)) {
      setWinningCells(
        Array(size).fill(Number).map((_, index) => ({
          row: index, column: size - index - 1,
        })),
      );

      return true;
    }

    return false;
  };

  const updatePlayer = () => {
    setPlayer(player === BoardCell.X ? BoardCell.O : BoardCell.X);
  };

  const finishGame = () => {
    setStatus(GameStatus.END);
    stopTimer();
  };

  const updateGame = () => {
    if (checkWinner()) {
      setStatus(GameStatus.WIN);

      setTimeout(() => {
        // setStatus(GameStatus.WIN);
        setScore({ ...score, [player]: score[player] + 1 });
        setHistory([...history, player]);

        if (score[player] + 1 > MAX_MATCHES / 2) {
          finishGame();
          return;
        }

        updatePlayer();
        resetGame();
      }, 2000);

      return;
    }

    if (checkDraw()) {
      setStatus(GameStatus.DRAW);

      setTimeout(() => {
        resetGame();
      }, 2000);
    }

    updatePlayer();
  };

  const handleCellClick = (evt: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => {
    const { currentTarget } = evt;
    const { id } = currentTarget;
    const [, rowIndex, colIndex] = id.split('-');

    if (board[+rowIndex][+colIndex] !== BoardCell.EMPTY || status === GameStatus.WIN) {
      return;
    }

    const newContainers: PlayerContainers = { ...containers };
    newContainers[player].rows[rowIndex] += 1;
    newContainers[player].columns[colIndex] += 1;

    if (colIndex === rowIndex) {
      newContainers[player].diagonal[colIndex] += 1;
    }

    if ((+colIndex + +rowIndex === size - 1)) {
      newContainers[player].oppositeDiagonal[colIndex] += 1;
    }

    setContainers(newContainers);

    const newBoard = [...board];
    newBoard[+rowIndex][+colIndex] = player;
    setBoard(newBoard);

    updateGame();
  };

  const renderStatus = () => {
    if (status === GameStatus.NONE) {
      return <></>;
    }

    const textMapper = {
      [GameStatus.DRAW]: 'Draw',
      [GameStatus.END]: `Congrats Player ${PLAYERS[player]}`,
    };

    if (!textMapper[status]) {
      return <></>;
    }

    return (
      <div className="absolute inset-0 w-full h-full font-bold text-7xl flex items-center justify-center bg-alto-gray">
        <p className="w-11/12 break-words">{textMapper[status]}</p>
      </div>
    );
  };

  const renderBoard = () => (
    <div className={`${styles.boardGame} ${styles[`boardSize${size}`]}`}>
      {
          board.map((row, rowIndex) => row.map((cell, colIndex) => {
            const identifier = `cell${CELL_ID_DELIMITOR}${rowIndex}${CELL_ID_DELIMITOR}${colIndex}`;
            // eslint-disable-next-line max-len
            const isWinning = winningCells.find((winningCell) => winningCell.row === rowIndex && winningCell.column === colIndex);
            const imagePath = `/images/${cell}_${isWinning ? TOKEN_BRIGHT : TOKEN_DARK}.svg`;

            return (
              <div
                key={identifier}
                className="border flex justify-center items-center"
                id={identifier}
                onKeyDown={handleCellClick}
                onClick={handleCellClick}
                role="button"
                tabIndex={2 + size * rowIndex + colIndex}
              >
                {cell !== BoardCell.EMPTY && <img className="h-11/12 w-11/12" src={imagePath} alt={identifier} />}
              </div>
            );
          }))
        }
    </div>
  );

  const renderPlayerScore = (playerToRender: BoardCell) => (
    <>
      <p className="font-bold text-3xl mb-3">
        Player
        {' '}
        {PLAYERS[playerToRender]}
      </p>
      <p className="text-5xl md:text-7xl">{score[playerToRender]}</p>
    </>
  );

  return (
    <div>
      <section className="bg-porcelain-white py-16 text-center px-4 md:px-section h-screen flex flex-col justify-center">
        <h2 className="font-bold text-3xl mb-5">Tic tac toe games</h2>
        <p className="text-xl mb-6">Welcome to the best game in the world.</p>
        <div className="flex flex-row flex-wrap justify-between items-center w-full">
          <div className="hidden md:block">
            {renderPlayerScore(BoardCell.X)}
          </div>
          <div
            className="relative mx-0 md:mx-4 w-96 h-96 border border-alto-gray mb-10 md:mb-0"
          >
            {renderStatus()}
            {renderBoard()}
          </div>
          <div className="block md:hidden">
            {renderPlayerScore(BoardCell.X)}
          </div>
          <div>
            {renderPlayerScore(BoardCell.O)}
          </div>
        </div>
        <p className="mt-10 text-2xl md:text-3xl">{formattedTime}</p>
      </section>
    </div>
  );
}
