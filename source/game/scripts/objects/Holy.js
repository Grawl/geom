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
    var Holy = (function (_super) {
        __extends(Holy, _super);
        function Holy(_level, startX, startY) {
            _super.call(this, startX, startY, Geom.Constants.HolyStartPixels + (_level - 1) * Geom.Constants.HolyPixelsPerLevel, Geom.Constants.HolyStartPixels + (_level - 1) * Geom.Constants.HolyPixelsPerLevel);
            this._level = _level;
            this.color = Geom.Constants.HolyColor;
            this.collisionType = 1 /* Passive */;
            this._health = Geom.Constants.HolyHpPerLevel * _level;
            this.resetCooldown();
            this.addCollisionGroup('godObjects');
        }
        Holy.prototype.draw = function (ctx, delta) {
            ctx.fillStyle = this.color.toString();
            ctx.beginPath();
            ctx.arc(this.x + this.getWidth() / 2, this.y + this.getHeight() / 2, 10, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        };
        Holy.prototype.resetCooldown = function () {
            this._cooldown = Geom.Constants.HolyCooldown - 6 * (this._level - 1);
        };
        Holy.prototype.update = function (engine, delta) {
            this._cooldown--;
            this.color.a = this._health / (this._level * Geom.Constants.HolyHpPerLevel);
            if (!this._cooldown) {
                engine.faith += 2 * this._level;
                this.resetCooldown();
            }
            _super.prototype.update.call(this, engine, delta);
        };
        return Holy;
    })(Geom.BaseObject);
    Geom.Holy = Holy;
})(Geom || (Geom = {}));
//# sourceMappingURL=Holy.js.map