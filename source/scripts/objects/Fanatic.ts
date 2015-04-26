/// <reference path="../references.d.ts"/>
/// <reference path="BaseObject.ts"/>
/// <reference path="FanaticShoot.ts"/>

module Geom{
    export class Fanatic extends Geom.BaseObject{
        _secondPoint:ex.Point;
        _thirdPoint:ex.Point;
        _cooldown:number;
        _directionIsUp:boolean;


        constructor(public _level:number, startX:number, startY:number){
            super(startX, startY, Constants.FanaticStartPixels - 1.5 * _level, Constants.FanaticStartPixels - 1.5*_level, Constants.FanaticColor);
            this._health = 1;
//            this.addDrawing('triangle',this.getTriangle());

//            this.setDrawing('triangle');
//            this.setRandomRotation();
            this._directionIsUp = Math.floor(Math.random() * 100)%2 == 1;


            this.collisionType = ex.CollisionType.Passive;

            this._secondPoint = new ex.Point(this.x + Constants.FanaticStartPixels - 1.5*this._level, this.y);
            this._thirdPoint = new ex.Point(this.x + (Constants.FanaticStartPixels - 1.5*this._level)/2,
                    this._directionIsUp ?
                        this.y -(Constants.FanaticStartPixels - Constants.FanaticPixelsPerLevel*this._level)/2
                    :this.y +(Constants.FanaticStartPixels - Constants.FanaticPixelsPerLevel*this._level)/2
                );

            this.resetCooldown();
            this.addCollisionGroup('godObjects');
        }

        private resetCooldown(){
            this._cooldown = Constants.FanaticStartShootCooldownInFPS -
                Constants.FanaticShootCooldownReductionPerLevelInFPS * this._level;
        }

        private getTriangle(){
            var triangle = new ex.Polygon([
                new ex.Point(this.x, this.y),
                new ex.Point(this.x + Constants.FanaticStartPixels - 1.5*this._level, this.y),
                new ex.Point(this.x + (Constants.FanaticStartPixels - 1.5*this._level)/2, this.y - (Constants.FanaticStartPixels - 1.5*this._level)/2
//                ,new ex.Point(this.x, this.y))
                )
            ]);

            triangle.lineColor = Constants.FanaticColor;
            triangle.lineWidth = 5;
            triangle.fillColor = Constants.FanaticColor;
            triangle.filled = true;
            return triangle;
        }

        public draw(ctx: CanvasRenderingContext2D, delta: number){
            ctx.fillStyle = this.color.toString();
            this._secondPoint = new ex.Point(this.x + Constants.FanaticStartPixels - 1.5*this._level, this.y);
            this._thirdPoint = new ex.Point(this.x + (Constants.FanaticStartPixels - 1.5*this._level)/2,
                this._directionIsUp ?
                    this.y -(Constants.FanaticStartPixels - Constants.FanaticPixelsPerLevel*this._level)/2
                    :this.y +(Constants.FanaticStartPixels - Constants.FanaticPixelsPerLevel*this._level)/2
            );
            ctx.beginPath();

            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this._secondPoint.x, this._secondPoint.y);
            ctx.lineTo(this._thirdPoint.x, this._thirdPoint.y );

            ctx.closePath();
            ctx.fill();
        }

        public update(engine: GeomEngine, delta: number){
            // Проверяем, есть ли у нас свободные углы и стреляем одним из них

            super.update(engine, delta);
            // Сначала стреляем всеми свободными
            if (this._cooldown>0)
            {
                this._cooldown--;
                return;
            }

            engine.faith = parseFloat( (engine.faith + (0.3 *this._level)).toFixed(1));

            this.resetCooldown();
            if (!engine.hasTemple())
            {
                return;
            }
            // Из первой точки влево
            if (this.pointIsFree(this.x,this.y,engine.rootScene))
            {
                engine.addChild(new FanaticShoot(this.x, this.y, ex.Side.Left));
                engine.faith -= 1;
            }

            // Из второй точки вправо
            if (this.pointIsFree(this._secondPoint.x,this._secondPoint.y,engine.rootScene))
            {
                engine.addChild(new FanaticShoot(this._secondPoint.x, this._secondPoint.y, ex.Side.Right));
                engine.faith -= 1;
            }
            // Из третьей точки вверх или вниз
            if (this.pointIsFree(this._thirdPoint.x,this._thirdPoint.y,engine.rootScene))
            {
                engine.addChild(new FanaticShoot(this._thirdPoint.x, this._thirdPoint.y,
                    this._directionIsUp? ex.Side.Top : ex.Side.Bottom));
                engine.faith -= 1;
            }

            // А потом надо будет все еще и закрутить...
        }

        pointIsFree(x:number,y:number,scene:ex.Scene){
            for(var i=0;i<scene.children.length;i++){
                if (scene.children[i].contains(x,y) && scene.children[i] !== this)
                {
                    return false;
                }
            }

            return true;
        }
    }
}
