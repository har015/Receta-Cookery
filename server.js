const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Redirect requests to the root URL to Home.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Login.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
