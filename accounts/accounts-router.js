const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

// /api/accounts 

router.get('/', (req, res) => {
  db('accounts')
  // db.select().from('accounts')
    .then(accounts => {
      res.json(accounts)
    })
    .catch(err => {
      res.status(500).json({ message: "error retrieving accounts", err })
    })
});







module.exports = router;
