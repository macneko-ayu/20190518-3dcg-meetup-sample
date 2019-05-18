/// <reference types="types-for-adobe/Photoshop/2015.5" />

import "extendscript-es5-shim-ts";

class Main {
    static getName() {
        return app.name;
    }

    static getVersion() {
        return app.version;
    }
}

alert(Main.getName());
alert(Main.getVersion());

var array = [0, 1, 2, 3];
array.forEach(element => {
    alert(`${element}`);
});