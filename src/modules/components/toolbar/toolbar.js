import { UIComponent } from "../ui-component.js";
import { UIButton } from "../ui-button.js";

export class Toolbar extends UIComponent {
    constructor() {
        super("div", "toolbar-holder", "game-toolbar");

        this.startButton = new UIButton("Auto Play", "btn start-btn", () => {
            document.body.dispatchEvent(new Event("start"));
        });

        this.pauseButton = new UIButton("Manual Controlls", "btn pause-btn", () => {
            document.body.dispatchEvent(new Event("pause"));
        });

        this.addButtons();
    }

    addButtons() {
        this.startButton.appendTo(this.element);
        this.pauseButton.appendTo(this.element);
    }
}