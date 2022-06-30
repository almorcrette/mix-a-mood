const express = require('express');
const path = require('path');

// const EmotionsController = require('./controllers/emotions');
const emotionsRouter = require('./routes/emotions');

const app = express();
const port = process.env.PORT || 3030;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, './bundle.js'))
})

app.use('/emotions', emotionsRouter);

app.use('/static', express.static('public'))

app.listen(port, () => console.log(`Server running on port ${port}`));