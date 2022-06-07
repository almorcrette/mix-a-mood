const express = require('express');
const path = require('path');

const app = express();

const homeRouter = require("./routes/home");
app.use("/", homeRouter);
app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, './bundle.js'))
})
app.use('/static', express.static('public'))


const port = process.env.PORT || 3030;

app.listen(port, () => console.log(`Server running on port ${port}`));