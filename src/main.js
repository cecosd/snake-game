
import { gameState } from './state/worldState.js'
import {keyboardControllsEventListeners, gameOverEventListener} from './events-listeners/eventListeners.js'
import {renderFood, renderPlayer, movePlayer} from './modules/playerBehavior.js'
import {world} from './modules/world.js'


const bootstrap = () => {
    world.setup()
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