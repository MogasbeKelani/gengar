import { isRegExp } from "node:util";

// @ts-ignore // not typescript-ified yet
const express = require("express");

// @ts-ignore // not typescript-ified yet
const router = express.Router();

router.get("/signedin", (req: any, res: any) => {
  try {
    let on = false;
    if (req.isAuthenticated()) {
      on = true;
    }
    res.send({ on });
  } catch (err) {
    throw err;
  }
});

module.exports = router;
