/// <reference path="references.d.ts"/>
/// <reference path="objects/Temple.ts"/>

module Geom {
    export class GeomEngine extends ex.Engine {
        public faith:number = 0;
        public templeLevel = 1;
        public fanaticLevel = 1;
        public holyLevel = 1;
        private _atheistCooldown:number = 0;
        private _holyGroup:ex.Group=null;
        private _startPoint=null;

        constructor(width, height) {
            super(width, height);

            this.resetFaith();

            this.resetAtheistCooldown();

            this.on('update', e => {
                document.getElementById("faithLevel").textContent = this.faith.toFixed(2);

                if (this._atheistCooldown <= 0) {
                    this.addChild(new Atheist(this.getWidth(), this.getHeight()));
                    this.resetAtheistCooldown();
                }

                this._atheistCooldown--;
            })

            this.on('createTemple', e => this.createTemple());
            this.on('createFanatic', e => this.createFanatic());
            this.on('createHoly', e => this.createHoly());
        }

        resetAtheistCooldown() {
            // В зависимости от количества и качества фигур увеличивается количество и размер атеистов
            // Кулдаун увеличивается, чем больше фанатиков, но уменьшается, чем больше храмов и святых
            this._atheistCooldown = Constants.AtheistBaseCooldown +
                _.sum(_.filter(this.rootScene.children, ch => ch instanceof Fanatic), fn => fn._level * Constants.FanaticWeight)
                - _.sum(_.filter(this.rootScene.children, ch => ch instanceof Temple), fn => fn._level * Constants.TempleWeight)
                - _.sum(_.filter(this.rootScene.children, ch => ch instanceof Holy), fn => fn._level * Constants.HolyWeight);
        }

        changeAtheistCooldown(type:HolyObjects) {
            switch (type) {
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


        private getNextStartPoint(){
            if (!this._startPoint)
            {
                this._startPoint= new ex.Point(this.width/2,this.height/2);
                return;
            }
            // Точка, принадлежащая одной из фигур, притом находящаяся ближе к краю, чем к центру всех фигур

            // Сначала просто принадлежащая одной из фигур
            // Рандомная точка

            var children = _.filter(this.rootScene.children,
                ch => ch instanceof Temple || ch instanceof Fanatic || ch instanceof Holy
            );

            if (!children.length)
            {
                this._startPoint= new ex.Point(this.width/2,this.height/2);
                return;
            }

            var index = Math.floor(Math.random() * children.length);
            var figure = children[index];

            var signX = Math.floor(Math.random() * 17) % 2;
            var signY = Math.floor(Math.random() * 23) % 2;

            var x = signX?figure.x + Math.random()*figure.getWidth(): figure.x - Math.random()*figure.getWidth();
            var y = signY?figure.y + Math.random()*figure.getHeight(): figure.y - Math.random()*figure.getHeight();

            this._startPoint = new ex.Point(x,y);
            return;

            for(var i=this.rootScene.children.length-1;i>=0;i--){
                // Бежим от последних фигур к первой. На каждую фигуру 2 попытки


            }
        }


        createTemple() {
            this.getNextStartPoint();
            if (this.faith >= Constants.TempleFaithCost) {
                if (!this._holyGroup)
                {

                }

                this.addChild(new Temple(this.templeLevel, this._startPoint.x, this._startPoint.y));
                this.faith -= Constants.TempleFaithCost;
                this.changeAtheistCooldown(HolyObjects.Temple);
            }
        }

        createFanatic() {
            this.getNextStartPoint();
            if (this.faith >= Constants.FanaticFaithCost && this.getFanaticLimit() > 0) {
                this.addChild(new Fanatic(this.fanaticLevel, this._startPoint.x, this._startPoint.y));
                this.faith -= Constants.FanaticFaithCost;
                this.changeAtheistCooldown(HolyObjects.Fanatic);
            }
        }

        createHoly(){
            this.getNextStartPoint();
            if (this.faith>=Constants.HolyFaithCost && this.getHolyLimit() > 0)
            {
                this.addChild(new Holy(this.holyLevel, this._startPoint.x, this._startPoint.y));
                this.faith-=Constants.HolyFaithCost;
                this.changeAtheistCooldown(HolyObjects.Holy);
            }
        }

        public resetFaith() {
            this.faith = Constants.StartFaith;
        }

        public hasTemple() {
            return _.some(this.rootScene.children, ch => ch instanceof Temple);
        }

        public getFanaticLimit() {
            // Если нет храмов, можно поставить только 3 фанатика
            if (!_.some(this.rootScene.children, ch => ch instanceof Temple)) {
                return 3 - _.filter(this.rootScene.children, ch => ch instanceof Fanatic).length;
            }
            return _.sum(_.filter(this.rootScene.children, ch => ch instanceof Temple),
                t => t._level * 3) - _.filter(this.rootScene.children, ch => ch instanceof Fanatic).length;
        }

        public getHolyLimit() {
            // Если нет храмов, можно поставить только одного святого
            if (!_.some(this.rootScene.children, ch => ch instanceof Temple)) {
                return _.some(this.rootScene.children, ch => ch instanceof Holy) ? 0 : 1;
            }
            //Округление вниз
            return Math.floor(_.sum(_.filter(this.rootScene.children, ch => ch instanceof Temple),
                t => t._level * 0.5) - _.filter(this.rootScene.children, ch => ch instanceof Holy));
        }

        public getCenterPoint(){
            var children = _.filter(this.rootScene.children, c => c instanceof Temple || c instanceof Fanatic || c instanceof Holy);

            var minX = _.min(children, c => c.x);
            var minY = _.min(children, c => c.y);
            var maxX = _.max(children, c => c.x);
            var maxY = _.max(children, c => c.y);

            return new ex.Point((minX + maxX)/2,(minY+maxY)/2);
        }
    }
}
