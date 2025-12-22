"use server";

export async function sendShopifyChatMessage(
  message: string,
  sessionId?: string
) {
  try {
    const shopifyToken = process.env.SHOPIFY_TOKEN;
    const mcpClientUrl = process.env.SHOPIFY_MCP_CLIENT_URL;
    
    if (!shopifyToken) {
      throw new Error("SHOPIFY_TOKEN is not configured");
    }

    if (!mcpClientUrl) {
      throw new Error("SHOPIFY_MCP_CLIENT_URL is not configured");
    }

    const headers: HeadersInit = {  
      Authorization: shopifyToken,
      "Content-Type": "application/json",
    };

    if (sessionId) {
      headers["mcp-session-id"] = sessionId;
    }

    const response = await fetch(`${mcpClientUrl}/query`, {
      method: "POST",
      headers,
      body: JSON.stringify({ query: message }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    const data = await response.json();

    // data should now have: { text: string, toolResults: ToolResult[], sessionId: string }
    return { 
      success: true, 
      data: {
        response: data.text,
        toolResults: data.toolResults || [],
        sessionId: data.sessionId || sessionId,
      },
      sessionId: data.sessionId || sessionId
    };
  } catch (error) {
    console.error("Shopify Chat API error:", error);
    return { success: false, error: "Failed to send message" };
  }
}