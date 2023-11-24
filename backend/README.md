# Development

## gqlgen

gqlgen は、GraphQL スキーマ定義言語を使用して API を定義する go ライブラリです。

gqlgen を使用して Graphql API を開発するワークフローでは：

- スキーマ（`graph/schema.graphqls`）を定義します。
- 次に、コマンドを実行してリゾルバー(`graph/schema.resolvers.go`) とその他のファイルを生成します。次のセクションで自動生成を参照できます。
- リゾルバを実装すれば準備完了です。

## 自動生成

```bash
$ go run github.com/99designs/gqlgen
```

上記のコマンドでエラーが発生した場合は、次のコマンドを試してください：

```bash
$ go get github.com/99designs/gqlgen@VERSION

$ go run github.com/99designs/gqlgen
```

VERSION を現在の gqlgen バージョンに置き換える必要があります。 `go.mod` を確認してください。 例として：`go get github.com/99designs/gqlgen@v0.17.5`。

## Reference

- [gqlgen GitHub](https://github.com/99designs/gqlgen)
- [gqlgen Doc](https://gqlgen.com/getting-started/)
