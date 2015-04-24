/// <reference path="../references.d.ts"/>
/// <reference path="BaseObject.ts"/>

module Geom{
   export class Temple extends Geom.BaseObject{

       constructor(private _level:number, startX:number, startY:number){
          super(startX, startY, (_level - 1)*Constants.TemplePixelsPerLevel+ Constants.TempleStartPixels,
                  (_level - 1)*Constants.TemplePixelsPerLevel+ Constants.TempleStartPixels);
		   this.color = Constants.TempleColor;

           this._health = _level * Constants.TempleHpPerLevel;
       }
   }
}
