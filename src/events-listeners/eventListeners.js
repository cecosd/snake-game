import { worldState } from '../state/worldState.js'

let handleKeydown

const keyboardControllsEventListeners = (callback) => {
    
    if (handleKeydown) {
        // refresh event listeners
        document.body.removeEventListener('keydown', handleKeydown)
    }

    handleKeydown = function(event) { 
        let hasTail = worldState.get('tail').length > 0;
        switch (event.key) {
            case "ArrowLeft":
                if (worldState.get('moveDirectionName') === 'right' && hasTail) break
                callback('left');
                break;
            case "ArrowRight":
                if (worldState.get('moveDirectionName') === 'left' && hasTail) break
                callback('right');
                break;
            case "ArrowUp":
                if (worldState.get('moveDirectionName') === 'down' && hasTail) break
                callback('up');
                break;
            case "ArrowDown":
                if (worldState.get('moveDirectionName') === 'up' && hasTail) break
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