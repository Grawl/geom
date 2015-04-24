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
           'objects/BaseObject':['vendor/excalibur-0.2.2','vendor/lodash'],
           'Constants':['vendor/excalibur-0.2.2'],
           'objects/Temple':['objects/BaseObject','Constants'],
           'objects/FanaticShoot':['objects/BaseObject','Constants'],
           'objects/Fanatic':['objects/FanaticShoot'],
           'objects/Holy':['objects/BaseObject','Constants'],
           'GeomEngine':['objects/Temple','Constants'],

           'GameEngine':['GeomEngine','objects/Fanatic','objects/Holy']
        }
    });


	require([
		'GameEngine'
	], function () {
		gameEngine = new GameEngine();
		gameEngine.initialize();
	});
}


