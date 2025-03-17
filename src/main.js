
import { state } from './state/state.js'
import {keyControlls, gameOver} from './events/events.js'
import {renderFood, renderPlayer, movePlayer} from './modules/player.js'
import {toolbar} from './modules/components/toolbar/toolbar.js'
import {world} from './modules/components/world.js'


const bootstrap = () => {
    toolbar.setup()
    world.setup()
    keyControlls(movePlayer)
    renderPlayer()
    renderFood(state.get('maxFood'))
    // startGameLoop()
}

gameOver(bootstrap)

let gameInterval;

const startGameLoop = () => {
    gameInterval = setInterval(() => {
        movePlayer(state.get('moveDirectionName'));
    }, 500)
};

const stopGameLoop = () => clearInterval(gameInterval)

export { bootstrap }