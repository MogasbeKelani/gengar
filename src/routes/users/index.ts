// @ts-ignore // not typescript-ified yet
const express = require("express");

import {
  getUserById,
  updateUser,
  deleteUser,
} from "../../controllers/users/index";

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
 * @param _id of the user you want to patch
 * @returns updated user
 */
router.patch("/update", jsonParser, async (req: any, res: any) => {
  try {
    if (!req.body._id) {
      res.status(400).json({ message: "Missing Params" });
      return;
    }
    const user = await updateUser(req.body);
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