"use strict";
/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/
/// <reference types="types-for-adobe/Photoshop/2015.5" />
function main(contents) {
    var doc = app.activeDocument;
    var folderObj = Folder.selectDialog("差し替え画像のあるフォルダを選択してください");
    // レイヤーの選択状態を上書きするためダミーのレイヤーを作る
    var dummyLayer = doc.artLayers.add();
    var rows = contents.split('\n');
    // 配列の最後の要素は改行なので削除する
    rows.pop();
    if (rows) {
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var row = rows_1[_i];
            var splited = row.split('\t');
            var layerName = splited[0];
            var fileName = splited[1];
            for (var _a = 0, _b = doc.artLayers; _a < _b.length; _a++) {
                var artLayer = _b[_a];
                if (layerName == artLayer.name) {
                    doc.activeLayer = artLayer;
                    replaceSmartObject(new File(folderObj + "/" + fileName));
                }
            }
        }
    }
    // ダミーレイヤーを削除する
    dummyLayer.remove();
}
function replaceSmartObject(newFile) {
    var idplacedLayerReplaceContents = stringIDToTypeID("placedLayerReplaceContents");
    var desc = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    desc.putPath(idnull, newFile);
    executeAction(idplacedLayerReplaceContents, desc, DialogModes.NO);
}
