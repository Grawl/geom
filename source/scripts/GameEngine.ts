/// <reference path="references.d.ts"/>
/// <reference path="objects/Temple.ts"/>
/// <reference path="objects/Fanatic.ts"/>
/// <reference path="objects/Holy.ts"/>

module Geom{
    export class GameEngine{
        private _engine:GeomEngine;

        constructor(){
            this._engine = new GeomEngine(800, 600);
			this._engine.backgroundColor = ex.Color.fromHex('#0F0F0F');
        }

        public initialize(){
            this.initializeBuildingEvents();

            this.initializeMoveEvents();

            this._engine.start();
        }

        run(functionName:string){
            this._engine[functionName]();
        }

        private initializeBuildingEvents(){
            this._engine.on('keydown', (event:any)=>{
               switch (event.key){
                   case ex.Input.Keys.Q:
                       this._engine.createFanatic();
                       break;
                   case ex.Input.Keys.W:
                       this._engine.createTemple();
                       break;
                   case ex.Input.Keys.E:
                       this._engine.createHoly();

                       break;
                   case ex.Input.Keys.C:
                       var scene = this._engine.rootScene;

                       for(var i=0;i<scene.children.length;i++){
                           scene.children[i].die();
                       }

                       this._engine.resetFaith();
               }
            });
        }

        private initializeMoveEvents(){

        }
    }
}
