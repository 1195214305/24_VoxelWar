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

  const url = new URL(context.request.url)
  const playerId = url.searchParams.get('id')

  try {
    if (context.request.method === 'GET') {
      if (!playerId) {
        return new Response(JSON.stringify({ error: '缺少玩家ID' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      const data = await context.env.KV_NAMESPACE.get(`save_${playerId}`, 'json')
      return new Response(JSON.stringify({ data: data || null }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (context.request.method === 'POST') {
      const { id, saveData } = await context.request.json()
      await context.env.KV_NAMESPACE.put(`save_${id}`, JSON.stringify(saveData))
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
