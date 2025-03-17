import UIComponent from './../ui-component.js'

class ToolbarControlls extends UIComponent{
    constructor(id, parentId, classNames, childComponents) {
        super(id, parentId, classNames, childComponents)
    }
}

const toolbarControlls = new ToolbarControlls('toolbar-controlls-holder', 'toolbar-holder', [], [])


export { toolbarControlls }