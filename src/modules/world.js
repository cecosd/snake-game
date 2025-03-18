import { state } from '../state/state.js'

class World {
    
    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
    }

    setup() {
        if (document.getElementById('world-holder')) return

        const holder = document.createElement('div')
        holder.setAttribute('id', 'world-holder') 
    
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
    
        const app = document.getElementById('app')
        app.appendChild(holder)  
    }
}

const world = new World(state.get('rows'), state.get('cols'))

export { world }