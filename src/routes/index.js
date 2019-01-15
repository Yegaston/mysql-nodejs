const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Cuando te sentis solaa, solaa")
});

module.exports = router
