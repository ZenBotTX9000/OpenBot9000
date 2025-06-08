import { NextRequest } from 'next/server';

// This is crucial for streaming responses in Vercel
export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { messages, model, config, apiKey } = await req.json();

    if (!apiKey) {
      return new Response('API key is missing', { status: 400 });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:3000', // Replace with your domain
        'X-Title': 'OpenBot9000', // Let OpenRouter know who is making requests
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        stream: true,
        //...config // Spread the config for max_tokens etc.
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(`Error from OpenRouter: ${errorText}`, { status: response.status });
    }

    // We need to adapt the SSE stream from OpenRouter into our simple protocol.
    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        const decoder = new TextDecoder();
        const text = decoder.decode(chunk);
        
        // OpenRouter SSE format is: `data: {...}\n\n`
        const lines = text.split('\n').filter(line => line.startsWith('data: '));
        for (const line of lines) {
          const jsonString = line.substring(6);
          if (jsonString === '[DONE]') {
            controller.terminate();
            return;
          }
          try {
            const data = JSON.parse(jsonString);
            const content = data.choices[0]?.delta?.content || '';
            
            // For now, we just stream the content directly.
            // A more complex implementation would parse tool calls here
            // and prefix them with 'R:'
            if (content) {
              // Using our "D:" for data protocol
              controller.enqueue(`D:${content}`);
            }
          } catch (e) {
            // Ignore parse errors for incomplete JSON chunks
          }
        }
      },
    });

    return new Response(response.body!.pipeThrough(transformStream), {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error: any) {
    return new Response(`Internal Server Error: ${error.message}`, { status: 500 });
  }
}