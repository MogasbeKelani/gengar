import { time } from "node:console";
import { threads } from "../../models/general/models/thread-model";
var ObjectId = require("mongodb").ObjectID;

export async function createThread(original: threads): Promise<threads | any> {
  try {
    if (!original) {
      return { message: "no body in the request" };
    }
    original.create_date = Date.now();
    original.update_date = Date.now();
    const result = await client
      .db("GitGud")
      .collection("thread")
      .insertOne(original);

    return result.ops[0];
  } catch (err) {
    throw err;
  }
}

export async function getById(id: String): Promise<threads | any> {
  try {
    var result = await client
      .db("GitGud")
      .collection("thread")
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (err) {
    throw err;
  }
}

export async function getByForumId(id: String): Promise<threads | any> {
  try {
    var result = await client
      .db("GitGud")
      .collection("thread")
      .find({ forumId: id })
      .toArray();
    return result;
  } catch (err) {
    throw err;
  }
}

export async function getThreadByUserId(id: String): Promise<threads | any> {
  try {
    const result = await client.db("GitGud").collection("thread");

    return result;
  } catch (err) {
    throw err;
  }
}

export async function deletethread(id: String): Promise<threads | any> {
  try {
    var result = await client
      .db("GitGud")
      .collection("thread")
      .deleteOne({ _id: ObjectId(id) });

    if (result.deletedCount == 0) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    throw err;
  }
}

export async function updatethread(patch: threads): Promise<threads | any> {
  try {
    const result = await client
      .db("GitGud")
      .collection("thread")
      .findOneAndUpdate(
        { _id: ObjectId(patch._id) },
        {
          $set: {
            creator: patch.creator,
            forumId: patch.forumId,
            text: patch.text,
            update_date: Date.now,
          },
        },
        { returnOriginal: false }
      );

    return result.value;
  } catch (err) {
    throw err;
  }
}
