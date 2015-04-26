/// <reference path="../references.d.ts"/>
/// <reference path="BaseObject.ts"/>
/// <reference path="FanaticShoot.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Geom;
(function (Geom) {
    var Fanatic = (function (_super) {
        __extends(Fanatic, _super);
        function Fanatic(_level, startX, startY) {
            _super.call(this, startX, startY, Geom.Constants.FanaticStartPixels - Geom.Constants.FanaticPixelsPerLevel * _level, Geom.Constants.FanaticStartPixels - Geom.Constants.FanaticPixelsPerLevel * _level, Geom.Constants.FanaticColor);
            this._level = _level;
            this._health = 1;
            //            this.addDrawing('triangle',this.getTriangle());
            //            this.setDrawing('triangle');
            //            this.setRandomRotation();
            this._directionIsUp = Math.floor(Math.random() * 100) % 2 == 1;
            this.collisionType = 1 /* Passive */;
            this._secondPoint = new ex.Point(this.x + Geom.Constants.FanaticStartPixels - Geom.Constants.FanaticPixelsPerLevel * this._level, this.y);
            this._thirdPoint = new ex.Point(this.x + (Geom.Constants.FanaticStartPixels - Geom.Constants.FanaticPixelsPerLevel * this._level) / 2, this._directionIsUp ? this.y - (Geom.Constants.FanaticStartPixels - Geom.Constants.FanaticPixelsPerLevel * this._level) / 2 : this.y + (Geom.Constants.FanaticStartPixels - Geom.Constants.FanaticPixelsPerLevel * this._level) / 2);
            this.resetCooldown();
            this.addCollisionGroup('godObjects');
        }
        Fanatic.prototype.resetCooldown = function () {
            this._cooldown = Geom.Constants.FanaticStartShootCooldownInFPS - Geom.Constants.FanaticShootCooldownReductionPerLevelInFPS * this._level;
        };
        Fanatic.prototype.getTriangle = function () {
            var triangle = new ex.Polygon([
                new ex.Point(this.x, this.y),
                new ex.Point(this.x + Geom.Constants.FanaticStartPixels - 1.5 * this._level, this.y),
                new ex.Point(this.x + (Geom.Constants.FanaticStartPixels - 1.5 * this._level) / 2, this.y - (Geom.Constants.FanaticStartPixels - 1.5 * this._level) / 2)
            ]);
            triangle.lineColor = Geom.Constants.FanaticColor;
            triangle.lineWidth = 5;
            triangle.fillColor = Geom.Constants.FanaticColor;
            triangle.filled = true;
            return triangle;
        };
        Fanatic.prototype.draw = function (ctx, delta) {
            ctx.fillStyle = this.color.toString();
            this._secondPoint = new ex.Point(this.x + Geom.Constants.FanaticStartPixels - Geom.Constants.FanaticPixelsPerLevel * this._level, this.y);
            this._thirdPoint = new ex.Point(this.x + (Geom.Constants.FanaticStartPixels - Geom.Constants.FanaticPixelsPerLevel * this._level) / 2, this._directionIsUp ? this.y - (Geom.Constants.FanaticStartPixels - Geom.Constants.FanaticPixelsPerLevel * this._level) / 2 : this.y + (Geom.Constants.FanaticStartPixels - Geom.Constants.FanaticPixelsPerLevel * this._level) / 2);
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this._secondPoint.x, this._secondPoint.y);
            ctx.lineTo(this._thirdPoint.x, this._thirdPoint.y);
            ctx.closePath();
            ctx.fill();
        };
        Fanatic.prototype.update = function (engine, delta) {
            // Проверяем, есть ли у нас свободные углы и стреляем одним из них
            _super.prototype.update.call(this, engine, delta);
            // Сначала стреляем всеми свободными
            if (this._cooldown > 0) {
                this._cooldown--;
                return;
            }
            engine.faith = parseFloat((engine.faith + (0.3 * this._level)).toFixed(1));
            this.resetCooldown();
            if (!engine.hasTemple()) {
                return;
            }
            // Из первой точки влево
            if (this.pointIsFree(this.x, this.y, engine.rootScene)) {
                engine.addChild(new Geom.FanaticShoot(this.x, this.y, 3 /* Left */));
                engine.faith -= 1;
            }
            // Из второй точки вправо
            if (this.pointIsFree(this._secondPoint.x, this._secondPoint.y, engine.rootScene)) {
                engine.addChild(new Geom.FanaticShoot(this._secondPoint.x, this._secondPoint.y, 4 /* Right */));
                engine.faith -= 1;
            }
            // Из третьей точки вверх или вниз
            if (this.pointIsFree(this._thirdPoint.x, this._thirdPoint.y, engine.rootScene)) {
                engine.addChild(new Geom.FanaticShoot(this._thirdPoint.x, this._thirdPoint.y, this._directionIsUp ? 1 /* Top */ : 2 /* Bottom */));
                engine.faith -= 1;
            }
            // А потом надо будет все еще и закрутить...
        };
        Fanatic.prototype.pointIsFree = function (x, y, scene) {
            for (var i = 0; i < scene.children.length; i++) {
                if (scene.children[i].contains(x, y) && scene.children[i] !== this) {
                    return false;
                }
            }
            return true;
        };
        return Fanatic;
    })(Geom.BaseObject);
    Geom.Fanatic = Fanatic;
})(Geom || (Geom = {}));
//# sourceMappingURL=Fanatic.js.map