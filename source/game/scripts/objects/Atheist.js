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
    var Atheist = (function (_super) {
        __extends(Atheist, _super);
        function Atheist(canvasWidth, canvasHeight) {
            var _this = this;
            _super.call(this, Math.random() * canvasWidth, Math.random() * canvasHeight, Math.random() * Geom.Constants.MaxAtheistSize, Math.random() * Geom.Constants.MaxAtheistSize, Geom.Constants.AtheistColor);
            this._lifeMilliseconds = 0;
            var signXSpeed = Math.round((Math.random() * 10 / Math.random() * 15)) % 3;
            var signYSpeed = Math.round((Math.random() * 10 / Math.random() * 15)) % 4;
            console.log(signXSpeed, signYSpeed);
            var xSpeed = Math.random() * Geom.Constants.MaxAtheistSpeed;
            var ySpeed = Math.random() * Geom.Constants.MaxAtheistSpeed;
            this.collisionType = 2 /* Active */;
            this.dx = signXSpeed % 2 ? xSpeed : -xSpeed;
            this.dy = signYSpeed % 2 ? ySpeed : -ySpeed;
            this._health = 1;
            this.onCollidesWith('godObjects', function (actor) {
                actor._health--;
                if (!actor._health) {
                    actor.kill();
                }
                _this.die();
            });
        }
        Atheist.prototype.update = function (engine, delta) {
            this._lifeMilliseconds += delta;
            if (this.getBottom() <= 0 || this.getRight() <= 0 || this.getLeft() >= engine.getWidth() || this.getTop() >= engine.getHeight()) {
                this.kill();
            }
            else {
                this.rotation += 0.3;
            }
            _super.prototype.update.call(this, engine, delta);
        };
        return Atheist;
    })(ex.Actor);
    Geom.Atheist = Atheist;
})(Geom || (Geom = {}));
//# sourceMappingURL=Atheist.js.map