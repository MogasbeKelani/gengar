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
exports.deleteDiscussion = exports.updateDiscussion = exports.getById = exports.createThread = void 0;
const discussionSchema = require("../../models/general/schemas/thread-model");
function createThread(original) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!original) {
                return { message: "no body in the request" };
            }
            const schema = new discussionSchema(original);
            var result = yield schema.save().then(() => {
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
        }
        catch (err) {
            throw err;
        }
    });
}
exports.createThread = createThread;
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield discussionSchema.findOne({ _id: id }, (err, original) => {
                if (err) {
                    return { success: false, error: err };
                }
                if (!original) {
                    return { success: false, error: `Discussion not found` };
                }
                return { success: true, data: original };
            });
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getById = getById;
function updateDiscussion(patch) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield discussionSchema.findOneAndUpdate({ _id: patch._id }, {
                $set: {
                    creator: patch.creator,
                    forum: patch.forum,
                    title: patch.title,
                    post: patch.post,
                },
            }, { new: true });
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.updateDiscussion = updateDiscussion;
function deleteDiscussion(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield discussionSchema
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
exports.deleteDiscussion = deleteDiscussion;
