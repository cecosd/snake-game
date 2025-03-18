import { UIComponent } from "./ui-component.js";

export class UIButton extends UIComponent {
    constructor(label, id, onClick) {
        super("button", "ui-button", id);
        this.setText(label);
        if (onClick) this.addEvent("click", onClick);
    }
}