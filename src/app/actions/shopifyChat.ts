"use server";

import { cookies } from "next/headers";

export async function sendShopifyChatMessage(message: string) {
  try {
    const shopifyToken = process.env.SHOPIFY_TOKEN;
    const mcpClientUrl = process.env.SHOPIFY_MCP_CLIENT_URL;
    
    if (!shopifyToken) {
      throw new Error("SHOPIFY_TOKEN is not configured");
    }

    if (!mcpClientUrl) {
      throw new Error("SHOPIFY_MCP_CLIENT_URL is not configured");
    }

    const cookieStore = await cookies();
    const existingSessionId = cookieStore.get("shopify-mcp-session-id")?.value;

    const headers: HeadersInit = {
      Authorization: shopifyToken,
      "Content-Type": "application/json",
    };

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

    if (data.sessionId) {
      cookieStore.set("shopify-mcp-session-id", data.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60,
      });
    }

    return { success: true, data };
  } catch (error) {
    console.error("Shopify Chat API error:", error);
    return { success: false, error: "Failed to send message" };
  }
}