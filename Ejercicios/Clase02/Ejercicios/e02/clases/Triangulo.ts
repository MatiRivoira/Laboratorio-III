import { FiguraGeometrica } from "./FiguraGeometrica";

export class Triangulo extends FiguraGeometrica {
    private _altura:number;
    private _base:number;
    
    constructor(color:string, base:number, altura:number) {
        super(color);
        this._altura = altura;
        this._base = base;
        this.CalcularDatos();
    }

    public CalcularDatos(): void {
        this._superficie = (this._base * this._altura) / 2;
        this._perimetro = this._base + Math.sqrt(Math.pow(this._base, 2) + Math.pow(this._altura, 2)) + this._altura;
    }

    public Dibujar(): string {
        let retorno = "";
        for (let i = 0; i < this._altura; i++) {
            for (let j = 0; j < this._base  / 2 - i; j++) {
                retorno += " ";
            }
            retorno += "*";
            for (let k = 0; k < i * 2; k++) {
                retorno += "*";
            }
            retorno += "\n";
        }
        return retorno;
    }

    public ToString(): string {
        return `Color: ${super.ToString()} | Altura: ${this._altura} | Base: ${this._base} | Superficie: ${this._superficie} | Perimetro: ${this._perimetro}`;
    }
}