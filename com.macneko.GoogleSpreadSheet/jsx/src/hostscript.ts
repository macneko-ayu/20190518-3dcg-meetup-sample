/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

/// <reference types="types-for-adobe/Photoshop/2015.5" />

function main(contents: string) {
    const doc = app.activeDocument;
    const folderObj = Folder.selectDialog("差し替え画像のあるフォルダを選択してください");

    // レイヤーの選択状態を上書きするためダミーのレイヤーを作る
    const dummyLayer = doc.artLayers.add();

    let rows: string[] = contents.split('\n');
    // 配列の最後の要素は改行なので削除する
    rows.pop();

    if (rows) {
        for (const row of rows) {
            const splited: string[] = row.split('\t');
            const layerName: string = splited[0];
            const fileName: string = splited[1];

            for (const artLayer of doc.artLayers) {
                if (layerName == artLayer.name) {
                    doc.activeLayer = artLayer;
                    replaceSmartObject(new File(`${folderObj}/${fileName}`));
                }
            }
        } 
    }
    // ダミーレイヤーを削除する
    dummyLayer.remove();
}

function replaceSmartObject(newFile: File) {
    const idplacedLayerReplaceContents = stringIDToTypeID( "placedLayerReplaceContents" );
    const desc = new ActionDescriptor();
    const idnull = charIDToTypeID( "null" );
    desc.putPath( idnull, newFile );
    executeAction( idplacedLayerReplaceContents, desc, DialogModes.NO );
}
