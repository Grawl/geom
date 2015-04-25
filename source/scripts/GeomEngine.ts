/// <reference path="references.d.ts"/>
/// <reference path="objects/Temple.ts"/>

module Geom{
    export class GeomEngine extends ex.Engine{
        public faith:number = 0;
        public templeLevel = 1;
        public fanaticLevel = 1;
        public holyLevel = 1;
        private _atheistCooldown:number = 0;


        constructor(width, height){
            super(width,height);

            this.resetFaith();

            this.resetAtheistCooldown();

            this.on('update',e =>{
                document.getElementById("faithLabel").textContent=this.faith.toString();

                if (this._atheistCooldown <= 0)
                {
                    this.addChild(new Atheist(this.getWidth(), this.getHeight()));
                    this.resetAtheistCooldown();
                }

                this._atheistCooldown--;
            })
        }

        resetAtheistCooldown(){
            // В зависимости от количества и качества фигур увеличивается количество и размер атеистов
            // Кулдаун увеличивается, чем больше фанатиков, но уменьшается, чем больше храмов и святых
            this._atheistCooldown = Constants.AtheistBaseCooldown +
                _.sum(_.filter(this.rootScene.children, ch => ch instanceof Fanatic), fn => fn._level * Constants.FanaticWeight)
            - _.sum(_.filter(this.rootScene.children, ch => ch instanceof Temple), fn => fn._level * Constants.TempleWeight)
            - _.sum(_.filter(this.rootScene.children, ch => ch instanceof Holy), fn => fn._level * Constants.HolyWeight);
        }

        changeAtheistCooldown(type:HolyObjects){
            switch(type){
                case HolyObjects.Temple:
                    this._atheistCooldown -= this.templeLevel * Constants.TempleWeight;
                    break;
                case HolyObjects.Fanatic:
                    this._atheistCooldown += this.fanaticLevel * Constants.FanaticWeight;
                    break;
                case HolyObjects.Holy:
                    this._atheistCooldown -= this.holyLevel * Constants.HolyWeight;
                    break;
            }
        }



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
                t => t._level * 3) - _.filter(this.rootScene.children, ch => ch instanceof Fanatic).length;
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
