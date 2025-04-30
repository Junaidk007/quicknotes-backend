# QuickNotes Backend Proxy (for Vercel)

This backend securely forwards chat messages to OpenRouter's API.

## Setup

1. Deploy to [https://vercel.com](https://vercel.com)
2. Add an environment variable:

   - Key: `OPENROUTER_API_KEY`
   - Value: Your real API key from OpenRouter

3. Use this endpoint in your frontend:

```
fetch("https://your-vercel-project.vercel.app/api/chat", { ... })
```