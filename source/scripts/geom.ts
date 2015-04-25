/// <reference path="references.d.ts"/>
/// <reference path="GameEngine.ts"/>

module Geom {
	export var gameEngine:GameEngine;
    requirejs.config({
        baseUrl:'scripts',
        paths:{
            vendor:'../vendor'
        },
        shim:{
           'Constants':['vendor/excalibur-0.2.2'],
           'objects/BaseObject':['vendor/lodash', 'Constants'],
           'objects/Temple':['objects/BaseObject'],

           'objects/FanaticShoot':['objects/BaseObject'],
           'objects/Fanatic':['objects/FanaticShoot'],

           'objects/Holy':['objects/BaseObject'],
           'objects/Atheist':['objects/BaseObject'],

           'GeomEngine':['objects/Temple'],
           'GameEngine':['GeomEngine','objects/Fanatic','objects/Holy', 'objects/Atheist']
        }
    });


	require([
		'GameEngine'
	], function () {
		gameEngine = new GameEngine();
		gameEngine.initialize();
	});
}


