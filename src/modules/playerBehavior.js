import { worldState } from '../state/worldState.js'

const clearLastPlayerPosition = () => {
    let prevCell = document.getElementById(`${worldState.get('xPrev')}-${worldState.get('yPrev')}`);
    if (prevCell) prevCell.classList.remove("player");
};

const recalculatePosition = (dimention, maxSize, direction) => {
    return (dimention + direction + maxSize) % maxSize; // More concise wrap-around logic
};

const setMoveDirection = (direction) => worldState.set('moveDirection', direction, true);
const setMoveDirectionName = (directionName) => worldState.set('moveDirectionName', directionName, true);

const collisionCheck = () => {
    const arr = worldState.get('tail') || [];
    if (arr.some(([tx, ty]) => tx === worldState.get('x') && ty === worldState.get('y'))) {
        worldState.resetGame();
    }
};

const clearTailFields = () => {
    const arr = worldState.get('tail') || [];
    if (!Array.isArray(arr)) return;
    
    arr.forEach(([x, y]) => {
        let el = document.getElementById(`${x}-${y}`);
        if (el) el.classList.remove("tail");
    });
};

const moveTail = () => {
    let tail = structuredClone(worldState.get('tail')) || [];
    if (!Array.isArray(tail) || tail.length === 0) return;

    let lastTail = tail.pop();
    let lastCell = document.getElementById(`${lastTail[0]}-${lastTail[1]}`);
    if (lastCell) lastCell.classList.remove("tail");

    tail.unshift([worldState.get('xPrev'), worldState.get('yPrev')]);
    worldState.set('tail', tail);

    renderTail();
};

const addToTail = () => {
    let [dx, dy] = worldState.get('moveDirection');
    const tailX = worldState.get('x') - dx;
    const tailY = worldState.get('y') - dy;
    
    let el = document.getElementById(`${tailX}-${tailY}`);
    if (el) el.classList.add('tail');

    worldState.push('tail', [tailX, tailY]);
};

const eat = () => {
    let el = document.getElementById(`${worldState.get('x')}-${worldState.get('y')}`);
    if (!el?.classList.contains('food')) return;

    el.classList.remove('food');
    removeFood(worldState.get('x'), worldState.get('y'));
    addToTail();
    renderFood();
};

const movePlayer = (dir) => {
    if (!dir) return;

    let x = worldState.get('x');
    let y = worldState.get('y');

    worldState.set('xPrev', x);
    worldState.set('yPrev', y);
    clearLastPlayerPosition();

    const [dx, dy] = worldState.get('moves')[dir];
    x = recalculatePosition(x, worldState.get('rows'), dx);
    y = recalculatePosition(y, worldState.get('cols'), dy);

    worldState.set('x', x);
    worldState.set('y', y);

    setMoveDirection(worldState.get('moves')[dir]);
    setMoveDirectionName(dir);
    eat();
    moveTail();
    renderPlayer();
    collisionCheck();
    worldState.batchSaveState();
};

const renderTail = () => {
    const arr = worldState.get('tail') || [];
    if (!Array.isArray(arr)) return;

    arr.forEach(([ax, ay]) => {
        let el = document.getElementById(`${ax}-${ay}`);
        if (el) el.classList.add('tail');
    });
};

const setFood = (x, y) => worldState.push('food', [x, y]);

const removeFood = (x, y) => {    
    let foodArray = worldState.get('food') || [];
    let foodIndex = foodArray.findIndex(([fx, fy]) => fx === x && fy === y);

    if (foodIndex > -1) {
        foodArray.splice(foodIndex, 1);
        worldState.set('food', foodArray);
    }
    worldState.batchSaveState();
};

const renderFood = (amount = 1) => {
    let placed = 0;
    while (placed < amount) {
        let foodX = Math.floor(Math.random() * worldState.get('rows'));
        let foodY = Math.floor(Math.random() * worldState.get('cols'));

        let cell = document.getElementById(`${foodX}-${foodY}`);
        if (!cell?.classList.contains("player") && !cell?.classList.contains("food") && !cell?.classList.contains("tail")) {
            cell.classList.add("food");
            setFood(foodX, foodY);
            placed++;
        }
    }
};

const renderPlayer = () => {
    let el = document.getElementById(`${worldState.get('x')}-${worldState.get('y')}`);
    if (el) el.classList.add('player');
};

export { renderFood, renderPlayer, movePlayer };
