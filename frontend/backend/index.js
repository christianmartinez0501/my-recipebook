const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies


app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});