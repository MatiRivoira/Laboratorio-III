export abstract class FiguraGeometrica {
    protected _color:string;
    protected _perimetro:number;
    protected _superficie:number;

    constructor(color:string) {
        this._color = color;
        this._perimetro = 0;
        this._superficie = 0;
        this.CalcularDatos();
    }

    public abstract CalcularDatos():void;
    
    public abstract Dibujar():string;

    public GetColor() : string {
        return this._color;
    }

    public ToString():string{
        return this._color;
    }
}