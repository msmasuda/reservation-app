# 予約管理アプリケーション

このアプリケーションは、Next.jsとSupabase (PostgreSQL) を使用して構築された予約管理システムです。

## 主な機能

*   **予約の作成 (Create):**
    *   名前、日時、人数を入力して新しい予約を作成できます。
    *   日時の入力フィールドは、現在のローカル日時が初期値として設定されます。
*   **予約の表示 (Read):**
    *   `react-big-calendar` を使用したカレンダー形式で予約を視覚的に確認できます。
    *   カレンダー上のイベントをクリックすると、その予約の詳細が表示され、編集が可能です。
*   **予約の編集 (Update):**
    *   既存の予約を選択し、名前、日時、人数を編集できます。
    *   編集はモーダルウィンドウを通じて行われ、変更はリアルタイムでデータベースに反映されます。
*   **予約の削除 (Delete):**
    *   カレンダー上のイベントをクリックして開く編集モーダル、または直接リストから予約を削除できます。

## 使用技術

*   **フレームワーク:** Next.js (App Router, TypeScript)
*   **データベース:** Supabase (PostgreSQL)
*   **ORM:** Prisma
*   **スタイリング:** Tailwind CSS
*   **カレンダーコンポーネント:** `react-big-calendar`
*   **日付ユーティリティ:** `date-fns`

## プロジェクト構造

```
reservation-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── reservations/
│   │   │   │   ├── route.ts             # 予約のGET/POST API
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts         # 特定の予約のPUT/DELETE API
│   │   │   └── globals.css              # グローバルCSS (Tailwind, react-big-calendarスタイル)
│   │   └── page.tsx                     # メインの予約管理ページ (カレンダーとフォーム)
│   ├── components/
│   │   ├── EditReservationModal.tsx     # 予約編集用モーダルコンポーネント
│   │   └── ReservationCalendar.tsx      # カレンダー表示コンポーネント
│   └── lib/
│       └── prisma.ts                    # Prisma Clientの初期化
├── prisma/
│   └── schema.prisma                    # Prismaスキーマ定義 (Reservationモデル)
├── .env                                 # 環境変数 (DATABASE_URLなど)
├── package.json                         # プロジェクトの依存関係
└── ...その他のNext.js関連ファイル
```

## セットアップと実行

1.  **リポジトリのクローン:**
    ```bash
    git clone <リポジトリURL>
    cd reservation-app
    ```
2.  **依存関係のインストール:**
    ```bash
    npm install
    ```
3.  **環境変数の設定:**
    プロジェクトルートに `.env` ファイルを作成し、SupabaseのPostgreSQLデータベースへの直接接続URLを設定します。
    ```
    DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxx.supabase.co:5432/postgres"
    ```
    `[YOUR-PASSWORD]` と `db.xxxxxxxx.supabase.co` は、ご自身のSupabaseプロジェクトの接続情報に置き換えてください。
4.  **Prismaスキーマの同期:**
    ```bash
    npx prisma db push
    ```
5.  **開発サーバーの起動:**
    ```bash
    npm run dev
    ```
    ブラウザで `http://localhost:3000` にアクセスすると、アプリケーションが表示されます。