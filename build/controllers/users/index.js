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
exports.deleteUser = exports.updateUser = exports.getUserById = void 0;
const userSchema = require("../../models/general/user-model");
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield userSchema.findOne({ _id: id }, (err, userInfo) => {
                if (err) {
                    return { success: false, error: err };
                }
                if (!userInfo) {
                    return { success: false, error: `User not found` };
                }
                return { success: true, data: userInfo };
            });
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getUserById = getUserById;
function updateUser(patch) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield userSchema.findOneAndUpdate({ _id: patch._id }, {
                $set: {
                    google_id: patch.google_id,
                    first_name: patch.first_name,
                    last_name: patch.last_name,
                    image: patch.image,
                    threadCreated: patch.threadCreated,
                    postMade: patch.postMade,
                },
            }, { new: true });
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield userSchema
                .findByIdAndRemove(id)
                .then((response) => {
                return response;
            })
                .catch((err) => {
                return err;
            });
            if (!result) {
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
