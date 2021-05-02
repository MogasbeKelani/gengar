// @ts-ignore // not typescript-ified yet
const express = require("express");

import {
  createPost,
  getPostById,
  deletePost,
  updatePost,
  getPostByThreadId,
} from "../../controllers/posts";

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
    const forum = await getPostById(req.params.id);

    res.send(forum);
  } catch (err) {
    throw err;
  }
});
/**
 * @param threadId of the posts you want
 */
router.get("/thread/:id", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    const forum = await getPostByThreadId(req.params.id);

    res.send(forum);
  } catch (err) {
    throw err;
  }
});

/**
 * @param req.body where body has atleast a text and a threadId
 */

router.post("/create", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.body.text || !req.body.threadId) {
      res.status(400).json({ message: "Empty Text" });
      return;
    }

    if ((!req.user || !req.user._id) && !req.body.creator) {
      res.status(400).json({ message: "User has not signed In" });
      return;
    }

    var postFormatted = req.body;
    if (!req.body.creator) {
      postFormatted.creator = req.user._id;
    }

    const forum = await createPost(postFormatted);

    res.send(forum);
  } catch (err) {
    throw err;
  }
});
/**
 * @param id of the post you are deleting
 */
router.delete("/delete/:id", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    const forum = await deletePost(req.params.id);

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
    const forum = await updatePost(req.body);
    res.send(forum);
  } catch (err) {
    throw err;
  }
});

module.exports = router;
