const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3030;


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, () => console.log(`Server running on port ${port}`));