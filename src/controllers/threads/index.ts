const threadSchema = require("../../models/general/schemas/thread-model");

import { threads } from "../../models/general/models/thread-model";

export async function createThread(original: threads): Promise<threads | any> {
  try {
    if (!original) {
      return { message: "no body in the request" };
    }
    const schema = new threadSchema(original);

    var result = await schema.save().then(() => {
      return {
        success: true,
        _id: schema._id,
        creator: schema.creator,
        forumId: schema.forumId,
        title: schema.title,
        creatorName: schema.creatorName,
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
    var result = await threadSchema.findOne(
      { _id: id },
      (err: any, original: threads) => {
        if (err) {
          return { success: false, error: err };
        }

        if (!original) {
          return { success: false, error: `thread not found` };
        }
        return { success: true, data: original };
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

export async function updatethread(patch: threads): Promise<threads | any> {
  try {
    const result = await threadSchema.findOneAndUpdate(
      { _id: patch._id },
      {
        $set: {
          creator: patch.creator,
          forumId: patch.forumId,
          text: patch.text,
          creatorName: patch.creatorName,
        },
      },
      { new: true }
    );
    return result;
  } catch (err) {
    throw err;
  }
}
export async function getThreadByUserId(id: String): Promise<threads | any> {
  try {
    var result = await threadSchema.find(
      { creator: id },
      (err: any, threads: [threads]) => {
        if (err) {
          return { success: false, error: err };
        }

        return { success: true, data: threads };
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

export async function deletethread(id: String): Promise<threads | any> {
  try {
    var result = await threadSchema
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

export async function getByForumId(id: String): Promise<threads | any> {
  try {
    var result = await threadSchema.find(
      { forumId: id },
      (err: any, original: threads) => {
        if (err) {
          return { success: false, error: err };
        }

        if (!original) {
          return { success: false, error: `Thread not found` };
        }
        return { success: true, data: original };
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
}
