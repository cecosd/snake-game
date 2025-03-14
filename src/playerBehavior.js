import { gameState, resetGame, saveState } from './defaultState.js'

const clearLastPlayerPosition = () => {
    let prevCell = document.getElementById(`${gameState.xPrev}-${gameState.yPrev}`);
    if (prevCell) prevCell.classList.remove("player");
};

const recalculatePosition = (dimention, maxSize, direction) => {
    if(dimention == 0 && direction == -1) dimention = maxSize-1
    else if (dimention == maxSize-1 && direction == +1) dimention = 0
    else dimention += direction
    return dimention
}

const setMoveDirection = (direction) =>  {
    gameState.moveDirection = direction
    saveState()
}

const setMoveDirectionName = (directionName) =>  {
    gameState.moveDirectionName = directionName
    saveState()
}

const collisionCheck = () => {
    if(gameState.tail.some(([tx, ty]) => tx === gameState.x && ty === gameState.y)) {
        resetGame()
    }
}

const clearTailFields = () => {
    gameState.tail.forEach(a => {
        let [x, y] = a
        let el = document.getElementById(`${x}-${y}`);
        el.classList.remove("tail");
    })
}

const clearFoodFields = () => {
    gameState.food.forEach(a => {
        let [x, y] = a
        let el = document.getElementById(`${x}-${y}`);
        el.classList.remove("food");
    })
}

const moveTail = () => {
    if (gameState.tail.length === 0) return

    let lastTail = gameState.tail.pop()
    let lastCell = document.getElementById(`${lastTail[0]}-${lastTail[1]}`)
    if (lastCell) lastCell.classList.remove("tail")

    gameState.tail.unshift([gameState.xPrev, gameState.yPrev])

    renderTail();
};


const addToTail = () => {
    let [dx, dy] = gameState.moveDirection
    const tailX = gameState.x - dx
    const tailY = gameState.y - dy
    let el = document.getElementById(`${tailX}-${tailY}`)
    el.classList.add('tail')
    gameState.tail.push([tailX, tailY])
}

const eat = () => {
    let el = document.getElementById(`${gameState.x}-${gameState.y}`)
    if (!el.classList.contains('food')) return
    el.classList.remove('food')
    removeFood(gameState.x, gameState.y)
    addToTail()
    renderFood()

}

const movePlayer = (dir) => {
    if(!dir) return
    gameState.xPrev = gameState.x
    gameState.yPrev = gameState.y
    clearLastPlayerPosition()

    const [dx, dy] = gameState.moves[dir]
    gameState.x = recalculatePosition(gameState.x, gameState.rows, dx)
    gameState.y = recalculatePosition(gameState.y, gameState.cols, dy)

    setMoveDirection(gameState.moves[dir])
    setMoveDirectionName(dir)
    eat()
    moveTail(dir)
    renderPlayer()
    collisionCheck()
};

const renderTail = () => {
    gameState.tail.forEach(a => {
        let [ax, ay] = a
        document.getElementById(`${ax}-${ay}`).classList.add('tail')
    })
}

const setFood = (x, y) => {
    gameState.food.push([x, y])
}

const removeFood = (x, y) => {    
    let foodIndex = gameState.food.findIndex(([fx, fy]) => fx === x && fy === y)
    if(foodIndex > -1) gameState.food.splice(foodIndex, 1)
}

const renderFood = (amount = 1) => {
    let placed = 0;

    while (placed < amount) {
        let foodX = Math.floor(Math.random() * gameState.rows)
        let foodY = Math.floor(Math.random() * gameState.cols)

        let cell = document.getElementById(`${foodX}-${foodY}`);

        if (!cell.classList.contains("player") && !cell.classList.contains("food")&& !cell.classList.contains("tail") ) {
            cell.classList.add("food")
            setFood(foodX, foodY)
            placed++;
        }
    }

    saveState()
};

const renderPlayer = () => {
    document.getElementById(`${gameState.x}-${gameState.y}`).classList.add('player')
}

export {renderFood, renderPlayer, movePlayer}