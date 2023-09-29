import {FiguraGeometrica} from "./FiguraGeometrica";

export class Rectangulo extends FiguraGeometrica {
    protected _ladoUno:number;
    protected _ladoDos:number;

    constructor(color:string, l1:number, l2:number) {
        super(color);
        this._ladoUno = l1;
        this._ladoDos = l2;
    }

    public CalcularDatos(): void {
        this._superficie = this._ladoUno * this._ladoDos;
        this._perimetro = 2 * (this._ladoUno + this._ladoDos);
    }

    public Dibujar(): string {
        let retorno = "";
        for (let j = 0; j < this._ladoUno; j++) {
            for (let i = 0; i < this._ladoDos; i++) {
                retorno += "*";
            }
            retorno += "\n";
        }
        return retorno;
    }

    public ToString(): string {
        return `Color: ${super.ToString()} | Lado 1: ${this._ladoUno} | Lado 2: ${this._ladoDos}`;
    }
}