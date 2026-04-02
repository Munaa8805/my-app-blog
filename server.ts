import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // API route to save countries
  app.post("/api/save-countries", (req, res) => {
    try {
      const data = req.body;
      const filePath = path.join(process.cwd(), "countries.json");
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Countries saved to ${filePath}`);
      res.json({ success: true, message: "Countries saved successfully" });
    } catch (error) {
      console.error("Error saving countries:", error);
      res.status(500).json({ success: false, message: "Failed to save countries" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
