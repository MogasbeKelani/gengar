const userSchema = require("../../models/general/user-model");

import { user } from "../../models/general/models/user-model";

export async function getUserById(id: String): Promise<user | any> {
  try {
    var result = await userSchema.findOne(
      { _id: id },
      (err: any, userInfo: user) => {
        if (err) {
          return { success: false, error: err };
        }

        if (!userInfo) {
          return { success: false, error: `User not found` };
        }
        return { success: true, data: userInfo };
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

export async function updateUser(
  patch: user
): Promise<user | any> {
  try {
    const result = await userSchema.findOneAndUpdate(
      { _id: patch._id },
      {
        $set: {
          google_id: patch.google_id,
          first_name: patch.first_name,
          last_name: patch.last_name,
          image: patch.image,
          threadCreated: patch.threadCreated,
          postMade: patch.postMade,
        },
      },
      { new: true }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

export async function deleteUser(id: String): Promise<user | any> {
  try {
    var result = await userSchema
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
