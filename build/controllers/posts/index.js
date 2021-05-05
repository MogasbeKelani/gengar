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
exports.deletePost = exports.updatePost = exports.getPostByThreadId = exports.getPostByUserId = exports.getPostById = exports.createPost = void 0;
var ObjectId = require("mongodb").ObjectID;
function createPost(forum) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!forum) {
                return { message: "no body in the request" };
            }
            forum.create_date = Date.now();
            forum.update_date = Date.now();
            const result = yield client
                .db("GitGud")
                .collection("post")
                .insertOne(forum);
            return result.ops[0];
        }
        catch (err) {
            throw err;
        }
    });
}
exports.createPost = createPost;
function getPostById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield client
                .db("GitGud")
                .collection("post")
                .findOne({ _id: ObjectId(id) });
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getPostById = getPostById;
function getPostByUserId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield client
                .db("GitGud")
                .collection("post")
                .find({ creator: ObjectId(id) })
                .toArray();
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getPostByUserId = getPostByUserId;
function getPostByThreadId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield client
                .db("GitGud")
                .collection("post")
                .find({ threadId: ObjectId(id) })
                .toArray();
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getPostByThreadId = getPostByThreadId;
function updatePost(patch) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client
                .db("GitGud")
                .collection("post")
                .findOneAndUpdate({ _id: ObjectId(patch._id) }, {
                $set: {
                    creator: patch.creator,
                    threadId: patch.threadId,
                    text: patch.text,
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
exports.updatePost = updatePost;
function deletePost(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var result = yield client
                .db("GitGud")
                .collection("post")
                .deleteOne({ _id: ObjectId(id) });
            console.log(result);
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
exports.deletePost = deletePost;
