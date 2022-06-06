const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.set("styles", path.join(__dirname+"/styles"));

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

const port = process.env.PORT || 3030;

app.use('/', router);
app.listen(port, () => console.log(`Server running on port ${port}`));