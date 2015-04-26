var underscore = _.noConflict();
underscore.mixin(neume._.exports());
var neu = neume();
var sheets = null;
var chords = [
	[88, 71, 69, 67, 60],
	[88, 71, 69, 66, 60],
	[86, 71, 67, 66, 59],
	[88, 71, 67, 64, 59],
];
var famiCurve = new Float32Array(underscore.range(64).map(function (x) {
	return ((x >> 3) / 4) - 1;
}));
var synthDefs = [];
synthDefs[0] = function ($, beat, bar, index) {
	var freq = underscore(chords).chain().wrapAt(bar).at(index).midicps().value();
	return $("tri", {freq: freq})
		.$("shaper", {curve: famiCurve})
		.$("line", {start: 0.125, dur: "16n"}).on("end", $.stop)
		.$("out", {bus: 1});
};
synthDefs[1] = synthDefs[0];
synthDefs[2] = synthDefs[0];
synthDefs[3] = synthDefs[0];
synthDefs[4] = synthDefs[0];
synthDefs[5] = function ($, beat) {
	var amp = underscore.wrapAt([0.1, 0.075, 0.15, 0.05], beat);
	return $("white")
		.$("hpf", {freq: 12000, Q: 4})
		.$("xline", {start: amp, dur: "32n"}).on("end", $.stop)
		.$("out", {bus: 2});
};
synthDefs[6] = function ($, beat) {
	var amp = underscore.wrapAt([0.3, 0.1, 0.2, 0.2], beat);
	var dur = underscore.wrapAt(["2n", "8n", "4n", "8n"], beat);
	return $("pink")
		.$("shaper", {curve: 1, mul: 0.075})
		.$("lpf", {freq: 2800, Q: 8.5})
		.$("xline", {start: amp, dur: dur}).on("end", $.stop)
		.$("out", {bus: 2});
};
synthDefs[7] = function ($, beat) {
	return $([
		$("square", {freq: $("xline", {start: 60, end: 25, dur: "32n"})}),
		$("pink"),
	])
		.$("clip")
		.$("sin", {freq: 240})
		.$("lpf", {freq: 1000, Q: 0.5})
		.$("xline", {start: 0.15, dur: "8n"}).on("end", $.stop)
		.$("out", {bus: 2});
};
var master = null;
var timer = null;
function start() {
	master = neu.Synth(function ($) {
		return $([
			$("in", {bus: 1}).mul(0.125)
				.$("delay", {delay: "8nd", feedback: 0.25})
				.$("+", $("in", {bus: 1})).mul(0.75),
			$("in", {bus: 2})
		])
			.$("comp", {thresh: -18, knee: 10.5, ratio: 2.5, a: 0.05, r: 1.25});
	}).start();
	timer = neu.Interval("16n", function (e) {
		var beat = (e.count % 32);
		var bar = (e.count / 32) | 0;
		sheets[beat].forEach(function (flag, index, list) {
			if (list[index]) {
				neu.Synth(synthDefs[index], beat, bar, index).start(e.playbackTime);
			}
		});
	}).start("+0.1");
}
function stop() {
	master.stop();
	timer.stop();
}
window.onload = function () {
	"use strict";
	var $ = document.getElementById.bind(document);
	var isPlaying = false;
	function sequensor_start() {
		isPlaying = !isPlaying;
		if (isPlaying) {
			neu.start();
			start();
		} else {
			stop();
			neu.stop();
		}
	}
	sequensor_start();
	setTimeout(function () {
		randomCompose();
	}, 5 * 1000);
	//$("clear").onclick = function () {
	//	sheets = underscore.range(32).map(function () {
	//		return [0, 0, 0, 0, 0, 0, 0, 0];
	//	});
	//};
	var wrapAtCoin = function (list, index) {
		return underscore.coin(underscore.wrapAt(list, index)) ? 1 : 0;
	};
	function randomCompose() {
		sheets = underscore.range(32).map(function (i) {
			var sheet = [0, 0, 0, 0, 0, 0, 0, 0];
			if (wrapAtCoin([0.975, 0.7, 0.9, 0.7], i)) {
				sheet[5] = wrapAtCoin([0.8, 0.4, 0.6, 0.4, 0.8, 0.4, 0.6, 0.6], i);
				sheet[6] = wrapAtCoin([0.2, 0.2, 0.5, 0.4, 0.8, 0.2, 0.5, 0.4], i);
				sheet[7] = wrapAtCoin([0.8, 0.2, 0.4, 0.3, 0.4, 0.3, 0.6, 0.4], i);
				if (wrapAtCoin([0.75, 0.1, 0.25, 0.05], i)) {
					underscore.range(5).forEach(function (j) {
						sheet[j] = underscore.coin(0.5) ? 1 : 0;
					});
				} else {
					if (underscore.coin(0.75)) {
						sheet[underscore.sample(underscore.range(5))] = 1;
					}
				}
			}
			return sheet;
		});
		sheets[0][5] = 1;
		sheets[0][7] = 1;
	}
	function load(hash) {
		sheets = underscore.range(32).map(function (i) {
			return underscore.range(8).map(underscore.partial(function (num, index) {
				return num & (1 << index) ? 1 : 0;
			}, +("0x" + hash.substr(i * 2, 2))));
		});
	}
	if (/^[0-9a-f]{64}$/.test(location.hash.substr(1))) {
		load(location.hash.substr(1));
	} else {
		randomCompose();
	}
};
