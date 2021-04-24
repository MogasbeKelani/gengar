"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore // not typescript-ified yet
const express = require("express");
// @ts-ignore // not typescript-ified yet
const router = express.Router();
router.get("/signedin", (req, res) => {
    try {
        let on = req.isAuthenticated();
        /*if (req.isAuthenticated()) {
          on = true;
        }*/
        res.send({ on });
    }
    catch (err) {
        throw err;
    }
});
module.exports = router;
