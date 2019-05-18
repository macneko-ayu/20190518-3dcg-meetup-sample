/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';

    const csInterface = new CSInterface();
    themeManager.init();
    
    function getRepositories(userId, keyword) {
        let request;
        try {
            request = require('request');
        } catch(err) {
            alert(err);
            return;
        }

        const option = {
            url: `https://api.github.com/users/${userId}/repos`,
            meyhod: 'GET',
            headers: {
                'User-Agent': 'GitHubRepositoriesSearcher'
            },
            json: true
        }

        request(option, function (error, response, body) {
            if (keyword.length > 0) {
                console.log(body.filter(function(item) {
                    return new RegExp(keyword, 'i').test(item.name);
                }));
            } else {
                console.log(body);
            }
        });
    }

    $("#btn-excute").click(function () {
        const userId = $('#input-user-id').val();
        const keyword = $('#input-search-keyword').val();
        if (userId.length == 0) {
            alert('ユーザーIDを入力してください');
            return;
        }
        getRepositories(userId, keyword);
    });

    $("#reload").click(function () {
        window.location.reload();
        const extPath = csInterface.getSystemPath(SystemPath.EXTENSION) + '/jsx/hostscript.jsx';
        csInterface.evalScript(`$.evalFile("${extPath}")`) 
    });
}());
    
