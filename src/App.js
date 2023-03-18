import Cell from "./components/Cell";
import {useCallback, useEffect, useState} from "react";

const App = () => {
    const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""])
    const [go, setGo] = useState("circle")
    const [winningMessage, setWinningMessage] = useState(null)

    const message = "it is now " + go + " 's turn";

    const checkScore = useCallback(() => {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        let circleWins = false;
        let crossWins = false;

        for (let i = 0; i < winningCombos.length; i++) {
            const [a, b, c] = winningCombos[i];
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                if (cells[a] === "circle") {
                    circleWins = true;
                    break;
                } else if (cells[a] === "cross") {
                    crossWins = true;
                    break;
                }
            }
        }

        if (circleWins) {
            setWinningMessage("Circle Wins!");
        } else if (crossWins) {
            setWinningMessage("Cross Wins!");
        } else if (!cells.includes("")) {
            setWinningMessage("Tie!");
        }
    }, [cells]);

    useEffect(() => {
        checkScore();
    }, [cells, checkScore]);

  return (
    <div className="app">
        <div className="gameboard">
            {cells.map((cell, index) =>
                <Cell
                    key={index}
                    id={index}
                    cell={cell}
                    setCells={setCells}
                    go={go}
                    setGo={setGo}
                    cells={cells}
                />)}
        </div>
        <p>{winningMessage || message}</p>
    </div>
  );
}

export default App;
