import { gameState } from '../state/defaultState.js'

let handleKeydown

const keyboardControllsEventListeners = (callback) => {
    
    if (handleKeydown) {
        document.body.removeEventListener('keydown', handleKeydown)
    }

    handleKeydown = function(event) { 
        let hasTail = gameState.tail.length > 0;
        switch (event.key) {
            case "ArrowLeft":
                if (gameState.moveDirectionName === 'right' && hasTail) break
                callback('left');
                break;
            case "ArrowRight":
                if (gameState.moveDirectionName === 'left' && hasTail) break
                callback('right');
                break;
            case "ArrowUp":
                if (gameState.moveDirectionName === 'down' && hasTail) break
                callback('up');
                break;
            case "ArrowDown":
                if (gameState.moveDirectionName === 'up' && hasTail) break
                callback('down');
                break;
        }
    };

    document.body.addEventListener('keydown', handleKeydown)
};

const gameOverEventListener = (callback) => {
    document.body.addEventListener('restart', (event) => {
        callback()
    })
}

export { keyboardControllsEventListeners, gameOverEventListener }