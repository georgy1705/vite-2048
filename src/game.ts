import { GameCell } from "./cell"

export let createAndAppend = ({tag = 'div', className, parent, value = ''}: {tag?: string, className: string, parent: HTMLElement, value?: string}) => {
    let element = document.createElement(tag)
    element.className = className
    if (value) {
        element.innerHTML = value
    }
    
    parent.appendChild(element)

    return element
}

let getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

let isFirstKey = (key: number) => key == 0

let isLastKey = (key: number) => key == 4


export class Game {
    rating: number
    field: any

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

        this.field = []

        for (let i = 0; i < 5; i++) {
            this.field[i] = []
            for (let k = 0; k < 5; k++) {
                this.field[i][k] = new GameCell(fieldElement)
            }
        }

        window.onkeyup = e => {
            switch (e.keyCode) {
                case 38:
                    this.moveUp()
                    break
                case 40:
                    this.moveDown()
                    break
                case 37:
                    this.moveLeft()
                    break
                case 39: 
                    this.moveRight()
                    break
            }
        }
    }

    spawnUnit = () => {
        let emptyCells = []

        for (let i = 0; i < this.field.length; i++) {
            for (let k = 0; k < this.field[i].length; k++) {
                if (!this.field[i][k].value) {
                    emptyCells.push(this.field[i][k])
                }
            }
        } 
        
        if (emptyCells.length) {
            emptyCells[getRandomInt(0, emptyCells.length - 1)].spawn()
        } else {
            alert('You lose!')
        }
    }

    moveRight = () => {
        let hasMoved = false;
        
        for (let i = 0; i < 5; i++) {
             for (let k = 3; k >= 0; k--) {
                let currentCell = this.field[i][k]

                if (currentCell.isEmpty) {
                    continue
                }

                let nextCellKey = k + 1

                while (nextCellKey < 5) {
                    let nextCell = this.field[i][nextCellKey]

                    if (!nextCell.isEmpty || isLastKey(nextCellKey)) {
                        if ((nextCell.isEmpty && isLastKey(nextCellKey))
                            || nextCell.isSameTo(currentCell)) {
                            nextCell.merge(currentCell)
                            hasMoved = true
                        } else if (!nextCell.isEmpty && nextCellKey - 1 != k) {
                            this.field[i][nextCellKey - 1].merge(currentCell)
                            hasMoved = true
                        }
                        
                        break
                    }

                    nextCellKey++;
                    nextCell = this.field[i][nextCellKey]
                }
             }
        }
        
        if (hasMoved) {
            this.spawnUnit()
        }
    }

    moveLeft = () => {
        let hasMoved = false;
        
        for (let i = 0; i < 5; i++) {
             for (let k = 1; k < 5; k++) {
                let currentCell = this.field[i][k]

                if (currentCell.isEmpty) {
                    continue
                }

                let nextCellKey = k - 1

                while (nextCellKey >= 0) {
                    let nextCell = this.field[i][nextCellKey]

                    if (!nextCell.isEmpty || isFirstKey(nextCellKey)) {
                        if ((nextCell.isEmpty && isFirstKey(nextCellKey))
                            || nextCell.isSameTo(currentCell)) {
                            nextCell.merge(currentCell)
                            hasMoved = true
                        } else if (!nextCell.isEmpty && nextCellKey + 1 != k) {
                            this.field[i][nextCellKey + 1].merge(currentCell)
                            hasMoved = true
                        }
                        
                        break
                    }

                    nextCellKey--;
                    nextCell = this.field[i][nextCellKey]
                }
             }
        }
        
        if (hasMoved) {
            this.spawnUnit()
        }
    }

    moveDown = () => {
        let hasMoved = false;
        
        for (let k = 0; k < 5; k++) {
             for (let i = 3; i >= 0; i--) {
                let currentCell = this.field[i][k]

                if (currentCell.isEmpty) {
                    continue
                }

                let nextCellKey = i + 1

                while (nextCellKey < 5) {
                    let nextCell = this.field[nextCellKey][k]

                    if (!nextCell.isEmpty || isLastKey(nextCellKey)) {
                        if ((nextCell.isEmpty && isLastKey(nextCellKey))
                            || nextCell.isSameTo(currentCell)) {
                            nextCell.merge(currentCell)
                            hasMoved = true
                        } else if (!nextCell.isEmpty && nextCellKey - 1 != i) {
                            this.field[nextCellKey - 1][k].merge(currentCell)
                            hasMoved = true
                        }
                        
                        break
                    }

                    nextCellKey++;
                    nextCell = this.field[nextCellKey][k]
                }
             }
        }
        
        if (hasMoved) {
            this.spawnUnit()
        }
    }

    moveUp = () => {
        let hasMoved = false;
        
        for (let k = 0; k < 5; k++) {
             for (let i = 1; i < 5; i++) {
                let currentCell = this.field[i][k]

                if (currentCell.isEmpty) {
                    continue
                }

                let nextCellKey = i - 1

                while (nextCellKey < 5) {
                    let nextCell = this.field[nextCellKey][k]

                    if (!nextCell.isEmpty || isFirstKey(nextCellKey)) {
                        if ((nextCell.isEmpty && isFirstKey(nextCellKey))
                            || nextCell.isSameTo(currentCell)) {
                            nextCell.merge(currentCell)
                            hasMoved = true
                        } else if (!nextCell.isEmpty && nextCellKey + 1 != i) {
                            this.field[nextCellKey + 1][k].merge(currentCell)
                            hasMoved = true
                        }
                        
                        break
                    }

                    nextCellKey--;
                    nextCell = this.field[nextCellKey][k]
                }
             }
        }
        
        if (hasMoved) {
            this.spawnUnit()
        }
    }
}