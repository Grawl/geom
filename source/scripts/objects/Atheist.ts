/// <reference path="../references.d.ts"/>
/// <reference path="BaseObject.ts"/>

module Geom{
    export class Atheist extends ex.Actor{
        private _lifeMilliseconds=0;
        private _health;
        constructor(canvasWidth, canvasHeight){
            super(Math.random() * canvasWidth,
                    Math.random() * canvasHeight,
                    Math.random() * Constants.MaxAtheistSize,
                    Math.random() * Constants.MaxAtheistSize,
                Constants.AtheistColor
            );


            var signXSpeed = Math.round((Math.random() * 10 / Math.random() * 15 ))%3;
            var signYSpeed = Math.round((Math.random() * 10 / Math.random() * 15 ))%4;
            console.log(signXSpeed, signYSpeed);

            var xSpeed = Math.random() * Constants.MaxAtheistSpeed ;
            var ySpeed = Math.random() * Constants.MaxAtheistSpeed;

            this.collisionType = ex.CollisionType.Active;

            this.dx =signXSpeed %2 ? xSpeed : -xSpeed;
            this.dy =signYSpeed%2 ? ySpeed : -ySpeed;

            this._health = 1;

            this.onCollidesWith('godObjects', (actor:BaseObject) => {
                actor._health--;
                if (actor._health > 0)
                {
                   actor.displayHpBar();
                }
                else{
                    actor.kill();
                }
                this.die();
            });
        }

        public update(engine:GeomEngine, delta:number){
           this._lifeMilliseconds+=delta;
            if (this.getBottom()<=0 ||
                this.getRight()<=0 ||
                this.getLeft() >= engine.getWidth()||
                this.getTop() >= engine.getHeight()
                )
            {
                this.kill();
            }
            else
                {
                    this.rotation+=0.3;
                }


            super.update(engine, delta);
        }
    }
}
