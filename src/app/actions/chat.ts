"use server";

export async function sendChatMessage(
  message: string,
  sessionId?: string,
  file?: File
) {
  try {
    const sallaToken = process.env.SALLA_TOKEN;
    const mcpClientUrl = process.env.SALLA_MCP_CLIENT_URL;

    if (!sallaToken) {
      throw new Error("SALLA_TOKEN is not configured");
    }

    if (!mcpClientUrl) {
      throw new Error("MCP_CLIENT_URL is not configured");
    }

    const formData = new FormData();
    formData.append("query", message);
    
    if (file) {
      formData.append("file", file);
    }

    // Prepare headers
    const headers: HeadersInit = {
      Authorization: sallaToken,
    };

    if (sessionId) {
      headers["mcp-session-id"] = sessionId;
    }

    const response = await fetch(`${mcpClientUrl}/query`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    const data = await response.json();

    return { 
      success: true, 
      data,
      sessionId: data.sessionId || sessionId
    };
  } catch (error) {
    console.error("Chat API error:", error);
    return { success: false, error: "Failed to send message" };
  }
}