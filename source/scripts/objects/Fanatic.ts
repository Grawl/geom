/// <reference path="../references.d.ts"/>
/// <reference path="BaseObject.ts"/>
/// <reference path="FanaticShoot.ts"/>

module Geom{
    export class Fanatic extends Geom.BaseObject{
        _secondPoint:ex.Point;
        _thirdPoint:ex.Point;
        _cooldown:number;

        constructor(private _level:number, startX:number, startY:number){
            super(startX, startY, Constants.FanaticStartPixels - 1.5 * _level, Constants.FanaticStartPixels - 1.5*_level);
            this.color = Constants.FanaticColor;
            this._health = 1;

            this._secondPoint = new ex.Point(this.x + Constants.FanaticStartPixels - 1.5*this._level, this.y);
            this._thirdPoint = new ex.Point(this.x + (Constants.FanaticStartPixels - 1.5*this._level)/2, this.y - (Constants.FanaticStartPixels - 1.5*this._level)/2);

            this.resetCooldown();
        }

        private resetCooldown(){
            this._cooldown = Constants.FanaticStartShootCooldownInFPS -
                Constants.FanaticShootCooldownReductionPerLevelInFPS * this._level;
        }

        public draw(ctx: CanvasRenderingContext2D, delta: number){
            ctx.fillStyle = this.color.toString();
            ctx.beginPath();

            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this._secondPoint.x, this._secondPoint.y);
            ctx.lineTo(this._thirdPoint.x, this._thirdPoint.y );

            ctx.closePath();
            ctx.fill();
        }

        public update(engine: ex.Engine, delta: number){
            // Проверяем, есть ли у нас свободные углы и стреляем одним из них

            // Сначала стреляем всеми свободными

            if (this._cooldown>0)
            {
                this._cooldown--;
                return;
            }

            // Из первой точки влево
            if (this.pointIsFree(this.x,this.y,engine.rootScene))
            {
                engine.addChild(new FanaticShoot(this.x, this.y, ex.Side.Left));
            }

            // Из второй точки вправо
            if (this.pointIsFree(this._secondPoint.x,this._secondPoint.y,engine.rootScene))
            {
                engine.addChild(new FanaticShoot(this._secondPoint.x, this._secondPoint.y, ex.Side.Right));
            }
            // Из третьей точки вверх
            if (this.pointIsFree(this._thirdPoint.x,this._thirdPoint.y,engine.rootScene))
            {
                engine.addChild(new FanaticShoot(this._thirdPoint.x, this._thirdPoint.y, ex.Side.Top));
            }

            this.resetCooldown();
            // А потом надо будет все еще и закрутить...
        }

        pointIsFree(x:number,y:number,scene:ex.Scene){
            for(var i=0;i<scene.children.length;i++){
                if (scene.children[i].contains(x,y) && scene.children[i] != this)
                {
                    return false;
                }
            }

            return true;
        }
    }
}
