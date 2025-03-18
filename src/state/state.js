class State {
    constructor() {
        this.state = {
            autoplay: false,
            rows: 10,
            cols: 20,
            maxFood: 4,
            xPrev: null,
            yPrev: null,
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * 20),
            moves: Object.freeze({
                left: [0, -1],
                right: [0, +1],
                up: [-1, 0],
                down: [+1, 0]
            }),
            moveDirection: [0, +1],
            moveDirectionName: 'right',
            food: [],
            tail: []
        };
    }

    getState = () => this.state;

    get = (prop) => this.state[prop];

    set = (prop, value, shouldSave = false) => {        
        if (Array.isArray(value) || typeof value === "object") {
            this.state[prop] = structuredClone(value);
        } else {
            this.state[prop] = value;
        }
    
        if (shouldSave) {
            this.saveState();
        }
    };

    push = (prop, value) => {
        let clonedArray = structuredClone(this.state[prop]) || [];
        clonedArray.push(value);
        this.state[prop] = clonedArray;
        this.batchSaveState();
    };
    
    batchSaveState = () => {
        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => this.saveState(), 50);
    };

    resetGame = () => {
        console.log("Game Resetting...");
        
        this.state = structuredClone(new State().state);
    
        this.saveState();
        
        document.querySelectorAll(".player, .tail, .food").forEach(cell => {
            cell.classList.remove("player", "tail", "food");
        });
    
        setTimeout(() => {
            location.reload();
        }, 100);
    };

    loadState = () => {
        try {
            const savedState = JSON.parse(localStorage.getItem('gameState'));
            if (savedState && typeof savedState === "object") {
                this.state = structuredClone(savedState);
            } else {
                throw new Error("Invalid game state, resetting...");
            }
        } catch (e) {
            console.warn("Corrupted game state detected. Resetting...");
            this.state = structuredClone(this.getState());
            this.saveState();
        }
    };

    saveState = () => {
        if (!this.state) return;
        localStorage.setItem('gameState', JSON.stringify(this.state));
    };
}

const state = new State();

export { state };
