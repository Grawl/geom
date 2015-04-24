/// <reference path="../references.d.ts"/>

module Geom{
    export class BaseObject extends ex.Actor{
        public _health:number;

        public update(engine: ex.Engine, delta: number) {
            super.update(engine, delta); // call base update logic

            if (this._health <= 0) {
                this.die();
            }
        }
    }
}
