/// <reference path="../references.d.ts"/>
/// <reference path="BaseObject.ts"/>

module Geom{
    export class Holy extends Geom.BaseObject{

        constructor(private _level:number, startX:number, startY:number){
            super(startX, startY,
                    Constants.HolyStartPixels + (_level-1) * Constants.HolyPixelsPerLevel,
                    Constants.HolyStartPixels + (_level-1) * Constants.HolyPixelsPerLevel
            );
            this.color = Constants.HolyColor;
            this._health = Constants.HolyHpPerLevel * _level;
        }

        public draw(ctx: CanvasRenderingContext2D, delta: number){
            ctx.fillStyle = this.color.toString();
            ctx.beginPath();

            ctx.arc(this.x+this.getWidth()/2, this.y+this.getHeight()/2, 10, 0, Math.PI * 2);

            ctx.closePath();
            ctx.fill();
        }

        public update(engine:GeomEngine, delta:number){
            engine.faith+=2*this._level;
        }
    }
}

