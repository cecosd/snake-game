import { state } from '../state/state.js'

const ui_clearPrevState = () => {
    let prevCell = document.getElementById(`${state.get('xPrev')}-${state.get('yPrev')}`);
    if (prevCell) prevCell.classList.remove("player");
};
const ui_calcPosition = (dimention, maxSize, direction) => (dimention + direction + maxSize) % maxSize;
const ui_setTail = (x, y) => {
    let el = document.getElementById(`${x}-${y}`);
    if (el) el.classList.add('tail');
};

const state_pushFood = (x, y) => state.push('food', [x, y]);
const state_setMoveDir = (direction) => state.set('moveDirection', direction, true);
const state_setMoveDirName = (directionName) => state.set('moveDirectionName', directionName, true);
const state_tailCollisionCheck = () => {
    const arr = state.get('tail') || [];
    if (arr.some(([tx, ty]) => tx === state.get('x') && ty === state.get('y'))) {
        state.resetGame();
    }
};
const state_pushTail = () => {
    let [dx, dy] = state.get('moveDirection');
    const tailX = state.get('x') - dx;
    const tailY = state.get('y') - dy;
    state.push('tail', [tailX, tailY]);
    ui_setTail(tailX, tailY)
};

const moveTail = () => {
    let tail = structuredClone(state.get('tail')) || [];
    if (!Array.isArray(tail) || tail.length === 0) return;

    let lastTail = tail.pop();
    let lastCell = document.getElementById(`${lastTail[0]}-${lastTail[1]}`);
    if (lastCell) lastCell.classList.remove("tail");

    tail.unshift([state.get('xPrev'), state.get('yPrev')]);
    state.set('tail', tail);

    renderTail();
};

const renderTail = () => {
    const arr = state.get('tail') || [];
    if (!Array.isArray(arr)) return;

    arr.forEach(([ax, ay]) => {
        let el = document.getElementById(`${ax}-${ay}`);
        if (el) el.classList.add('tail');
    });
};

const eat = () => {
    let el = document.getElementById(`${state.get('x')}-${state.get('y')}`);
    if (!el?.classList.contains('food')) return;

    el.classList.remove('food');
    removeFood(state.get('x'), state.get('y'));
    state_pushTail();
    renderFood();
};


const movePlayer = (dir) => {
    if (!dir) return;

    let x = state.get('x');
    let y = state.get('y');

    state.set('xPrev', x);
    state.set('yPrev', y);
    ui_clearPrevState();

    const [dx, dy] = state.get('moves')[dir];
    x = ui_calcPosition(x, state.get('rows'), dx);
    y = ui_calcPosition(y, state.get('cols'), dy);

    state.set('x', x);
    state.set('y', y);

    state_setMoveDir(state.get('moves')[dir]);
    state_setMoveDirName(dir);
    eat();
    moveTail();
    renderPlayer();
    state_tailCollisionCheck();
    state.batchSaveState();
};

const removeFood = (x, y) => {    
    let foodArray = state.get('food') || [];
    let foodIndex = foodArray.findIndex(([fx, fy]) => fx === x && fy === y);

    if (foodIndex > -1) {
        foodArray.splice(foodIndex, 1);
        state.set('food', foodArray);
    }
    state.batchSaveState();
};

const renderFood = (amount = 1) => {
    let placed = 0;
    while (placed < amount) {
        let foodX = Math.floor(Math.random() * state.get('rows'));
        let foodY = Math.floor(Math.random() * state.get('cols'));

        let cell = document.getElementById(`${foodX}-${foodY}`);
        if (!cell?.classList.contains("player") && !cell?.classList.contains("food") && !cell?.classList.contains("tail")) {
            cell.classList.add("food");
            state_pushFood(foodX, foodY);
            placed++;
        }
    }
};

const renderPlayer = () => {
    let el = document.getElementById(`${state.get('x')}-${state.get('y')}`);
    if (el) el.classList.add('player');
};

export { renderFood, renderPlayer, movePlayer };
