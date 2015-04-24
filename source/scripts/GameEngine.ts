/// <reference path="references.d.ts"/>
/// <reference path="objects/Temple.ts"/>
/// <reference path="objects/Fanatic.ts"/>
/// <reference path="objects/Holy.ts"/>

module Geom{
    export class GameEngine{
        private _engine:GeomEngine;
        private _templeLevel = 1;
        private _fanaticLevel = 1;
        private _holyLevel = 1;
        private _startPoint=null;

        constructor(){
            this._engine = new GeomEngine(800, 600);
			this._engine.backgroundColor = ex.Color.fromHex('#000000');
        }

        public initialize(){
            this.initializeBuildingEvents();

            this.initializeMoveEvents();

            this._engine.start();
        }

        private getNextStartPoint(){
            if (!this._startPoint)
            {
                this._startPoint= new ex.Point(this._engine.width/2,this._engine.height/2);
                return;
            }
            // Точка, принадлежащая одной из фигур, притом находящаяся ближе к краю, чем к центру всех фигур

            // Сначала просто принадлежащая одной из фигур
            // Рандомная точка

            var children = _.filter(this._engine.rootScene.children,
                ch => ch instanceof Temple || ch instanceof Fanatic || ch instanceof Holy
            );

            var index = Math.floor(Math.random() * children.length);
            var figure = children[index];

            var signX = Math.random() * 10 % 2;
            var signY = Math.random() * 10 % 2;

            var x = signX?figure.x + Math.random()*figure.getWidth(): figure.x - Math.random()*figure.getWidth();
            var y = signY?figure.y + Math.random()*figure.getHeight(): figure.y - Math.random()*figure.getHeight();

            this._startPoint = new ex.Point(x,y);
            return;

            for(var i=this._engine.rootScene.children.length-1;i>=0;i--){
                // Бежим от последних фигур к первой. На каждую фигуру 2 попытки


            }
        }

        private initializeBuildingEvents(){
            this._engine.on('keydown', (event:any)=>{
               this.getNextStartPoint();

               switch (event.key){
                   case ex.InputKey.Q:
                       this._engine.addChild(new Temple(this._templeLevel, this._startPoint.x, this._startPoint.y));
                       break;
                   case ex.InputKey.W:
                       this._engine.addChild(new Fanatic(this._fanaticLevel, this._startPoint.x, this._startPoint.y));
                       break;
                   case ex.InputKey.E:
                       this._engine.addChild(new Holy(this._holyLevel, this._startPoint.x, this._startPoint.y));
                       break;
                   case ex.InputKey.C:
                       var scene = this._engine.rootScene;

                       for(var i=0;i<scene.children.length;i++){
                           scene.children[i].die();
                       }

                       this._startPoint = null;
               }
            });
        }

        private initializeMoveEvents(){

        }
    }
}
