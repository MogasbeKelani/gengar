import { post } from "../../models/general/models/post-model";
var ObjectId = require("mongodb").ObjectID;

export async function createPost(forum: post): Promise<post | any> {
  try {
    if (!forum) {
      return { message: "no body in the request" };
    }
    const schema = new client.db("GitGud").collection("post")(forum);

    var result = await schema.save().then(() => {
      return {
        success: true,
        _id: schema._id,
        creator: schema.creator,
        message: "post created!",
        text: schema.text,
        time: schema.time,
        threadId: schema.threadId,
      };
    });

    return result;
  } catch (err) {
    throw err;
  }
}

export async function getPostById(id: String): Promise<post | any> {
  try {
    var result = await client
      .db("GitGud")
      .collection("post")
      .findOne({ _id: id }, (err: any, post: post) => {
        if (err) {
          return { success: false, error: err };
        }

        if (!post) {
          return { success: false, error: `post not found` };
        }
        return { success: true, data: post };
      });
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
      .find({ threadId: id })
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
        { _id: patch._id },
        {
          $set: {
            text: patch.text,
          },
        },
        { new: true }
      );
    return result;
  } catch (err) {
    throw err;
  }
}

export async function deletePost(id: String): Promise<post | any> {
  try {
    var result = await client
      .db("GitGud")
      .collection("post")
      .findByIdAndRemove(id)
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => {
        return err;
      });
    if (!result) {
      return { success: false };
    }

    return { success: true };
  } catch (err) {
    throw err;
  }
}
