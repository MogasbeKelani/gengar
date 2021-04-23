// @ts-ignore // not typescript-ified yet
const express = require("express");

import { reseller } from "googleapis/build/src/apis/reseller";
import {
  createDiscussion,
  getDiscussions,
  getDiscussionById,
  getDiscussionByTopic,
  deleteDiscussion,
  updateDiscussion,
} from "../../controllers/discussions/index";

// @ts-ignore // not typescript-ified yet
const router = express.Router();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

router.get("/all", jsonParser, async (req: any, res: any) => {
  try {
    const forum = await getDiscussions();

    res.send(forum);
  } catch (err) {
    throw err;
  }
});

router.get("/:id", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    const forum = await getDiscussionById(req.params.id);

    res.send(forum);
  } catch (err) {
    throw err;
  }
});
router.get("/topic/:topic", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.params.topic) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    const forum = await getDiscussionByTopic(req.params.topic);

    res.send(forum);
  } catch (err) {
    throw err;
  }
});

router.post("/create", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.body.title || !req.body.description) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    if (!req.user || !req.user._id) {
      res.status(400).json({ message: "User has not signed In" });
      return;
    }
    var discussionFormatted = req.body;
    discussionFormatted.creator = req.user._id;

    const forum = await createDiscussion(req.body);

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

module.exports = router;
