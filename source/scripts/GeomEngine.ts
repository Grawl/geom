/// <reference path="references.d.ts"/>
/// <reference path="objects/Temple.ts"/>

module Geom {
    export class GeomEngine extends ex.Engine {
        public faith:number = 0;
        public templeLevel = 1;
        public fanaticLevel = 1;
        public holyLevel = 1;
        private _atheistCooldown:number = 0;

        private _startPoint=null;
        public angle = 0;
        public angleSpeed = 0.1;
        public speed = 30;

        public gameLevel = 1;

        constructor(width, height, canvasId) {
            super(width, height, canvasId);

            this.resetFaith();

            this.resetAtheistCooldown();

            this.on('update', e => {
                this.setLabelsInformation();

                if (this._atheistCooldown <= 0) {
                    this.addChild(new Atheist(this.getWidth(), this.getHeight()));
                    this.resetAtheistCooldown();
                }

                this._atheistCooldown--;
                this.angle+=this.angleSpeed;

                if (this.angle > 3.15)
                {
                    this.angle=0;
                }
            });

            this.on('createTemple', e => this.createTemple());
            this.on('createFanatic', e => this.createFanatic());
            this.on('createHoly', e => this.createHoly());
        }

        setLabelsInformation(){
            this.setText("faithLevel", this.faith.toFixed(2));

            this.setText("upgrade-FanaticCost", this.fanaticLevel * Constants.FanaticFaithUpgradeCost);
            this.setText("upgrade-TempleCost", this.templeLevel * Constants.TempleFaithUpgradeCost);
            this.setText("upgrade-HolyCost", this.holyLevel * Constants.HolyFaithUpgradeCost);

            this.setText("add-Fanatic-current_level", this.fanaticLevel);
            this.setText("add-Temple-current_level", this.templeLevel);
            this.setText("add-Holy-current_level", this.holyLevel);

            this.setText("add-FanaticCost", this.getFanaticFaithCost());
            this.setText("add-TempleCost", this.getTempleFaithCost());
            this.setText("add-HolyCost", this.getHolyFaithCost());

            this.setText("level", this.gameLevel);

            // update canvas class в зависимости от уровня игры
            document.getElementById("game").className = "level-"+this.gameLevel;

			var info = document.getElementById("info");
			while (info.firstChild) {
				info.removeChild(info.firstChild);
			}
			var length;
			// Инфа о левелах и количествах объектов.
			for(var i=1;i<=this.fanaticLevel;i++){
				length =
					_.filter(this.rootScene.children, ch => ch instanceof Fanatic && ch._level == i).length;
				if (length)
				{
					info.innerHTML+='<p>'+'Фанатики '+i+' уровня: '+ length+ '</p>';
				}
			}
			for(var i=1;i<=this.templeLevel;i++){
				length = _.filter(this.rootScene.children, ch => ch instanceof Temple && ch._level == i).length;

				if (length)
				{
					info.innerHTML+='<p>'+'Храмы '+i+' уровня: '+length+ '</p>';
				}
			}
			for(var i=1;i<=this.holyLevel;i++){
				length = _.filter(this.rootScene.children, ch => ch instanceof Holy && ch._level == i).length;
				if (length)
				{
					info.innerHTML+='<p>'+'Святые '+i+' уровня: '+length+ '</p>';
				}
			}


        }

        setText(id:string, text:any){
            document.getElementById(id).textContent = text;
        }

        resetAtheistCooldown() {
            // В зависимости от количества и качества фигур увеличивается количество и размер атеистов
            // Кулдаун увеличивается, чем больше фанатиков, но уменьшается, чем больше храмов и святых
            this._atheistCooldown = Constants.AtheistBaseCooldown +
                _.sum(_.filter(this.rootScene.children, ch => ch instanceof Fanatic), fn => fn._level * Constants.FanaticWeight)
                - _.sum(_.filter(this.rootScene.children, ch => ch instanceof Temple), fn => fn._level * Constants.TempleWeight)
                - _.sum(_.filter(this.rootScene.children, ch => ch instanceof Holy), fn => fn._level * Constants.HolyWeight);

            if (this._atheistCooldown<=0)
            {
                this._atheistCooldown=Constants.AtheistMinCooldown - this.gameLevel*Constants.AtheistMinCooldownReductionPerGameLevel;
            }

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

        public slower(){
            this.angleSpeed -= 0.3;

            if (this.speed > 10)
            {
                this.speed -= 10;
            }

            console.log(this.angleSpeed);
            console.log(this.speed);
        }
        public faster(){
            this.angleSpeed += 0.3;

            if (this.speed < 100)
            {
                this.speed += 10;
            }
            console.log(this.angleSpeed);
            console.log(this.speed);
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
            if (this.faith >= this.getTempleFaithCost()) {
                this.addChild(new Temple(this.templeLevel, this._startPoint.x, this._startPoint.y));
                this.faith -= Constants.TempleFaithCost * this.templeLevel;
                this.changeAtheistCooldown(HolyObjects.Temple);
            }
        }

		getTempleFaithCost() {
			return Constants.TempleFaithCost + Constants.TempleFaithCostPerLevel * (this.templeLevel - 1);
		}

        createFanatic() {
            this.getNextStartPoint();
            if (this.faith >= this.getFanaticFaithCost() && this.getFanaticLimit() > 0) {
                this.addChild(new Fanatic(this.fanaticLevel, this._startPoint.x, this._startPoint.y));
                this.faith -= Constants.FanaticFaithCost * this.fanaticLevel;
                this.changeAtheistCooldown(HolyObjects.Fanatic);
            }
        }

		getFanaticFaithCost() {
		return Constants.FanaticFaithCost + Constants.FanaticFaithCostPerLevel * (this.fanaticLevel-1);
	}

        createHoly(){
            this.getNextStartPoint();
            if (this.faith>=this.getHolyFaithCost()&& this.getHolyLimit() > 0)
            {
                this.addChild(new Holy(this.holyLevel, this._startPoint.x, this._startPoint.y));
                this.faith-=Constants.HolyFaithCost*this.holyLevel;
                this.changeAtheistCooldown(HolyObjects.Holy);
            }
        }

		getHolyFaithCost() {
			return Constants.HolyFaithCost + Constants.HolyFaithCostPerLevel * (this.holyLevel - 1);
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
            var children = _.filter(this.rootScene.children, c=>
            c instanceof Temple || c instanceof Fanatic || c instanceof Holy);

            var minX = _.min(children, c => c.x).x;
            var minY = _.min(children, c => c.y).y;
            var maxX = _.max(children, c => c.x).x;
            var maxY = _.max(children, c => c.y).y;

            return new ex.Point((minX + maxX)/2, (minY + maxY)/ 2);
        }

        public upgradeTemple(){
           if (this.faith>=Constants.TempleFaithUpgradeCost)
           {
               this.templeLevel++;
               this.faith-=Constants.TempleFaithUpgradeCost;
               this.changeAtheistCooldown(HolyObjects.Temple);
           }
        }

        public upgradeFanatic(){
            if (this.faith>=Constants.FanaticFaithUpgradeCost)
            {
                this.fanaticLevel++;
                this.faith-=Constants.FanaticFaithUpgradeCost;
                this.changeAtheistCooldown(HolyObjects.Fanatic);
            }
        }

        public upgradeHoly(){
            if (this.faith>=Constants.HolyFaithUpgradeCost)
            {
                this.holyLevel++;
                this.faith-=Constants.HolyFaithUpgradeCost;
                this.changeAtheistCooldown(HolyObjects.Holy);
            }
        }

    }
}
