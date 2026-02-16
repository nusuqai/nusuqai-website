"use server";

import { cookies } from "next/headers";

export async function sendChatMessage(
  message: string,
  sessionId?: string,
  file?: File
) {
  try {
    const mcpClientUrl = process.env.SALLA_MCP_CLIENT_URL;

    if (!mcpClientUrl) {
      throw new Error("MCP_CLIENT_URL is not configured");
    }

    // Read token from cookies (set by OAuth flow)
    const cookieStore = await cookies();
    const sallaToken = cookieStore.get("salla_access_token")?.value;

    if (!sallaToken) {
      // Check if we have a refresh token and try to refresh
      const refreshToken = cookieStore.get("salla_refresh_token")?.value;

      if (refreshToken) {
        return {
          success: false,
          error: "token_expired",
          message: "Your Salla token has expired. Please re-authenticate.",
        };
      }

      return {
        success: false,
        error: "not_authenticated",
        message: "Please connect to your Salla account first.",
      };
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
      sessionId: data.sessionId || sessionId,
    };
  } catch (error) {
    console.error("Chat API error:", error);
    return { success: false, error: "Failed to send message" };
  }
}