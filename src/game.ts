let createAndAppend = ({tag = 'div', className, parent, value = ''}: {tag?: string, className: string, parent: HTMLElement, value?: string}) => {
    let element = document.createElement(tag)
    element.className = className
    if (value) {
        element.innerHTML = value
    }
    
    parent.appendChild(element)

    return element
}

export class Game {
    rating: number

    constructor(parentElement: HTMLElement) {
        let gameFieldElement = createAndAppend({
            className: 'game',
            parent: parentElement
        })

        let headerElement = createAndAppend({
            className: 'header',
            parent: gameFieldElement
        })

        this.rating = 0
        headerElement.innerHTML = 'Rating: ' + this.rating

        let fieldElement = createAndAppend({
            className: 'field',
            parent: gameFieldElement
        })

        for (let i = 0; i < 5; i++) {
            for (let k = 0; k < 5; k++) {
                let cellElement = createAndAppend({
                    className: 'cell',
                    parent: fieldElement
                })

                if (Math.random() > 0.8) {
                    cellElement.innerHTML = Math.random() > 0.9 ? '4' : '2'
                }
            }
        }
    }
}