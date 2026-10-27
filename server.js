import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// API configuration endpoint
app.get('/api/config', (req, res) => {
  res.json({
    mapsApiKey: process.env.GOOGLE_MAPS_API_KEY || ''
  });
});

// Static assets and aliases
app.use('/js', express.static(path.join(__dirname, 'examples', 'js')));
app.use('/dot_marker.png', (req, res) => res.sendFile(path.join(__dirname, 'examples', 'dot_marker.png')));
app.use(express.static(__dirname));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Hyperlapse.js server running on http://${HOST}:${PORT}`);
});
