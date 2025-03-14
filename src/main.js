
import { gameState } from './defaultState.js'
import {keyboardControllsEventListeners, gameOverEventListener} from './eventListeners.js'
import {renderFood, renderPlayer, movePlayer} from './playerBehavior.js'
import {worldSetup} from './world.js'


const bootstrap = () => {
    worldSetup()
    keyboardControllsEventListeners(movePlayer)
    renderPlayer()
    renderFood(gameState.maxFood)
}

gameOverEventListener(bootstrap)

let gameInterval;

const startGameLoop = () => {
    gameInterval = setInterval(() => {
        movePlayer(gameState.moveDirectionName);
    }, 200)
};

const stopGameLoop = () => clearInterval(gameInterval)

export { bootstrap }