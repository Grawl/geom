/// <reference path="../references.d.ts"/>
/// <reference path="BaseObject.ts"/>

module Geom{
   export class Temple extends Geom.BaseObject{
       _cooldown:number;


       constructor(public _level:number, startX:number, startY:number){
          super(startX, startY, (_level - 1)*Constants.TemplePixelsPerLevel+ Constants.TempleStartPixels,
                  (_level - 1)*Constants.TemplePixelsPerLevel+ Constants.TempleStartPixels);
		   this.color = Constants.TempleColor;

           this.collisionType = ex.CollisionType.Passive;
           this._health = _level * Constants.TempleHpPerLevel;

           this.resetCooldown();
           this.setRandomRotation();
           this.addCollisionGroup('godObjects');
       }

       resetCooldown(){
           this._cooldown = Constants.TempleCooldown - 6 * (this._level - 1);
       }

       public update(engine:GeomEngine, delta:number){
           this._cooldown--;
           this.color.a = this._health / (this._level * Constants.TempleHpPerLevel);

           if (!this._cooldown)
           {
               engine.faith+=5*this._level;
               this.resetCooldown();
           }
           super.update(engine, delta);
       }
   }
}
