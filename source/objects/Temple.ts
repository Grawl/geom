/// <reference path="../references.d.ts"/>
/// <reference path="BaseObject.ts"/>

module Geom{
   export class Temple extends Geom.BaseObject{

       constructor(private _level:number, startX:number, startY:number){
          super(startX, startY, _level*Constants.TemplePixelsPerLevel,_level*Constants.TemplePixelsPerLevel);
          this._health = (_level - 1)* Constants.TempleHpPerLevel + Constants.TempleStartPixels;
       }
   }
}