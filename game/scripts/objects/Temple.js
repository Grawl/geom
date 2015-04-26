/// <reference path="../references.d.ts"/>
/// <reference path="BaseObject.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Geom;
(function (Geom) {
    var Temple = (function (_super) {
        __extends(Temple, _super);
        function Temple(_level, startX, startY) {
            _super.call(this, startX, startY, (_level - 1) * Geom.Constants.TemplePixelsPerLevel + Geom.Constants.TempleStartPixels, (_level - 1) * Geom.Constants.TemplePixelsPerLevel + Geom.Constants.TempleStartPixels);
            this._level = _level;
            this.color = Geom.Constants.TempleColor;
            this.collisionType = 1 /* Passive */;
            this._health = _level * Geom.Constants.TempleHpPerLevel;
            this.resetCooldown();
            this.setRandomRotation();
            this.addCollisionGroup('godObjects');
        }
        Temple.prototype.resetCooldown = function () {
            this._cooldown = Geom.Constants.TempleCooldown - 6 * (this._level - 1);
        };
        Temple.prototype.update = function (engine, delta) {
            this._cooldown--;
            this.color = new ex.Color(this.color.r, this.color.g, this.color.b, this._health / (this._level * Geom.Constants.TempleHpPerLevel));
            this.rotation += 0.005;
            //           this.color.a = ;
            if (!this._cooldown) {
                engine.faith += 5 * this._level;
                this.resetCooldown();
            }
            _super.prototype.update.call(this, engine, delta);
        };
        return Temple;
    })(Geom.BaseObject);
    Geom.Temple = Temple;
})(Geom || (Geom = {}));
//# sourceMappingURL=Temple.js.map