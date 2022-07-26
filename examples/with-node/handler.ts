import type { Handler } from 'vite-plugin-mix'

export const handler: Handler = async (req, res, next) => {
  // GET /api/time
  if (req.path === '/api/time') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      time: new Date().toISOString(),
      message: "Hello World, API routes with vite-plugin-mix!"
    }))

    return;
  }

  next();
}
