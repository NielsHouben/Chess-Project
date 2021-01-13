const { Session } = require('../../models/session')
const winston = require('winston')
const express = require('express')
const router = express.Router()



router.get('/create', async (req, res) => {
  let session = new Session({
    board: ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR", "BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP", "WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"]
  })
  session = await session.save()

  winston.info(`Session created: ${session._id}`)

  res.status(200).send(session)
})

router.get('/:sessionId', async (req, res) => {
  const session = await Session.findById(req.params.sessionId)

  if (!session) return res.status(404).send('Session with the given ID was not found.')

  res.send(session)
})

router.put('/:sessionId/:pos1/:pos2', async (req, res) => {
  const session = await Session.findById(req.params.sessionId)
  if (!session) return res.status(404).send('Session with the given ID was not found')

  session.board[parseInt(req.params.pos2)] = session.board[parseInt(req.params.pos1)]
  session.board[parseInt(req.params.pos1)] = ""

  winston.info(`${req.params.pos1} to ${req.params.pos2}`)

  await Session.findByIdAndUpdate(req.params.sessionId,
    {
      board: session.board
    }, { new: true })


  // const session = await Session.findById(req.params.sessionId)

  // if (!session) return res.status(404).send('Session with the given ID was not found')
  // winston.info(session.board)
  // winston.info(req.params.pos1)
  // winston.info(req.params.pos2)
  // winston.info(session.board[parseInt(req.params.pos1)])
  // session.board[parseInt(req.params.pos1)] = "BP"
  // winston.info(session.board)
  // session = await session.board.updateOne()
  // res.send(session)
})
module.exports = router