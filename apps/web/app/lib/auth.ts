import { createAuthClient } from "better-auth/react"
import { adminClient, organizationClient } from "better-auth/client/plugins"

export const auth = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    adminClient(),
    organizationClient()
  ]
})