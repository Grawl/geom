/// <reference path="../references.d.ts"/>

module Geom{
   export class Temple extends ex.Actor{
       private _health:number;

       constructor(private _level:number){
          super();
          this._health = _level * Constants.TempleHpPerLevel;
       }

       public update(engine: ex.Engine, delta: number) {
           super.update(engine, delta); // call base update logic

           if (this._health <= 0) {
               // Destroy actor
           }
       }
   }
}