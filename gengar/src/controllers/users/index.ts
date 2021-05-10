import { user } from "../../models/general/models/user-model";
var ObjectId = require("mongodb").ObjectID;

export async function getUserById(id: String): Promise<user | any> {
  try {
    var result = await client
      .db("GitGud")
      .collection("user")
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (err) {
    throw err;
  }
}

export async function updateUserAttribute(patch: user): Promise<user | any> {
  try {
    const result = await client
      .db("GitGud")
      .collection("user")
      .findOneAndUpdate(
        { _id: ObjectId(patch._id) },
        {
          $set: {
            google_id: patch.google_id,
            first_name: patch.first_name,
            last_name: patch.last_name,
            image: patch.image,
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

export async function deleteUser(id: String): Promise<user | any> {
  try {
    var result = await client
      .db("GitGud")
      .collection("user")
      .deleteOne({ _id: ObjectId(id) });
    if (result.deletedCount == 0) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    throw err;
  }
}
