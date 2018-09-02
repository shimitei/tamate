# tamate

お手軽ファイルリリース。

リリースファイル管理のコストが、ファイルをDropboxへアップロードするだけになります。  
Dropbox上のフォルダ・ファイル構成でWebページからアクセスすることができます。

## 機能

- フォルダ一覧の表示 
  ※現在1階層のみ対応
- 選択したフォルダのファイル一覧表示
- ファイルのダウンロード
- ファイルのプレビュー

## 技術情報

Dropbox JavaScript SDK (Dropbox API v2)をNode.jsで使用しています。  
サーバー側のNode.js + Expressにファイル一覧取得等のAPIを実装し、ブラウザ上のクライアント側JavaScriptからこれらのAPIを利用します。  
エンドユーザー側からはDropbox APIを直接利用しない、Dropboxへのアクセスをアプリ用のフォルダに限定することで公開ファイルを制限します。

## ToDo

- Bootstrap 4対応
- Node.js v10対応
- jQuery依存の削除
- SPAへ移行
- PWA対応
