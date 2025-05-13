// api/chat.js
export default async function handler(req, res) {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  // Set CORS headers for all requests (must be at the top)
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from all origins
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); // Allow POST and OPTIONS methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow Content-Type and Authorization headers

  // Handle preflight request (OPTIONS request)
  if (req.method === 'OPTIONS') {
    // Respond with status 200 to allow the OPTIONS request
    return res.status(200).end();
  }

   if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed' });
  }

  // Reject any non-POST request (after setting CORS headers)

  try {
    // Forward the POST request to the OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body), // Pass the request body from the frontend
    });

    const data = await response.json();
    res.status(response.status).json(data); // Return the response from OpenRouter API
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
