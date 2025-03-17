export default class UIComponent {
    constructor(id, parentId, classNames, childComponents) {
        this.id = id
        this.parentId = parentId
        this.classNames = classNames
        this.childComponents = childComponents || []
    }

    setup() {
        if (document.getElementById(this.id)) return

        const parent = document.getElementById(this.parentId)
        
        const el = document.createElement('div')
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