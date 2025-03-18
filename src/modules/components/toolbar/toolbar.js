import {toolbarControlls} from './toolbar-controlls.js'
import UIComponent from './../ui-component.js'

class Toolbar extends UIComponent{
    constructor(id, parentId, classNames, childComponents) {
        super(id, parentId, classNames, childComponents)
    }

    
}

const toolbar = new Toolbar('toolbar-holder', 'app', [], [
    toolbarControlls
])


export { toolbar }