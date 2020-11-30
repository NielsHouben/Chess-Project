const { Session } = require('../../models/session');
const winston = require('winston');
const express = require('express');
const router = express.Router();



router.get('/create', async (req, res) => {
  let session = new Session({
    board: ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR", "BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP", "WR", "WN", "WB", "WK", "WQ", "WB", "WN", "WR"]
  });
  session = await session.save();

  winston.info(`Session created: ${session._id}`)

  res.status(200).send(session)
});

router.get('/:sessionId', async (req, res) => {
  const session = await Session.findById(req.params.sessionId);

  if (!session) return res.status(404).send('Session with the given ID was not found.');

  res.send(session);
});

module.exports = router;