// @ts-ignore // not typescript-ified yet
const express = require("express");

import {
  getUserById,
  updateUserAttribute,
  deleteUser,
} from "../../controllers/users/index";
import { getDiscussionByUserId } from "../../controllers/discussions/index";
import { getThreadByUserId } from "../../controllers/threads/index";
import { getPostByUserId } from "../../controllers/posts/index";
// @ts-ignore // not typescript-ified yet
const router = express.Router();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

/**
 * @param _id for a user
 */
router.get("/:id", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    const user = await getUserById(req.params.id);

    res.send(user);
  } catch (err) {
    throw err;
  }
});

/**
 * Get all for everything ever
 */
router.get("/getAll/:id", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    const threads = await getThreadByUserId(req.params.id);
    const posts = await getPostByUserId(req.params.id);
    var user = threads.concat(posts);
    res.send(user);
  } catch (err) {
    throw err;
  }
});

/**
 * @param creator for the discussions
 */
router.get("/discussions/:id", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    const forum = await getDiscussionByUserId(req.params.id);

    res.send(forum);
  } catch (err) {
    throw err;
  }
});
/**
 * @param _id of the user you want to patch
 * @returns updated user
 */
router.patch("/update/:id", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    const formatUser = req.body;
    formatUser._id = req.params.id;
    const user = await updateUserAttribute(formatUser);
    res.send(user);
  } catch (err) {
    throw err;
  }
});

/**
 * @param _id of the user you want to delete
 * @returns success boolean
 */
router.delete("/delete/:id", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    const user = await deleteUser(req.params.id);

    res.send(user);
  } catch (err) {
    throw err;
  }
});

module.exports = router;
