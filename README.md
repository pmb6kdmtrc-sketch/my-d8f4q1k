# 予備試験RPG - iPhoneホーム画面アプリ設定手順

## ファイル構成

```
index.html   ← ゲーム本体（これだけで動く）
manifest.json ← PWA設定
sw.js        ← オフライン対応
README.md    ← この手順書
```

## GitHub Pagesで公開する手順（無料・5分）

### 1. GitHubアカウント作成

<https://github.com> にアクセスしてアカウント作成（無料）

### 2. 新しいリポジトリを作成

- 右上の「+」→「New repository」
- Repository name: `yobi-rpg`（なんでもOK）
- **Public**を選択
- 「Create repository」をクリック

### 3. ファイルをアップロード

- 「uploading an existing file」をクリック
- `index.html`、`manifest.json`、`sw.js` を3つドラッグ＆ドロップ
- 「Commit changes」をクリック

### 4. GitHub Pagesを有効化

- リポジトリの「Settings」タブ
- 左メニュー「Pages」
- Source: 「Deploy from a branch」
- Branch: `main` / `/(root)`
- 「Save」

### 5. URLが発行される（1〜2分後）

`https://あなたのユーザー名.github.io/yobi-rpg/`

### 6. iPhoneのSafariでアクセス

1. そのURLをSafariで開く
1. 下部の共有ボタン（□↑）をタップ
1. 「ホーム画面に追加」をタップ
1. 「追加」をタップ

### 完成！

ホーム画面に⚖️アイコンが追加されます。
タップするとフルスクリーンで起動します。
データはlocalStorageに自動保存されます。