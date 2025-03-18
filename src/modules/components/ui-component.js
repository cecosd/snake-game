export class UIComponent {
    constructor(tag = "div", id, className) {
        this.element = document.createElement(tag);
        if (className) this.element.className = className;
        if (id) this.element.id = id;
    }

    appendTo(parent) {
        if (parent instanceof HTMLElement) {
            parent.appendChild(this.element);
        } else {
            console.error("Parent is not a valid HTML element");
        }
    }

    setText(text) {
        this.element.textContent = text;
    }

    addEvent(event, callback) {
        this.element.addEventListener(event, callback);
    }
}