/// <reference path="../references.d.ts"/>

module Geom{
    export class BaseObject extends ex.Actor{
        public _health:number;

        public setRandomRotation(){
            this.rotation = Math.random() * 13 / 3 - Math.random() * 17/7;
        }

        public update(engine:GeomEngine, delta:number){
            var centerPoint = engine.getCenterPoint();
            var radius = Math.sqrt(Math.pow(this.x - centerPoint.x,2) + Math.pow(this.y - centerPoint.y,2)) * 5;

            if (radius)
            {
                if (Math.abs(radius - engine.getWidth()) < 30 || Math.abs(radius - engine.getHeight()) < 30)
                {
                    radius *= 0.5;
                }

                this.moveTo(centerPoint.x + radius * Math.cos(engine.angle), centerPoint.y + radius * Math.sin(engine.angle), engine.speed);
            }

            super.update(engine, delta);
        }

        public displayHpBar(){

        }
    }
}
