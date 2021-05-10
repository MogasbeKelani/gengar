import { discussion } from "../../models/general/models/forum-model";
var ObjectId = require("mongodb").ObjectID;
export async function createDiscussion(
  forum: discussion
): Promise<discussion | any> {
  try {
    if (!forum) {
      return { message: "no body in the request" };
    }
    forum.create_date = Date.now();
    forum.update_date = Date.now();
    const result = await client
      .db("GitGud")
      .collection("forum")
      .insertOne(forum);

    return result.ops[0];
  } catch (err) {
    throw err;
  }
}

export async function getDiscussions(): Promise<[discussion] | any> {
  try {
    var result = await client.db("GitGud").collection("forum").find().toArray();
    return result;
  } catch (err) {
    throw err;
  }
}

export async function getDiscussionById(id: String): Promise<discussion | any> {
  try {
    var result = await client
      .db("GitGud")
      .collection("forum")
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (err) {
    throw err;
  }
}
export async function getDiscussionByTopic(
  topic: String
): Promise<discussion | any> {
  try {
    var result = await client
      .db("GitGud")
      .collection("forum")
      .find({ topics: { $regex: ".*" + topic + ".*" } })
      .toArray();
    return result;
  } catch (err) {
    throw err;
  }
}
export async function getDiscussionByName(
  name: String
): Promise<discussion | any> {
  try {
    var result = await client
      .db("GitGud")
      .collection("forum")
      .find({ title: { $regex: ".*" + name + ".*" } })
      .toArray();
    return result;
  } catch (err) {
    throw err;
  }
}
export async function getDiscussionByUserId(
  id: String
): Promise<discussion | any> {
  try {
    var result = await client
      .db("GitGud")
      .collection("forum")
      .find({ creator: id })
      .toArray();
    return result;
  } catch (err) {
    throw err;
  }
}
export async function updateDiscussion(
  patch: discussion
): Promise<discussion | any> {
  try {
    const result = await client
      .db("GitGud")
      .collection("forum")
      .findOneAndUpdate(
        { _id: ObjectId(patch._id) },
        {
          $set: {
            title: patch.title,
            description: patch.description,
            update_date: Date.now(),
            topics: patch.topics,
          },
        },
        { returnOriginal: false }
      );

    return result.value;
  } catch (err) {
    throw err;
  }
}

export async function deleteDiscussion(id: String): Promise<discussion | any> {
  try {
    var result = await client
      .db("GitGud")
      .collection("forum")
      .deleteOne({ _id: ObjectId(id) });
    if (result.deletedCount == 0) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    throw err;
  }
}
