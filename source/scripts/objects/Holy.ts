/// <reference path="../references.d.ts"/>
/// <reference path="BaseObject.ts"/>

module Geom{
    export class Holy extends Geom.BaseObject{
        _cooldown:number;

        constructor(public _level:number, startX:number, startY:number){
            super(startX, startY,
                    Constants.HolyStartPixels + (_level-1) * Constants.HolyPixelsPerLevel,
                    Constants.HolyStartPixels + (_level-1) * Constants.HolyPixelsPerLevel
            );
            this.color = Constants.HolyColor;
            this.collisionType = ex.CollisionType.Passive;
            this._health = Constants.HolyHpPerLevel * _level;
            this.resetCooldown();
            this.addCollisionGroup('godObjects');
        }

        public draw(ctx: CanvasRenderingContext2D, delta: number){
            ctx.fillStyle = this.color.toString();
            ctx.beginPath();

            ctx.arc(this.x+this.getWidth()/2, this.y+this.getHeight()/2, 10, 0, Math.PI * 2);

            ctx.closePath();
            ctx.fill();
        }

        resetCooldown(){
            this._cooldown = Constants.HolyCooldown - 6 * (this._level - 1);
        }

        public update(engine:GeomEngine, delta:number){
            this._cooldown--;

            this.color.a = this._health / (this._level * Constants.HolyHpPerLevel);
            if (!this._cooldown)
            {
                engine.faith+=2*this._level;
                this.resetCooldown();
            }
            super.update(engine, delta);
        }
    }
}

