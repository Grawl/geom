/// <reference path="references.d.ts"/>
/// <reference path="objects/Temple.ts"/>

module Geom{
    export class GeomEngine extends ex.Engine{
        public faith:number = 0;

        constructor(width, height){
            super(width,height);

            this.resetFaith();
        }

        public resetFaith(){
            this.faith = Constants.StartFaith;
        }

        public hasTemple(){
            return _.some(this.rootScene.children, ch => ch instanceof Temple);
        }
    }
}
