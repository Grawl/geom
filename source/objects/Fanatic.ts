/// <reference path="../references.d.ts"/>
/// <reference path="BaseObject.ts"/>

module Geom{
    export class Fanatic extends Geom.BaseObject{

        constructor(private _level:number, startX:number, startY:number){
            super(startX, startY, Constants.FanaticStartPixels - 1.5 * _level, Constants.FanaticStartPixels - 1.5*_level);
            this.color = ex.Color.Red;
            this._health = 1;
        }

        public draw(ctx: CanvasRenderingContext2D, delta: number){
            ctx.fillStyle = this.color.toString();
            ctx.beginPath();

            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + Constants.FanaticStartPixels - 1.5*this._level, this.y);
            ctx.lineTo(this.x + (Constants.FanaticStartPixels - 1.5*this._level)/2, this.y - (Constants.FanaticStartPixels - 1.5*this._level)/2 );

            ctx.closePath();
            ctx.fill();
        }
    }
}
