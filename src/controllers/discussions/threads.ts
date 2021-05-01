const discussionSchema = require("../../models/general/schemas/thread-model");

import { OAuth2Client } from "google-auth-library";
import { threads } from "../../models/general/models/thread-model";

export async function createThread(original: threads): Promise<threads | any> {
  try {
    if (!original) {
      return { message: "no body in the request" };
    }
    const schema = new discussionSchema(original);

    var result = await schema.save().then(() => {
      return {
        success: true,
        id: schema._id,
        creator: schema.creator,
        forum: schema.forum,
        title: schema.title,
        post: schema.post,
        message: "successfuly commented",
      };
    });

    return result;
  } catch (err) {
    throw err;
  }
}

export async function getById(id: String): Promise<threads | any> {
  try {
    var result = await discussionSchema.findOne(
      { _id: id },
      (err: any, original: threads) => {
        if (err) {
          return { success: false, error: err };
        }

        if (!original) {
          return { success: false, error: `Discussion not found` };
        }
        return { success: true, data: original };
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

export async function updateDiscussion(patch: threads): Promise<threads | any> {
  try {
    const result = await discussionSchema.findOneAndUpdate(
      { _id: patch._id },
      {
        $set: {
          creator: patch.creator,
          forum: patch.forum,
          title: patch.title,
          post: patch.post,
        },
      },
      { new: true }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

export async function deleteDiscussion(id: String): Promise<threads | any> {
  try {
    var result = await discussionSchema
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
