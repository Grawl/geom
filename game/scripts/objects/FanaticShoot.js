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
    var FanaticShoot = (function (_super) {
        __extends(FanaticShoot, _super);
        function FanaticShoot(startX, startY, side) {
            _super.call(this, startX, startY, 5, 5, ex.Color.fromHex('#FFFFFF'));
            this._health = 1;
            switch (side) {
                case 3 /* Left */:
                    this.dx = -Geom.Constants.FanaticShootSpeed;
                    break;
                case 4 /* Right */:
                    this.dx = Geom.Constants.FanaticShootSpeed;
                    break;
                case 1 /* Top */:
                    this.dy = -Geom.Constants.FanaticShootSpeed;
                    break;
                case 2 /* Bottom */:
                    this.dy = Geom.Constants.FanaticShootSpeed;
                    break;
            }
            this.addCollisionGroup('godObjects');
        }
        FanaticShoot.prototype.update = function (engine, delta) {
            if (this.getBottom() <= 0 || this.getRight() <= 0 || this.getLeft() >= engine.getWidth() || this.getTop() >= engine.getHeight()) {
                this.die();
            }
            _super.prototype.update.call(this, engine, delta);
        };
        return FanaticShoot;
    })(ex.Actor);
    Geom.FanaticShoot = FanaticShoot;
})(Geom || (Geom = {}));
//# sourceMappingURL=FanaticShoot.js.map