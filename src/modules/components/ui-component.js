export default class UIComponent {
    constructor(id, parentId, classNames, childComponents) {
        this.id = id
        this.parentId = parentId
        this.classNames = classNames
        this.childComponents = childComponents || []
    }

    getEl() {
        return document.getElementById(this.id)
    }

    getParentEl() {
        return document.getElementById(this.parentId)
    }

    setup() {
        if (document.getElementById(this.id)) return

        const parent = document.getElementById(this.parentId)
        
        let el = document.createElement('div')
        el.setAttribute('id', this.id)
        this.classNames.forEach(a => el.classList.add(a))

        parent.appendChild(el)

        setTimeout(() => {
            this.registerChildComponents()
        }, 100);     
    }

    registerChildComponents() {
        if( this.childComponents.length === 0) return
        this.childComponents.forEach(a => {
            a.setup()
        })
    }
}