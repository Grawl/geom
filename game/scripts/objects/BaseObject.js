/// <reference path="../references.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Geom;
(function (Geom) {
    var BaseObject = (function (_super) {
        __extends(BaseObject, _super);
        function BaseObject() {
            _super.apply(this, arguments);
        }
        BaseObject.prototype.setRandomRotation = function () {
            this.rotation = Math.random() * 13 / 3 - Math.random() * 17 / 7;
        };
        BaseObject.prototype.update = function (engine, delta) {
            var centerPoint = engine.getCenterPoint();
            if (centerPoint.x <= 50 || centerPoint.x <= engine.getWidth() - 50) {
                centerPoint.x = engine.getWidth() / 2;
            }
            if (centerPoint.y <= 50 || centerPoint.y <= engine.getHeight() - 50) {
                centerPoint.y = engine.getHeight() / 2;
            }
            var radius = Math.sqrt(Math.pow(this.x - centerPoint.x, 2) + Math.pow(this.y - centerPoint.y, 2)) * 5;
            if (radius) {
                if (Math.abs(radius - engine.getWidth()) < 100 || Math.abs(radius - engine.getHeight()) < 50 || radius >= engine.getWidth() || radius >= engine.getHeight()) {
                    radius *= 0.5;
                }
                var x = centerPoint.x + radius * Math.cos(engine.angle);
                var y = centerPoint.y + radius * Math.sin(engine.angle);
                if (x < 50 || x >= engine.getWidth() - 50 || y < 50 || y >= engine.getHeight() - 50) {
                    x = centerPoint.x + radius * Math.cos(engine.angle) * 0.3;
                    y = centerPoint.y + radius * Math.sin(engine.angle) * 0.3;
                }
                this.moveTo(x, y, engine.speed);
            }
            _super.prototype.update.call(this, engine, delta);
        };
        return BaseObject;
    })(ex.Actor);
    Geom.BaseObject = BaseObject;
})(Geom || (Geom = {}));
//# sourceMappingURL=BaseObject.js.map