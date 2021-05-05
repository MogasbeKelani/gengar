import { post } from "../../models/general/models/post-model";
var ObjectId = require("mongodb").ObjectID;
export async function createPost(forum: post): Promise<post | any> {
  try {
    if (!forum) {
      return { message: "no body in the request" };
    }
    forum.create_date = Date.now();
    forum.update_date = Date.now();

    const result = await client
      .db("GitGud")
      .collection("post")
      .insertOne(forum);
    return result.ops[0];
  } catch (err) {
    throw err;
  }
}

export async function getPostById(id: String): Promise<post | any> {
  try {
    var result = await client
      .db("GitGud")
      .collection("post")
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (err) {
    throw err;
  }
}

export async function getPostByUserId(id: String): Promise<post | any> {
  try {
    var result = await client
      .db("GitGud")
      .collection("post")
      .find({ creator: ObjectId(id) })
      .toArray();
    return result;
  } catch (err) {
    throw err;
  }
}

export async function getPostByThreadId(id: String): Promise<post | any> {
  try {
    var result = await client
      .db("GitGud")
      .collection("post")
      .find({ threadId: ObjectId(id) })
      .toArray();
    return result;
  } catch (err) {
    throw err;
  }
}

export async function updatePost(patch: post): Promise<post | any> {
  try {
    const result = await client
      .db("GitGud")
      .collection("post")
      .findOneAndUpdate(
        { _id: ObjectId(patch._id) },
        {
          $set: {
            creator: patch.creator,
            threadId: patch.threadId,
            text: patch.text,
            update_date: Date.now(),
          },
        },
        { returnOriginal: false }
      );

    return result.value;
  } catch (err) {
    throw err;
  }
}

export async function deletePost(id: String): Promise<post | any> {
  try {
    var result = await client
      .db("GitGud")
      .collection("post")
      .deleteOne({ _id: ObjectId(id) });
    console.log(result);
    if (result.deletedCount == 0) {
      return { success: false };
    }

    return { success: true };
  } catch (err) {
    throw err;
  }
}
