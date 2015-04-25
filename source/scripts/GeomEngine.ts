/// <reference path="references.d.ts"/>
/// <reference path="objects/Temple.ts"/>

module Geom{
    export class GeomEngine extends ex.Engine{
        public faith:number = 0;
        public templeLevel = 1;
        public fanaticLevel = 1;
        public holyLevel = 1;

        constructor(width, height){
            super(width,height);

            this.resetFaith();

            this.on('update', (e:ex.GameEvent)=>{
                document.getElementById("faithLabel").textContent=this.faith.toString();
            });
        }

//        update(delta:number){
//            super.update(delta);
//            document.getElementById("faithLabel").textContent=this.faith.toString();
//        }

        public resetFaith(){
            this.faith = Constants.StartFaith;
        }

        public hasTemple(){
            return _.some(this.rootScene.children, ch => ch instanceof Temple);
        }

        public getFanaticLimit(){
            // Если нет храмов, можно поставить только 3 фанатика
            if (!_.some(this.rootScene.children, ch => ch instanceof Temple))
            {
                return 3 - _.filter(this.rootScene.children, ch => ch instanceof Fanatic).length;
            }
            return _.sum(_.filter(this.rootScene.children, ch => ch instanceof Temple),
                t => t._level * 3) - _.filter(this.rootScene.children, ch => ch instanceof Fanatic);
        }

        public getHolyLimit(){
            // Если нет храмов, можно поставить только одного святого
            if (!_.some(this.rootScene.children, ch => ch instanceof Temple))
            {
                return _.some(this.rootScene.children, ch => ch instanceof Holy) ? 0 : 1;
            }
            //Округление вниз
            return Math.floor(_.sum(_.filter(this.rootScene.children, ch => ch instanceof Temple),
                t => t._level * 0.5) - _.filter(this.rootScene.children, ch => ch instanceof Holy));
        }
    }
}
