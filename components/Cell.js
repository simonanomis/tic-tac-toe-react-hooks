import {useCallback} from "react";

const Cell = ({id, cell, setCells, go, setGo, cells}) => {
    const handleCellChange = useCallback((className) => {
        const nextCells = cells.map((cell, index) => {
            if(index === id) {
                return className
            } else {
                return cell;
            }
        })
        setCells(nextCells);
    }, [cells, id, setCells]);

    const handleClick = useCallback((e) => {
        if (e.target.className === 'circle') return;
        if (e.target.className === 'cross') return;

        const taken =
            e.target.firstChild.classList.contains("circle") ||
            e.target.firstChild.classList.contains("cross");

        if (!taken) {
            if (go === "circle") {
                e.target.firstChild.classList.add("circle");
                handleCellChange("circle");
                setGo("cross");
            }
            if (go === "cross") {
                e.target.firstChild.classList.add("cross");
                handleCellChange("cross");
                setGo("circle");
            }
        }
    }, [go, setGo, handleCellChange]);

    return(
        <div className="square" id={id} onClick={handleClick}>
            <div className={cell}></div>
        </div>
    )
}

export default Cell;