
import { state } from './state/state.js'
import {keyControlls, gameOver, startGame, pauseGame} from './events/events.js'
import {renderFood, renderPlayer, movePlayer} from './modules/player.js'
import {Toolbar} from './modules/components/toolbar/toolbar.js'
import {World} from './modules/components/world/world.js'
// import {world} from './modules/world.js'

const bootstrap = () => {
    const toolbar = new Toolbar();
    toolbar.appendTo(document.body);
    const world = new World(state.get('rows'), state.get('cols'));
    const app = document.getElementById('app')
    app.appendChild(world.element)  
    keyControlls(movePlayer)
    renderPlayer()
    renderFood(state.get('maxFood'))
    startGameLoop()
}

gameOver(bootstrap)

startGame()
pauseGame()

let gameInterval;

const startGameLoop = () => {
    gameInterval = setInterval(() => {
        if(!state.get('autoplay')) return 
        movePlayer(state.get('moveDirectionName'));
    }, 500)
};

const stopGameLoop = () => clearInterval(gameInterval)

export { bootstrap }