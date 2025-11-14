import { polarClient } from '@polar-sh/better-auth';
import { createAuthClient } from "better-auth/react";
import { env } from "process";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: env.BETTER_AUTH_URL,
  plugins: [polarClient()],
});
