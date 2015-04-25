/// <reference path="../references.d.ts"/>
/// <reference path="BaseObject.ts"/>

module Geom{
    export class Atheist extends Geom.BaseObject{

        constructor(canvasWidth, canvasHeight){
            var startX = Math.random() * canvasWidth;
            var startY = Math.random() * canvasHeight;

            var signXSpeed = Math.random() * 10 % 2;
            var signYSpeed = Math.random() * 10 % 2;

            var xSpeed = Math.random() * Constants.MaxAtheistSpeed ;
            var ySpeed = Math.random() * Constants.MaxAtheistSpeed;

            var width = Math.random() * Constants.MaxAtheistSize;
            var height = Math.random() * Constants.MaxAtheistSize;

            super(startX, startY, width, height, Constants.AtheistColor);

            this.collisionType = ex.CollisionType.Active;

            this.dx =signXSpeed ? xSpeed : -xSpeed;
            this.dy =signYSpeed ? ySpeed : -ySpeed;



            this._health = 1;

            this.onCollidesWith('godObjects', (actor:BaseObject) => {
                actor._health--;

                if (actor._health > 0)
                {
                   actor.displayHpBar();
                }
                this.die();
            });
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
        }
    }
}
