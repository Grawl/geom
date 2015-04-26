/// <reference path="../references.d.ts"/>
/// <reference path="BaseObject.ts"/>

module Geom{
    export class FanaticShoot extends ex.Actor{
        private _health;
        constructor(startX:number, startY:number, side:ex.Side){
            super(startX, startY, 5, 5, ex.Color.fromHex('#FFFFFF'));
            this._health = 1;

            switch(side){
                case ex.Side.Left:
                    this.dx = -Constants.FanaticShootSpeed;
                    break;
                case ex.Side.Right:
                    this.dx = Constants.FanaticShootSpeed;
                    break;
                case ex.Side.Top:
                    this.dy = -Constants.FanaticShootSpeed;
                    break;
                case ex.Side.Bottom:
                    this.dy = Constants.FanaticShootSpeed;
                    break;
            }

            this.addCollisionGroup('godObjects');
        }

        public update(engine:GeomEngine, delta:number){
            if (this.getBottom()<=0 ||
                this.getRight()<=0 ||
                this.getLeft() >= engine.getWidth()||
                this.getTop() >= engine.getHeight()
                )
            {
                this.die();
            }
            super.update(engine, delta);
        }
    }
}
