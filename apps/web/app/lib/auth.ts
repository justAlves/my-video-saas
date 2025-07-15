import { createAuthClient } from "better-auth/react"
import { adminClient, organizationClient } from "better-auth/client/plugins"

export const auth = createAuthClient({
  baseURL: import.meta.env.VITE_BACKEND_URL!,
  plugins: [
    adminClient(),
    organizationClient()
  ]
})