"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserAttribute = exports.getUserById = void 0;
var ObjectId = require("mongodb").ObjectID;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield client
                .db("GitGud")
                .collection("user")
                .findOne({ _id: ObjectId(id) });
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getUserById = getUserById;
function updateUserAttribute(patch) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client
                .db("GitGud")
                .collection("user")
                .findOneAndUpdate({ _id: ObjectId(patch._id) }, {
                $set: {
                    google_id: patch.google_id,
                    first_name: patch.first_name,
                    last_name: patch.last_name,
                    image: patch.image,
                    update_date: Date.now(),
                },
            }, { returnOriginal: false });
            return result.value;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.updateUserAttribute = updateUserAttribute;
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield client
                .db("GitGud")
                .collection("user")
                .deleteOne({ _id: ObjectId(id) });
            if (result.deletedCount == 0) {
                return { success: false };
            }
            return { success: true };
        }
        catch (err) {
            throw err;
        }
    });
}
exports.deleteUser = deleteUser;
