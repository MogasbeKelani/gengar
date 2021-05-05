import { threads } from "../../models/general/models/thread-model";
var ObjectId = require("mongodb").ObjectID;

export async function createThread(original: threads): Promise<threads | any> {
  try {
    if (!original) {
      return { message: "no body in the request" };
    }
    const schema = new client.db("GitGud").collection("thread")(original);

    var result = await schema.save().then(() => {
      return {
        success: true,
        _id: schema._id,
        creator: schema.creator,
        forumId: schema.forumId,
        title: schema.title,
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
    var result = await client
      .db("GitGud")
      .collection("thread")
      .findOne({ _id: id }, (err: any, original: threads) => {
        if (err) {
          return { success: false, error: err };
        }

        if (!original) {
          return { success: false, error: `thread not found` };
        }
        return { success: true, data: original };
      });
    return result;
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
        { _id: patch._id },
        {
          $set: {
            creator: patch.creator,
            forumId: patch.forumId,
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
export async function getThreadByUserId(id: String): Promise<threads | any> {
  try {
    var result = await client
      .db("GitGud")
      .collection("thread")
      .find({ creator: ObjectId(id) })
      .toArray();
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
    var result = await client
      .db("GitGud")
      .collection("thread")
      .find({ forumId: id }, (err: any, original: threads) => {
        if (err) {
          return { success: false, error: err };
        }

        if (!original) {
          return { success: false, error: `Thread not found` };
        }
        return { success: true, data: original };
      });
    return result;
  } catch (err) {
    throw err;
  }
}
