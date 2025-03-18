import { UIComponent } from "../ui-component.js";

export class World extends UIComponent {
    constructor(rows, cols) {
        super("div", "world-holder");

        this.rows = rows
        this.cols = cols

        this.setup()
    }

    setup() {
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
    
            this.element.appendChild(row)
        });
    }
}