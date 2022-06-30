const express = require('express');
const path = require('path');

// require EmotionsController

const app = express();
const port = process.env.PORT || 3030;


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, './bundle.js'))
})
// add a route here for GET request at /:emotion routing to EmotionsController

app.use('/static', express.static('public'))

app.listen(port, () => console.log(`Server running on port ${port}`));