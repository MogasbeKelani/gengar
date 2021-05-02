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
const postSchema = require("../../models/general/schemas/post-model");
function createPost(forum) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!forum) {
                return { message: "no body in the request" };
            }
            const schema = new postSchema(forum);
            var result = yield schema.save().then(() => {
                return {
                    success: true,
                    id: schema._id,
                    creator: schema.creator,
                    message: "post created!",
                    text: schema.text,
                    time: schema.time,
                    threadId: schema.threadId,
                };
            });
            return result;
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
            var result = yield postSchema.findOne({ _id: id }, (err, post) => {
                if (err) {
                    return { success: false, error: err };
                }
                if (!post) {
                    return { success: false, error: `post not found` };
                }
                return { success: true, data: post };
            });
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
            var result = yield postSchema.find({ creator: id }, (err, posts) => {
                if (err) {
                    return { success: false, error: err };
                }
                return { success: true, data: posts };
            });
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
            var result = yield postSchema.find({ threadId: id }, (err, post) => {
                if (err) {
                    return { success: false, error: err };
                }
                return { success: true, data: post };
            });
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
            const result = yield postSchema.findOneAndUpdate({ _id: patch._id }, {
                $set: {
                    text: patch.text,
                },
            }, { new: true });
            return result;
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
            var result = yield postSchema
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
exports.deletePost = deletePost;
