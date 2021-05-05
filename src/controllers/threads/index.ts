import { time } from "node:console";
import { threads } from "../../models/general/models/thread-model";
var ObjectId = require("mongodb").ObjectID;


export async function createThread(original: threads): Promise<threads | any> {
  try {
    if (!original) {
      return { message: "no body in the request" };
    }

    const result = await client.db("GitGud").collection("thread").insertOne(original);

    return result;

  } catch (err) {
    throw err;
  }
}

export async function getById(id: String): Promise<threads | any> {
  try {

    var result = await client.db("GitGud").collection("thread").findOne({ _id: ObjectId(id) });
    return result;

  } catch (err) {
    throw err;
  }
}

export async function getByForumId(id: String): Promise<threads | any> {
  try {
    var result = await client.db("GitGud").collection("thread").find({ forumId: id }).toArray();
  } catch (err) {
    throw err;
  }
}

export async function getThreadByUserId(id: String): Promise<threads | any> {
  try {
    const result = await client.db("GitGud").collection("thread").find({creator : id}).toArray();

    return result;
  } catch (err) {
    throw err;
  }
}

export async function deletethread(id: String): Promise<threads | any> {
  try {
    

    var result = await client.db("GitGud").collection("thread").deleteOne({_id : ObjectId(id)});

    if (!result) {
      return { success: false };
    }

    return { success: true };
  } catch (err) {
    throw err;
  }
}

export async function updatethread(patch: threads): Promise<threads | any> {
  try {

      const result = await client.db("GitGud").collection("thread").findOneAndUpdate(
        { _id: ObjectId(patch._id) },
        {
          $set: {
            text: patch.text,
            update_date: Date.now,
          },
        },
        { new: true }
      );

    return result;
  } catch (err) {
    throw err;
  }
}

