const express = require('express');
const router = express.Router();



router.post('/', async (req, res) => {
  res.status(200).json({id: '218307'})
});


module.exports = router;