class WorldState {
    constructor() {
        this.state = {
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
            moveDirection: [0, 0],
            moveDirectionName: null,
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
    

    batchSaveState = () => {
        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => this.saveState(), 50);
    };

    push = (prop, value) => {
        let clonedArray = structuredClone(this.state[prop]) || [];
        clonedArray.push(value);
        this.state[prop] = clonedArray;
        this.batchSaveState();
    };

    resetGame = () => {
        console.log("Game Resetting...");
        
        this.state = structuredClone(new WorldState().state); // Deep reset
    
        this.saveState();
        
        document.querySelectorAll(".player, .tail, .food").forEach(cell => {
            cell.classList.remove("player", "tail", "food");
        });
    
        setTimeout(() => {
            document.body.dispatchEvent(new Event("restart"));
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

const worldState = new WorldState();

export { worldState };
