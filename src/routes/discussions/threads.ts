// @ts-ignore // not typescript-ified yet
const express = require("express");

import {
  createThread,
  getById,
  deleteDiscussion,
  updateDiscussion,
} from "../../controllers/discussions/threads";

// @ts-ignore // not typescript-ified yet
const router = express.Router();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

router.get("/:id", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    const forum = await getById(req.params.id);

    res.send(forum);
  } catch (err) {
    throw err;
  }
});

router.post("/make", jsonParser, async (req: any, res: any) => {
  try {
    console.log(req.body);
    if (!req.body.title || !req.body.post) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    var discussionFormatted = req.body;
    //discussionFormatted.creator = req.user.first_name + req.user.last_name;

    const forum = await createThread(discussionFormatted);

    res.send(forum);
  } catch (err) {
    throw err;
  }
});

router.delete("/delete/:id", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    const forum = await deleteDiscussion(req.params.id);

    res.send(forum);
  } catch (err) {
    throw err;
  }
});

router.patch("/update", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.body._id) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    const forum = await updateDiscussion(req.body);
    res.send(forum);
  } catch (err) {
    throw err;
  }
});

module.exports = router;
