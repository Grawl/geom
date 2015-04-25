/// <reference path="../references.d.ts"/>

module Geom{
    export class BaseObject extends ex.Actor{
        public _health:number;

        public setRandomRotation(){
            this.rotation = Math.random() * 13 / 3 - Math.random() * 17/7;
        }

        public displayHpBar(){

        }
    }
}
