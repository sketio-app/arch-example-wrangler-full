import type { Rpc } from "./index"

export interface Env {
  DB: D1Database
  BUCKET: R2Bucket
  CACHE: KVNamespace
  ROOM: DurableObjectNamespace
  LOCK: DurableObjectNamespace
  RPC: Service<Rpc>
  JOBS: Queue
  AI: Ai
  EVENTS: AnalyticsEngineDataset
  FLOW: Workflow
  INDEX: VectorizeIndex
  HYPERDRIVE: Hyperdrive
  BROWSER: Fetcher
  MAILER: SendEmail
  IMAGES: ImagesBinding
  VERSION: WorkerVersionMetadata
  LIMITER: RateLimit
  ASSETS: Fetcher
}
