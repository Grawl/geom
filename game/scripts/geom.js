/// <reference path="references.d.ts"/>
/// <reference path="GameEngine.ts"/>
var Geom;
(function (Geom) {
    Geom.gameEngine;
    requirejs.config({
        baseUrl: 'scripts',
        paths: {
            vendor: '../vendor'
        },
        shim: {
            'Constants': ['vendor/excalibur-0.2.2'],
            'objects/BaseObject': ['vendor/lodash', 'Constants'],
            'objects/Temple': ['objects/BaseObject'],
            'objects/FanaticShoot': ['objects/BaseObject'],
            'objects/Fanatic': ['objects/FanaticShoot'],
            'objects/Holy': ['objects/BaseObject'],
            'objects/Atheist': ['objects/BaseObject'],
            'GeomEngine': ['objects/Temple'],
            'GameEngine': ['GeomEngine', 'objects/Fanatic', 'objects/Holy', 'objects/Atheist']
        }
    });
    require([
        'GameEngine'
    ], function () {
        Geom.gameEngine = new Geom.GameEngine();
        Geom.gameEngine.initialize();
    });
})(Geom || (Geom = {}));
//# sourceMappingURL=geom.js.map