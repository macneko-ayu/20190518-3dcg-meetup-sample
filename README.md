# 20190518-3dcg-meetup-sample
2019/05/18に開催された [3DCG Meetup #15](https://3dmu.connpass.com/event/128459/) で登壇した際にデモで使ったサンプルコード。

## 概要

| ディレクトリ | 概要 |
| --- | --- |
| extendscript-debugger | `launch.json` に複数の Target Engine を設定するサンプル |
| extendscript-debugger-with-typescript | TypeScript と types-for-adobe を利用して ExtendScript を実装したサンプル |
| com.macneko.basic-extension | CC Extension Builder を利用して作成した CEP のサンプル。テーマは topcoat を選択 |
| com.macneko.GitHubRepositoriesSearcher | パネル上の二つのテキストフィールドにそれぞれ `GitHub ID` 、 `キーワード` を入力して実行すると、キーワードにマッチするリポジトリがログとしてデバッグコンソールに表示する CEP のサンプル。デバッグ方法については公式ドキュメントを参照 |
| com.macneko.GoogleSpreadSheet | Googleスプレッドシートのデータを取得して、Photoshop ドキュメントのスマートオブジェクトを置換する CEP のサンプル。実行するためには、[Node.js Quickstart](https://developers.google.com/sheets/api/quickstart/nodejs) に書いてある手順の通りに進めて、記載してあるサンプルコードを実行し、 `credentials.json` 、 `token.json` を作成したあとに、そのファイルを `com.macneko.GoogleSpreadSheet/js/json` の中に格納する必要がある |
| Demo | com.macneko.GoogleSpreadSheet のデモ用のデータ |
