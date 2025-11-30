'use server';

// app/actions/chat.ts
export async function sendChatMessage(message: string) {
  try {
    const sallaToken = process.env.SALLA_TOKEN;
    const mcpClientUrl = process.env.MCP_CLIENT_URL;
    
    if (!sallaToken) {
      throw new Error('SALLA_TOKEN is not configured');
    }

    if (!mcpClientUrl) {
      throw new Error('MCP_CLIENT_URL is not configured');
    }

    const response = await fetch(`${mcpClientUrl}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sallaToken,
      },
      body: JSON.stringify({ query: message }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Chat API error:', error);
    return { success: false, error: 'Failed to send message' };
  }
}