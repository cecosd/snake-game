import { state } from '../state/state.js'

let handleKeydown

const keyControlls = (callback) => {
    
    if (handleKeydown) {
        document.body.removeEventListener('keydown', handleKeydown)
    }

    handleKeydown = function(event) { 
        let hasTail = state.get('tail').length > 0;
        const moveDirectionName = state.get('moveDirectionName')
        const autoplay = state.get('autoplay')
        console.log('autoplay', autoplay)
        switch (event.key) {
            case "ArrowLeft":
                if (moveDirectionName === 'right' && hasTail) break
                if (autoplay && moveDirectionName == 'left') break
                callback('left');
                break;
            case "ArrowRight":
                if (moveDirectionName === 'left' && hasTail) break
                if (autoplay && moveDirectionName == 'right') break
                callback('right');
                break;
            case "ArrowUp":
                if (moveDirectionName === 'down' && hasTail) break
                if (autoplay && moveDirectionName == 'up') break
                callback('up');
                break;
            case "ArrowDown":
                if (moveDirectionName === 'up' && hasTail) break
                if (autoplay && moveDirectionName == 'down') break
                callback('down');
                break;
        }
    };

    document.body.addEventListener('keydown', handleKeydown)
};

const gameOver = (callback) => {
    document.body.addEventListener('restart', (event) => {
        callback()
    })
}

export { keyControlls, gameOver }