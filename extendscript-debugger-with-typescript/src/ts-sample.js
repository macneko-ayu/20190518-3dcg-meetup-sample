/// <reference types="types-for-adobe/Photoshop/2015.5" />
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.getName = function () {
        return app.name;
    };
    Main.getVersion = function () {
        return app.version;
    };
    return Main;
}());
alert(Main.getName());
alert(Main.getVersion());
for (var _i = 0, _a = [1, 2, 3]; _i < _a.length; _i++) {
    i = _a[_i];
    alert(String(i));
}
