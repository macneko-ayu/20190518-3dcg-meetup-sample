/// <reference types="types-for-adobe/Photoshop/2015.5" />

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

for (i of [1, 2, 3]) {
    alert(String(i));
}