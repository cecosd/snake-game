import { gameState } from '../state/defaultState.js'

class World {
    
    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
    }

    setup() {
        if (document.getElementById('world-holder')) return

        const holder = document.createElement('div')
        holder.setAttribute('id', 'world-holder')
        holder.style.display = "flex"
        holder.style.flexDirection = "column"
        holder.style.width = "90vw";
        holder.style.height = "90vh" 
    
        Array.from({ length: this.rows }, (_, rowIndex) => {
            const row = document.createElement('div')
            row.setAttribute('class', `row`)
            row.style.display = "flex"
    
            for (let colIndex = 0; colIndex < this.cols; colIndex++) {
                const cell = document.createElement('div')
                cell.setAttribute('id', `${rowIndex}-${colIndex}`)
                cell.classList.add('cell')
                row.appendChild(cell)
            }
    
            holder.appendChild(row)
        });
    
        document.body.appendChild(holder)  
    }
}

const world = new World(gameState.rows, gameState.cols)

export {world}