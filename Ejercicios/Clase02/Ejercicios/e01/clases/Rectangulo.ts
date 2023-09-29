import { Punto } from "./Punto";

export class Rectangulo {
    private _area:number;
    private _ladoDos:number;
    private _ladoUno:number;
    private _perimetro:number;
    private _vertice1:Punto;
    private _vertice2:Punto;
    private _vertice3:Punto;
    private _vertice4:Punto;

    constructor(v1:Punto, v3:Punto) {
        this._vertice1 = v1;
        this._vertice2 = new Punto(v1.GetX(), v3.GetY());
        this._vertice3 = v3;
        this._vertice4 = new Punto(v3.GetX(), v1.GetY());

        this._ladoUno = Math.abs(this._vertice3.GetX() - this._vertice1.GetX());
        this._ladoDos = Math.abs(this._vertice3.GetY() - this._vertice1.GetY());

        this._area = this._ladoUno * this._ladoDos;
        this._perimetro = 2 * (this._ladoUno + this._ladoDos);
    }

    public toString() : string {
        return `Area: ${this._area} | Lado 1: ${this._ladoUno} | Lado 2: ${this._ladoDos} | Perimetro: ${this._perimetro} | Vertice 1: ${this._vertice1} | Vertice 2: ${this._vertice2} | Vertice 3: ${this._vertice3} | Vertice 4: ${this._vertice4}`;
    }

}