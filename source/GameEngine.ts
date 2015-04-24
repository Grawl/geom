/// <reference path="references.d.ts"/>
/// <reference path="objects/Temple.ts"/>


module Geom{
    export class GameEngine{
        private _engine:ex.Engine;
        private _templeLevel = 1;
        constructor(){
            this._engine = new ex.Engine(800, 600);
        }

        public initialize(){
            this.initializeBuildingEvents();

            this.initializeMoveEvents();

            this._engine.start();
        }

        private initializeBuildingEvents(){
            this._engine.on('keydown', (event:ex.KeyEvent)=>{
               if (event.key == ex.InputKey.Q)
               {
                   this._engine.addChild(new Temple(this._templeLevel, 50,50));
               }
            });
        }

        private initializeMoveEvents(){

        }
    }
}
