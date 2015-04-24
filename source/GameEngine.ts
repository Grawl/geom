/// <reference path="references.d.ts"/>
/// <reference path="objects/Temple.ts"/>
/// <reference path="objects/Fanatic.ts"/>
/// <reference path="objects/Holy.ts"/>

module Geom{
    export class GameEngine{
        private _engine:ex.Engine;
        private _templeLevel = 1;
        private _fanaticLevel = 1;
        private _holyLevel = 1;
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
               switch (event.key){
                   case ex.InputKey.Q:
                       this._engine.addChild(new Temple(this._templeLevel, 50,50));
                       break;
                   case ex.InputKey.W:
                       this._engine.addChild(new Fanatic(this._fanaticLevel, 200,200));
                       break;
                   case ex.InputKey.E:
                       this._engine.addChild(new Holy(this._holyLevel, 300,300));
                       break;
               }
            });
        }

        private initializeMoveEvents(){

        }
    }
}
