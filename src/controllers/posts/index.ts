const postSchema = require("../../models/general/schemas/post-model");

import { post } from "../../models/general/models/post-model";

export async function createPost(forum: post): Promise<post | any> {
  try {
    if (!forum) {
      return { message: "no body in the request" };
    }
    const schema = new postSchema(forum);

    var result = await schema.save().then(() => {
      return {
        success: true,
        id: schema._id,
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
    var result = await postSchema.findOne(
      { _id: id },
      (err: any, post: post) => {
        if (err) {
          return { success: false, error: err };
        }

        if (!post) {
          return { success: false, error: `post not found` };
        }
        return { success: true, data: post };
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
}
export async function getPostByThreadId(id: String): Promise<post | any> {
  try {
    var result = await postSchema.find(
      { threadId: id },
      (err: any, post: post) => {
        if (err) {
          return { success: false, error: err };
        }

        return { success: true, data: post };
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

export async function updatePost(patch: post): Promise<post | any> {
  try {
    const result = await postSchema.findOneAndUpdate(
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
    var result = await postSchema
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
