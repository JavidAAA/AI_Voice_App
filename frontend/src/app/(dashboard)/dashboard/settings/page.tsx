"use client";

import {
  RedirectToSignIn,
  SecuritySettingsCards,
  SignedIn,
  AccountSettingsCards,
} from "@daveyplate/better-auth-ui";
import { Loader2 } from "lucide-react";
import { authClient } from "~/lib/auth-client";
import { useEffect, useState } from "react";

export default function SettingPage() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkSession = async () => {
      try {
        await authClient.getSession();
      } catch (error) {
        console.error("Session check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    void checkSession();
  }, []);

   if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
          <p className="text-muted-foreground text-sm">
            Loading your settings...
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      <RedirectToSignIn />
      <SignedIn>
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent">
              Account Settings
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your account preferences and security settings
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-6">
            <AccountSettingsCards className="w-full max-w-2xl" />
            <SecuritySettingsCards className="w-full max-w-2xl" />
          </div>
        </div>
      </SignedIn>
    </>
  );
}
