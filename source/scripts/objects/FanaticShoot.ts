/// <reference path="../references.d.ts"/>
/// <reference path="BaseObject.ts"/>

module Geom{
    export class FanaticShoot extends Geom.BaseObject{

        constructor(startX:number, startY:number, side:ex.Side){
            super(startX, startY, 5, 5, ex.Color.fromHex('#FFFFFF'));
            this._health = 1;

            switch(side){
                case ex.Side.Left:
                    this.dx = -10;
                    break;
                case ex.Side.Right:
                    this.dx = 10;
                    break;
                case ex.Side.Top:
                    this.dy = -10;
                    break;
            }
        }
    }
}
