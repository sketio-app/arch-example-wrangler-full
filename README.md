# arch-example-wrangler-full

[日本語](#日本語) | [English](#english)

## 日本語

[Sketio Arch](https://arch.sketio.app) のパーサー検証用サンプルです。実際に動くアプリではなく、wrangler の設定項目をひととおり使った構成の書き方の見本です。コードは最小限です（`src/`）。

別々の Worker として、同じ項目を 2 つの書式で書いています。

- `jsonc/wrangler.jsonc`（Worker 名 `full-jsonc`）
- `toml/wrangler.toml`（Worker 名 `full-toml`）

含んでいる設定項目:

- binding: `d1_databases`、`r2_buckets`、`kv_namespaces`、`durable_objects`（自分の class と、`script_name` つきの別 Worker の class）、`services`（`entrypoint` つき。2 つの Worker が互いを指す）、`queues`（producers と consumers、`dead_letter_queue`）、`ai`、`analytics_engine_datasets`、`workflows`、`vectorize`、`hyperdrive`、`browser`、`send_email`、`images`、`version_metadata`、`ratelimits`
- 静的アセット: `assets`（`binding`、`not_found_handling`、`run_worker_first`）
- 公開の仕方: `routes`（zone のルートとカスタムドメイン）、`triggers.crons`
- `vars` と、`env.staging` ブロック（環境には何も引き継がれないので、binding を書き直している）

`database_id` や KV の `id` などの値は、見本のためのダミーです。

ライセンスは MIT です。

## English

A sample for testing the parsers of [Sketio Arch](https://arch.sketio.app). It is not a working app; it is a reference for a configuration that uses nearly every wrangler setting. The code is kept to a minimum (`src/`).

The same settings are written in two formats, as two separate Workers:

- `jsonc/wrangler.jsonc` (Worker `full-jsonc`)
- `toml/wrangler.toml` (Worker `full-toml`)

What it covers:

- Bindings: `d1_databases`, `r2_buckets`, `kv_namespaces`, `durable_objects` (a class of its own, and a class of another Worker with `script_name`), `services` (with `entrypoint`; the two Workers point at each other), `queues` (producers and consumers, `dead_letter_queue`), `ai`, `analytics_engine_datasets`, `workflows`, `vectorize`, `hyperdrive`, `browser`, `send_email`, `images`, `version_metadata`, `ratelimits`
- Static assets: `assets` (`binding`, `not_found_handling`, `run_worker_first`)
- Exposure: `routes` (a zone route and a custom domain), `triggers.crons`
- `vars`, and an `env.staging` block (nothing is inherited into an environment, so the bindings are written out again)

Values such as `database_id` and the KV `id` are dummies for the sample.

MIT licensed.
