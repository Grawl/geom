/// <reference path="references.d.ts"/>
/// <reference path="objects/Temple.ts"/>
/// <reference path="objects/Fanatic.ts"/>
/// <reference path="objects/Holy.ts"/>
var Geom;
(function (Geom) {
    var GameEngine = (function () {
        function GameEngine() {
            this._engine = new Geom.GeomEngine(800, 600, "game");
            this._engine.backgroundColor = ex.Color.fromHex('#0F0F0F');
        }
        GameEngine.prototype.initialize = function () {
            this.initializeBuildingEvents();
            this.initializeMoveEvents();
            this._engine.start();
        };
        GameEngine.prototype.run = function (functionName) {
            this._engine[functionName]();
        };
        GameEngine.prototype.restart = function () {
            this._engine.start();
            var scene = this._engine.rootScene;
            for (var i = 0; i < scene.children.length; i++) {
                scene.children[i].kill();
            }
            this._engine.reset();
        };
        GameEngine.prototype.initializeBuildingEvents = function () {
            var _this = this;
            this._engine.on('keydown', function (event) {
                switch (event.key) {
                    case 81 /* Q */:
                        _this._engine.createFanatic();
                        break;
                    case 87 /* W */:
                        _this._engine.createTemple();
                        break;
                    case 69 /* E */:
                        _this._engine.createHoly();
                        break;
                    case 67 /* C */:
                        _this.restart();
                        break;
                    case 37 /* Left */:
                        _this._engine.slower();
                        break;
                    case 39 /* Right */:
                        _this._engine.faster();
                        break;
                }
            });
        };
        GameEngine.prototype.initializeMoveEvents = function () {
        };
        return GameEngine;
    })();
    Geom.GameEngine = GameEngine;
})(Geom || (Geom = {}));
//# sourceMappingURL=GameEngine.js.map