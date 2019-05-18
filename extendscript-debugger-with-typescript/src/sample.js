/// <reference types="types-for-adobe/Photoshop/2015.5" />
app.documents.add();
for (var i = 0; i < 5; i++) {
    app.activeDocument.artLayers.add();
}
