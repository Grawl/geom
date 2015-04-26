/// <reference path="references.d.ts"/>
/// <reference path="objects/Temple.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Geom;
(function (Geom) {
    var GeomEngine = (function (_super) {
        __extends(GeomEngine, _super);
        function GeomEngine(width, height, canvasId) {
            var _this = this;
            _super.call(this, width, height, canvasId);
            this.faith = 0;
            this.templeLevel = 1;
            this.fanaticLevel = 1;
            this.holyLevel = 1;
            this._atheistCooldown = 0;
            this._raidCooldown = 0;
            this._startPoint = null;
            this.angle = 0;
            this.angleSpeed = 0.1;
            this.speed = 30;
            this.gameLevel = 1;
            this.reset();
            this.on('update', function (e) {
                _this.setLabelsInformation();
                if (_this.checkLoseConditions()) {
                    for (var i = 0; i < _this.rootScene.children.length; i++) {
                        _this.rootScene.children[i].kill();
                    }
                    _this.showLoseLabel();
                }
                if (_this.getFaithGoal() - _this.faith <= 0) {
                    document.getElementById("level-up-game").className = "";
                }
                else {
                    document.getElementById("level-up-game").className = "hidden";
                }
                if (_this.checkWinConditions()) {
                    _this.stop();
                    _this.showWinLabel();
                }
                // Набег может происходить не чаще чем раз в 10 секунд
                if (_this.checkRaidConditions()) {
                    console.log('raid');
                    _this._raidCooldown--;
                    if (_this._raidCooldown <= 0) {
                        for (var i = 0; i < Geom.Constants.RaidAtheistCountPerLevel * _this.gameLevel; i++) {
                            _this.addChild(new Geom.Atheist(_this.getWidth(), _this.getHeight()));
                        }
                        _this._raidCooldown = Geom.Constants.RaidCooldown - (_this.gameLevel - 1) * Geom.Constants.RaidCooldownReductionPerLevel;
                    }
                }
                if (_this._atheistCooldown <= 0) {
                    _this.addChild(new Geom.Atheist(_this.getWidth(), _this.getHeight()));
                    _this.resetAtheistCooldown();
                }
                _this._atheistCooldown--;
                _this.angle += _this.angleSpeed;
                if (_this.angle > 3.15) {
                    _this.angle = 0;
                }
            });
            this.on('createTemple', function (e) { return _this.createTemple(); });
            this.on('createFanatic', function (e) { return _this.createFanatic(); });
            this.on('createHoly', function (e) { return _this.createHoly(); });
        }
        GeomEngine.prototype.showLoseLabel = function () {
            document.getElementById("restart").className = "";
        };
        GeomEngine.prototype.showWinLabel = function () {
        };
        GeomEngine.prototype.checkLoseConditions = function () {
            // Если количество веры упало ниже нуля, то проигрыш
            if (this.faith < 0) {
                return true;
            }
            // Если денег не хватает ни на одну из фигур, и фигур на поле нет, то проигрыш
            var holyLength = _.filter(this.rootScene.children, function (ch) { return ch instanceof Geom.Temple || ch instanceof Geom.Fanatic || ch instanceof Geom.Holy; }).length;
            if (holyLength) {
                return false;
            }
            return this.faith < this.getFanaticFaithCost() && this.faith < this.getTempleFaithCost() && this.faith < this.getHolyFaithCost();
        };
        GeomEngine.prototype.checkWinConditions = function () {
            return this.gameLevel == 7;
        };
        GeomEngine.prototype.setLabelsInformation = function () {
            this.setText("faithLevel", this.faith.toFixed(2));
            var goal = (this.getFaithGoal() - this.faith);
            this.setText("faithGoal", goal < 0 ? 0 : (this.getFaithGoal() - this.faith).toFixed(2));
            this.setText("upgrade-FanaticCost", this.fanaticLevel * Geom.Constants.FanaticFaithUpgradeCost);
            this.setText("upgrade-TempleCost", this.templeLevel * Geom.Constants.TempleFaithUpgradeCost);
            this.setText("upgrade-HolyCost", this.holyLevel * Geom.Constants.HolyFaithUpgradeCost);
            this.setText("add-Fanatic-current_level", this.fanaticLevel);
            this.setText("add-Temple-current_level", this.templeLevel);
            this.setText("add-Holy-current_level", this.holyLevel);
            this.setText("add-FanaticCost", this.getFanaticFaithCost());
            this.setText("add-TempleCost", this.getTempleFaithCost());
            this.setText("add-HolyCost", this.getHolyFaithCost());
            this.setText("level", this.gameLevel);
            // update canvas class в зависимости от уровня игры
            document.getElementById("game").className = "level-" + this.gameLevel;
            var info = document.getElementById("info");
            while (info.firstChild) {
                info.removeChild(info.firstChild);
            }
            var length;
            for (var i = 1; i <= this.fanaticLevel; i++) {
                length = _.filter(this.rootScene.children, function (ch) { return ch instanceof Geom.Fanatic && ch._level == i; }).length;
                if (length) {
                    info.innerHTML += '<p>' + 'Фанатики ' + i + ' уровня: ' + length + '</p>';
                }
            }
            for (var i = 1; i <= this.templeLevel; i++) {
                length = _.filter(this.rootScene.children, function (ch) { return ch instanceof Geom.Temple && ch._level == i; }).length;
                if (length) {
                    info.innerHTML += '<p>' + 'Храмы ' + i + ' уровня: ' + length + '</p>';
                }
            }
            for (var i = 1; i <= this.holyLevel; i++) {
                length = _.filter(this.rootScene.children, function (ch) { return ch instanceof Geom.Holy && ch._level == i; }).length;
                if (length) {
                    info.innerHTML += '<p>' + 'Святые ' + i + ' уровня: ' + length + '</p>';
                }
            }
        };
        GeomEngine.prototype.getFaithGoal = function () {
            return Math.floor(Geom.Constants.StartFaithGoal * Math.exp(this.gameLevel - 1));
        };
        GeomEngine.prototype.nextLevel = function () {
            if (this.faith >= this.getFaithGoal()) {
                this.faith -= this.getFaithGoal();
                this.gameLevel++;
            }
        };
        GeomEngine.prototype.setText = function (id, text) {
            document.getElementById(id).textContent = text;
        };
        GeomEngine.prototype.resetAtheistCooldown = function () {
            // В зависимости от количества и качества фигур увеличивается количество и размер атеистов
            // Кулдаун увеличивается, чем больше фанатиков, но уменьшается, чем больше храмов и святых
            this._atheistCooldown = Geom.Constants.AtheistBaseCooldown + _.sum(_.filter(this.rootScene.children, function (ch) { return ch instanceof Geom.Fanatic; }), function (fn) { return fn._level * Geom.Constants.FanaticWeight; }) - _.sum(_.filter(this.rootScene.children, function (ch) { return ch instanceof Geom.Temple; }), function (fn) { return fn._level * Geom.Constants.TempleWeight; }) - _.sum(_.filter(this.rootScene.children, function (ch) { return ch instanceof Geom.Holy; }), function (fn) { return fn._level * Geom.Constants.HolyWeight; });
            if (this._atheistCooldown <= 0) {
                this._atheistCooldown = Geom.Constants.AtheistMinCooldown - this.gameLevel * Geom.Constants.AtheistMinCooldownReductionPerGameLevel;
            }
        };
        GeomEngine.prototype.checkRaidConditions = function () {
            var templeLength = _.filter(this.rootScene.children, function (ch) { return ch instanceof Geom.Temple; }).length;
            var fanaticLength = _.filter(this.rootScene.children, function (ch) { return ch instanceof Geom.Fanatic; }).length;
            var holyLength = _.filter(this.rootScene.children, function (ch) { return ch instanceof Geom.Holy; }).length;
            if (templeLength > 2 && fanaticLength / templeLength < 0.5) {
                return true;
            }
            return templeLength > 4 && holyLength / templeLength < 0.25;
            // Если не сбалансировано количество фанатиков-храмов-святых, то происходит набег (обнуление кулдауна)
            // Условия следующие:
            // 1. 1 фанатик на 2 храма
            // 2. 1 святой на 4 храма
            // 3. появляется 10 * уровень игры атеистов
            // 4.
        };
        GeomEngine.prototype.changeAtheistCooldown = function (type) {
            switch (type) {
                case 0 /* Temple */:
                    this._atheistCooldown -= this.templeLevel * Geom.Constants.TempleWeight;
                    break;
                case 1 /* Fanatic */:
                    this._atheistCooldown += this.fanaticLevel * Geom.Constants.FanaticWeight;
                    break;
                case 2 /* Holy */:
                    this._atheistCooldown -= this.holyLevel * Geom.Constants.HolyWeight;
                    break;
            }
        };
        GeomEngine.prototype.slower = function () {
            this.angleSpeed -= 0.3;
            if (this.speed > 10) {
                this.speed -= 10;
            }
            console.log(this.angleSpeed);
            console.log(this.speed);
        };
        GeomEngine.prototype.faster = function () {
            this.angleSpeed += 0.3;
            if (this.speed < 100) {
                this.speed += 10;
            }
            console.log(this.angleSpeed);
            console.log(this.speed);
        };
        GeomEngine.prototype.getNextStartPoint = function () {
            if (!this._startPoint) {
                this._startPoint = new ex.Point(this.width / 2, this.height / 2);
                return;
            }
            // Точка, принадлежащая одной из фигур, притом находящаяся ближе к краю, чем к центру всех фигур
            // Сначала просто принадлежащая одной из фигур
            // Рандомная точка
            var children = _.filter(this.rootScene.children, function (ch) { return ch instanceof Geom.Temple || ch instanceof Geom.Fanatic || ch instanceof Geom.Holy; });
            if (!children.length) {
                this._startPoint = new ex.Point(this.width / 2, this.height / 2);
                return;
            }
            var index = Math.floor(Math.random() * children.length);
            var figure = children[index];
            var signX = Math.floor(Math.random() * 17) % 2;
            var signY = Math.floor(Math.random() * 23) % 2;
            var x = signX ? figure.x + Math.random() * figure.getWidth() : figure.x - Math.random() * figure.getWidth();
            var y = signY ? figure.y + Math.random() * figure.getHeight() : figure.y - Math.random() * figure.getHeight();
            this._startPoint = new ex.Point(x, y);
            return;
            for (var i = this.rootScene.children.length - 1; i >= 0; i--) {
            }
        };
        GeomEngine.prototype.createTemple = function () {
            this.getNextStartPoint();
            if (this.faith >= this.getTempleFaithCost()) {
                this.addChild(new Geom.Temple(this.templeLevel, this._startPoint.x, this._startPoint.y));
                this.faith -= Geom.Constants.TempleFaithCost * this.templeLevel;
                this.changeAtheistCooldown(0 /* Temple */);
            }
        };
        GeomEngine.prototype.getTempleFaithCost = function () {
            return Geom.Constants.TempleFaithCost + Geom.Constants.TempleFaithCostPerLevel * (this.templeLevel - 1);
        };
        GeomEngine.prototype.createFanatic = function () {
            this.getNextStartPoint();
            if (this.faith >= this.getFanaticFaithCost() && this.getFanaticLimit() > 0) {
                this.addChild(new Geom.Fanatic(this.fanaticLevel, this._startPoint.x, this._startPoint.y));
                this.faith -= Geom.Constants.FanaticFaithCost * this.fanaticLevel;
                this.changeAtheistCooldown(1 /* Fanatic */);
            }
        };
        GeomEngine.prototype.getFanaticFaithCost = function () {
            return Geom.Constants.FanaticFaithCost + Geom.Constants.FanaticFaithCostPerLevel * (this.fanaticLevel - 1);
        };
        GeomEngine.prototype.createHoly = function () {
            this.getNextStartPoint();
            if (this.faith >= this.getHolyFaithCost() && this.getHolyLimit() > 0) {
                this.addChild(new Geom.Holy(this.holyLevel, this._startPoint.x, this._startPoint.y));
                this.faith -= Geom.Constants.HolyFaithCost * this.holyLevel;
                this.changeAtheistCooldown(2 /* Holy */);
            }
        };
        GeomEngine.prototype.getHolyFaithCost = function () {
            return Geom.Constants.HolyFaithCost + Geom.Constants.HolyFaithCostPerLevel * (this.holyLevel - 1);
        };
        GeomEngine.prototype.reset = function () {
            document.getElementById("restart").className = "hidden";
            this.faith = Geom.Constants.StartFaith;
            this.templeLevel = 1;
            this.fanaticLevel = 1;
            this.holyLevel = 1;
            this._atheistCooldown = 0;
            this._raidCooldown = 0;
            this._startPoint = null;
            this.angle = 0;
            this.angleSpeed = 0.1;
            this.speed = 30;
            this.gameLevel = 1;
            this.resetAtheistCooldown();
            this.createTemple();
            this.createFanatic();
        };
        GeomEngine.prototype.hasTemple = function () {
            return _.some(this.rootScene.children, function (ch) { return ch instanceof Geom.Temple; });
        };
        GeomEngine.prototype.getFanaticLimit = function () {
            // Если нет храмов, можно поставить только 3 фанатика
            if (!_.some(this.rootScene.children, function (ch) { return ch instanceof Geom.Temple; })) {
                return 3 - _.filter(this.rootScene.children, function (ch) { return ch instanceof Geom.Fanatic; }).length;
            }
            return _.sum(_.filter(this.rootScene.children, function (ch) { return ch instanceof Geom.Temple; }), function (t) { return t._level * 3; }) - _.filter(this.rootScene.children, function (ch) { return ch instanceof Geom.Fanatic; }).length;
        };
        GeomEngine.prototype.getHolyLimit = function () {
            // Если нет храмов, можно поставить только одного святого
            if (!_.some(this.rootScene.children, function (ch) { return ch instanceof Geom.Temple; })) {
                return _.some(this.rootScene.children, function (ch) { return ch instanceof Geom.Holy; }) ? 0 : 1;
            }
            //Округление вниз
            return Math.floor(_.sum(_.filter(this.rootScene.children, function (ch) { return ch instanceof Geom.Temple; }), function (t) { return t._level * 0.5; }) - _.filter(this.rootScene.children, function (ch) { return ch instanceof Geom.Holy; }));
        };
        GeomEngine.prototype.getCenterPoint = function () {
            var children = _.filter(this.rootScene.children, function (c) { return c instanceof Geom.Temple || c instanceof Geom.Fanatic || c instanceof Geom.Holy; });
            var minX = _.min(children, function (c) { return c.x; }).x;
            var minY = _.min(children, function (c) { return c.y; }).y;
            var maxX = _.max(children, function (c) { return c.x; }).x;
            var maxY = _.max(children, function (c) { return c.y; }).y;
            return new ex.Point((minX + maxX) / 2, (minY + maxY) / 2);
        };
        GeomEngine.prototype.upgradeTemple = function () {
            if (this.faith >= Geom.Constants.TempleFaithUpgradeCost) {
                this.templeLevel++;
                this.faith -= Geom.Constants.TempleFaithUpgradeCost;
                this.changeAtheistCooldown(0 /* Temple */);
            }
        };
        GeomEngine.prototype.upgradeFanatic = function () {
            if (this.faith >= Geom.Constants.FanaticFaithUpgradeCost) {
                this.fanaticLevel++;
                this.faith -= Geom.Constants.FanaticFaithUpgradeCost;
                this.changeAtheistCooldown(1 /* Fanatic */);
            }
        };
        GeomEngine.prototype.upgradeHoly = function () {
            if (this.faith >= Geom.Constants.HolyFaithUpgradeCost) {
                this.holyLevel++;
                this.faith -= Geom.Constants.HolyFaithUpgradeCost;
                this.changeAtheistCooldown(2 /* Holy */);
            }
        };
        return GeomEngine;
    })(ex.Engine);
    Geom.GeomEngine = GeomEngine;
})(Geom || (Geom = {}));
//# sourceMappingURL=GeomEngine.js.map