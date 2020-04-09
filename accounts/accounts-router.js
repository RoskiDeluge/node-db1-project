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

router.get('/:id', (req, res) => {

  db.select()
    .from('accounts')
    .where({ id: req.params.id })
    .then(account => {
      if (account) {
        res.status(200).json(account)
      } else {
        res.status(400).json({ message: "error retrieving account" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "database error", err })
    })
});

router.post('/', (req, res) => {
  const accountData = req.body;

  db('accounts')
  .insert(accountData)
  .then(account => {
    res.status(201).json(account)
  })
  .catch(err => {
    res.status(500).json({ message: "Error posting account", err })
  })
});

router.put('/:id', (req, res) => {
  const changes = req.body;

  db('accounts')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count) {
        res.json({ updated: count })
      } else {
        res.status(404).json({ message: "Invalid ID" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Database error while updating", err })
    })
});





module.exports = router;
