"use server";

import { cookies } from "next/headers";

// app/actions/chat.ts
export async function sendChatMessage(message: string) {
  try {
    const sallaToken = process.env.SALLA_TOKEN;
    const mcpClientUrl = process.env.MCP_CLIENT_URL;

    if (!sallaToken) {
      throw new Error("SALLA_TOKEN is not configured");
    }

    if (!mcpClientUrl) {
      throw new Error("MCP_CLIENT_URL is not configured");
    }

    // Get existing session ID from cookies
    const cookieStore = await cookies();
    const existingSessionId = cookieStore.get("mcp-session-id")?.value;

    // Prepare headers
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: sallaToken,
    };

    // Add session ID to headers if it exists
    if (existingSessionId) {
      headers["mcp-session-id"] = existingSessionId;
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

    // Store session ID in cookie if it's in the response
    if (data.sessionId) {
      cookieStore.set("mcp-session-id", data.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60, // 1 hour
      });
    }

    return { success: true, data };
  } catch (error) {
    console.error("Chat API error:", error);
    return { success: false, error: "Failed to send message" };
  }
}
