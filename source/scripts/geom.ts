/// <reference path="references.d.ts"/>
/// <reference path="GameEngine.ts"/>

module Geom {
	export var gameEngine:GameEngine;

	require([
		'vendor/excalibur-0.2.2',
		'scripts/Constants',
		'scripts/objects/BaseObject',
		'scripts/objects/Temple',
		'scripts/objects/Fanatic',
		'scripts/objects/Holy',
		'scripts/GameEngine'
	], function () {
		gameEngine = new GameEngine();
		gameEngine.initialize();
	});
}


