const SIDE_SIZE = 8;

document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.querySelector('.board');

    const cells = createCells(boardElement);

    addCheckers(cells, 0, 3, 'checker-black', false);
    addCheckers(
        cells, SIDE_SIZE - 3, SIDE_SIZE, 
        'checker-white', true
    );

    document.addEventListener('click', (event) => {
        onCellSelect(event);
    })
})

let placeMode = false;
let lastCheckerElement = null;

function onCellSelect(event) {
    const checkerElement = event.target.closest('.checker');
    const cellElement = event.target.closest('.cell');

    if (!placeMode && checkerElement) {
        placeMode = true;
        lastCheckerElement = checkerElement;
        return;
    }

    if (placeMode && !checkerElement && cellElement && lastCheckerElement) {
        cellElement.appendChild(lastCheckerElement);
        lastCheckerElement = null;
        placeMode = false;
    }

    if (placeMode && !cellElement && lastCheckerElement) {
        lastCheckerElement.remove();
        lastCheckerElement = null;
        placeMode = false;
    }
}

function addCheckers(
    cells, from_row, to_row,
    className, is_even_placement
) {
    const checkerElement = document.createElement('div');
    checkerElement.classList.add('checker');
    checkerElement.classList.add(className);

    const checkerInnerElement = document.createElement('div');
    checkerInnerElement.classList.add('checker-inner');
    checkerElement.appendChild(checkerInnerElement);
    
    for (let i = from_row; i < to_row; i++) {
        for (let j = 0; j < SIDE_SIZE; j++) {
            const is_even = (i - from_row + j) % 2 === 0;
            if (is_even === is_even_placement) {
                cells[i][j].appendChild(
                    checkerElement.cloneNode(true)
                );
            }
        }
    }
}

function createCells(boardElement) {
    const cells = [];

    for (let i = 0; i < SIDE_SIZE; i++) {
        cells.push([]);
        for (let j = 0; j < SIDE_SIZE; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if ((i + j) % 2 == 0) {
                cell.classList.add('cell-white')
            }

            boardElement.appendChild(cell);

            cells[i].push(cell);
        }
    }

    return cells;
}
