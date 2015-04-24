/// <reference path="../references.d.ts"/>
/// <reference path="BaseObject.ts"/>

module Geom{
    export class Atheist extends Geom.BaseObject{

        constructor(private _level:number){
            super();
            this._health = 1;
        }
    }
}
