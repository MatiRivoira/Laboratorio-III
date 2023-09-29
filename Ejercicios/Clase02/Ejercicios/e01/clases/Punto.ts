export class Punto {
    private _x:number;
    private _y:number;

    constructor(x:number, y:number) {
        this._x = x;
        this._y = y;    
    }

    public GetX() : number {
        return this._x;
    }

    public GetY() : number {
        return this._y;
    }
}