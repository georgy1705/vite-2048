import { createAndAppend } from "./game"

export class GameCell {
    element: HTMLElement;
    private _value: number | string;
    
    constructor(fieldElement: HTMLElement) {
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
    }

    clear = () => {
        this.value = ''
    }

    merge = (cell: any) => {
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