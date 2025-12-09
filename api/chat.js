// api/chat.js   ← MUST BE .js (not .ts) and in /api folder

// ←←← CHANGE ONLY THIS LINE TO YOUR REAL BACKEND URL ←←←
const REAL_BACKEND = "https://backend-1-eftt.onrender.com";   // ← change this!

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(`${REAL_BACKEND}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Chat proxy error:", error);
    res.status(500).json({ answer: "Sorry, AI is unavailable right now." });
  }
}