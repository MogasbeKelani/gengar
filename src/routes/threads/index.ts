// @ts-ignore // not typescript-ified yet
const express = require("express");

import {
  createThread,
  getById,
  deletethread,
  updatethread,
  getThreadByUserId,
  getByForumId,
} from "../../controllers/threads";

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
router.get("/forum/:id", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    const forum = await getByForumId(req.params.id);

    res.send(forum);
  } catch (err) {
    throw err;
  }
});
router.get("/user/:id", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    const forum = await getThreadByUserId(req.params.id);

    res.send(forum);
  } catch (err) {
    throw err;
  }
});

router.post("/create", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.body.title) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    if ((!req.user || !req.user._id) && !req.body.creator) {
      res.status(400).json({ message: "User has not signed In" });
      return;
    }
    var threadFormatted = req.body;
    if (!req.body.creator) {
      threadFormatted.creator = req.user._id;
    }

    const forum = await createThread(threadFormatted);

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
    const forum = await deletethread(req.params.id);

    res.send(forum);
  } catch (err) {
    throw err;
  }
});

router.patch("/update/:id", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    var threadFormatted = req.body;
    threadFormatted._id = req.params.id;
    const thread = await updatethread(threadFormatted);
    res.send(thread);
  } catch (err) {
    throw err;
  }
});

module.exports = router;
