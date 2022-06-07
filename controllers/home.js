const path = require('path')

const HomeController = {
  Index: (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
  },
};

module.exports = HomeController;

