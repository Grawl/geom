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
           'objects/BaseObject':['vendor/excalibur-0.2.2'],
           'objects/Temple':['objects/BaseObject','Constants'],
           'objects/Fanatic':['objects/BaseObject','Constants'],
           'objects/Holy':['objects/BaseObject','Constants'],
           'GameEngine':['objects/Temple','objects/Fanatic','objects/Holy']
        }
    });


	require([
		'GameEngine'
	], function () {
		gameEngine = new GameEngine();
		gameEngine.initialize();
	});
}


