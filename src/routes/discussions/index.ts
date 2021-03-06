// @ts-ignore // not typescript-ified yet
const express = require("express");

import {
  createDiscussion,
  getDiscussions,
  getDiscussionById,
  getDiscussionByTopic,
  deleteDiscussion,
  updateDiscussion,
  getDiscussionByName,
} from "../../controllers/discussions/index";

// @ts-ignore // not typescript-ified yet
const router = express.Router();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

/**
 * @returns All Discussions
 */
router.get("/all", jsonParser, async (req: any, res: any) => {
  try {
    const forum = await getDiscussions();

    res.send(forum);
  } catch (err) {
    throw err;
  }
});
/**
 * @param _id for a discussion
 */
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

/**
 * @param topic for a discussion
 * @returns list of discussions with that topic
 */
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
/**
 * @param title for a discussion
 * @returns list of discussions with that title pr contains that title
 */
router.get("/title/:title", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.params.title) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    const forum = await getDiscussionByName(req.params.title);

    res.send(forum);
  } catch (err) {
    throw err;
  }
});
/**
 * @param req.body where body has atleast a title and a description
 * If you are testing you can add creator just make sure creator is an ID of User
 * @requires User to be logged in. Front end does not pass user must be in session
 */

router.post("/create", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.body.title || !req.body.description) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    if ((!req.user || !req.user._id) && !req.body.creator) {
      res.status(400).json({ message: "User has not signed In" });
      return;
    }
    var discussionFormatted = req.body;
    if (!req.body.creator) {
      discussionFormatted.creator = req.user._id;
    }
    const forum = await createDiscussion(discussionFormatted);

    res.send(forum);
  } catch (err) {
    throw err;
  }
});

/**
 * @param _id of the discussion you want to patch
 * @returns updated discussion
 */
router.patch("/update/:id", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    var discussionFormatted = req.body;
    discussionFormatted._id = req.params.id;
    const forum = await updateDiscussion(discussionFormatted);
    res.send(forum);
  } catch (err) {
    throw err;
  }
});
/**
 * @param _id of the discussion you want to delete
 * @returns success boolean
 */
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
