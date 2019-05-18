/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';
    const subModule = require(__dirname + '/js/sub.js')
    const fs = require('fs');
    const { google } = require('googleapis');
    
    const csInterface = new CSInterface();
    themeManager.init();
    
    let _spreadSheetId = '';
    let _range = '';

    $("#btn-excute").click(function () {
        validate();
        _range = $('#input-range').val();
        _spreadSheetId = extractIdFromUrl($('#input-url').val());
        if (_spreadSheetId == undefined) {
            alert('ただしいURLを入力してください');
        }
        readSpreadSheet();
    });

    $("#reload").click(function () {
        window.location.reload();
        const extPath = csInterface.getSystemPath(SystemPath.EXTENSION) + '/jsx/hostscript.jsx';
        csInterface.evalScript(`$.evalFile("${extPath}")`) 
    });

    function readSpreadSheet() {
        // Load client secrets from a local file.
        fs.readFile(__dirname + '/js/json/' + 'credentials.json', (err, content) => {
          if (err) return console.log('Error loading client secret file:', err);
          // Authorize a client with credentials, then call the Google Sheets API.
          subModule.authorize(JSON.parse(content), getList);
        });
    }
      
    /**
     * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
     */
    function getList(auth) {
        const sheets = google.sheets({version: 'v4', auth});
        sheets.spreadsheets.values.get({
            spreadsheetId: _spreadSheetId,
            range: _range,
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const rows = res.data.values;
            if (rows.length) {
                sendToExtendScript(rows);
                // rows.map((row) => {
                //     console.log(`${row[0]}`);
                // });
            } else {
                console.log('No data found.');
            }
        });
    }

    function sendToExtendScript(rows) {
        let contents = ''; 
        rows.forEach(row => {
            let rowStr = row.join('\t');
            contents += `${rowStr}\\n`
        });
        csInterface.evalScript(`main("${contents}")`);
    }

    function validate() {
        const url = $('#input-url').val();
        const range = $('#input-range').val();
        if (url.length == 0 && range.length == 0) {
            alert('URLと範囲を入力してください');
            return;
        }
        if (url.length == 0) {
            alert('URLを入力してください');
            return;
        }
        if (range.length == 0) {
            alert('範囲を入力してください');
            return;
        }
    }

    function extractIdFromUrl(url) {
        let regexp = new RegExp('/spreadsheets/d/([a-zA-Z0-9-_]+)');
        let result = regexp.exec(url);
        if (result == null) {
            return undefined;
        }
        return result[1];
    }

}());
    
