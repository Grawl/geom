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
    var Miasm = (function (_super) {
        __extends(Miasm, _super);
        function Miasm() {
            _super.call(this);
            this._health = 1000;
        }
        return Miasm;
    })(Geom.BaseObject);
    Geom.Miasm = Miasm;
})(Geom || (Geom = {}));
//# sourceMappingURL=Miasm.js.map