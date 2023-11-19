# Node.js アップグレードガイド

## Node.js のバージョン

Node.js のメジャーバージョンは、奇数が最新機能版（開発版）、偶数が安定版という分け方になっていて、
一般的に製品開発には偶数バージョンを使います。

また、Node.js には LTS ( Long Term Support ) という長期に渡ってサポート（メンテナンス）されるバージョンがあり、
特別な事情がない限りは LTS に指定されたバージョンを利用します。

Node.js のバージョンと LTS , その期間に関しては、 Node.js のリリーススケジュールを確認してください。
https://github.com/nodejs/release#release-schedule

## アップグレード方法

1. `.node-version` に記載している Node.js のバージョンをアップグレード先のバージョンに変更します。
2. `frontend/package.json` に記載している Node.js のバージョンをアップグレード先のメジャーバージョンに変更します。
   ```diff
    "engines": {
   -  "node": "~16"
   +  "node": "~18"
    },
   ```
