
import { worldState } from './state/worldState.js'
import {keyboardControllsEventListeners, gameOverEventListener} from './events-listeners/eventListeners.js'
import {renderFood, renderPlayer, movePlayer} from './modules/playerBehavior.js'
import {world} from './modules/world.js'


const bootstrap = () => {
    world.setup()
    keyboardControllsEventListeners(movePlayer)
    renderPlayer()
    renderFood(worldState.get('maxFood'))
    startGameLoop()
}

gameOverEventListener(bootstrap)

let gameInterval;

const startGameLoop = () => {
    gameInterval = setInterval(() => {
        movePlayer(worldState.get('moveDirectionName'));
    }, 500)
};

const stopGameLoop = () => clearInterval(gameInterval)

export { bootstrap }