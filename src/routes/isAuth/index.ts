// @ts-ignore // not typescript-ified yet
const express = require("express");

// @ts-ignore // not typescript-ified yet
const router = express.Router();

router.get("/check", (req: any, res: any) => {
  try {
    var authenticated = req.isAuthenticated();
    res.send({ authenticated });
  } catch (err) {
    throw err;
  }
});

module.exports = router;
