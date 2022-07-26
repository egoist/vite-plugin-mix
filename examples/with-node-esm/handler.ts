import type { Handler } from 'vite-plugin-mix'
import got from "got"; // ESM is supported !

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

  // GET /api/fetch
  // Here we fetch data from the GitHub API and send it back.
  else if (req.path === '/api/fetch') {
    const data = await got("https://api.github.com/repos/egoist/vite-plugin-mix").json();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      data,
      message: "Got data from GitHub API !"
    }))

    return;
  }

  next();
}
