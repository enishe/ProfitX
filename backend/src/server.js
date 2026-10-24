require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, (error) => {
  if (error) {
    console.error('Gabim gjatë nisjes së serverit:', error.message);
    process.exit(1);
  }
  console.log(`Serveri po punon në portin ${PORT}`);
});

server.on('error', (error) => {
  console.error('Gabim i serverit:', error.message);
});