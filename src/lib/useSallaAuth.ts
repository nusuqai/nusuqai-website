"use client";

import { useState, useEffect, useCallback } from "react";

interface SallaAuthStatus {
  isAuthenticated: boolean;
  isLoading: boolean;
  expiresAt: string | null;
}

const SALLA_AUTH_URL = "https://accounts.salla.sa/oauth2/auth";
const CLIENT_ID = process.env.NEXT_PUBLIC_SALLA_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SALLA_REDIRECT_URI;

export function useSallaAuth() {
  const [authStatus, setAuthStatus] = useState<SallaAuthStatus>({
    isAuthenticated: false,
    isLoading: true,
    expiresAt: null,
  });

  // Check token status on mount
  const checkStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/salla/token-status");
      const data = await res.json();

      if (data.authenticated) {
        setAuthStatus({
          isAuthenticated: true,
          isLoading: false,
          expiresAt: data.expiresAt,
        });
      } else if (data.hasRefreshToken) {
        // Try to refresh
        const refreshRes = await fetch("/api/salla/refresh", { method: "POST" });
        const refreshData = await refreshRes.json();

        if (refreshData.success) {
          setAuthStatus({
            isAuthenticated: true,
            isLoading: false,
            expiresAt: refreshData.expiresAt,
          });
        } else {
          setAuthStatus({
            isAuthenticated: false,
            isLoading: false,
            expiresAt: null,
          });
        }
      } else {
        setAuthStatus({
          isAuthenticated: false,
          isLoading: false,
          expiresAt: null,
        });
      }
    } catch {
      setAuthStatus({
        isAuthenticated: false,
        isLoading: false,
        expiresAt: null,
      });
    }
  }, []);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  // Open OAuth popup
  const login = useCallback(() => {
    const state = Math.random().toString(36).substring(2, 15);
    const authUrl = `${SALLA_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI || "")}&response_type=code&scope=offline_access&state=${state}`;

    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      authUrl,
      "salla_auth",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );

    // Listen for the postMessage from the callback page
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "salla_auth_success") {
        setAuthStatus({
          isAuthenticated: true,
          isLoading: false,
          expiresAt: event.data.expiresAt || null,
        });
        window.removeEventListener("message", handleMessage);
      }
    };

    window.addEventListener("message", handleMessage);

    // Cleanup if popup is closed without completing auth
    const checkClosed = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkClosed);
        window.removeEventListener("message", handleMessage);
        // Re-check status in case cookies were set
        checkStatus();
      }
    }, 500);
  }, [checkStatus]);

  // Logout
  const logout = useCallback(async () => {
    try {
      await fetch("/api/salla/logout", { method: "POST" });
    } catch {
      // Continue even if request fails
    }
    setAuthStatus({
      isAuthenticated: false,
      isLoading: false,
      expiresAt: null,
    });
  }, []);

  return {
    ...authStatus,
    login,
    logout,
    refreshStatus: checkStatus,
  };
}
