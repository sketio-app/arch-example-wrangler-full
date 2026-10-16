import { WorkflowEntrypoint, WorkerEntrypoint, DurableObject } from "cloudflare:workers"
import type { WorkflowEvent, WorkflowStep } from "cloudflare:workers"
import type { Env } from "./env"

export class Room extends DurableObject<Env> {}
export class Lock extends DurableObject<Env> {}

export class Rpc extends WorkerEntrypoint<Env> {
  async ping(): Promise<string> {
    return "pong"
  }
}

export class Flow extends WorkflowEntrypoint<Env, { id: string }> {
  async run(event: WorkflowEvent<{ id: string }>, step: WorkflowStep) {
    await step.do("touch", async () => {
      await this.env.DB.prepare("UPDATE items SET seen = 1 WHERE id = ?").bind(event.payload.id).run()
    })
  }
}

export default {
  async fetch(request, env) {
    const { success } = await env.LIMITER.limit({ key: new URL(request.url).pathname })
    if (!success) return new Response("Too many requests", { status: 429 })
    env.EVENTS.writeDataPoint({ blobs: [env.VERSION.id] })
    return env.ASSETS.fetch(request)
  },

  async scheduled(_controller, env) {
    await env.FLOW.create({ params: { id: "nightly" } })
  },

  async queue(batch, env) {
    for (const message of batch.messages) await env.CACHE.put(message.id, JSON.stringify(message.body))
  },
} satisfies ExportedHandler<Env>
