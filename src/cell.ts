import { createAndAppend } from "./game"

export class GameCell {
    element: HTMLElement;
    game: any;
    private _value: number | string;
    
    constructor(fieldElement: HTMLElement, game: any) {
        this.game = game
        this.element = createAndAppend({
            className: 'cell',
            parent: fieldElement
        })

        if (Math.random() > 0.8) {
            this.spawn()         
        }
    }

    get value(): number | string {
        return this._value || 0
    }

    set value(value: number | string) {
        this._value = value;
        this.element.innerHTML = value === 0 ? '' : String(value)

        this.element.setAttribute("data-value", String(value))

        if (Number(value) > 2048) {
            this.element.style.color = "#DAA520";
            this.element.style.background = "#f9f6f2";
        } 
    }

    clear = () => {
        this.value = ''
    }

    merge = (cell: any) => {
        if (this.value) {
            this.game.addRating(this.value + cell.value)
        }

        this.value += cell.value

        cell.clear()
    }

    isSameTo = (cell: any) => {
        return this.value == cell.value
    }

    spawn = () => {
        this.value = Math.random() > 0.9 ? 4 : 2  
    }

    get isEmpty() {
        return this.value == 0;
    }
}