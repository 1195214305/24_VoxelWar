interface Env {
  KV_NAMESPACE: KVNamespace
}

export async function onRequest(context: { request: Request; env: Env }): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const cache = caches.default
    const cacheKey = new Request('https://cache/leaderboard')

    if (context.request.method === 'GET') {
      const cached = await cache.match(cacheKey)
      if (cached) {
        return new Response(cached.body, {
          headers: { ...corsHeaders, 'Content-Type': 'application/json', 'X-Cache': 'HIT' },
        })
      }

      const data = await context.env.KV_NAMESPACE.get('leaderboard', 'json') || []
      const response = new Response(JSON.stringify({ leaderboard: data }), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'max-age=30' },
      })
      await cache.put(cacheKey, response.clone())

      return new Response(JSON.stringify({ leaderboard: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (context.request.method === 'POST') {
      const { name, score } = await context.request.json()
      const current = (await context.env.KV_NAMESPACE.get('leaderboard', 'json') || []) as any[]
      current.push({ name, score, time: Date.now() })
      current.sort((a, b) => b.score - a.score)
      const top10 = current.slice(0, 10)
      await context.env.KV_NAMESPACE.put('leaderboard', JSON.stringify(top10))

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  } catch (error) {
    return new Response(JSON.stringify({ error: '操作失败' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
}

export default { onRequest }
