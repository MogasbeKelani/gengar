const discussionSchema = require("../../models/general/schemas/forum-model");

import { OAuth2Client } from "google-auth-library";
import { discussion } from "../../models/general/models/forum-model";

export async function createDiscussion(
  forum: discussion
): Promise<discussion | any> {
  try {
    if (!forum) {
      return { message: "no body in the request" };
    }
    const schema = new discussionSchema(forum);

    var result = await schema.save().then(() => {
      return {
        success: true,
        id: schema._id,
        creator: schema.creator,
        message: "Discussion created!",
        title: schema.title,
        discussion: schema.discussion,
        threads: schema.threads,
        topics: schema.topics,
      };
    });

    return result;
  } catch (err) {
    throw err;
  }
}

export async function getDiscussions(): Promise<[discussion] | any> {
  try {
    var result = await discussionSchema.find(
      {},
      (err: any, forums: discussion) => {
        return { success: true, data: forums };
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

export async function getDiscussionById(id: String): Promise<discussion | any> {
  try {
    var result = await discussionSchema.findOne(
      { _id: id },
      (err: any, forums: discussion) => {
        if (err) {
          return { success: false, error: err };
        }

        if (!forums) {
          return { success: false, error: `Discussion not found` };
        }
        return { success: true, data: forums };
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
}
export async function getDiscussionByTopic(
  topic: String
): Promise<discussion | any> {
  try {
    var result = await discussionSchema.find(
      { topics: { $all: topic } },
      (err: any, forums: discussion) => {
        if (err) {
          return { success: false, error: err };
        }

        return { success: true, data: forums };
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
}
export async function updateDiscussion(
  patch: discussion
): Promise<discussion | any> {
  try {
    const result = await discussionSchema.findOneAndUpdate(
      { _id: patch._id },
      {
        $set: {
          creator: patch.creator,
          title: patch.title,
          description: patch.description,
          threads: patch.threads,
          topics: patch.topics,
        },
      },
      { new: true }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

export async function deleteDiscussion(id: String): Promise<discussion | any> {
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
