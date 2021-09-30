import {
  KeyboardEvent, MouseEvent, useEffect, useState,
} from 'react';

export default function TicTacToe() {
  const [player, setPlayer] = useState<string>('X');
  const [board, setBoard] = useState<string[][]>([]);

  const resetGame = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
  };

  useEffect(() => {
    resetGame();
  }, []);

  const updateGame = () => {
    setPlayer(player === 'O' ? 'X' : 'O');
  };

  const handleCellClick = (evt: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => {
    const { currentTarget } = evt;
    const { id } = currentTarget;

    const [_, rowIndex, colIndex] = id.split('-');

    const newBoard = [...board];
    newBoard[+rowIndex][+colIndex] = player;

    setBoard(newBoard);

    updateGame();
  };

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

  return (
    <div>
      <section className="bg-porcelain-white py-16 text-center px-4 md:px-section h-screen flex flex-col justify-center">
        <h2 className="font-bold text-3xl mb-5">Tic tac toe games</h2>
        <p className="text-xl mb-6">Welcome to the best game in the world.</p>
        <div className="flex flex-row flex-wrap justify-between items-center w-full">
          <div className="hidden md:block">
            Score 1
          </div>
          <div
            className="relative mx-0 md:mx-4 w-96 h-96 border border-alto-gray mb-10 md:mb-0"
          >
            {renderBoard()}
          </div>
          <div className="block md:hidden">
            Score 1
          </div>
          <div>
            Score 2
          </div>
        </div>
        <p className="mt-10 text-2xl md:text-3xl">Time here</p>
      </section>
    </div>
  );
}
