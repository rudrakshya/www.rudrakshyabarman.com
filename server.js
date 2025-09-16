import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequestHandler } from "@react-router/express";

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the build directory
app.use(
  express.static(path.join(__dirname, "build/client"), {
    immutable: true,
    maxAge: "1y",
  })
);

// Serve everything else from the build directory
app.use(
  express.static(path.join(__dirname, "build/client"), {
    maxAge: "1h",
  })
);

// Handle SSR requests
app.all(
  "*",
  createRequestHandler({
    build: path.join(__dirname, "build/server/index.js"),
    mode: process.env.NODE_ENV,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});